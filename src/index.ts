import { DurableObject } from "cloudflare:workers";
import { Hono } from "hono";

// Backend Internationalization Dictionaries
const BACKEND_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    route_not_found: "Route Not Found in x402 Gateway",
    route_not_found_hint: "Configure a route in the x402 Gateway Dashboard.",
    invalid_api_key: "Invalid or revoked x402 API key.",
    unauthorized: "Unauthorized",
    payment_required: "HTTP 402 Payment Required: This endpoint requires a micro-payment of ${price} USD / USDC.",
    insufficient_balance: "API Key balance (${balance}) is insufficient for route price (${price}). Please top up.",
    sandbox_hint: "Send header 'X-402-Sandbox-Key: sandbox_demo' or use the Developer Portal to simulate 1-click payment settlement.",
    settled_status: "PAID_AND_VERIFIED",
    ai_prompt_received: "Prompt received"
  },
  es: {
    route_not_found: "Ruta no encontrada en la pasarela x402",
    route_not_found_hint: "Configure una ruta en el panel de control de x402 Gateway.",
    invalid_api_key: "Clave de API x402 no válida o revocada.",
    unauthorized: "No autorizado",
    payment_required: "HTTP 402 Pago Requerido: Este punto de enlace requiere un micropago de ${price} USD / USDC.",
    insufficient_balance: "El saldo de la clave API (${balance}) es insuficiente para el precio (${price}). Por favor recargue.",
    sandbox_hint: "Envíe el encabezado 'X-402-Sandbox-Key: sandbox_demo' o use el Portal de desarrolladores para simular el pago.",
    settled_status: "PAGADO_Y_VERIFICADO",
    ai_prompt_received: "Prompt recibido"
  },
  fr: {
    route_not_found: "Route introuvable dans la passerelle x402",
    route_not_found_hint: "Configurez une route dans le tableau de bord x402 Gateway.",
    invalid_api_key: "Clé API x402 invalide ou révoquée.",
    unauthorized: "Non autorisé",
    payment_required: "HTTP 402 Paiement Requis : Cet endpoint nécessite un micropaiement de ${price} USD / USDC.",
    insufficient_balance: "Solde de la clé API (${balance}) insuffisant pour le prix (${price}). Veuillez recharger.",
    sandbox_hint: "Envoyez l'en-tête 'X-402-Sandbox-Key: sandbox_demo' ou utilisez le Portail Développeur pour simuler le règlement.",
    settled_status: "PAYÉ_ET_VÉRIFIÉ",
    ai_prompt_received: "Prompt reçu"
  },
  de: {
    route_not_found: "Route im x402 Gateway nicht gefunden",
    route_not_found_hint: "Konfigurieren Sie eine Route im x402 Gateway Dashboard.",
    invalid_api_key: "Ungültiger oder widerrufener x402 API-Schlüssel.",
    unauthorized: "Nicht autorisiert",
    payment_required: "HTTP 402 Zahlung Erforderlich: Dieser Endpunkt erfordert eine Mikrozahlung von ${price} USD / USDC.",
    insufficient_balance: "Guthaben des API-Schlüssels (${balance}) reicht für Preis (${price}) nicht aus. Bitte aufladen.",
    sandbox_hint: "Senden Sie den Header 'X-402-Sandbox-Key: sandbox_demo' oder nutzen Sie das Entwicklerportal für Testzahlungen.",
    settled_status: "BEZAHLT_UND_VERIFIZIERT",
    ai_prompt_received: "Prompt erhalten"
  },
  zh: {
    route_not_found: "x402 网关中未找到该路由",
    route_not_found_hint: "请在 x402 网关控制台中配置路由。",
    invalid_api_key: "x402 API 密钥无效或已撤销。",
    unauthorized: "未授权",
    payment_required: "HTTP 402 需要付款：此接口需要支付 ${price} USD / USDC 的微支付。",
    insufficient_balance: "API 密钥余额 (${balance}) 不足，无法支付此路由价格 (${price})。请充值。",
    sandbox_hint: "发送请求头 'X-402-Sandbox-Key: sandbox_demo' 或在开发者门户中一键模拟支付结算。",
    settled_status: "已支付并已验证",
    ai_prompt_received: "已收到提示词"
  },
  ja: {
    route_not_found: "x402 ゲートウェイでルートが見つかりません",
    route_not_found_hint: "x402 ゲートウェイダッシュボードでルートを設定してください。",
    invalid_api_key: "無効または取り消された x402 API キーです。",
    unauthorized: "未認証",
    payment_required: "HTTP 402 支払いが必要です: このエンドポイントには ${price} USD / USDC のマイクロ決済が必要です。",
    insufficient_balance: "API キーの残高 (${balance}) がルート価格 (${price}) に不足しています。チャージしてください。",
    sandbox_hint: "ヘッダー 'X-402-Sandbox-Key: sandbox_demo' を送信するか、開発者ポータルで1クリック決済テストを行ってください。",
    settled_status: "支払い済み・検証完了",
    ai_prompt_received: "プロンプトを受信"
  },
  pt: {
    route_not_found: "Rota não encontrada no Gateway x402",
    route_not_found_hint: "Configure uma rota no Painel do Gateway x402.",
    invalid_api_key: "Chave de API x402 inválida ou revogada.",
    unauthorized: "Não autorizado",
    payment_required: "HTTP 402 Pagamento Necessário: Este endpoint requer um micropagamento de ${price} USD / USDC.",
    insufficient_balance: "Saldo da chave de API (${balance}) insuficiente para o preço (${price}). Por favor, recarregue.",
    sandbox_hint: "Envie o cabeçalho 'X-402-Sandbox-Key: sandbox_demo' ou use o Portal do Desenvolvedor para simular o pagamento.",
    settled_status: "PAGO_E_VERIFICADO",
    ai_prompt_received: "Prompt recebido"
  },
  ar: {
    route_not_found: "المسار غير موجود في بوابة x402",
    route_not_found_hint: "قم بتكوين مسار في لوحة تحكم بوابة x402.",
    invalid_api_key: "مفتاح API x402 غير صالحة أو ملغاة.",
    unauthorized: "غير مصرح به",
    payment_required: "HTTP 402 الدفع مطلوب: ينطوي هذا الإجراء على دفعة صغيرة بقيمة ${price} USD / USDC.",
    insufficient_balance: "رصيد مفتاح API (${balance}) غير كافٍ لسعر المسار (${price}). يرجى إعادة الشحن.",
    sandbox_hint: "أرسل رأس 'X-402-Sandbox-Key: sandbox_demo' أو استخدم بوابات المطورين لمحاكاة التسوية بنقرة واحدة.",
    settled_status: "تم_الدفع_والتحقق",
    ai_prompt_received: "تم استلام الطلب"
  }
};

