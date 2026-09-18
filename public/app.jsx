import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ShieldCheck,
  Zap,
  Key,
  BarChart3,
  Terminal,
  Settings,
  Globe,
  Coins,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
  Code2,
  Cpu,
  FileText,
  QrCode,
  DollarSign,
  Layers,
  Lock,
  Unlock,
  Clock,
  ArrowRight,
  Search,
  Filter,
  Sparkles,
  Wallet,
  Check,
  HelpCircle,
  Eye,
  Server
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('playground');
  const [stats, setStats] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [keysData, setKeysData] = useState({ keys: [], ledger: [] });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Playground state
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [authMode, setAuthMode] = useState('none'); // 'none', 'api_key', 'sandbox', 'l402'
  const [customApiKey, setCustomApiKey] = useState('x402_live_demo888899990000');
  const [customL402Preimage, setCustomL402Preimage] = useState('');
  const [reqBody, setReqBody] = useState('');
  const [reqUrlQuery, setReqUrlQuery] = useState('');
  const [playgroundRes, setPlaygroundRes] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [handshakeStep, setHandshakeStep] = useState(0);

  // Modals
  const [showPayModal, setShowPayModal] = useState(false);
  const [pendingInvoice, setPendingInvoice] = useState(null);
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);
  const [showAddKeyModal, setShowAddKeyModal] = useState(false);
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [selectedKeyForTopup, setSelectedKeyForTopup] = useState(null);
  const [inspectLog, setInspectLog] = useState(null);

  // New Route Form
  const [newRouteForm, setNewRouteForm] = useState({
    name: '',
    path_pattern: '/proxy/my-api',
    type: 'custom_proxy',
    target_url: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
    price_usd: 0.0010
  });

  // New Key Form
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyBalance, setNewKeyBalance] = useState(10.00);

  // Topup Form
  const [topupAmount, setTopupAmount] = useState(10.00);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchData = async () => {
    try {
      const [statsRes, routesRes, keysRes, logsRes] = await Promise.all([
        fetch('./api/stats').then(r => r.json()),
        fetch('./api/routes').then(r => r.json()),
        fetch('./api/keys').then(r => r.json()),
        fetch('./api/logs').then(r => r.json())
      ]);

      setStats(statsRes);
      setRoutes(routesRes);
      setKeysData(keysRes);
      setLogs(logsRes);

      if (routesRes.length > 0 && !selectedRoute) {
        setSelectedRoute(routesRes[0]);
        updateDefaultReqBody(routesRes[0]);
      }
    } catch (err) {
      console.error("Error fetching gateway data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateDefaultReqBody = (route) => {
    if (!route) return;
    if (route.type === 'builtin_ai') {
      setReqBody(JSON.stringify({
        model: '@cf/meta/llama-3-8b-instruct',
        prompt: 'Explain how x402 HTTP 402 micro-payments work in simple terms.',
        temperature: 0.7
      }, null, 2));
    } else if (route.type === 'builtin_scraper') {
      setReqBody(JSON.stringify({
        url: 'https://x402.org'
      }, null, 2));
    } else if (route.type === 'builtin_sandbox') {
      setReqBody(JSON.stringify({
        language: 'javascript',
        code: 'const prices = [10.5, 20.0, 15.2];\nconst sum = prices.reduce((a, b) => a + b, 0);\nconsole.log("Calculated Total:", sum);\nreturn { total: sum, avg: sum / prices.length };'
      }, null, 2));
    } else if (route.type === 'builtin_devtools') {
      setReqBody(JSON.stringify({
        text: 'https://x402.org/gateway'
      }, null, 2));
    } else {
      setReqBody(JSON.stringify({
        query: 'sample request payload',
        timestamp: Date.now()
      }, null, 2));
    }
  };

  const handleSelectRoute = (route) => {
    setSelectedRoute(route);
    updateDefaultReqBody(route);
    setPlaygroundRes(null);
    setHandshakeStep(0);
  };

  // Execute Request in Playground
  const executePlaygroundRequest = async (overrideHeaders = {}) => {
    if (!selectedRoute) return;

    setIsExecuting(true);
    setHandshakeStep(1); // Sent

    const headers = { ...overrideHeaders };
    const method = selectedRoute.type === 'custom_proxy' && selectedRoute.allowed_methods.includes('GET') ? 'GET' : 'POST';

    if (method === 'POST') {
      headers['Content-Type'] = 'application/json';
    }

    if (authMode === 'api_key') {
      headers['X-API-Key'] = customApiKey;
    } else if (authMode === 'sandbox') {
      headers['X-402-Sandbox-Key'] = 'sandbox_demo';
    } else if (authMode === 'l402' && customL402Preimage) {
      headers['Authorization'] = `L402 macaroon_proof_jwt_x402:${customL402Preimage}`;
    }

    setTimeout(() => setHandshakeStep(2), 200); // Payment Verification

    try {
      const startTime = performance.now();
      const targetPath = selectedRoute.path_pattern;
      
      const res = await fetch(`.${targetPath}`, {
        method,
        headers,
        body: method === 'POST' ? reqBody : undefined
      });

      const elapsed = Math.round(performance.now() - startTime);
      const resHeaders = {};
      res.headers.forEach((val, key) => { resHeaders[key] = val; });

      let data;
      try { data = await res.json(); } catch { data = await res.text(); }

      setHandshakeStep(3); // Result Received

      const responseObj = {
        status: res.status,
        statusText: res.statusText,
        elapsedMs: elapsed,
        headers: resHeaders,
        data
      };

      setPlaygroundRes(responseObj);

      if (res.status === 402) {
        setPendingInvoice(data.x402 || null);
        showToast("HTTP 402 Payment Required returned!", "warning");
      } else if (res.status === 200) {
        showToast("200 OK: Micro-payment verified & proxy executed!", "success");
      }

      fetchData();
    } catch (err) {
      console.error("Execute error:", err);
      setPlaygroundRes({
        status: 500,
        statusText: "Client Error",
        elapsedMs: 0,
        headers: {},
        data: { error: err.message }
      });
    } finally {
      setIsExecuting(false);
    }
  };

  // Settle invoice in modal
  const handleSettleInvoice = async () => {
    if (!pendingInvoice) return;

    try {
      const res = await fetch('./api/invoices/settle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoice_id: pendingInvoice.challenge_id,
          payment_hash: pendingInvoice.payment_hash
        })
      }).then(r => r.json());

      if (res.success) {
        setCustomL402Preimage(res.preimage);
        setAuthMode('l402');
        setShowPayModal(false);
        showToast("Micro-payment settled! Executing retried request...", "success");

        // Automatically retry request with L402 header!
        setTimeout(() => {
          executePlaygroundRequest({
            'Authorization': res.auth_header
          });
        }, 300);
      }
    } catch (err) {
      showToast("Settlement failed: " + err.message, "error");
    }
  };

  // Claim Faucet
  const handleClaimFaucet = async () => {
    try {
      const res = await fetch('./api/faucet/topup', { method: 'POST' }).then(r => r.json());
      if (res.success) {
        showToast(res.message, "success");
        setCustomApiKey(res.keySecret);
        fetchData();
      }
    } catch (err) {
      showToast("Faucet error: " + err.message, "error");
    }
  };

  // Add Route
  const handleCreateRoute = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('./api/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRouteForm)
      }).then(r => r.json());

      showToast(`Created Route: ${res.name}`, "success");
      setShowAddRouteModal(false);
      fetchData();
    } catch (err) {
      showToast("Create route error: " + err.message, "error");
    }
  };

  // Toggle Route Active
  const handleToggleRoute = async (route) => {
    try {
      await fetch(`./api/routes/${route.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...route, is_active: route.is_active ? 0 : 1 })
      });
      showToast(`Route ${route.is_active ? 'disabled' : 'enabled'}`, "info");
      fetchData();
    } catch (err) {
      showToast("Update error: " + err.message, "error");
    }
  };

  // Delete Route
  const handleDeleteRoute = async (id) => {
    if (!confirm("Are you sure you want to delete this route?")) return;
    try {
      await fetch(`./api/routes/${id}`, { method: 'DELETE' });
      showToast("Route deleted", "info");
      fetchData();
    } catch (err) {
      showToast("Delete error: " + err.message, "error");
    }
  };

  // Add API Key
  const handleCreateKey = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('./api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newKeyName || 'Developer Key',
          initial_balance: Number(newKeyBalance)
        })
      }).then(r => r.json());

      showToast(`Generated API Key: ${res.name}`, "success");
      setShowAddKeyModal(false);
      setNewKeyName('');
      fetchData();
    } catch (err) {
      showToast("Key generation error: " + err.message, "error");
    }
  };

  // Topup API Key
  const handleTopupKey = async (e) => {
    e.preventDefault();
    if (!selectedKeyForTopup) return;

    try {
      const res = await fetch(`./api/keys/${selectedKeyForTopup.id}/topup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(topupAmount),
          method: 'Stripe Credit Card / USDC'
        })
      }).then(r => r.json());

      showToast(`Topped up $${topupAmount.toFixed(2)} to ${selectedKeyForTopup.name}`, "success");
      setShowTopupModal(false);
      fetchData();
    } catch (err) {
      showToast("Topup error: " + err.message, "error");
    }
  };

  // Revoke Key
  const handleRevokeKey = async (id) => {
    if (!confirm("Revoke this API Key permanently?")) return;
    try {
      await fetch(`./api/keys/${id}`, { method: 'DELETE' });
      showToast("Key revoked", "info");
      fetchData();
    } catch (err) {
      showToast("Revoke error: " + err.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-gray-100">
      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border text-sm font-medium transition-all ${
          notification.type === 'error' ? 'bg-red-950/90 border-red-800 text-red-200' :
          notification.type === 'warning' ? 'bg-amber-950/90 border-amber-800 text-amber-200' :
          notification.type === 'info' ? 'bg-blue-950/90 border-blue-800 text-blue-200' :
          'bg-emerald-950/90 border-emerald-800 text-emerald-200'
        }`}>
          {notification.type === 'error' ? <XCircle className="w-5 h-5 text-red-400" /> :
           notification.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-amber-400" /> :
           <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Top Bar Header */}
      <header className="h-16 border-b border-gray-800 bg-[#0f172a]/80 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg pulse-glow">
            x402
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white tracking-tight">x402 Gateway</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                HTTP 402 Edge
              </span>
            </div>
            <p className="text-xs text-gray-400">Cloudflare Workers • L402 • USDC Micropayments</p>
          </div>
        </div>

        {/* Topbar Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleClaimFaucet}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
          >
            <Coins className="w-3.5 h-3.5" />
            <span>+ $10.00 Test Faucet</span>
          </button>

          <div className="h-4 w-px bg-gray-800" />

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-900 border border-gray-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-gray-300 font-mono">
              Demo Balance: <strong className="text-white">${(keysData.keys.find(k => k.key_secret.includes('demo'))?.balance_usd || 25.00).toFixed(2)}</strong>
            </span>
          </div>
        </div>
      </header>

      {/* Subnav Tabs */}
      <div className="border-b border-gray-800 bg-[#0f172a]/40 px-6 flex items-center gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('playground')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'playground'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>Interactive Playground</span>
        </button>

        <button
          onClick={() => setActiveTab('routes')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'routes'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Gateway Configurator</span>
          <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded bg-gray-800 text-gray-300">{routes.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('keys')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'keys'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>API Keys & Credits</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'analytics'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Revenue & Request Logs</span>
        </button>

        <button
          onClick={() => setActiveTab('docs')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'docs'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>x402 Protocol & SDK Docs</span>
        </button>
      </div>

      {/* Main Body Layout */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        
        {/* TAB 1: INTERACTIVE PLAYGROUND */}
        {activeTab === 'playground' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Route Selector & Request Controls */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Route Selector Panel */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center justify-between">
                  <span>1. Select Gateway Proxy Route</span>
                  <span className="text-xs text-indigo-400 font-normal">HTTP 402 Paywall Target</span>
                </h2>

                <div className="space-y-2">
                  {routes.map(r => (
                    <div
                      key={r.id}
                      onClick={() => handleSelectRoute(r)}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between ${
                        selectedRoute?.id === r.id
                          ? 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/30'
                          : 'border-gray-800 bg-gray-950/50 hover:border-gray-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-white">{r.name}</span>
                          {r.type.startsWith('builtin') && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800">
                              Built-in Template
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-mono text-gray-400 mt-1">{r.path_pattern}</div>
                      </div>

                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          ${r.price_usd.toFixed(4)}
                        </span>
                        <div className="text-[10px] text-gray-500 mt-0.5">per call</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Authentication & Payment Mode */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-sm space-y-4">
                <h2 className="text-sm font-semibold text-gray-200 flex items-center justify-between">
                  <span>2. Authentication & Header Mode</span>
                  <span className="text-xs text-gray-400">Handshake Simulation</span>
                </h2>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAuthMode('none')}
                    className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all ${
                      authMode === 'none'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-200'
                        : 'border-gray-800 bg-gray-950/40 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <div className="font-semibold text-white flex items-center gap-1.5 mb-1">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>No Payment</span>
                    </div>
                    <span>Expect HTTP 402 Challenge</span>
                  </button>

                  <button
                    onClick={() => setAuthMode('api_key')}
                    className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all ${
                      authMode === 'api_key'
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-200'
                        : 'border-gray-800 bg-gray-950/40 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <div className="font-semibold text-white flex items-center gap-1.5 mb-1">
                      <Key className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Pre-funded Key</span>
                    </div>
                    <span>Auto-deduct $ balance</span>
                  </button>

                  <button
                    onClick={() => setAuthMode('sandbox')}
                    className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all ${
                      authMode === 'sandbox'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                        : 'border-gray-800 bg-gray-950/40 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <div className="font-semibold text-white flex items-center gap-1.5 mb-1">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Instant Sandbox</span>
                    </div>
                    <span>1-click test bypass</span>
                  </button>

                  <button
                    onClick={() => setAuthMode('l402')}
                    className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all ${
                      authMode === 'l402'
                        ? 'border-purple-500 bg-purple-500/10 text-purple-200'
                        : 'border-gray-800 bg-gray-950/40 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <div className="font-semibold text-white flex items-center gap-1.5 mb-1">
                      <Coins className="w-3.5 h-3.5 text-purple-400" />
                      <span>L402 Preimage</span>
                    </div>
                    <span>Macaroon proof token</span>
                  </button>
                </div>

                {authMode === 'api_key' && (
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs text-gray-400 font-medium">X-API-Key Header Value</label>
                    <input
                      type="text"
                      value={customApiKey}
                      onChange={(e) => setCustomApiKey(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-md px-3 py-1.5 text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                )}

                {authMode === 'l402' && (
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs text-gray-400 font-medium">Preimage Token Proof</label>
                    <input
                      type="text"
                      placeholder="Preimage token from 402 settlement..."
                      value={customL402Preimage}
                      onChange={(e) => setCustomL402Preimage(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-md px-3 py-1.5 text-xs font-mono text-purple-300 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                )}
              </div>

              {/* Request Payload Editor */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-200">3. Request Body (JSON)</h2>
                  <span className="text-xs font-mono text-gray-500">POST Payload</span>
                </div>

                <textarea
                  rows={5}
                  value={reqBody}
                  onChange={(e) => setReqBody(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-xs font-mono text-gray-200 focus:outline-none focus:border-indigo-500 resize-y"
                />

                <button
                  onClick={() => executePlaygroundRequest()}
                  disabled={isExecuting}
                  className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-lg pulse-glow disabled:opacity-50"
                >
                  {isExecuting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Executing Gateway Interceptor...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>Send Request to Gateway (${selectedRoute?.price_usd.toFixed(4) || '0.0010'})</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Right: Response Inspector & Handshake Visualizer */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step Visualizer Banner */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-sm">
                <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                  HTTP 402 Handshake Pipeline
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className={`p-2 rounded-lg border transition-all ${
                    handshakeStep >= 1 ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300' : 'border-gray-800 bg-gray-950/40 text-gray-500'
                  }`}>
                    <div className="font-semibold mb-0.5">1. Transmit</div>
                    <div className="text-[10px] text-gray-400">Request Sent</div>
                  </div>

                  <div className={`p-2 rounded-lg border transition-all ${
                    handshakeStep >= 2 ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300' : 'border-gray-800 bg-gray-950/40 text-gray-500'
                  }`}>
                    <div className="font-semibold mb-0.5">2. Check 402</div>
                    <div className="text-[10px] text-gray-400">Verify Auth Header</div>
                  </div>

                  <div className={`p-2 rounded-lg border transition-all ${
                    playgroundRes?.status === 402 ? 'border-amber-500/50 bg-amber-500/10 text-amber-300' :
                    handshakeStep >= 3 ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' : 'border-gray-800 bg-gray-950/40 text-gray-500'
                  }`}>
                    <div className="font-semibold mb-0.5">3. Settlement</div>
                    <div className="text-[10px] text-gray-400">{playgroundRes?.status === 402 ? '402 Blocked' : 'Micro-paid'}</div>
                  </div>

                  <div className={`p-2 rounded-lg border transition-all ${
                    handshakeStep >= 3 && playgroundRes?.status === 200 ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' : 'border-gray-800 bg-gray-950/40 text-gray-500'
                  }`}>
                    <div className="font-semibold mb-0.5">4. Delivery</div>
                    <div className="text-[10px] text-gray-400">Response Payload</div>
                  </div>
                </div>
              </div>

              {/* Response Panel */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-sm space-y-4">
                
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <div className="flex items-center gap-3">
                    <h2 className="text-sm font-semibold text-gray-200">Gateway Response</h2>
                    {playgroundRes && (
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold flex items-center gap-1 ${
                        playgroundRes.status === 200 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        playgroundRes.status === 402 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {playgroundRes.status === 200 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                        <span>{playgroundRes.status} {playgroundRes.statusText}</span>
                      </span>
                    )}
                  </div>

                  {playgroundRes && (
                    <span className="text-xs font-mono text-gray-400">
                      Latency: <strong className="text-gray-200">{playgroundRes.elapsedMs} ms</strong>
                    </span>
                  )}
                </div>

                {!playgroundRes ? (
                  <div className="py-16 text-center text-gray-500 text-sm space-y-2">
                    <Terminal className="w-10 h-10 mx-auto text-gray-600 stroke-[1.5]" />
                    <p>Click <strong>"Send Request"</strong> to initiate the HTTP 402 interceptor pipeline.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    
                    {/* HTTP 402 Challenge Interactive Box */}
                    {playgroundRes.status === 402 && (
                      <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
                            <Lock className="w-4 h-4 text-amber-400" />
                            <span>HTTP 402 Payment Required Challenge Received</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-900/50 px-2 py-0.5 rounded border border-amber-700">
                            ${playgroundRes.data?.x402?.price_usd.toFixed(4)} USD
                          </span>
                        </div>

                        <p className="text-xs text-amber-200/80">
                          The gateway intercepted your unauthenticated request and returned standard L402 challenge headers. Pay $0.0010 to unlock this endpoint response.
                        </p>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => setShowPayModal(true)}
                            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-gray-950 font-semibold text-xs transition-all shadow flex items-center gap-1.5"
                          >
                            <Zap className="w-3.5 h-3.5 fill-gray-950" />
                            <span>Pay ${playgroundRes.data?.x402?.price_usd.toFixed(4)} & Retry Request</span>
                          </button>

                          <span className="text-[11px] text-amber-400/60 font-mono">
                            Challenge ID: {playgroundRes.data?.x402?.challenge_id}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Response Headers */}
                    <div className="space-y-1.5">
                      <div className="text-xs text-gray-400 font-medium">Response Headers</div>
                      <div className="bg-gray-950 border border-gray-800 rounded-lg p-3 text-xs font-mono space-y-1 max-h-36 overflow-y-auto">
                        {Object.entries(playgroundRes.headers).map(([k, v]) => (
                          <div key={k} className="flex gap-2">
                            <span className="text-indigo-400 shrink-0">{k}:</span>
                            <span className="text-gray-300 break-all">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Response Body JSON */}
                    <div className="space-y-1.5">
                      <div className="text-xs text-gray-400 font-medium">Response Body</div>
                      <pre className="bg-gray-950 border border-gray-800 rounded-lg p-3 text-xs font-mono text-emerald-400 max-h-80 overflow-y-auto whitespace-pre-wrap">
                        {typeof playgroundRes.data === 'object' ? JSON.stringify(playgroundRes.data, null, 2) : playgroundRes.data}
                      </pre>
                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* TAB 2: GATEWAY ROUTES & PRICING CONFIGURATOR */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Gateway Proxy Routes & Pricing</h1>
                <p className="text-xs text-gray-400 mt-0.5">
                  Define upstream target APIs and assign custom per-request HTTP 402 pricing tags.
                </p>
              </div>

              <button
                onClick={() => setShowAddRouteModal(true)}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-all flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add Proxy Route</span>
              </button>
            </div>

            {/* Routes Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-950/80 border-b border-gray-800 text-gray-400 uppercase font-mono tracking-wider">
                  <tr>
                    <th className="p-3.5">Route Name & Path</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Target Upstream URL</th>
                    <th className="p-3.5 text-right">Price / Request</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-gray-300 font-mono">
                  {routes.map(r => (
                    <tr key={r.id} className="hover:bg-gray-950/40 transition-colors">
                      <td className="p-3.5">
                        <div className="font-sans font-semibold text-white text-sm">{r.name}</div>
                        <div className="text-indigo-400 text-xs mt-0.5">{r.path_pattern}</div>
                      </td>

                      <td className="p-3.5 font-sans">
                        <span className="px-2 py-0.5 rounded text-[11px] bg-gray-800 text-gray-300 border border-gray-700">
                          {r.type}
                        </span>
                      </td>

                      <td className="p-3.5 max-w-xs truncate text-gray-400">
                        {r.target_url || <span className="italic text-gray-600">Built-in Edge Function</span>}
                      </td>

                      <td className="p-3.5 text-right font-bold text-emerald-400 text-sm">
                        ${r.price_usd.toFixed(4)}
                      </td>

                      <td className="p-3.5 font-sans">
                        <button
                          onClick={() => handleToggleRoute(r)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 ${
                            r.is_active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-800 text-gray-500'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${r.is_active ? 'bg-emerald-400' : 'bg-gray-500'}`} />
                          <span>{r.is_active ? 'Active' : 'Disabled'}</span>
                        </button>
                      </td>

                      <td className="p-3.5 text-right font-sans space-x-2">
                        <button
                          onClick={() => {
                            setSelectedRoute(r);
                            updateDefaultReqBody(r);
                            setActiveTab('playground');
                          }}
                          className="px-2.5 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-medium border border-indigo-500/20 transition-all"
                        >
                          Test
                        </button>

                        <button
                          onClick={() => handleDeleteRoute(r.id)}
                          className="p-1 rounded hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: API KEYS & PRE-FUNDED CREDITS */}
        {activeTab === 'keys' && (
          <div className="space-y-6">
            
            {/* Top KPI Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-gray-400 text-xs font-medium uppercase tracking-wider">
                  <span>Demo Credit Balance</span>
                  <Wallet className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="mt-2 text-2xl font-bold text-white font-mono">
                  ${(keysData.keys[0]?.balance_usd || 25.00).toFixed(2)} USD
                </div>
                <p className="text-xs text-gray-500 mt-1">Available for gateway micropayments</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-gray-400 text-xs font-medium uppercase tracking-wider">
                  <span>Total Gateway Usage</span>
                  <Coins className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="mt-2 text-2xl font-bold text-white font-mono">
                  ${(keysData.keys[0]?.total_spent || 0.00).toFixed(4)} USD
                </div>
                <p className="text-xs text-gray-500 mt-1">Deducted per request</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <div className="text-xs font-medium text-gray-400">Account Top-Up</div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={handleClaimFaucet}
                    className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-all flex items-center justify-center gap-1 shadow"
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>Instant $10 Faucet</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedKeyForTopup(keysData.keys[0]);
                      setShowTopupModal(true);
                    }}
                    className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-all flex items-center justify-center gap-1 shadow"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Top-up Credit</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Keys Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-sm space-y-3 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white">Active Developer API Keys</h2>
                <button
                  onClick={() => setShowAddKeyModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-all flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Generate Key</span>
                </button>
              </div>

              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-gray-950/80 border-b border-gray-800 text-gray-400 uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Key Name</th>
                    <th className="p-3">Secret Key</th>
                    <th className="p-3 text-right">Balance</th>
                    <th className="p-3 text-right">Total Spent</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-gray-300">
                  {keysData.keys.map(k => (
                    <tr key={k.id} className="hover:bg-gray-950/40">
                      <td className="p-3 font-sans font-medium text-white">{k.name}</td>
                      <td className="p-3 text-indigo-300">
                        {k.key_secret.slice(0, 14)}...
                      </td>
                      <td className="p-3 text-right text-emerald-400 font-bold">${k.balance_usd.toFixed(2)}</td>
                      <td className="p-3 text-right text-gray-400">${k.total_spent.toFixed(4)}</td>
                      <td className="p-3 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          k.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400'
                        }`}>
                          {k.status}
                        </span>
                      </td>
                      <td className="p-3 text-right font-sans space-x-2">
                        <button
                          onClick={() => {
                            setSelectedKeyForTopup(k);
                            setShowTopupModal(true);
                          }}
                          className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs"
                        >
                          Top-up
                        </button>
                        <button
                          onClick={() => handleRevokeKey(k.id)}
                          className="p-1 rounded hover:bg-red-500/20 text-gray-500 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Ledger Transactions */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-sm space-y-3">
              <h2 className="text-sm font-semibold text-gray-200">Billing Ledger & Transactions</h2>
              
              <div className="divide-y divide-gray-800 text-xs font-mono max-h-60 overflow-y-auto">
                {keysData.ledger.map(tx => (
                  <div key={tx.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="text-gray-200 font-sans">{tx.description}</div>
                      <div className="text-gray-500 text-[10px]">{new Date(tx.created_at).toLocaleString()}</div>
                    </div>
                    <div className={`font-bold ${tx.type === 'topup' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {tx.type === 'topup' ? '+' : '-'}${tx.amount_usd.toFixed(4)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: REVENUE ANALYTICS & LIVE LOGS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            
            {/* KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-sm">
                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Total Gateway Revenue</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
                  ${(stats?.totalRevenueUsd || 0).toFixed(4)}
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-sm">
                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Total Requests</div>
                <div className="text-2xl font-bold text-white font-mono mt-1">
                  {stats?.totalRequests || 0}
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-sm">
                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Paid Requests</div>
                <div className="text-2xl font-bold text-indigo-400 font-mono mt-1">
                  {stats?.paidRequests || 0}
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-sm">
                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">HTTP 402 Blocked</div>
                <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
                  {stats?.blocked402Requests || 0}
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-sm">
                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Avg Latency</div>
                <div className="text-2xl font-bold text-gray-200 font-mono mt-1">
                  {stats?.avgLatencyMs || 0} ms
                </div>
              </div>
            </div>

            {/* Live Request Logs Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-indigo-400" />
                  <span>Live HTTP Request Logs</span>
                </h2>

                <button
                  onClick={fetchData}
                  className="p-1.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-gray-950/80 border-b border-gray-800 text-gray-400 uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Time</th>
                      <th className="p-3">Method & Path</th>
                      <th className="p-3">Route</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Payment Method</th>
                      <th className="p-3 text-right">Cost</th>
                      <th className="p-3 text-right">Latency</th>
                      <th className="p-3 text-right">Inspect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 text-gray-300">
                    {logs.map(log => (
                      <tr key={log.id} className="hover:bg-gray-950/40">
                        <td className="p-3 text-gray-500 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="p-3 font-semibold text-white">
                          <span className="text-indigo-400">{log.method}</span> {log.path}
                        </td>
                        <td className="p-3 text-gray-400 truncate max-w-xs">{log.route_name}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            log.status_code === 200 ? 'bg-emerald-500/10 text-emerald-400' :
                            log.status_code === 402 ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                          }`}>
                            {log.status_code}
                          </span>
                        </td>
                        <td className="p-3 font-sans text-gray-300">{log.payment_method}</td>
                        <td className="p-3 text-right font-bold text-emerald-400">${log.cost_usd.toFixed(4)}</td>
                        <td className="p-3 text-right text-gray-400">{log.latency_ms} ms</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setInspectLog(log)}
                            className="p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: x402 PROTOCOL & SDK DOCS */}
        {activeTab === 'docs' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-sm space-y-4">
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400" />
                <span>x402 Protocol Specification & SDK Integration</span>
              </h1>
              <p className="text-sm text-gray-300 leading-relaxed">
                The <strong>HTTP 402 Payment Required</strong> protocol enables instant micro-transactions per API request without requiring user login, monthly subscriptions, or complex API key distribution.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-gray-950 border border-gray-800 space-y-2">
                  <div className="font-semibold text-sm text-indigo-300">1. Server Header Challenge</div>
                  <pre className="text-xs font-mono text-gray-400 bg-gray-900 p-2.5 rounded border border-gray-800 whitespace-pre-wrap">
HTTP/1.1 402 Payment Required
WWW-Authenticate: L402 macaroon="..."
X-402-Price: 0.0010
X-402-Currency: USD
                  </pre>
                </div>

                <div className="p-4 rounded-lg bg-gray-950 border border-gray-800 space-y-2">
                  <div className="font-semibold text-sm text-emerald-300">2. Client Preimage Token Proof</div>
                  <pre className="text-xs font-mono text-gray-400 bg-gray-900 p-2.5 rounded border border-gray-800 whitespace-pre-wrap">
GET /v1/ai/completions
Authorization: L402 macaroon:preimage
or X-API-Key: x402_live_...
                  </pre>
                </div>
              </div>
            </div>

            {/* Code Snippets */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-white">cURL Example</h2>
              <pre className="bg-gray-950 p-4 rounded-lg border border-gray-800 text-xs font-mono text-emerald-400 overflow-x-auto">
{`# Option A: Execute with Pre-funded API Key
curl -X POST "${location.origin}/v1/ai/completions" \\
  -H "X-API-Key: x402_live_demo888899990000" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Hello x402 Gateway"}'

# Option B: Test 1-click Sandbox Micropayment
curl -X POST "${location.origin}/v1/scrape" \\
  -H "X-402-Sandbox-Key: sandbox_demo" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://x402.org"}'`}
              </pre>
            </div>

          </div>
        )}

      </main>

      {/* MODAL: 402 Settlement Popup */}
      {showPayModal && pendingInvoice && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-dialog-enter">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span>Micro-Payment Settlement</span>
              </div>
              <button onClick={() => setShowPayModal(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>

            <div className="text-center py-2 space-y-1">
              <div className="text-xs text-gray-400 uppercase font-medium">Invoice Amount</div>
              <div className="text-3xl font-extrabold text-white font-mono">
                ${pendingInvoice.price_usd.toFixed(4)} <span className="text-xs text-gray-400 font-normal">USDC</span>
              </div>
              <p className="text-xs text-gray-500">Challenge ID: {pendingInvoice.challenge_id}</p>
            </div>

            <div className="space-y-2 bg-gray-950 p-3 rounded-lg border border-gray-800 text-xs font-mono">
              <div className="flex justify-between text-gray-400">
                <span>Network:</span>
                <span className="text-indigo-400">Base Mainnet / Solana</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Vault Address:</span>
                <span className="text-gray-200">0x402A...00402</span>
              </div>
            </div>

            <button
              onClick={handleSettleInvoice}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-gray-950 font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 fill-gray-950 stroke-amber-500" />
              <span>Settle $0.0010 Payment & Retry Call</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL: Add Proxy Route */}
      {showAddRouteModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateRoute} className="bg-gray-900 border border-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-base font-bold text-white">Create New x402 Proxy Route</h2>
              <button type="button" onClick={() => setShowAddRouteModal(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400 font-medium">Route Name</label>
                <input
                  type="text"
                  required
                  value={newRouteForm.name}
                  onChange={(e) => setNewRouteForm({ ...newRouteForm, name: e.target.value })}
                  placeholder="e.g., DeepSeek AI Model Proxy"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-gray-200 mt-1 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-gray-400 font-medium">Path Pattern</label>
                <input
                  type="text"
                  required
                  value={newRouteForm.path_pattern}
                  onChange={(e) => setNewRouteForm({ ...newRouteForm, path_pattern: e.target.value })}
                  placeholder="/proxy/my-endpoint"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 font-mono text-indigo-300 mt-1 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-gray-400 font-medium">Upstream Target URL</label>
                <input
                  type="text"
                  value={newRouteForm.target_url}
                  onChange={(e) => setNewRouteForm({ ...newRouteForm, target_url: e.target.value })}
                  placeholder="https://api.my-backend.com/v1"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 font-mono text-gray-300 mt-1 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-gray-400 font-medium">Price USD per Request</label>
                <input
                  type="number"
                  step="0.0001"
                  required
                  value={newRouteForm.price_usd}
                  onChange={(e) => setNewRouteForm({ ...newRouteForm, price_usd: parseFloat(e.target.value) })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 font-mono text-emerald-400 mt-1 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddRouteModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow"
              >
                Create Gateway Route
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: Add API Key */}
      {showAddKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateKey} className="bg-gray-900 border border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-base font-bold text-white">Generate Developer API Key</h2>
              <button type="button" onClick={() => setShowAddKeyModal(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400 font-medium">Key Label / Owner Name</label>
                <input
                  type="text"
                  required
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g. Production Mobile App"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-gray-200 mt-1 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-gray-400 font-medium">Initial Credit Balance ($)</label>
                <input
                  type="number"
                  step="1"
                  value={newKeyBalance}
                  onChange={(e) => setNewKeyBalance(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 font-mono text-emerald-400 mt-1 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddKeyModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow"
              >
                Generate Key
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: Topup Key */}
      {showTopupModal && selectedKeyForTopup && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleTopupKey} className="bg-gray-900 border border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-base font-bold text-white">Top-up Key Balance</h2>
              <button type="button" onClick={() => setShowTopupModal(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="text-gray-400">
                Key: <strong className="text-white">{selectedKeyForTopup.name}</strong>
              </div>

              <div>
                <label className="text-gray-400 font-medium">Amount to Deposit ($ USD / USDC)</label>
                <input
                  type="number"
                  step="5"
                  min="1"
                  value={topupAmount}
                  onChange={(e) => setTopupAmount(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 font-mono text-emerald-400 text-lg mt-1 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowTopupModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow"
              >
                Deposit ${Number(topupAmount).toFixed(2)}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: Inspect Request Log */}
      {inspectLog && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-base font-bold text-white">Request Log Details</h2>
              <button onClick={() => setInspectLog(null)} className="text-gray-500 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="grid grid-cols-2 gap-2 text-gray-400 bg-gray-950 p-3 rounded-lg border border-gray-800">
                <div>Path: <span className="text-white">{inspectLog.path}</span></div>
                <div>Method: <span className="text-indigo-400">{inspectLog.method}</span></div>
                <div>Status: <span className="text-emerald-400">{inspectLog.status_code}</span></div>
                <div>Cost: <span className="text-emerald-400">${inspectLog.cost_usd.toFixed(4)}</span></div>
                <div>Latency: <span className="text-gray-200">{inspectLog.latency_ms} ms</span></div>
                <div>Auth: <span className="text-purple-400">{inspectLog.payment_method}</span></div>
              </div>

              <div>
                <div className="text-gray-400 font-sans font-medium mb-1">Request Body Preview</div>
                <pre className="bg-gray-950 p-2.5 rounded border border-gray-800 text-gray-300 text-[11px] overflow-x-auto whitespace-pre-wrap">
                  {inspectLog.request_preview || '(empty)'}
                </pre>
              </div>

              <div>
                <div className="text-gray-400 font-sans font-medium mb-1">Response Preview</div>
                <pre className="bg-gray-950 p-2.5 rounded border border-gray-800 text-emerald-400 text-[11px] overflow-x-auto whitespace-pre-wrap">
                  {inspectLog.response_preview || '(empty)'}
                </pre>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setInspectLog(null)}
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-xs font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
