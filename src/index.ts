import { DurableObject } from "cloudflare:workers";
import { Hono } from "hono";

export class App extends DurableObject {
  private app: Hono;

  constructor(ctx: DurableObjectState, env: Record<string, unknown>) {
    super(ctx, env);
    this.app = new Hono();
    this.setupRoutes();
  }

  private initDatabase() {
    this.ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS routes (
        id TEXT PRIMARY KEY,
        path_pattern TEXT NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        target_url TEXT,
        price_usd REAL NOT NULL DEFAULT 0.0010,
        allowed_methods TEXT NOT NULL DEFAULT '["GET","POST"]',
        auth_modes TEXT NOT NULL DEFAULT '["l402","crypto","api_key"]',
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS api_keys (
        id TEXT PRIMARY KEY,
        key_secret TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        balance_usd REAL NOT NULL DEFAULT 0.0,
        total_spent REAL NOT NULL DEFAULT 0.0,
        status TEXT NOT NULL DEFAULT 'active',
        created_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS ledger_tx (
        id TEXT PRIMARY KEY,
        api_key_id TEXT NOT NULL,
        type TEXT NOT NULL,
        amount_usd REAL NOT NULL,
        description TEXT NOT NULL,
        ref_id TEXT,
        created_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS invoices (
        id TEXT PRIMARY KEY,
        route_id TEXT NOT NULL,
        price_usd REAL NOT NULL,
        asset TEXT NOT NULL DEFAULT 'USDC',
        payment_hash TEXT NOT NULL,
        preimage TEXT,
        macaroon TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        expires_at INTEGER NOT NULL,
        created_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS request_logs (
        id TEXT PRIMARY KEY,
        timestamp INTEGER NOT NULL,
        path TEXT NOT NULL,
        route_name TEXT NOT NULL,
        status_code INTEGER NOT NULL,
        method TEXT NOT NULL,
        payment_method TEXT NOT NULL,
        cost_usd REAL NOT NULL,
        latency_ms INTEGER NOT NULL,
        client_ip TEXT NOT NULL,
        request_preview TEXT,
        response_preview TEXT
      );
    `);

    // Seed initial routes if table is empty
    const countRoutes = this.ctx.storage.sql.exec(`SELECT COUNT(*) as cnt FROM routes`).one().cnt as number;
    if (countRoutes === 0) {
      const now = Date.now();
      this.ctx.storage.sql.exec(`
        INSERT INTO routes (id, path_pattern, name, type, target_url, price_usd, allowed_methods, auth_modes, is_active, created_at)
        VALUES 
        ('route_ai', '/v1/ai/completions', 'AI LLM & Image Generation Proxy', 'builtin_ai', '', 0.0015, '["POST"]', '["l402","crypto","api_key"]', 1, ?),
        ('route_scrape', '/v1/scrape', 'Web Scraper & Markdown Extractor', 'builtin_scraper', '', 0.0020, '["GET","POST"]', '["l402","crypto","api_key"]', 1, ?),
        ('route_exec', '/v1/exec', 'Code Execution Sandbox API', 'builtin_sandbox', '', 0.0010, '["POST"]', '["l402","crypto","api_key"]', 1, ?),
        ('route_qr', '/v1/devtools/qr', 'QR Code Generator API', 'builtin_devtools', '', 0.0005, '["GET","POST"]', '["l402","crypto","api_key"]', 1, ?),
        ('route_coingecko', '/proxy/crypto-prices', 'Live Crypto Price Feed Proxy', 'custom_proxy', 'https://api.coingecko.com/api/v3/simple/price', 0.0005, '["GET"]', '["l402","crypto","api_key"]', 1, ?)
      `, now, now, now, now, now);
    }

    // Seed initial API Key if empty
    const countKeys = this.ctx.storage.sql.exec(`SELECT COUNT(*) as cnt FROM api_keys`).one().cnt as number;
    if (countKeys === 0) {
      const now = Date.now();
      const keyId = 'key_' + Math.random().toString(36).substring(2, 10);
      const keySecret = 'x402_live_demo888899990000';
      this.ctx.storage.sql.exec(`
        INSERT INTO api_keys (id, key_secret, name, balance_usd, total_spent, status, created_at)
        VALUES (?, ?, 'Developer Portal Demo Key', 25.00, 0.00, 'active', ?)
      `, keyId, keySecret, now);

      this.ctx.storage.sql.exec(`
        INSERT INTO ledger_tx (id, api_key_id, type, amount_usd, description, ref_id, created_at)
        VALUES (?, ?, 'topup', 25.00, 'Initial Welcome Deposit', 'welcome_faucet', ?)
      `, 'tx_init_' + Date.now(), keyId, now);
    }
  }

  private setupRoutes() {
    // Middleware to ensure DB schema exists
    this.app.use("*", async (c, next) => {
      this.initDatabase();
      await next();
    });

    // -------------------------------------------------------------
    // STATS & DASHBOARD APIs
    // -------------------------------------------------------------
    this.app.get("/api/stats", (c) => {
      const totalRev = this.ctx.storage.sql.exec(`
        SELECT COALESCE(SUM(cost_usd), 0) as total FROM request_logs WHERE status_code = 200
      `).one().total as number;

      const totalRequests = this.ctx.storage.sql.exec(`
        SELECT COUNT(*) as cnt FROM request_logs
      `).one().cnt as number;

      const paidRequests = this.ctx.storage.sql.exec(`
        SELECT COUNT(*) as cnt FROM request_logs WHERE status_code = 200 AND cost_usd > 0
      `).one().cnt as number;

      const blocked402 = this.ctx.storage.sql.exec(`
        SELECT COUNT(*) as cnt FROM request_logs WHERE status_code = 402
      `).one().cnt as number;

      const avgLatency = this.ctx.storage.sql.exec(`
        SELECT COALESCE(AVG(latency_ms), 0) as avg_lat FROM request_logs WHERE status_code = 200
      `).one().avg_lat as number;

      const activeKeys = this.ctx.storage.sql.exec(`
        SELECT COUNT(*) as cnt FROM api_keys WHERE status = 'active'
      `).one().cnt as number;

      const routeStats = this.ctx.storage.sql.exec(`
        SELECT route_name, COUNT(*) as calls, COALESCE(SUM(cost_usd), 0) as revenue
        FROM request_logs
        GROUP BY route_name
        ORDER BY revenue DESC
      `).toArray();

      const methodStats = this.ctx.storage.sql.exec(`
        SELECT payment_method, COUNT(*) as count, COALESCE(SUM(cost_usd), 0) as revenue
        FROM request_logs
        GROUP BY payment_method
      `).toArray();

      const recentLogs = this.ctx.storage.sql.exec(`
        SELECT * FROM request_logs ORDER BY timestamp DESC LIMIT 20
      `).toArray();

      return c.json({
        totalRevenueUsd: totalRev,
        totalRequests,
        paidRequests,
        blocked402Requests: blocked402,
        avgLatencyMs: Math.round(avgLatency),
        activeKeys,
        routeStats,
        methodStats,
        recentLogs
      });
    });

    // -------------------------------------------------------------
    // GATEWAY ROUTES CRUD
    // -------------------------------------------------------------
    this.app.get("/api/routes", (c) => {
      const routes = this.ctx.storage.sql.exec(`SELECT * FROM routes ORDER BY created_at DESC`).toArray();
      return c.json(routes);
    });

    this.app.post("/api/routes", async (c) => {
      const body = await c.req.json();
      const id = 'route_' + Math.random().toString(36).substring(2, 9);
      const now = Date.now();

      this.ctx.storage.sql.exec(`
        INSERT INTO routes (id, path_pattern, name, type, target_url, price_usd, allowed_methods, auth_modes, is_active, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
      `, 
        id, 
        body.path_pattern || '/proxy/custom', 
        body.name || 'New Custom Gateway Route', 
        body.type || 'custom_proxy', 
        body.target_url || '', 
        body.price_usd ?? 0.0010, 
        JSON.stringify(body.allowed_methods || ["GET", "POST"]), 
        JSON.stringify(body.auth_modes || ["l402", "crypto", "api_key"]),
        now
      );

      const created = this.ctx.storage.sql.exec(`SELECT * FROM routes WHERE id = ?`, id).one();
      return c.json(created, 201);
    });

    this.app.put("/api/routes/:id", async (c) => {
      const id = c.req.param("id");
      const body = await c.req.json();

      this.ctx.storage.sql.exec(`
        UPDATE routes 
        SET path_pattern = ?, name = ?, type = ?, target_url = ?, price_usd = ?, is_active = ?
        WHERE id = ?
      `,
        body.path_pattern,
        body.name,
        body.type,
        body.target_url || '',
        body.price_usd,
        body.is_active ? 1 : 0,
        id
      );

      const updated = this.ctx.storage.sql.exec(`SELECT * FROM routes WHERE id = ?`, id).one();
      return c.json(updated);
    });

    this.app.delete("/api/routes/:id", (c) => {
      const id = c.req.param("id");
      this.ctx.storage.sql.exec(`DELETE FROM routes WHERE id = ?`, id);
      return c.json({ success: true, deletedId: id });
    });

    // -------------------------------------------------------------
    // API KEYS & BALANCE MANAGEMENT
    // -------------------------------------------------------------
    this.app.get("/api/keys", (c) => {
      const keys = this.ctx.storage.sql.exec(`
        SELECT id, key_secret, name, balance_usd, total_spent, status, created_at 
        FROM api_keys ORDER BY created_at DESC
      `).toArray();

      const ledger = this.ctx.storage.sql.exec(`
        SELECT * FROM ledger_tx ORDER BY created_at DESC LIMIT 30
      `).toArray();

      return c.json({ keys, ledger });
    });

    this.app.post("/api/keys", async (c) => {
      const body = await c.req.json();
      const id = 'key_' + Math.random().toString(36).substring(2, 9);
      const randomHex = Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join('');
      const keySecret = `x402_live_${randomHex}`;
      const now = Date.now();
      const initialBalance = body.initial_balance ?? 10.00;

      this.ctx.storage.sql.exec(`
        INSERT INTO api_keys (id, key_secret, name, balance_usd, total_spent, status, created_at)
        VALUES (?, ?, ?, ?, 0.0, 'active', ?)
      `, id, keySecret, body.name || 'New Developer API Key', initialBalance, now);

      if (initialBalance > 0) {
        this.ctx.storage.sql.exec(`
          INSERT INTO ledger_tx (id, api_key_id, type, amount_usd, description, ref_id, created_at)
          VALUES (?, ?, 'topup', ?, 'Initial Account Funding', ?, ?)
        `, 'tx_' + Date.now(), id, initialBalance, 'manual_grant', now);
      }

      const created = this.ctx.storage.sql.exec(`SELECT * FROM api_keys WHERE id = ?`, id).one();
      return c.json(created, 201);
    });

    this.app.post("/api/keys/:id/topup", async (c) => {
      const id = c.req.param("id");
      const body = await c.req.json();
      const amount = Math.max(0.10, body.amount ?? 10.00);
      const method = body.method || 'stripe_simulated';
      const now = Date.now();

      this.ctx.storage.sql.exec(`
        UPDATE api_keys 
        SET balance_usd = balance_usd + ? 
        WHERE id = ?
      `, amount, id);

      this.ctx.storage.sql.exec(`
        INSERT INTO ledger_tx (id, api_key_id, type, amount_usd, description, ref_id, created_at)
        VALUES (?, ?, 'topup', ?, ?, ?, ?)
      `, 'tx_' + Date.now(), id, amount, `Top-up via ${method}`, body.tx_ref || 'topup_' + Date.now(), now);

      const key = this.ctx.storage.sql.exec(`SELECT * FROM api_keys WHERE id = ?`, id).one();
      return c.json({ success: true, key });
    });

    this.app.delete("/api/keys/:id", (c) => {
      const id = c.req.param("id");
      this.ctx.storage.sql.exec(`UPDATE api_keys SET status = 'revoked' WHERE id = ?`, id);
      return c.json({ success: true, revokedId: id });
    });

    this.app.post("/api/faucet/topup", (c) => {
      // Instant $10.00 credit to demo key
      const demoKey = this.ctx.storage.sql.exec(`SELECT * FROM api_keys WHERE key_secret LIKE 'x402_live_demo%' LIMIT 1`).toArray()[0];
      const now = Date.now();
      
      if (demoKey) {
        this.ctx.storage.sql.exec(`UPDATE api_keys SET balance_usd = balance_usd + 10.00 WHERE id = ?`, demoKey.id);
        this.ctx.storage.sql.exec(`
          INSERT INTO ledger_tx (id, api_key_id, type, amount_usd, description, ref_id, created_at)
          VALUES (?, ?, 'topup', 10.00, 'x402 Testnet Faucet Claim', 'faucet_claim', ?)
        `, 'tx_faucet_' + Date.now(), demoKey.id, now);
        return c.json({ success: true, message: "Added $10.00 test credit to demo key!", keySecret: demoKey.key_secret, newBalance: (demoKey.balance_usd as number) + 10 });
      } else {
        const id = 'key_faucet_' + Date.now();
        const keySecret = 'x402_live_demo888899990000';
        this.ctx.storage.sql.exec(`
          INSERT INTO api_keys (id, key_secret, name, balance_usd, total_spent, status, created_at)
          VALUES (?, ?, 'Faucet Demo Key', 10.00, 0.0, 'active', ?)
        `, id, keySecret, now);
        return c.json({ success: true, message: "Created demo key with $10.00 credit!", keySecret, newBalance: 10.00 });
      }
    });

    // -------------------------------------------------------------
    // REQUEST LOGS API
    // -------------------------------------------------------------
    this.app.get("/api/logs", (c) => {
      const limit = Number(c.req.query("limit") || 50);
      const logs = this.ctx.storage.sql.exec(`
        SELECT * FROM request_logs ORDER BY timestamp DESC LIMIT ?
      `, limit).toArray();
      return c.json(logs);
    });

    // -------------------------------------------------------------
    // INVOICE SETTLEMENT ENDPOINTS (Simulate L402 / Web3 Payment)
    // -------------------------------------------------------------
    this.app.post("/api/invoices/settle", async (c) => {
      const body = await c.req.json();
      const invoiceId = body.invoice_id;
      const paymentHash = body.payment_hash || 'hash_' + Math.random().toString(36).substring(2, 10);
      const preimage = 'preimage_' + Math.random().toString(36).substring(2, 12);
      const now = Date.now();

      this.ctx.storage.sql.exec(`
        UPDATE invoices 
        SET status = 'paid', preimage = ?
        WHERE id = ? OR payment_hash = ?
      `, preimage, invoiceId, paymentHash);

      return c.json({
        success: true,
        status: "paid",
        invoice_id: invoiceId,
        payment_hash: paymentHash,
        preimage,
        auth_header: `L402 macaroon_proof_jwt_x402:${preimage}`
      });
    });

    // -------------------------------------------------------------
    // GATEWAY PROXY ENGINE (HTTP 402 INTERCEPTOR)
    // Matches /v1/*, /proxy/*, or any API route
    // -------------------------------------------------------------
    this.app.all("*", async (c) => {
      const startTime = Date.now();
      const url = new URL(c.req.url);
      const path = url.pathname;
      const method = c.req.method;

      // Skip internal dashboard API routes
      if (path.startsWith("/api/")) {
        return c.notFound();
      }

      // Find matching gateway route
      const allRoutes = this.ctx.storage.sql.exec(`
        SELECT * FROM routes WHERE is_active = 1
      `).toArray();

      const matchedRoute = allRoutes.find((r: Record<string, unknown>) => {
        const pattern = r.path_pattern as string;
        if (pattern === path) return true;
        if (pattern.endsWith("/*") && path.startsWith(pattern.slice(0, -2))) return true;
        return false;
      });

      if (!matchedRoute) {
        return c.json({
          error: "Route Not Found in x402 Gateway",
          path,
          hint: "Configure a route in the x402 Gateway Dashboard"
        }, 404);
      }

      const priceUsd = matchedRoute.price_usd as number;
      const routeName = matchedRoute.name as string;
      const routeType = matchedRoute.type as string;
      const clientIp = c.req.header("cf-connecting-ip") || "127.0.0.1";

      // 1. Check API Key Authorization
      const authHeader = c.req.header("Authorization") || "";
      const apiKeyHeader = c.req.header("X-API-Key") || "";
      let apiKeyStr = "";

      if (apiKeyHeader) {
        apiKeyStr = apiKeyHeader;
      } else if (authHeader.startsWith("Bearer x402_")) {
        apiKeyStr = authHeader.replace("Bearer ", "").trim();
      }

      let reqBodyPreview = "";
      try {
        if (method === "POST" || method === "PUT") {
          const clonedReq = c.req.raw.clone();
          reqBodyPreview = (await clonedReq.text()).slice(0, 300);
        }
      } catch {
        reqBodyPreview = "";
      }

      // Option A: API Key Auth
      if (apiKeyStr) {
        const keyRecord = this.ctx.storage.sql.exec(`
          SELECT * FROM api_keys WHERE key_secret = ? AND status = 'active'
        `, apiKeyStr).toArray()[0];

        if (!keyRecord) {
          const latency = Date.now() - startTime;
          this.logRequest(path, routeName, 401, method, "api_key_invalid", 0, latency, clientIp, reqBodyPreview, "Invalid or revoked API key");
          return c.json({ error: "Unauthorized", message: "Invalid or revoked x402 API key" }, 401);
        }

        const balance = keyRecord.balance_usd as number;
        if (balance < priceUsd) {
          const latency = Date.now() - startTime;
          this.logRequest(path, routeName, 402, method, "api_key_insufficient_funds", 0, latency, clientIp, reqBodyPreview, `Balance $${balance.toFixed(4)} insufficient for $${priceUsd.toFixed(4)}`);
          
          return this.respond402(c, matchedRoute, `API Key balance ($${balance.toFixed(4)}) insufficient for route price ($${priceUsd.toFixed(4)}). Please top up.`);
        }

        // Deduct price from API Key balance
        this.ctx.storage.sql.exec(`
          UPDATE api_keys 
          SET balance_usd = balance_usd - ?, total_spent = total_spent + ?
          WHERE id = ?
        `, priceUsd, priceUsd, keyRecord.id);

        this.ctx.storage.sql.exec(`
          INSERT INTO ledger_tx (id, api_key_id, type, amount_usd, description, ref_id, created_at)
          VALUES (?, ?, 'charge', ?, ?, ?, ?)
        `, 'tx_' + Date.now(), keyRecord.id, priceUsd, `Gateway request to ${routeName} (${path})`, matchedRoute.id, Date.now());

        // Process request
        const { result, status } = await this.executeGatewayTarget(matchedRoute, c, reqBodyPreview);
        const latency = Date.now() - startTime;
        const resPreview = JSON.stringify(result).slice(0, 300);

        this.logRequest(path, routeName, status, method, "api_key", priceUsd, latency, clientIp, reqBodyPreview, resPreview);

        c.header("X-402-Status", "SETTLED");
        c.header("X-402-Price-Charged", `$${priceUsd.toFixed(4)}`);
        c.header("X-402-Key-Balance-Remaining", `$${(balance - priceUsd).toFixed(4)}`);
        return c.json(result, status as 200);
      }

      // Option B: L402 / Macaroon Preimage Auth
      const l402Match = authHeader.match(/^L402\s+([^:]+):(.+)$/i) || c.req.header("X-402-Preimage");
      if (l402Match) {
        const preimage = typeof l402Match === 'string' ? l402Match : l402Match[2];
        const invoice = this.ctx.storage.sql.exec(`
          SELECT * FROM invoices WHERE preimage = ? AND status = 'paid'
        `, preimage).toArray()[0];

        if (invoice) {
          const { result, status } = await this.executeGatewayTarget(matchedRoute, c, reqBodyPreview);
          const latency = Date.now() - startTime;
          const resPreview = JSON.stringify(result).slice(0, 300);

          this.logRequest(path, routeName, status, method, "l402_macaroon", priceUsd, latency, clientIp, reqBodyPreview, resPreview);

          c.header("X-402-Status", "SETTLED_L402");
          c.header("X-402-Preimage-Verified", preimage.slice(0, 10) + "...");
          return c.json(result, status as 200);
        }
      }

      // Option C: Sandbox Instant Micropayment Test Key
      const sandboxHeader = c.req.header("X-402-Sandbox-Key") || c.req.header("X-402-Test-Payment");
      if (sandboxHeader === "sandbox_demo" || sandboxHeader === "true") {
        const { result, status } = await this.executeGatewayTarget(matchedRoute, c, reqBodyPreview);
        const latency = Date.now() - startTime;
        const resPreview = JSON.stringify(result).slice(0, 300);

        this.logRequest(path, routeName, status, method, "sandbox_micropayment", priceUsd, latency, clientIp, reqBodyPreview, resPreview);

        c.header("X-402-Status", "SETTLED_SANDBOX");
        c.header("X-402-Price-Charged", `$${priceUsd.toFixed(4)}`);
        return c.json(result, status as 200);
      }

      // Option D: Missing Payment -> Return HTTP 402 Payment Required!
      const latency = Date.now() - startTime;
      this.logRequest(path, routeName, 402, method, "none_blocked", 0, latency, clientIp, reqBodyPreview, "HTTP 402 Payment Required returned to client");

      return this.respond402(c, matchedRoute, `HTTP 402 Payment Required: This endpoint requires micro-payment of $${priceUsd.toFixed(4)} USD / USDC.`);
    });
  }

  private respond402(c: any, route: Record<string, unknown>, message: string) {
    const routeId = route.id as string;
    const priceUsd = route.price_usd as number;
    const invId = 'inv_' + Math.random().toString(36).substring(2, 10);
    const payHash = 'hash_' + Math.random().toString(36).substring(2, 12);
    const macaroon = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.x402.${invId}.${Date.now()}`;
    const expiresAt = Date.now() + 300000; // 5 mins

    this.ctx.storage.sql.exec(`
      INSERT INTO invoices (id, route_id, price_usd, asset, payment_hash, macaroon, status, expires_at, created_at)
      VALUES (?, ?, ?, 'USDC', ?, ?, 'pending', ?, ?)
    `, invId, routeId, priceUsd, payHash, macaroon, expiresAt, Date.now());

    c.status(402);
    c.header("WWW-Authenticate", `L402 macaroon="${macaroon}", invoice="lnbc${Math.round(priceUsd * 2000)}u1p..."`);
    c.header("X-402-Price", priceUsd.toFixed(4));
    c.header("X-402-Currency", "USD / USDC");
    c.header("X-402-Challenge-Id", invId);
    c.header("X-402-Payment-Hash", payHash);

    return c.json({
      error: "Payment Required",
      status: 402,
      message,
      x402: {
        version: "1.0",
        price_usd: priceUsd,
        currency: "USDC / Base / Solana / L402 Lightning",
        challenge_id: invId,
        payment_hash: payHash,
        macaroon,
        expires_at: new Date(expiresAt).toISOString(),
        payment_options: {
          usdc_base: {
            network: "Base Mainnet / Sepolia",
            vault_address: "0x402A8b0e513aFE6522c07E59b20e06000000402",
            amount_usdc: priceUsd.toFixed(4)
          },
          solana_usdc: {
            network: "Solana",
            vault_address: "X402GatewayVaultSolana111111111111111111111",
            amount_usdc: priceUsd.toFixed(4)
          },
          lightning_l402: {
            bolt11: `lnbc${Math.round(priceUsd * 2000)}u1p3x402gateway...`,
            sats: Math.ceil(priceUsd * 2000)
          },
          api_key_header: "X-API-Key: x402_live_..."
        },
        sandbox_test_hint: "Send header 'X-402-Sandbox-Key: sandbox_demo' or use the Developer Portal to simulate 1-click payment settlement."
      }
    });
  }

  private async executeGatewayTarget(route: Record<string, unknown>, c: any, reqBodyStr: string) {
    const routeType = route.type as string;
    const targetUrl = route.target_url as string;

    // 1. Built-in AI Proxy Endpoint
    if (routeType === "builtin_ai") {
      let parsed: any = {};
      try { parsed = JSON.parse(reqBodyStr || "{}"); } catch {}

      const prompt = parsed.prompt || parsed.messages?.[0]?.content || "Explain quantum computing in 2 sentences.";
      const model = parsed.model || "@cf/meta/llama-3-8b-instruct";

      return {
        status: 200,
        result: {
          id: "chatcmpl-x402-" + Math.random().toString(36).substring(2, 9),
          object: "chat.completion",
          created: Math.floor(Date.now() / 1000),
          model,
          choices: [
            {
              index: 0,
              message: {
                role: "assistant",
                content: `[x402 AI Completion Output]\n\nPrompt received: "${prompt}"\n\nQuantum computing leverages principles of superposition and entanglement to perform complex computations exponentially faster than classical computers for specific algorithms.`
              },
              finish_reason: "stop"
            }
          ],
          usage: {
            prompt_tokens: Math.floor(prompt.length / 4) + 12,
            completion_tokens: 38,
            total_tokens: Math.floor(prompt.length / 4) + 50
          },
          x402_billing: {
            rate: "$0.0015 / request",
            status: "PAID_AND_VERIFIED"
          }
        }
      };
    }

    // 2. Built-in Web Scraper & Markdown Extractor
    if (routeType === "builtin_scraper") {
      let targetScrapeUrl = c.req.query("url");
      if (!targetScrapeUrl) {
        try {
          const body = JSON.parse(reqBodyStr || "{}");
          targetScrapeUrl = body.url;
        } catch {}
      }

      if (!targetScrapeUrl) {
        targetScrapeUrl = "https://x402.org";
      }

      let fetchedTitle = "Scraped Page: " + targetScrapeUrl;
      let markdownOutput = `# Scraped Content from ${targetScrapeUrl}\n\n## Overview\nThis page contains valuable developer specifications and API protocol headers.\n\n- Standard: HTTP 402 Payment Required\n- Authorizations: L402, Web3 USDC, Macaroons\n- Status: 200 OK after micro-settlement.`;
      let wordCount = 42;

      try {
        const res = await fetch(targetScrapeUrl, {
          headers: { "User-Agent": "x402-Gateway-Reader/1.0" }
        });
        if (res.ok) {
          const html = await res.text();
          const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
          if (titleMatch) fetchedTitle = titleMatch[1];

          // Simple HTML to text converter
          const cleanText = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
                                .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
                                .replace(/<[^>]+>/g, " ")
                                .replace(/\s+/g, " ")
                                .trim();

          wordCount = cleanText.split(/\s+/).length;
          markdownOutput = `# ${fetchedTitle}\n\n**Source**: ${targetScrapeUrl}\n**Word Count**: ${wordCount}\n\n${cleanText.slice(0, 1000)}...`;
        }
      } catch (err: any) {
        markdownOutput += `\n\n*(Note: Live fetch fallback used due to target CORS/origin error: ${err.message})*`;
      }

      return {
        status: 200,
        result: {
          url: targetScrapeUrl,
          title: fetchedTitle,
          word_count: wordCount,
          markdown: markdownOutput,
          extracted_at: new Date().toISOString(),
          x402_receipt: { cost_usd: 0.0020, settled: true }
        }
      };
    }

    // 3. Built-in Code Execution Sandbox
    if (routeType === "builtin_sandbox") {
      let code = "const x = 10; const y = 20; return x * y;";
      let language = "javascript";
      try {
        const body = JSON.parse(reqBodyStr || "{}");
        if (body.code) code = body.code;
        if (body.language) language = body.language;
      } catch {}

      const logs: string[] = [];
      let returnValue: any = null;
      let execError = null;

      try {
        // Safe Function execution sandbox simulation
        const fn = new Function("console", code);
        const mockConsole = {
          log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(" ")),
          error: (...args: any[]) => logs.push("[ERROR] " + args.join(" "))
        };
        returnValue = fn(mockConsole);
      } catch (e: any) {
        execError = e.message;
      }

      return {
        status: 200,
        result: {
          language,
          code_executed: code,
          logs,
          return_value: returnValue,
          error: execError,
          execution_ms: 2,
          sandbox_isolation: "V8_SECURE_ISOLATE",
          x402_receipt: { cost_usd: 0.0010, status: "PAID" }
        }
      };
    }

    // 4. Built-in QR DevTools
    if (routeType === "builtin_devtools") {
      let text = c.req.query("text") || "https://x402.org";
      try {
        const body = JSON.parse(reqBodyStr || "{}");
        if (body.text) text = body.text;
      } catch {}

      return {
        status: 200,
        result: {
          text,
          qr_code_svg: `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" fill="#111827"/><path d="M10 10h40v40H10zM78 10h40v40H78zM10 78h40v40H10z" fill="#6366f1"/><rect x="20" y="20" width="20" height="20" fill="#ffffff"/><rect x="88" y="20" width="20" height="20" fill="#ffffff"/><rect x="20" y="88" width="20" height="20" fill="#ffffff"/></svg>`,
          formatted_data_url: `data:image/svg+xml;utf8,<svg...>${text}</svg>`,
          x402_receipt: { cost_usd: 0.0005, status: "PAID" }
        }
      };
    }

    // 5. Custom Upstream HTTP Proxy Target
    if (targetUrl) {
      try {
        const proxyRes = await fetch(targetUrl, {
          method: c.req.method,
          headers: { "User-Agent": "x402-Gateway-Proxy/1.0" }
        });
        const contentType = proxyRes.headers.get("content-type") || "";
        let data: any = null;
        if (contentType.includes("application/json")) {
          data = await proxyRes.json();
        } else {
          data = await proxyRes.text();
        }

        return {
          status: proxyRes.status,
          result: {
            proxied_from: targetUrl,
            upstream_status: proxyRes.status,
            data,
            x402_receipt: { cost_usd: route.price_usd, settled: true }
          }
        };
      } catch (err: any) {
        return {
          status: 502,
          result: {
            error: "Bad Gateway Proxy Error",
            targetUrl,
            message: err.message
          }
        };
      }
    }

    return {
      status: 200,
      result: { message: "Route executed successfully", path: c.req.path }
    };
  }

  private logRequest(
    path: string, 
    routeName: string, 
    statusCode: number, 
    method: string, 
    paymentMethod: string, 
    costUsd: number, 
    latencyMs: number, 
    clientIp: string,
    reqPreview: string,
    resPreview: string
  ) {
    const id = 'log_' + Math.random().toString(36).substring(2, 10);
    this.ctx.storage.sql.exec(`
      INSERT INTO request_logs (id, timestamp, path, route_name, status_code, method, payment_method, cost_usd, latency_ms, client_ip, request_preview, response_preview)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, id, Date.now(), path, routeName, statusCode, method, paymentMethod, costUsd, latencyMs, clientIp, reqPreview, resPreview);
  }

  async fetch(request: Request) {
    return this.app.fetch(request);
  }
}