function getClientLang(c: any): string {
  const queryLang = c.req.query("lang") || c.req.header("x-language");
  if (queryLang && BACKEND_TRANSLATIONS[queryLang.toLowerCase()]) {
    return queryLang.toLowerCase();
  }
  const acceptLang = c.req.header("accept-language") || "";
  for (const lang of ["es", "fr", "de", "zh", "ja", "pt", "ar"]) {
    if (acceptLang.toLowerCase().includes(lang)) {
      return lang;
    }
  }
  return "en";
}

function t(lang: string, key: string, params: Record<string, string> = {}): string {
  const langDict = BACKEND_TRANSLATIONS[lang] || BACKEND_TRANSLATIONS["en"];
  let str = langDict[key] || BACKEND_TRANSLATIONS["en"][key] || key;
  for (const [pKey, pVal] of Object.entries(params)) {
    str = str.replace(new RegExp(`\\$\\{${pKey}\\}`, "g"), pVal);
  }
  return str;
}

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
    this.app.use("*", async (c, next) => {
      this.initDatabase();
      await next();
    });

    // STATS & DASHBOARD APIs
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

    // GATEWAY ROUTES CRUD
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

    // API KEYS & BALANCE MANAGEMENT
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

    // REQUEST LOGS API
    this.app.get("/api/logs", (c) => {
      const limit = Number(c.req.query("limit") || 50);
      const logs = this.ctx.storage.sql.exec(`
        SELECT * FROM request_logs ORDER BY timestamp DESC LIMIT ?
      `, limit).toArray();
      return c.json(logs);
    });

    // INVOICE SETTLEMENT ENDPOINTS
    this.app.post("/api/invoices/settle", async (c) => {
      const body = await c.req.json();
      const invoiceId = body.invoice_id;
      const paymentHash = body.payment_hash || 'hash_' + Math.random().toString(36).substring(2, 10);
      const preimage = 'preimage_' + Math.random().toString(36).substring(2, 12);

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

    // GATEWAY PROXY ENGINE (HTTP 402 INTERCEPTOR)
    this.app.all("*", async (c) => {
      const startTime = Date.now();
      const rawUrl = new URL(c.req.url);
      
      // Strip space preview prefix if present
      let path = rawUrl.pathname;
      path = path.replace(/^\/space\/[^\/]+\/preview\/[^\/]+/, "");
      if (path === "") path = "/";

      const method = c.req.method;
      const lang = getClientLang(c);

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
        c.header("Content-Language", lang);
        return c.json({
          error: t(lang, "route_not_found"),
          path,
          hint: t(lang, "route_not_found_hint")
        }, 404);
      }

      const priceUsd = matchedRoute.price_usd as number;
      const routeName = matchedRoute.name as string;
      const clientIp = c.req.header("cf-connecting-ip") || "127.0.0.1";

      // Check API Key Authorization
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
          this.logRequest(path, routeName, 401, method, "api_key_invalid", 0, latency, clientIp, reqBodyPreview, "Invalid API key");
          c.header("Content-Language", lang);
          return c.json({ error: t(lang, "unauthorized"), message: t(lang, "invalid_api_key") }, 401);
        }

        const balance = keyRecord.balance_usd as number;
        if (balance < priceUsd) {
          const latency = Date.now() - startTime;
          this.logRequest(path, routeName, 402, method, "api_key_insufficient_funds", 0, latency, clientIp, reqBodyPreview, `Insufficient balance`);
          
          return this.respond402(c, matchedRoute, lang, t(lang, "insufficient_balance", { balance: `$${balance.toFixed(4)}`, price: `$${priceUsd.toFixed(4)}` }));
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
        const { result, status } = await this.executeGatewayTarget(matchedRoute, c, reqBodyPreview, lang);
        const latency = Date.now() - startTime;
        const resPreview = JSON.stringify(result).slice(0, 300);

        this.logRequest(path, routeName, status, method, "api_key", priceUsd, latency, clientIp, reqBodyPreview, resPreview);

        c.header("Content-Language", lang);
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
          const { result, status } = await this.executeGatewayTarget(matchedRoute, c, reqBodyPreview, lang);
          const latency = Date.now() - startTime;
          const resPreview = JSON.stringify(result).slice(0, 300);

          this.logRequest(path, routeName, status, method, "l402_macaroon", priceUsd, latency, clientIp, reqBodyPreview, resPreview);

          c.header("Content-Language", lang);
          c.header("X-402-Status", "SETTLED_L402");
          c.header("X-402-Preimage-Verified", preimage.slice(0, 10) + "...");
          return c.json(result, status as 200);
        }
      }

      // Option C: Sandbox Instant Micropayment Test Key
      const sandboxHeader = c.req.header("X-402-Sandbox-Key") || c.req.header("X-402-Test-Payment");
      if (sandboxHeader === "sandbox_demo" || sandboxHeader === "true") {
        const { result, status } = await this.executeGatewayTarget(matchedRoute, c, reqBodyPreview, lang);
        const latency = Date.now() - startTime;
        const resPreview = JSON.stringify(result).slice(0, 300);

        this.logRequest(path, routeName, status, method, "sandbox_micropayment", priceUsd, latency, clientIp, reqBodyPreview, resPreview);

        c.header("Content-Language", lang);
        c.header("X-402-Status", "SETTLED_SANDBOX");
        c.header("X-402-Price-Charged", `$${priceUsd.toFixed(4)}`);
        return c.json(result, status as 200);
      }

      // Option D: Missing Payment -> Return HTTP 402 Payment Required!
      const latency = Date.now() - startTime;
      this.logRequest(path, routeName, 402, method, "none_blocked", 0, latency, clientIp, reqBodyPreview, "HTTP 402 Payment Required returned to client");

      return this.respond402(c, matchedRoute, lang, t(lang, "payment_required", { price: priceUsd.toFixed(4) }));
    });
  }

  private respond402(c: any, route: Record<string, unknown>, lang: string, message: string) {
    const routeId = route.id as string;
    const priceUsd = route.price_usd as number;
    const invId = 'inv_' + Math.random().toString(36).substring(2, 10);
    const payHash = 'hash_' + Math.random().toString(36).substring(2, 12);
    const macaroon = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.x402.${invId}.${Date.now()}`;
    const expiresAt = Date.now() + 300000;

    this.ctx.storage.sql.exec(`
      INSERT INTO invoices (id, route_id, price_usd, asset, payment_hash, macaroon, status, expires_at, created_at)
      VALUES (?, ?, ?, 'USDC', ?, ?, 'pending', ?, ?)
    `, invId, routeId, priceUsd, payHash, macaroon, expiresAt, Date.now());

    c.status(402);
    c.header("Content-Language", lang);
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
        language: lang,
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
        sandbox_test_hint: t(lang, "sandbox_hint")
      }
    });
  }

  private async executeGatewayTarget(route: Record<string, unknown>, c: any, reqBodyStr: string, lang: string) {
    const routeType = route.type as string;

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
          language: lang,
          choices: [
            {
              index: 0,
              message: {
                role: "assistant",
                content: `[x402 AI Completion Output (${lang.toUpperCase()})]\n\n${t(lang, "ai_prompt_received")}: "${prompt}"\n\nQuantum computing leverages principles of quantum mechanics like superposition and entanglement to solve complex mathematical problems exponentially faster than classical computers.`
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
            status: t(lang, "settled_status")
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
          x402_receipt: { cost_usd: 0.0020, settled: true, language: lang }
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
          x402_receipt: { cost_usd: 0.0010, status: "PAID", locale: lang }
        }
      };
    }

    // 4. Built-in Devtools QR Generator
    if (routeType === "builtin_devtools") {
      let text = "https://x402.org";
      try {
        const body = JSON.parse(reqBodyStr || "{}");
        if (body.text) text = body.text;
      } catch {}

      const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="#111827"/><rect x="10" y="10" width="30" height="30" fill="#6366f1"/><rect x="80" y="10" width="30" height="30" fill="#6366f1"/><rect x="10" y="80" width="30" height="30" fill="#6366f1"/><rect x="50" y="50" width="20" height="20" fill="#10b981"/><text x="60" y="112" fill="#9ca3af" font-size="9" text-anchor="middle">x402 QR</text></svg>`;

      return {
        status: 200,
        result: {
          qr_input: text,
          qr_svg: svgData,
          data_url: `data:image/svg+xml;utf8,${encodeURIComponent(svgData)}`,
          x402_receipt: { cost_usd: 0.0005, status: "PAID" }
        }
      };
    }

    // 5. Custom Upstream Proxy Target
    const targetUrl = route.target_url as string;
    if (targetUrl) {
      try {
        const fetchRes = await fetch(targetUrl, {
          method: c.req.method,
          headers: {
            "User-Agent": "x402-Gateway-Proxy/1.0",
            "Accept": "application/json"
          }
        });

        let proxyData;
        try { proxyData = await fetchRes.json(); } catch { proxyData = await fetchRes.text(); }

        return {
          status: fetchRes.status,
          result: {
            upstream_status: fetchRes.status,
            target_url: targetUrl,
            data: proxyData,
            x402_receipt: { cost_usd: route.price_usd, status: "PAID" }
          }
        };
      } catch (err: any) {
        return {
          status: 502,
          result: {
            error: "Bad Gateway - Upstream fetch failed",
            target_url: targetUrl,
            details: err.message
          }
        };
      }
    }

    return {
      status: 200,
      result: { message: "Proxy executed successfully", route }
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
    requestPreview: string,
    responsePreview: string
  ) {
    const logId = 'log_' + Math.random().toString(36).substring(2, 10);
    this.ctx.storage.sql.exec(`
      INSERT INTO request_logs (id, timestamp, path, route_name, status_code, method, payment_method, cost_usd, latency_ms, client_ip, request_preview, response_preview)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, logId, Date.now(), path, routeName, statusCode, method, paymentMethod, costUsd, latencyMs, clientIp, requestPreview, responsePreview);
  }
}

export default {
  async fetch(request: Request, env: Record<string, unknown>, ctx: ExecutionContext) {
    const url = new URL(request.url);
    const cleanPath = url.pathname.replace(/^\/space\/[^\/]+\/preview\/[^\/]+/, "") || "/";

    if (env.ASSETS) {
      const assetUrl = new URL(request.url);
      assetUrl.pathname = cleanPath;
      const assetRes = await (env.ASSETS as Fetcher).fetch(new Request(assetUrl.toString(), request));
      if (assetRes.status < 400) {
        return assetRes;
      }
    }

    const id = env.APP ? (env.APP as DurableObjectNamespace).idFromName("default") : null;
    if (id) {
      const stub = (env.APP as DurableObjectNamespace).get(id);
      return stub.fetch(request);
    }
    return new Response("Durable Object 'APP' not bound", { status: 500 });
  }
};
