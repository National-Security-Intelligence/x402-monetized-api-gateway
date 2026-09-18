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
  Server,
  BookOpen,
  ChevronDown,
  Languages,
  Rocket,
  Store,
  Calculator,
  TrendingUp,
  Bot,
  Send,
  Sliders,
  CheckSquare,
  HelpCircle as FaqIcon
} from 'lucide-react';

// Multi-language translation dictionary for 9 global locales (including UK English)
const LANGUAGES = [
  { code: 'en', name: 'English (US)', flag: '🇺🇸', dir: 'ltr' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧', dir: 'ltr' },
  { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'zh', name: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'pt', name: 'Português', flag: '🇧🇷', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' }
];

const I18N_DICT = {
  en: {
    app_title: "x402 Gateway",
    app_subtitle: "Monetized API Engine & L402 Web3 Micropayments",
    
    // Header View Switcher
    view_storefront: "Public API Storefront",
    view_admin: "Admin & Developer Portal",

    // Storefront Keys
    store_hero_badge: "HTTP 402 Standard • L402 Macaroons • EVM USDC",
    store_hero_title: "Pay-Per-Request APIs Built for AI Agents & Modern Applications",
    store_hero_subtitle: "Say goodbye to $299/mo SaaS lock-ins. Pay fractions of a cent ($0.001) per call using Web3 wallet signatures, L402 Lightning tokens, or pre-funded balances.",
    store_hero_cta_explore: "Explore API Catalog",
    store_hero_cta_try: "Try Live API Sandbox",
    store_hero_cta_admin: "Open Admin Console",
    
    store_stat_1_val: "0.002s",
    store_stat_1_lbl: "Edge Verification",
    store_stat_2_val: "$0.0001",
    store_stat_2_lbl: "Min Charge / Call",
    store_stat_3_val: "100%",
    store_stat_3_lbl: "Cryptographic Proofs",
    store_stat_4_val: "99.99%",
    store_stat_4_lbl: "Cloudflare Edge Uptime",

    store_catalog_title: "Pay-As-You-Go API Marketplace",
    store_catalog_subtitle: "Instantly accessible micro-monetized services optimized for autonomous AI agents, LLM pipelines, and web applications.",
    store_try_btn: "Test Endpoint Live",
    
    store_how_title: "How x402 Protocol Works",
    store_how_subtitle: "Zero account registration required. Automated cryptographic micropayment handshakes executed under 5ms.",
    store_step_1_title: "1. Request Any API Endpoint",
    store_step_1_desc: "Your AI agent or web client makes a standard HTTP call to the x402 gateway endpoint.",
    store_step_2_title: "2. Receive HTTP 402 Invoice",
    store_step_2_desc: "Gateway returns 402 Payment Required with price, payment hash, and supported wallet channels.",
    store_step_3_title: "3. Cryptographic Verification & 200 OK",
    store_step_3_desc: "Client attaches USDC transaction proof or L402 token. Gateway verifies and streams API payload instantly.",

    store_calc_title: "Pay-Per-Call vs Monthly SaaS Subscriptions",
    store_calc_subtitle: "Calculate how much you save by replacing flat $299/mo API subscriptions with exact usage micro-charges.",
    store_calc_requests: "Monthly API Request Volume",
    store_calc_x402_cost: "x402 Micro-pay Cost",
    store_calc_saas_cost: "Traditional SaaS Subscriptions",
    store_calc_savings: "Estimated Monthly Savings",

    store_faq_title: "Frequently Asked Questions",
    store_faq_1_q: "What is the x402 Payment Protocol?",
    store_faq_1_a: "x402 brings the official HTTP 402 'Payment Required' standard to life. It enables APIs to charge micropayments (e.g. $0.001) per request using Web3 cryptographic signatures (USDC on Base/Solana) or Lightning L402 tokens without monthly lock-in.",
    store_faq_2_q: "How do AI Agents pay for API requests automatically?",
    store_faq_2_a: "AI agents (AutoGPT, LangChain, CrewAI, ElizaOS) read the 402 header response, sign a micro-payment invoice programmatically using their Web3 wallet, and attach the proof in the 'Authorization: L402' header in under 50ms.",
    store_faq_3_q: "Can I use traditional API keys or credit cards?",
    store_faq_3_a: "Yes! The x402 Gateway supports pre-funded API keys and Stripe card top-ups alongside Web3 crypto micropayments.",

	    // Admin Portal Nav
	    nav_playground: "Interactive Testbench",
	    nav_routes: "Monetized Routes",
	    nav_keys: "API Keys & Ledger",
	    nav_secrets: "Workspace Variables & Side Panel",
	    nav_code_search: "Console & Const Search",
	    nav_todo_list: "Production To-Do List",
	    nav_oidc: "Cloudflare Access & MFA",
	    nav_github: "GitHub Sync & Local Setup",
	    nav_logs: "Logs & Revenue",
	    nav_deploy: "Production Guide",
    
    // Stats
    stat_revenue: "Total Gateway Revenue",
    stat_requests: "Total Proxy Calls",
    stat_paid_calls: "Paid Handshakes",
    stat_blocked_402: "402 Blocked Challenges",
    stat_latency: "Avg Edge Latency",
    stat_active_keys: "Active API Keys",

    // Playground
    pg_title: "x402 Micro-Payment Protocol Testbench",
    pg_subtitle: "Test HTTP 402 Payment Required challenges, L402 Macaroons, and Web3 USDC micro-settlements live.",
    pg_select_endpoint: "Select Target API Route",
    pg_auth_mode: "Payment & Auth Method",
    pg_auth_none: "1. None (Trigger 402 Challenge)",
    pg_auth_key: "2. Pre-funded API Key",
    pg_auth_sandbox: "3. Testnet Sandbox Micropayment",
    pg_auth_l402: "4. L402 Macaroon Token",
    pg_send_btn: "Send Request",
    pg_executing: "Processing Handshake...",
    pg_req_payload: "Request JSON Payload",
    pg_res_status: "Response Status",
    pg_res_latency: "Latency",
    pg_res_headers: "Gateway Headers",
    pg_res_body: "Response Payload",
    pg_settle_invoice_btn: "Pay $0.0015 & Settle L402 Challenge",
    pg_code_snippets: "Client Code Generator",

    // Step Indicator
    step_1: "1. Send Unauthenticated Request",
    step_2: "2. Gateway Returns HTTP 402",
    step_3: "3. Settle Challenge / Provide Key",
    step_4: "4. Gateway Executes API & Returns 200",

    // Routes Tab
    routes_title: "Monetized API Gateway Routes",
    routes_subtitle: "Configure proxy targets, per-call pricing rules, and allowed payment protocols.",
    routes_add_btn: "New Proxy Route",
    routes_col_name: "Route Name",
    routes_col_pattern: "Path Pattern",
    routes_col_type: "Route Type",
    routes_col_price: "Price / Call",
    routes_col_status: "Status",
    routes_col_actions: "Actions",
    routes_active: "Active",
    routes_inactive: "Inactive",

    // Keys Tab
    keys_title: "API Keys & Credit Ledger",
    keys_subtitle: "Manage client API keys, issue testnet balances, and inspect SQLite billing transactions.",
    keys_add_btn: "Create API Key",
    keys_faucet_btn: "Claim $10.00 Test Faucet",
    keys_col_key: "API Key Secret",
    keys_col_name: "Key Name",
    keys_col_balance: "Balance",
    keys_col_spent: "Total Spent",
    keys_col_status: "Status",
    keys_topup_btn: "Top Up",
    ledger_title: "Recent Credit Ledger Transactions",

    // Logs Tab
    logs_title: "Live Request Logs & Payment Audit",
    logs_subtitle: "Real-time edge logging for 402 challenges, micropayment verifications, and proxy execution.",
    logs_col_time: "Time",
    logs_col_route: "Route Path",
    logs_col_status: "Status Code",
    logs_col_method: "Payment Method",
    logs_col_cost: "Revenue",
    logs_col_latency: "Latency",
    logs_col_ip: "Client IP",
    logs_inspect: "Inspect",

    // Production Guide Tab
    guide_title: "Production Deployment Checklist for Cloudflare",
    guide_subtitle: "How to connect your custom domain, real Web3 wallet RPCs, Lightning nodes, and Stripe payments.",
    guide_step1_title: "1. Connect Web3 / EVM Settlement Wallet",
    guide_step1_desc: "Replace the placeholder vault address in wrangler.json / secrets with your production Base / Arbitrum / Solana wallet address to accept live USDC.",
    guide_step2_title: "2. Set Up Lightning L402 Rest Node",
    guide_step2_desc: "Bind Alby, LND, or Strike REST credentials to issue real BOLT11 Lightning invoices and cryptographic Macaroon tokens.",
    guide_step3_title: "3. Attach Cloudflare Custom Domain",
    guide_step3_desc: "Add your API custom domain (e.g., api.yourdomain.com) in Cloudflare Dashboard -> Workers -> Triggers for global SSL & DDoS edge protection.",
    guide_step4_title: "4. Deploy with Wrangler CLI",
    guide_step4_desc: "Run 'wrangler deploy' from your terminal to deploy this Durable Object SQLite x402 Gateway directly to your Cloudflare account.",

    // Modals & General
    modal_close: "Close",
    modal_save: "Save Route",
    modal_cancel: "Cancel",
    modal_create_key: "Create Key",
    modal_topup_title: "Top Up API Key Credit",
    modal_topup_amount: "Top-up Amount (USD)",
    modal_topup_confirm: "Confirm Deposit",
    pay_modal_title: "x402 Micro-Payment Challenge",
    pay_modal_desc: "The gateway intercepted your call and issued an HTTP 402 invoice.",
    pay_modal_instant: "1-Click Instant Testnet Settlement",
    pay_modal_simulate_btn: "Simulate Payment & Unlock Preimage",
    toast_402_issued: "HTTP 402 Payment Required returned!",
    toast_200_ok: "200 OK: Micro-payment verified & proxy executed!",
    toast_faucet_claimed: "Added $10.00 test credit to demo key!"
  },
  'en-GB': {
    app_title: "x402 Gateway",
    app_subtitle: "Monetised API Engine & L402 Web3 Micropayments",
    
    view_storefront: "Public API Storefront",
    view_admin: "Admin & Developer Portal",

    store_hero_badge: "HTTP 402 Standard • L402 Macaroons • EVM USDC",
    store_hero_title: "Pay-Per-Request APIs Built for AI Agents & Modern Applications",
    store_hero_subtitle: "Say goodbye to $299/mo SaaS lock-ins. Pay fractions of a penny ($0.001) per call using Web3 wallet signatures, L402 Lightning tokens, or pre-funded balances.",
    store_hero_cta_explore: "Explore API Catalogue",
    store_hero_cta_try: "Try Live API Sandbox",
    store_hero_cta_admin: "Open Admin Console",
    
    store_stat_1_val: "0.002s",
    store_stat_1_lbl: "Edge Verification",
    store_stat_2_val: "$0.0001",
    store_stat_2_lbl: "Min Charge / Call",
    store_stat_3_val: "100%",
    store_stat_3_lbl: "Cryptographic Proofs",
    store_stat_4_val: "99.99%",
    store_stat_4_lbl: "Cloudflare Edge Uptime",

    store_catalog_title: "Pay-As-You-Go API Marketplace",
    store_catalog_subtitle: "Instantly accessible micro-monetised services optimised for autonomous AI agents, LLM pipelines, and web applications.",
    store_try_btn: "Test Endpoint Live",
    
    store_how_title: "How x402 Protocol Works",
    store_how_subtitle: "Zero account registration required. Automated cryptographic micropayment handshakes executed under 5ms.",
    store_step_1_title: "1. Request Any API Endpoint",
    store_step_1_desc: "Your AI agent or web client makes a standard HTTP call to the x402 gateway endpoint.",
    store_step_2_title: "2. Receive HTTP 402 Invoice",
    store_step_2_desc: "Gateway returns 402 Payment Required with price, payment hash, and supported wallet channels.",
    store_step_3_title: "3. Cryptographic Verification & 200 OK",
    store_step_3_desc: "Client attaches USDC transaction proof or L402 token. Gateway verifies and streams API payload instantly.",

    store_calc_title: "Pay-Per-Call vs Monthly SaaS Subscriptions",
    store_calc_subtitle: "Calculate how much you save by replacing flat $299/mo API subscriptions with exact usage micro-charges.",
    store_calc_requests: "Monthly API Request Volume",
    store_calc_x402_cost: "x402 Micro-pay Cost",
    store_calc_saas_cost: "Traditional SaaS Subscriptions",
    store_calc_savings: "Estimated Monthly Savings",

    store_faq_title: "Frequently Asked Questions",
    store_faq_1_q: "What is the x402 Payment Protocol?",
    store_faq_1_a: "x402 brings the official HTTP 402 'Payment Required' standard to life. It enables APIs to charge micropayments (e.g. $0.001) per request using Web3 cryptographic signatures (USDC on Base/Solana) or Lightning L402 tokens without monthly lock-in.",
    store_faq_2_q: "How do AI Agents pay for API requests automatically?",
    store_faq_2_a: "AI agents (AutoGPT, LangChain, CrewAI, ElizaOS) read the 402 header response, sign a micro-payment invoice programmatically using their Web3 wallet, and attach the proof in the 'Authorization: L402' header in under 50ms.",
    store_faq_3_q: "Can I use traditional API keys or credit cards?",
    store_faq_3_a: "Yes! The x402 Gateway supports pre-funded API keys and Stripe card top-ups alongside Web3 crypto micropayments.",

	    nav_playground: "Interactive Testbench",
	    nav_routes: "Monetised Routes",
	    nav_keys: "API Keys & Ledger",
	    nav_secrets: "Workspace Variables & Side Panel",
	    nav_code_search: "Console & Const Search",
	    nav_todo_list: "Production To-Do List",
	    nav_oidc: "Cloudflare Access & MFA",
	    nav_github: "GitHub Sync & Local Setup",
	    nav_logs: "Logs & Revenue",
	    nav_deploy: "Production Guide",
    
    stat_revenue: "Total Gateway Revenue",
    stat_requests: "Total Proxy Calls",
    stat_paid_calls: "Paid Handshakes",
    stat_blocked_402: "402 Blocked Challenges",
    stat_latency: "Avg Edge Latency",
    stat_active_keys: "Active API Keys",

    pg_title: "x402 Micro-Payment Protocol Testbench",
    pg_subtitle: "Test HTTP 402 Payment Required challenges, L402 Macaroons, and Web3 USDC micro-settlements live.",
    pg_select_endpoint: "Select Target API Route",
    pg_auth_mode: "Payment & Auth Method",
    pg_auth_none: "1. None (Trigger 402 Challenge)",
    pg_auth_key: "2. Pre-funded API Key",
    pg_auth_sandbox: "3. Testnet Sandbox Micropayment",
    pg_auth_l402: "4. L402 Macaroon Token",
    pg_send_btn: "Send Request",
    pg_executing: "Processing Handshake...",
    pg_req_payload: "Request JSON Payload",
    pg_res_status: "Response Status",
    pg_res_latency: "Latency",
    pg_res_headers: "Gateway Headers",
    pg_res_body: "Response Payload",
    pg_settle_invoice_btn: "Pay $0.0015 & Settle L402 Challenge",
    pg_code_snippets: "Client Code Generator",

    step_1: "1. Send Unauthenticated Request",
    step_2: "2. Gateway Returns HTTP 402",
    step_3: "3. Settle Challenge / Provide Key",
    step_4: "4. Gateway Executes API & Returns 200",

    routes_title: "Monetised API Gateway Routes",
    routes_subtitle: "Configure proxy targets, per-call pricing rules, and allowed payment protocols.",
    routes_add_btn: "New Proxy Route",
    routes_col_name: "Route Name",
    routes_col_pattern: "Path Pattern",
    routes_col_type: "Route Type",
    routes_col_price: "Price / Call",
    routes_col_status: "Status",
    routes_col_actions: "Actions",
    routes_active: "Active",
    routes_inactive: "Inactive",

    keys_title: "API Keys & Credit Ledger",
    keys_subtitle: "Manage client API keys, issue testnet balances, and inspect SQLite billing transactions.",
    keys_add_btn: "Create API Key",
    keys_faucet_btn: "Claim $10.00 Test Faucet",
    keys_col_key: "API Key Secret",
    keys_col_name: "Key Name",
    keys_col_balance: "Balance",
    keys_col_spent: "Total Spent",
    keys_col_status: "Status",
    keys_topup_btn: "Top Up",
    ledger_title: "Recent Credit Ledger Transactions",

    logs_title: "Live Request Logs & Payment Audit",
    logs_subtitle: "Real-time edge logging for 402 challenges, micropayment verifications, and proxy execution.",
    logs_col_time: "Time",
    logs_col_route: "Route Path",
    logs_col_status: "Status Code",
    logs_col_method: "Payment Method",
    logs_col_cost: "Revenue",
    logs_col_latency: "Latency",
    logs_col_ip: "Client IP",
    logs_inspect: "Inspect",

    guide_title: "Production Deployment Checklist for Cloudflare",
    guide_subtitle: "How to connect your custom domain, real Web3 wallet RPCs, Lightning nodes, and Stripe payments.",
    guide_step1_title: "1. Connect Web3 / EVM Settlement Wallet",
    guide_step1_desc: "Replace the placeholder vault address in wrangler.json / secrets with your production Base / Arbitrum / Solana wallet address to accept live USDC.",
    guide_step2_title: "2. Set Up Lightning L402 Rest Node",
    guide_step2_desc: "Bind Alby, LND, or Strike REST credentials to issue real BOLT11 Lightning invoices and cryptographic Macaroon tokens.",
    guide_step3_title: "3. Attach Cloudflare Custom Domain",
    guide_step3_desc: "Add your API custom domain (e.g., api.yourdomain.com) in Cloudflare Dashboard -> Workers -> Triggers for global SSL & DDoS edge protection.",
    guide_step4_title: "4. Deploy with Wrangler CLI",
    guide_step4_desc: "Run 'wrangler deploy' from your terminal to deploy this Durable Object SQLite x402 Gateway directly to your Cloudflare account.",

    modal_close: "Close",
    modal_save: "Save Route",
    modal_cancel: "Cancel",
    modal_create_key: "Create Key",
    modal_topup_title: "Top Up API Key Credit",
    modal_topup_amount: "Top-up Amount (USD)",
    modal_topup_confirm: "Confirm Deposit",
    pay_modal_title: "x402 Micro-Payment Challenge",
    pay_modal_desc: "The gateway intercepted your call and issued an HTTP 402 invoice.",
    pay_modal_instant: "1-Click Instant Testnet Settlement",
    pay_modal_simulate_btn: "Simulate Payment & Unlock Preimage",
    toast_402_issued: "HTTP 402 Payment Required returned!",
    toast_200_ok: "200 OK: Micro-payment verified & proxy executed!",
    toast_faucet_claimed: "Added $10.00 test credit to demo key!"
  },
  es: {
    app_title: "Pasarela x402",
    app_subtitle: "Motor de API Monetizada y Micro-pagos Web3 L402",
    view_storefront: "Tienda Pública de APIs",
    view_admin: "Portal de Administración",
    nav_playground: "Entorno de Prueba",
    nav_routes: "Rutas Monetizadas",
    nav_keys: "Claves API y Saldo",
    nav_logs: "Registros e Ingresos",
    nav_deploy: "Guía de Producción",
    store_hero_badge: "Estándar HTTP 402 • L402 Macaroons • EVM USDC",
    store_hero_title: "APIs de Pago Por Uso para Agentes de IA y Aplicaciones Modernas",
    store_hero_subtitle: "Sin suscripciones mensuales. Pague fracciones de centavo ($0.001) por llamada usando firmas Web3 o tokens L402.",
    store_hero_cta_explore: "Explorar Catálogo",
    store_hero_cta_try: "Probar Sandbox en Vivo",
    store_hero_cta_admin: "Consola de Administración",
    store_catalog_title: "Mercado de APIs de Pago Por Uso",
    store_catalog_subtitle: "Servicios optimizados para agentes autónomos de IA y aplicaciones web.",
    store_try_btn: "Probar Punto Final",
    store_how_title: "Cómo Funciona el Protocolo x402",
    store_how_subtitle: "Verificación criptográfica de micropagos en menos de 5ms.",
    store_calc_title: "Pago Por Llamada vs Suscripciones SaaS Mensuales",
    store_calc_subtitle: "Calcule su ahorro sustituyendo suscripciones planas por micropagos exactos.",
    store_calc_requests: "Volumen Mensual de Solicitudes",
    store_calc_x402_cost: "Costo con Micro-pagos x402",
    store_calc_saas_cost: "Suscripciones SaaS Tradicionales",
    store_calc_savings: "Ahorro Mensual Estimado",
    store_faq_title: "Preguntas Frecuentes",
    stat_revenue: "Ingresos Totales",
    stat_requests: "Llamadas de Proxy",
    stat_paid_calls: "Aprobaciones Pagadas",
    stat_blocked_402: "Desafíos 402 Bloqueados",
    stat_latency: "Latencia Media Edge",
    stat_active_keys: "Claves API Activas",
    pg_title: "Banco de Pruebas de Protocolo x402",
    pg_subtitle: "Pruebe desafíos HTTP 402 Payment Required y micropagos Web3 USDC en vivo.",
    pg_select_endpoint: "Seleccionar Ruta de API",
    pg_auth_mode: "Método de Pago y Auth",
    pg_auth_none: "1. Ninguno (Activar Desafío 402)",
    pg_auth_key: "2. Clave API Prepagada",
    pg_auth_sandbox: "3. Micropago Sandbox",
    pg_auth_l402: "4. Token Macaroon L402",
    pg_send_btn: "Enviar Solicitud",
    pg_executing: "Procesando...",
    pg_req_payload: "JSON de Solicitud",
    pg_res_status: "Estado",
    pg_res_latency: "Latencia",
    pg_res_headers: "Encabezados",
    pg_res_body: "Carga Útil de Respuesta",
    pg_settle_invoice_btn: "Pagar $0.0015 y Resolver L402",
    pg_code_snippets: "Generador de Código Cliente",
    step_1: "1. Solicitud sin Autenticar",
    step_2: "2. Devuelve HTTP 402",
    step_3: "3. Pagar Desafío",
    step_4: "4. Ejecuta API y Devuelve 200",
    routes_title: "Rutas Monetizadas de la Pasarela",
    routes_subtitle: "Configure destinos de proxy y tarifas por llamada.",
    routes_add_btn: "Nueva Ruta Proxy",
    routes_col_name: "Nombre",
    routes_col_pattern: "Patrón de Ruta",
    routes_col_type: "Tipo",
    routes_col_price: "Precio",
    routes_col_status: "Estado",
    routes_col_actions: "Acciones",
    routes_active: "Activo",
    routes_inactive: "Inactivo",
    keys_title: "Claves API y Libro Mayor",
    keys_subtitle: "Administre claves API de clientes y saldos de prueba.",
    keys_add_btn: "Crear Clave API",
    keys_faucet_btn: "Reclamar $10.00 de Prueba",
    keys_col_key: "Secreto de Clave API",
    keys_col_name: "Nombre",
    keys_col_balance: "Saldo",
    keys_col_spent: "Gasto Total",
    keys_col_status: "Estado",
    keys_topup_btn: "Recargar",
    ledger_title: "Transacciones Recientes",
    logs_title: "Registros de Solicitudes y Pagos",
    logs_subtitle: "Auditoría en tiempo real de desafíos 402 y ejecución proxy.",
    logs_col_time: "Hora",
    logs_col_route: "Ruta API",
    logs_col_status: "Estado",
    logs_col_method: "Método de Pago",
    logs_col_cost: "Ingresos",
    logs_col_latency: "Latencia",
    logs_col_ip: "IP Cliente",
    logs_inspect: "Inspeccionar",
    guide_title: "Lista de Verificación para Producción Cloudflare",
    guide_subtitle: "Conecte su dominio personalizado, billeteras Web3 y Stripe.",
    guide_step1_title: "1. Billetera Web3 / EVM",
    guide_step1_desc: "Configure su dirección de producción para recibir USDC.",
    guide_step2_title: "2. Nodo Lightning L402",
    guide_step2_desc: "Vincule credenciales REST para emitir facturas BOLT11.",
    guide_step3_title: "3. Dominio Personalizado Cloudflare",
    guide_step3_desc: "Añada su dominio API en Cloudflare Dashboard.",
    guide_step4_title: "4. Desplegar con Wrangler CLI",
    guide_step4_desc: "Ejecute 'wrangler deploy' en su terminal.",
    modal_close: "Cerrar",
    modal_save: "Guardar Ruta",
    modal_cancel: "Cancelar",
    modal_create_key: "Crear Clave",
    modal_topup_title: "Recargar Saldo de Clave API",
    modal_topup_amount: "Monto a Recargar (USD)",
    modal_topup_confirm: "Confirmar Depósito",
    pay_modal_title: "Desafío de Micropago x402",
    pay_modal_desc: "Factura HTTP 402 emitida.",
    pay_modal_instant: "Liquidación Instantánea Sandbox",
    pay_modal_simulate_btn: "Simular Pago y Desbloquear",
    toast_402_issued: "¡Se devolvió HTTP 402 Pago Requerido!",
    toast_200_ok: "200 OK: Micropago verificado!",
    toast_faucet_claimed: "¡Se agregaron $10.00 de prueba!"
  }
};

function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [mainView, setMainView] = useState('storefront'); // 'storefront' or 'admin'
  const [activeTab, setActiveTab] = useState('playground');
  const [stats, setStats] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [keysData, setKeysData] = useState({ keys: [], ledger: [] });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Playground & Storefront Try-it-out state
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [authMode, setAuthMode] = useState('none');
  const [customApiKey, setCustomApiKey] = useState('x402_live_demo888899990000');
  const [customL402Preimage, setCustomL402Preimage] = useState('');
  const [reqBody, setReqBody] = useState('');
  const [playgroundRes, setPlaygroundRes] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [handshakeStep, setHandshakeStep] = useState(0);
  const [snippetLang, setSnippetLang] = useState('curl');

  // Calculator State
  const [calcVolume, setCalcVolume] = useState(50000);

  // Modals
  const [showPayModal, setShowPayModal] = useState(false);
  const [pendingInvoice, setPendingInvoice] = useState(null);
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);
  const [showAddKeyModal, setShowAddKeyModal] = useState(false);
  const [showTopupModal, setShowTopupModal] = useState(false);
	  const [selectedKeyForTopup, setSelectedKeyForTopup] = useState(null);
	  const [topupAmount, setTopupAmount] = useState(10.00);
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

  // Workspace Secrets, Code Search & Production Todo State
  const [secrets, setSecrets] = useState([]);
  const [sidePanelOpen, setSidePanelOpen] = useState(true);
  const [editingSecret, setEditingSecret] = useState(null);
  const [codeSearchQuery, setCodeSearchQuery] = useState('PAY_WALLET');
  const [newSecretForm, setNewSecretForm] = useState({ key_name: '', secret_value: '', category: 'web3', description: '' });

  // Interactive Production To-Do Checklist State
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Set Web3 EVM Micropayment Vault Address ({PAY_WALLET})', category: 'Wallet & Vault', completed: true, details: 'Configure Base / Solana receiving wallet address for live USDC micropayments.' },
    { id: 2, title: 'Configure Lightning L402 Node REST Credentials', category: 'Lightning L402', completed: false, details: 'Bind Alby or LND REST macaroon to generate live BOLT11 invoices.' },
    { id: 3, title: 'Bind OpenAI / DeepSeek API Key for AI LLM Proxy Route', category: 'AI Services', completed: true, details: 'Store OPENAI_API_KEY in workspace variables panel.' },
    { id: 4, title: 'Test HTTP 402 Invoice Challenge & 1-Click Settlement in Sandbox', category: 'Testing', completed: true, details: 'Execute test request in Interactive Testbench to verify L402 token generation.' },
    { id: 5, title: 'Connect Custom API Domain in Cloudflare Dashboard', category: 'Cloudflare', completed: false, details: 'Route api.yourdomain.com to this Workers Durable Object instance.' },
    { id: 6, title: 'Enable Cloudflare Access OIDC & MFA for Admin Portal', category: 'Security & Auth', completed: false, details: 'Toggle security switch to enforce SSO & hardware MFA keys.' },
    { id: 7, title: 'Synchronize Repository & Deploy via Wrangler CLI', category: 'Deployment', completed: false, details: '1-click push to GitHub and execute wrangler deploy.' }
  ]);

  // Cloudflare Access OIDC & GitHub Integration State
  const [oidcConfig, setOidcConfig] = useState({
    mode: 'dev_open',
    cloudflare_access_domain: 'myorg.cloudflareaccess.com',
    oidc_client_id: 'cf_access_client_x402',
    require_mfa: 1,
    allowed_domains: '["@company.com", "admin@cf.dev"]',
    active_session_user: 'Dev Sandbox Admin'
  });
  const [oidcTestResult, setOidcTestResult] = useState(null);
  const [isTestingOidc, setIsTestingOidc] = useState(false);

  const [ghConfig, setGhConfig] = useState({
    gh_username: '',
    gh_token: '',
    target_repo: 'x402-gateway-cloudflare',
    connected_at: null,
    last_sync_time: null
  });
  const [isPushingGh, setIsPushingGh] = useState(false);
  const [ghPushResult, setGhPushResult] = useState(null);

  // Auto-detect browser language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('x402_preferred_lang');
    if (savedLang && (I18N_DICT[savedLang] || savedLang === 'en-GB')) {
      setCurrentLang(savedLang);
    } else if (navigator.language) {
      const bFull = navigator.language;
      const bCode = bFull.split('-')[0].toLowerCase();
      if (bFull.toLowerCase() === 'en-gb' || bFull.toLowerCase() === 'en-uk') {
        setCurrentLang('en-GB');
      } else if (I18N_DICT[bCode]) {
        setCurrentLang(bCode);
      }
    }
  }, []);

  const changeLanguage = (langCode) => {
    setCurrentLang(langCode);
    localStorage.setItem('x402_preferred_lang', langCode);
    const langObj = LANGUAGES.find(l => l.code === langCode);
    if (langObj) {
      document.documentElement.dir = langObj.dir;
      document.documentElement.lang = langCode;
    }
  };

  const t = (key) => {
    const dict = I18N_DICT[currentLang] || I18N_DICT['en-GB'] || I18N_DICT.en;
    return dict[key] || I18N_DICT.en[key] || key;
  };

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchData = async () => {
    try {
      const [statsRes, routesRes, keysRes, logsRes, secretsRes, oidcRes, ghRes] = await Promise.all([
        fetch('./api/stats').then(r => r.json()),
        fetch('./api/routes').then(r => r.json()),
        fetch('./api/keys').then(r => r.json()),
        fetch('./api/logs').then(r => r.json()),
        fetch('./api/secrets').then(r => r.json()).catch(() => []),
        fetch('./api/security/oidc').then(r => r.json()).catch(() => null),
        fetch('./api/github/status').then(r => r.json()).catch(() => null)
      ]);

      setStats(statsRes);
      setRoutes(routesRes);
      setKeysData(keysRes);
      setLogs(logsRes);
      if (Array.isArray(secretsRes)) setSecrets(secretsRes);
      if (oidcRes) setOidcConfig(oidcRes);
      if (ghRes) setGhConfig(ghRes);

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

  const handleSaveOidc = async () => {
    try {
      const res = await fetch('./api/security/oidc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(oidcConfig)
      });
      const data = await res.json();
      if (data.success) {
        showToast("Cloudflare Access OIDC & MFA settings saved!", "success");
      }
    } catch (err) {
      showToast("Failed to save OIDC settings", "error");
    }
  };

  const handleTestOidcHandshake = async () => {
    setIsTestingOidc(true);
    setOidcTestResult(null);
    try {
      const res = await fetch('./api/security/oidc/test-handshake', { method: 'POST' });
      const data = await res.json();
      setOidcTestResult(data);
      showToast("OIDC Handshake tested successfully!", "success");
    } catch (err) {
      showToast("OIDC Handshake failed", "error");
    } finally {
      setIsTestingOidc(false);
    }
  };

  const handleSaveGhConfig = async () => {
    try {
      const res = await fetch('./api/github/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ghConfig)
      });
      const data = await res.json();
      if (data.success) {
        setGhConfig(prev => ({ ...prev, gh_username: data.gh_username, connected_at: Date.now() }));
        showToast("GitHub account connected!", "success");
      }
    } catch (err) {
      showToast("Failed to save GitHub credentials", "error");
    }
  };

  const handlePushToGithub = async () => {
    setIsPushingGh(true);
    setGhPushResult(null);
    try {
      const res = await fetch('./api/github/push', { method: 'POST' });
      const data = await res.json();
      setGhPushResult(data);
      if (data.success) {
        showToast("Codebase successfully pushed to GitHub!", "success");
        fetchData();
      }
    } catch (err) {
      showToast("GitHub sync failed", "error");
    } finally {
      setIsPushingGh(false);
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

  const handleTestRouteFromStorefront = (route) => {
    handleSelectRoute(route);
    setMainView('admin');
    setActiveTab('playground');
    showToast(`Switched to Live Sandbox for ${route.name}`, "info");
  };

  // Execute Request in Playground
  const executePlaygroundRequest = async (overrideHeaders = {}) => {
    if (!selectedRoute) return;

    setIsExecuting(true);
    setHandshakeStep(1);

    const headers = { ...overrideHeaders, 'Accept-Language': currentLang };
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

    setTimeout(() => setHandshakeStep(2), 200);

    try {
      const startTime = performance.now();
      const targetPath = selectedRoute.path_pattern;
      
      const res = await fetch(`.${targetPath}?lang=${currentLang}`, {
        method,
        headers,
        body: method === 'POST' ? reqBody : undefined
      });

      const elapsed = Math.round(performance.now() - startTime);
      const resHeaders = {};
      res.headers.forEach((val, key) => { resHeaders[key] = val; });

      let data;
      try { data = await res.json(); } catch { data = await res.text(); }

      setHandshakeStep(3);

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
        showToast(t("toast_402_issued"), "warning");
      } else if (res.status === 200) {
        showToast(t("toast_200_ok"), "success");
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
        showToast("L402 Invoice Settled! Preimage obtained. Re-executing call...", "success");
        setTimeout(() => executePlaygroundRequest({ Authorization: res.auth_header }), 300);
      }
    } catch (err) {
      showToast("Settlement failed: " + err.message, "error");
    }
  };

  // Claim Testnet Faucet
  const handleClaimFaucet = async () => {
    try {
      const res = await fetch('./api/faucet/topup', { method: 'POST' }).then(r => r.json());
      if (res.success) {
        showToast(t("toast_faucet_claimed"), "success");
        if (res.keySecret) setCustomApiKey(res.keySecret);
        fetchData();
      }
    } catch (err) {
      showToast("Faucet error: " + err.message, "error");
    }
  };

  // Create New Route
  const handleCreateRoute = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('./api/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRouteForm)
      }).then(r => r.json());

      if (res.id) {
        showToast(`Created route ${res.name}!`, "success");
        setShowAddRouteModal(false);
        fetchData();
      }
    } catch (err) {
      showToast("Failed to create route: " + err.message, "error");
    }
  };

  // Create API Key
  const handleCreateKey = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('./api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newKeyName || 'New Developer Key',
          initial_balance: Number(newKeyBalance)
        })
      }).then(r => r.json());

      if (res.id) {
        showToast(`Created API Key: ${res.key_secret}`, "success");
        setCustomApiKey(res.key_secret);
        setShowAddKeyModal(false);
        fetchData();
      }
    } catch (err) {
      showToast("Key creation error: " + err.message, "error");
    }
  };

  // Save Secret / Workspace Variable
  const handleSaveSecret = async (e) => {
    if (e) e.preventDefault();
    if (!editingSecret || !editingSecret.key_name) return;

    try {
      const res = await fetch('./api/secrets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key_name: editingSecret.key_name,
          secret_value: editingSecret.secret_value,
          category: editingSecret.category || 'web3',
          description: editingSecret.description || ''
        })
      }).then(r => r.json());

      if (res.success) {
        showToast(`Saved workspace variable ${res.key_name}!`, "success");
        setEditingSecret(null);
        fetchData();
      }
    } catch (err) {
      showToast("Error saving secret: " + err.message, "error");
    }
  };

  // Delete Secret
  const handleDeleteSecret = async (keyName) => {
    try {
      const res = await fetch(`./api/secrets/${keyName}`, { method: 'DELETE' }).then(r => r.json());
      if (res.success) {
        showToast(`Deleted workspace variable ${keyName}`, "info");
        if (editingSecret?.key_name === keyName) setEditingSecret(null);
        fetchData();
      }
    } catch (err) {
      showToast("Delete error: " + err.message, "error");
    }
  };

  // Toggle Production Todo Item
  const toggleTodoItem = (id) => {
    setTodoList(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
    showToast("Updated production checklist progress", "info");
  };
  const handleTopupKey = async (e) => {
    e.preventDefault();
    if (!selectedKeyForTopup) return;

    try {
      const res = await fetch(`./api/keys/${selectedKeyForTopup.id}/topup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(topupAmount),
          method: 'stripe_simulated'
        })
      }).then(r => r.json());

      if (res.success) {
        showToast(`Top-up of $${Number(topupAmount).toFixed(2)} successful!`, "success");
        setShowTopupModal(false);
        fetchData();
      }
    } catch (err) {
      showToast("Top-up failed: " + err.message, "error");
    }
  };

  // Code Snippet Generator
  const getCodeSnippet = () => {
    if (!selectedRoute) return "";
    const routeUrl = `${window.location.origin}${selectedRoute.path_pattern}`;
    
    if (snippetLang === 'curl') {
      if (authMode === 'api_key') {
        return `# Execute with Pre-funded API Key\ncurl -X POST "${routeUrl}" \\\n  -H "X-API-Key: ${customApiKey}" \\\n  -H "Accept-Language: ${currentLang}" \\\n  -H "Content-Type: application/json" \\\n  -d '${reqBody.replace(/'/g, "\\'")}'`;
      } else if (authMode === 'sandbox') {
        return `# Execute with Instant Sandbox Micropayment\ncurl -X POST "${routeUrl}" \\\n  -H "X-402-Sandbox-Key: sandbox_demo" \\\n  -H "Accept-Language: ${currentLang}" \\\n  -H "Content-Type: application/json" \\\n  -d '${reqBody.replace(/'/g, "\\'")}'`;
      } else if (authMode === 'l402' && customL402Preimage) {
        return `# Execute with L402 Macaroon Preimage Token\ncurl -X POST "${routeUrl}" \\\n  -H "Authorization: L402 macaroon_proof_jwt_x402:${customL402Preimage}" \\\n  -H "Accept-Language: ${currentLang}" \\\n  -H "Content-Type: application/json" \\\n  -d '${reqBody.replace(/'/g, "\\'")}'`;
      } else {
        return `# Trigger HTTP 402 Payment Required Challenge\ncurl -i -X POST "${routeUrl}" \\\n  -H "Accept-Language: ${currentLang}" \\\n  -H "Content-Type: application/json" \\\n  -d '${reqBody.replace(/'/g, "\\'")}'`;
      }
    } else if (snippetLang === 'js') {
      return `// JavaScript / Node.js Fetch with x402 Micropayment Header
async function callX402Api() {
  const response = await fetch('${routeUrl}', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': '${currentLang}',
      'X-API-Key': '${customApiKey}'
    },
    body: JSON.stringify(${reqBody})
  });

  if (response.status === 402) {
    const challenge = await response.json();
    console.log("HTTP 402 Payment Required Invoice:", challenge.x402);
    // 1. Settle challenge via Web3 USDC / Lightning
    // 2. Retry request with Authorization: L402 macaroon:preimage
  } else {
    const data = await response.json();
    console.log("API Result:", data);
  }
}

callX402Api();`;
    } else if (snippetLang === 'python') {
      return `# Python requests library x402 Gateway Client
import requests

url = "${routeUrl}"
headers = {
    "Content-Type": "application/json",
    "Accept-Language": "${currentLang}",
    "X-API-Key": "${customApiKey}"
}
payload = ${reqBody}

response = requests.post(url, headers=headers, json=payload)

if response.status_code == 402:
    invoice = response.json().get("x402")
    print(f"HTTP 402 Payment Required: Settle {invoice['price_usd']} USD on Base/Solana")
else:
    print("API Success:", response.json())`;
    } else if (snippetLang === 'go') {
      return `// Go Client for x402 Micropayment Gateway
package main

import (
    "bytes"
    "fmt"
    "net/http"
)

func main() {
    url := "${routeUrl}"
    jsonStr := []byte(\`${reqBody}\`)
    
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Accept-Language", "${currentLang}")
    req.Header.Set("X-API-Key", "${customApiKey}")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil { panic(err) }
    defer resp.Body.Close()

    fmt.Printf("Response Status: %s\\n", resp.Status)
}`;
    }
    return "";
  };

  const isRtl = LANGUAGES.find(l => l.code === currentLang)?.dir === 'rtl';

  // Calculator Numbers
  const calcX402Cost = (calcVolume * 0.0015).toFixed(2);
  const saasCost = 299.00;
  const calcSavings = (saasCost - Number(calcX402Cost)).toFixed(2);

  return (
    <div className={`min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col font-sans ${isRtl ? 'rtl' : 'ltr'}`}>
      
      {/* Top Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl transition-all duration-300 animate-bounce ${
          notification.type === 'success' ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200' :
          notification.type === 'warning' ? 'bg-amber-950/90 border-amber-500/50 text-amber-200' :
          notification.type === 'info' ? 'bg-indigo-950/90 border-indigo-500/50 text-indigo-200' :
          'bg-rose-950/90 border-rose-500/50 text-rose-200'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> :
           notification.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-amber-400" /> :
           notification.type === 'info' ? <Sparkles className="w-5 h-5 text-indigo-400" /> :
           <XCircle className="w-5 h-5 text-rose-400" />}
          <span className="text-sm font-medium">{notification.msg}</span>
        </div>
      )}

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#0b0f19]/90 backdrop-blur-md border-b border-gray-800/80 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setMainView('storefront')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Zap className="w-5 h-5 fill-current text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">{t("app_title")}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  x402 Protocol
                </span>
              </div>
              <p className="text-xs text-gray-400 hidden md:block">{t("app_subtitle")}</p>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs & Language Select */}
        <div className="flex items-center gap-3">
          
          {/* Main View Mode Selector (Storefront vs Admin Portal) */}
          <div className="bg-gray-900/90 border border-gray-800 p-1 rounded-xl flex items-center gap-1 shadow-inner">
            <button
              onClick={() => setMainView('storefront')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mainView === 'storefront'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>{t("view_storefront")}</span>
            </button>

            <button
              onClick={() => setMainView('admin')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mainView === 'admin'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{t("view_admin")}</span>
            </button>
          </div>

          {/* Multi-Language Switcher Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-900/90 hover:bg-gray-800 border border-gray-800 rounded-xl text-xs font-medium text-gray-200 transition-colors">
              <Languages className="w-3.5 h-3.5 text-indigo-400" />
              <span>{LANGUAGES.find(l => l.code === currentLang)?.flag}</span>
              <span className="hidden sm:inline">{LANGUAGES.find(l => l.code === currentLang)?.name}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl py-1 hidden group-hover:block z-50">
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-gray-500 border-b border-gray-800">
                Select Language / 语言
              </div>
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-indigo-600/10 hover:text-indigo-300 transition-colors ${
                    currentLang === lang.code ? 'text-indigo-400 font-semibold bg-indigo-500/10' : 'text-gray-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                  {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
              ))}
            </div>
          </div>

        </div>
      </header>

      {/* VIEW 1: PUBLIC CUSTOMER STOREFRONT PAGE */}
      {mainView === 'storefront' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-16 animate-fadeIn">
          
          {/* Hero Section */}
          <section className="relative rounded-3xl bg-gradient-to-b from-indigo-950/40 via-gray-900/80 to-gray-950 border border-indigo-500/20 p-8 lg:p-12 overflow-hidden shadow-2xl text-center space-y-8">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t("store_hero_badge")}</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
              {t("store_hero_title")}
            </h1>

            <p className="text-gray-300 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              {t("store_hero_subtitle")}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="#catalog"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <Store className="w-4 h-4" />
                <span>{t("store_hero_cta_explore")}</span>
              </a>

              <button
                onClick={() => {
                  setMainView('admin');
                  setActiveTab('playground');
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 font-semibold text-sm transition-all"
              >
                <Play className="w-4 h-4 text-emerald-400" />
                <span>{t("store_hero_cta_try")}</span>
              </button>

              <button
                onClick={() => setMainView('admin')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900/50 hover:bg-gray-800/80 border border-gray-800 text-gray-400 hover:text-white font-medium text-sm transition-all"
              >
                <Settings className="w-4 h-4" />
                <span>{t("store_hero_cta_admin")}</span>
              </button>
            </div>

            {/* Ticker / Stat Ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-800/80">
              <div className="p-3 bg-gray-900/50 rounded-2xl border border-gray-800/50">
                <div className="text-2xl font-bold text-emerald-400">{t("store_stat_1_val")}</div>
                <div className="text-xs text-gray-400">{t("store_stat_1_lbl")}</div>
              </div>
              <div className="p-3 bg-gray-900/50 rounded-2xl border border-gray-800/50">
                <div className="text-2xl font-bold text-indigo-400">{t("store_stat_2_val")}</div>
                <div className="text-xs text-gray-400">{t("store_stat_2_lbl")}</div>
              </div>
              <div className="p-3 bg-gray-900/50 rounded-2xl border border-gray-800/50">
                <div className="text-2xl font-bold text-purple-400">{t("store_stat_3_val")}</div>
                <div className="text-xs text-gray-400">{t("store_stat_3_lbl")}</div>
              </div>
              <div className="p-3 bg-gray-900/50 rounded-2xl border border-gray-800/50">
                <div className="text-2xl font-bold text-amber-400">{t("store_stat_4_val")}</div>
                <div className="text-xs text-gray-400">{t("store_stat_4_lbl")}</div>
              </div>
            </div>
          </section>

          {/* Public API Catalogue */}
          <section id="catalog" className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{t("store_catalog_title")}</h2>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">{t("store_catalog_subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes.map((route) => (
                <div
                  key={route.id}
                  className="bg-gray-900/90 border border-gray-800 hover:border-indigo-500/50 rounded-2xl p-6 flex flex-col justify-between space-y-5 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                        {route.type === 'builtin_ai' ? <Bot className="w-5 h-5" /> :
                         route.type === 'builtin_scraper' ? <Globe className="w-5 h-5" /> :
                         route.type === 'builtin_sandbox' ? <Cpu className="w-5 h-5" /> :
                         route.type === 'builtin_devtools' ? <QrCode className="w-5 h-5" /> :
                         <Server className="w-5 h-5" />}
                      </div>
                      <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        ${route.price_usd.toFixed(4)} / call
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{route.name}</h3>
                      <p className="text-xs font-mono text-gray-400 mt-1">{route.path_pattern}</p>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed">
                      {route.type === 'builtin_ai' ? 'Edge GPU LLM completion on OpenAI, DeepSeek & Workers AI.' :
                       route.type === 'builtin_scraper' ? 'Clean HTML DOM to Markdown extractor for LLM context injection.' :
                       route.type === 'builtin_sandbox' ? 'Isolated ephemeral V8 JS code execution sandbox.' :
                       route.type === 'builtin_devtools' ? 'High-speed SVG & PNG QR code generator API.' :
                       'Custom proxied upstream REST API backend.'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 uppercase font-mono">EVM USDC • L402</span>
                    <button
                      onClick={() => handleTestRouteFromStorefront(route)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <span>{t("store_try_btn")}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How x402 Protocol Works */}
          <section className="bg-gray-900/60 border border-gray-800 rounded-3xl p-8 lg:p-10 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white">{t("store_how_title")}</h2>
              <p className="text-gray-400 text-sm max-w-xl mx-auto">{t("store_how_subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 font-mono font-bold flex items-center justify-center text-sm border border-indigo-500/20">1</div>
                <h3 className="font-bold text-white text-base">{t("store_step_1_title")}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{t("store_step_1_desc")}</p>
              </div>

              <div className="p-6 bg-gray-900 rounded-2xl border border-amber-500/20 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-sm border border-amber-500/20">2</div>
                <h3 className="font-bold text-white text-base">{t("store_step_2_title")}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{t("store_step_2_desc")}</p>
              </div>

              <div className="p-6 bg-gray-900 rounded-2xl border border-emerald-500/20 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold flex items-center justify-center text-sm border border-emerald-500/20">3</div>
                <h3 className="font-bold text-white text-base">{t("store_step_3_title")}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{t("store_step_3_desc")}</p>
              </div>
            </div>
          </section>

          {/* Pay-Per-Call Savings Calculator */}
          <section className="bg-gradient-to-r from-gray-900 via-indigo-950/30 to-gray-900 border border-gray-800 rounded-3xl p-8 lg:p-10 space-y-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Cost Optimizer</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{t("store_calc_title")}</h2>
                <p className="text-gray-400 text-sm">{t("store_calc_subtitle")}</p>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-semibold text-gray-300">
                    <span>{t("store_calc_requests")}</span>
                    <span className="text-indigo-400 font-mono font-bold">{calcVolume.toLocaleString()} calls/mo</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="500000"
                    step="1000"
                    value={calcVolume}
                    onChange={(e) => setCalcVolume(Number(e.target.value))}
                    className="w-full accent-indigo-500 bg-gray-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                    <span>1,000</span>
                    <span>250,000</span>
                    <span>500,000</span>
                  </div>
                </div>
              </div>

              {/* Calculator Output Card */}
              <div className="w-full lg:w-96 bg-gray-950 border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex justify-between items-center pb-3 border-b border-gray-800 text-sm">
                  <span className="text-gray-400">{t("store_calc_x402_cost")}</span>
                  <span className="font-bold font-mono text-emerald-400">${calcX402Cost}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-800 text-sm">
                  <span className="text-gray-400">{t("store_calc_saas_cost")}</span>
                  <span className="font-bold font-mono text-rose-400 line-through">${saasCost.toFixed(2)}</span>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase text-gray-300">{t("store_calc_savings")}</span>
                  <span className="text-xl font-extrabold font-mono text-indigo-400">${calcSavings} / mo</span>
                </div>
              </div>
            </div>
          </section>

          {/* Customer FAQ Section */}
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white">{t("store_faq_title")}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl space-y-2">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <FaqIcon className="w-4 h-4 text-indigo-400" />
                  <span>{t("store_faq_1_q")}</span>
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">{t("store_faq_1_a")}</p>
              </div>

              <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl space-y-2">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Bot className="w-4 h-4 text-indigo-400" />
                  <span>{t("store_faq_2_q")}</span>
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">{t("store_faq_2_a")}</p>
              </div>

              <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl space-y-2">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Key className="w-4 h-4 text-indigo-400" />
                  <span>{t("store_faq_3_q")}</span>
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">{t("store_faq_3_a")}</p>
              </div>
            </div>
          </section>

        </main>
      )}

      {/* VIEW 2: ADMIN & DEVELOPER PORTAL PAGE */}
      {mainView === 'admin' && (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6 animate-fadeIn">
          
          {/* Admin Stats Header Ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-gray-900/80 border border-gray-800 p-3.5 rounded-2xl space-y-1">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{t("stat_revenue")}</div>
              <div className="text-lg font-extrabold text-emerald-400 font-mono">${stats?.total_revenue_usd?.toFixed(4) || "0.0000"}</div>
            </div>
            <div className="bg-gray-900/80 border border-gray-800 p-3.5 rounded-2xl space-y-1">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{t("stat_requests")}</div>
              <div className="text-lg font-extrabold text-indigo-400 font-mono">{stats?.total_requests || 0}</div>
            </div>
            <div className="bg-gray-900/80 border border-gray-800 p-3.5 rounded-2xl space-y-1">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{t("stat_paid_calls")}</div>
              <div className="text-lg font-extrabold text-purple-400 font-mono">{stats?.total_paid_requests || 0}</div>
            </div>
            <div className="bg-gray-900/80 border border-gray-800 p-3.5 rounded-2xl space-y-1">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{t("stat_blocked_402")}</div>
              <div className="text-lg font-extrabold text-amber-400 font-mono">{stats?.total_402_challenges || 0}</div>
            </div>
            <div className="bg-gray-900/80 border border-gray-800 p-3.5 rounded-2xl space-y-1">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{t("stat_latency")}</div>
              <div className="text-lg font-extrabold text-gray-200 font-mono">{stats?.avg_latency_ms || 2}ms</div>
            </div>
            <div className="bg-gray-900/80 border border-gray-800 p-3.5 rounded-2xl space-y-1">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{t("stat_active_keys")}</div>
              <div className="text-lg font-extrabold text-blue-400 font-mono">{stats?.active_api_keys || 0}</div>
            </div>
          </div>

		          {/* Admin Navigation Tabs */}
		          <div className="flex border-b border-gray-800 gap-2 overflow-x-auto pb-1">
		            {[
		              { id: 'playground', label: t("nav_playground"), icon: Play },
		              { id: 'routes', label: t("nav_routes"), icon: Layers },
		              { id: 'keys', label: t("nav_keys"), icon: Key },
		              { id: 'secrets', label: t("nav_secrets"), icon: Sliders },
		              { id: 'code_search', label: t("nav_code_search"), icon: Search },
		              { id: 'todo_list', label: t("nav_todo_list"), icon: CheckSquare },
		              { id: 'oidc', label: t("nav_oidc"), icon: ShieldCheck },
		              { id: 'github', label: t("nav_github"), icon: Code2 },
		              { id: 'logs', label: t("nav_logs"), icon: Terminal },
		              { id: 'deploy', label: t("nav_deploy"), icon: Rocket }
		            ].map(tab => {
	              const Icon = tab.icon;
	              return (
	                <button
	                  key={tab.id}
	                  onClick={() => setActiveTab(tab.id)}
	                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
	                    activeTab === tab.id
	                      ? 'bg-indigo-600/15 border border-indigo-500/40 text-indigo-300 shadow-sm'
	                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
	                  }`}
	                >
	                  <Icon className="w-4 h-4" />
	                  <span>{tab.label}</span>
	                </button>
	              );
	            })}
	          </div>

	          {/* Workspace Variables Floating Quick-Edit Panel */}
	          <div className="bg-gradient-to-r from-gray-900 via-indigo-950/20 to-gray-900 border border-indigo-500/30 p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
	            <div className="flex items-center gap-3">
	              <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/30 text-indigo-400">
	                <Sliders className="w-5 h-5" />
	              </div>
	              <div>
	                <div className="flex items-center gap-2">
	                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Active Code Variables & Constants</h3>
	                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
	                    {secrets.length} Variables Configured
	                  </span>
	                </div>
	                <p className="text-[11px] text-gray-400">
	                  Quick update variables like <code className="text-emerald-400 font-mono">{`{PAY_WALLET}`}</code>, <code className="text-indigo-400 font-mono">{`{OPENAI_API_KEY}`}</code> directly without modifying backend source.
	                </p>
	              </div>
	            </div>

	            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
	              {secrets.map(s => (
	                <button
	                  key={s.key_name}
	                  onClick={() => setEditingSecret({ ...s })}
	                  className="px-2.5 py-1.5 rounded-lg bg-gray-950 hover:bg-indigo-950/50 border border-gray-800 hover:border-indigo-500/50 text-[11px] font-mono text-gray-300 hover:text-indigo-300 flex items-center gap-1.5 transition-all shadow-sm"
	                >
	                  <span className="text-indigo-400 font-bold">{`{${s.key_name}}`}:</span>
	                  <span className="text-gray-400 max-w-[120px] truncate">{s.secret_value}</span>
	                </button>
	              ))}
	            </div>
	          </div>

          {/* TAB 1: INTERACTIVE PLAYGROUND / TESTBENCH */}
          {activeTab === 'playground' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Handshake Configurator */}
              <div className="lg:col-span-6 space-y-5 bg-gray-900/90 border border-gray-800 p-6 rounded-2xl">
                <div>
                  <h2 className="text-lg font-bold text-white">{t("pg_title")}</h2>
                  <p className="text-xs text-gray-400 mt-1">{t("pg_subtitle")}</p>
                </div>

                {/* Handshake Step Sequence Indicator */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className={`p-2 rounded-lg border ${handshakeStep >= 1 ? 'bg-indigo-950/60 border-indigo-500/50 text-indigo-300' : 'bg-gray-950 border-gray-800 text-gray-500'}`}>
                    {t("step_1")}
                  </div>
                  <div className={`p-2 rounded-lg border ${handshakeStep >= 2 ? 'bg-amber-950/60 border-amber-500/50 text-amber-300' : 'bg-gray-950 border-gray-800 text-gray-500'}`}>
                    {t("step_2")}
                  </div>
                </div>

                {/* Target Route Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">{t("pg_select_endpoint")}</label>
                  <select
                    value={selectedRoute?.id || ''}
                    onChange={(e) => {
                      const r = routes.find(x => x.id === e.target.value);
                      if (r) handleSelectRoute(r);
                    }}
                    className="w-full bg-gray-950 border border-gray-800 text-gray-200 text-xs rounded-xl p-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                  >
                    {routes.map(r => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.path_pattern}) — ${r.price_usd.toFixed(4)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Auth Mode Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">{t("pg_auth_mode")}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'none', label: t("pg_auth_none") },
                      { id: 'key', label: t("pg_auth_key") },
                      { id: 'sandbox', label: t("pg_auth_sandbox") },
                      { id: 'l402', label: t("pg_auth_l402") }
                    ].map(mode => (
                      <button
                        key={mode.id}
                        onClick={() => setAuthMode(mode.id)}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                          authMode === mode.id
                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-semibold'
                            : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Key Inputs */}
                {authMode === 'api_key' && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-gray-400">X-API-Key Secret Header</label>
                    <input
                      type="text"
                      value={customApiKey}
                      onChange={(e) => setCustomApiKey(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 text-xs font-mono text-emerald-400 p-2.5 rounded-xl"
                    />
                  </div>
                )}

                {/* Request Body Payload */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">{t("pg_req_payload")}</label>
                  <textarea
                    rows={5}
                    value={reqBody}
                    onChange={(e) => setReqBody(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 text-xs font-mono text-indigo-300 p-3 rounded-xl focus:border-indigo-500 outline-none"
                  ></textarea>
                </div>

                {/* Submit Request Button */}
                <button
                  onClick={() => executePlaygroundRequest()}
                  disabled={isExecuting}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isExecuting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isExecuting ? t("pg_executing") : t("pg_send_btn")}</span>
                </button>
              </div>

              {/* Right Column: Gateway Response Inspector */}
              <div className="lg:col-span-6 space-y-5 bg-gray-900/90 border border-gray-800 p-6 rounded-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-indigo-400" />
                      <span>{t("pg_res_body")}</span>
                    </h3>
                    {playgroundRes && (
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-full ${
                          playgroundRes.status === 200 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                          playgroundRes.status === 402 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                          'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}>
                          {playgroundRes.status} {playgroundRes.statusText}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">{playgroundRes.elapsedMs}ms</span>
                      </div>
                    )}
                  </div>

                  {playgroundRes ? (
                    <div className="space-y-3">
                      
                      {/* Interactive 402 Settlement CTA Banner */}
                      {playgroundRes.status === 402 && (
                        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 space-y-3">
                          <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                            <span>{t("pay_modal_title")}</span>
                          </div>
                          <p className="text-xs text-gray-300">{t("pay_modal_desc")}</p>
                          <button
                            onClick={() => setShowPayModal(true)}
                            className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 text-xs font-bold rounded-lg shadow transition-all flex items-center justify-center gap-1.5"
                          >
                            <Zap className="w-3.5 h-3.5 fill-current" />
                            <span>{t("pg_settle_invoice_btn")}</span>
                          </button>
                        </div>
                      )}

                      {/* Response Payload Box */}
                      <pre className="p-4 bg-gray-950 border border-gray-800/80 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto max-h-80 leading-relaxed">
                        {JSON.stringify(playgroundRes.data, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <div className="py-20 text-center space-y-2 border-2 border-dashed border-gray-800 rounded-xl">
                      <Terminal className="w-8 h-8 text-gray-600 mx-auto" />
                      <p className="text-xs text-gray-400">Click "Send Request" to test the x402 gateway handshake.</p>
                    </div>
                  )}
                </div>

                {/* Code Snippet Tabs */}
                <div className="pt-4 border-t border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
                    <span>{t("pg_code_snippets")}</span>
                    <div className="flex gap-1">
                      {['curl', 'js', 'python', 'go'].map(lang => (
                        <button
                          key={lang}
                          onClick={() => setSnippetLang(lang)}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                            snippetLang === lang ? 'bg-indigo-600 text-white font-bold' : 'bg-gray-800 text-gray-400'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                  <pre className="p-3 bg-gray-950 border border-gray-800 rounded-xl text-[11px] font-mono text-gray-300 overflow-x-auto max-h-32">
                    {getCodeSnippet()}
                  </pre>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MONETIZED ROUTES CONFIGURATOR */}
          {activeTab === 'routes' && (
            <div className="space-y-5 bg-gray-900/90 border border-gray-800 p-6 rounded-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-white">{t("routes_title")}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{t("routes_subtitle")}</p>
                </div>
                <button
                  onClick={() => setShowAddRouteModal(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t("routes_add_btn")}</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-gray-800 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-950 text-gray-400 uppercase font-mono border-b border-gray-800">
                    <tr>
                      <th className="p-3">{t("routes_col_name")}</th>
                      <th className="p-3">{t("routes_col_pattern")}</th>
                      <th className="p-3">{t("routes_col_type")}</th>
                      <th className="p-3">{t("routes_col_price")}</th>
                      <th className="p-3">{t("routes_col_status")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {routes.map(r => (
                      <tr key={r.id} className="hover:bg-gray-800/30">
                        <td className="p-3 font-semibold text-white">{r.name}</td>
                        <td className="p-3 font-mono text-indigo-400">{r.path_pattern}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 font-mono text-[10px]">
                            {r.type}
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold text-emerald-400">${r.price_usd.toFixed(4)}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">
                            {t("routes_active")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: API KEYS & CREDIT LEDGER */}
          {activeTab === 'keys' && (
            <div className="space-y-6">
              <div className="bg-gray-900/90 border border-gray-800 p-6 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-white">{t("keys_title")}</h2>
                    <p className="text-xs text-gray-400 mt-0.5">{t("keys_subtitle")}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleClaimFaucet}
                      className="px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold rounded-xl flex items-center gap-2"
                    >
                      <Coins className="w-4 h-4 text-emerald-400" />
                      <span>{t("keys_faucet_btn")}</span>
                    </button>
                    <button
                      onClick={() => setShowAddKeyModal(true)}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{t("keys_add_btn")}</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto border border-gray-800 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-950 text-gray-400 uppercase font-mono border-b border-gray-800">
                      <tr>
                        <th className="p-3">{t("keys_col_name")}</th>
                        <th className="p-3">{t("keys_col_key")}</th>
                        <th className="p-3">{t("keys_col_balance")}</th>
                        <th className="p-3">{t("keys_col_spent")}</th>
                        <th className="p-3">{t("routes_col_actions")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/60">
                      {keysData.keys.map(k => (
                        <tr key={k.id} className="hover:bg-gray-800/30">
                          <td className="p-3 font-semibold text-white">{k.name}</td>
                          <td className="p-3 font-mono text-emerald-400">{k.key_secret}</td>
                          <td className="p-3 font-mono font-bold text-emerald-400">${k.balance_usd.toFixed(2)}</td>
                          <td className="p-3 font-mono text-gray-400">${k.total_spent.toFixed(4)}</td>
                          <td className="p-3">
                            <button
                              onClick={() => {
                                setSelectedKeyForTopup(k);
                                setShowTopupModal(true);
                              }}
                              className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 text-xs font-medium rounded-lg text-indigo-300 border border-gray-700"
                            >
                              {t("keys_topup_btn")}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

	              {/* Ledger Audit Table */}
	              <div className="bg-gray-900/90 border border-gray-800 p-6 rounded-2xl space-y-3">
	                <h3 className="text-sm font-bold text-white">{t("ledger_title")}</h3>
	                <div className="overflow-x-auto border border-gray-800 rounded-xl">
	                  <table className="w-full text-left text-xs font-mono">
	                    <thead className="bg-gray-950 text-gray-400 uppercase border-b border-gray-800">
	                      <tr>
	                        <th className="p-2.5">Time</th>
	                        <th className="p-2.5">Type</th>
	                        <th className="p-2.5">Amount</th>
	                        <th className="p-2.5">Description</th>
	                      </tr>
	                    </thead>
	                    <tbody className="divide-y divide-gray-800/60">
	                      {keysData.ledger.slice(0, 10).map((l, i) => (
	                        <tr key={i} className="hover:bg-gray-800/20">
	                          <td className="p-2.5 text-gray-500">{new Date(l.created_at).toLocaleTimeString()}</td>
	                          <td className="p-2.5 uppercase font-bold text-indigo-400">{l.type}</td>
	                          <td className={`p-2.5 font-bold ${l.amount_usd >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
	                            {l.amount_usd >= 0 ? '+' : ''}${l.amount_usd.toFixed(4)}
	                          </td>
	                          <td className="p-2.5 text-gray-300">{l.description}</td>
	                        </tr>
	                      ))}
	                    </tbody>
	                  </table>
	                </div>
	              </div>
	            </div>
	          )}

	          {/* TAB: WORKSPACE VARIABLES & SIDE PANEL */}
	          {activeTab === 'secrets' && (
	            <div className="space-y-6 bg-gray-900/90 border border-gray-800 p-6 rounded-2xl">
	              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
	                <div>
	                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
	                    <Sliders className="w-5 h-5 text-indigo-400" />
	                    <span>Workspace Variables & Environment Constants</span>
	                  </h2>
	                  <p className="text-xs text-gray-400 mt-1">
	                    Configure backend secrets (<code className="text-emerald-400 font-mono">{`{PAY_WALLET}`}</code>, <code className="text-indigo-400 font-mono">{`{OPENAI_API_KEY}`}</code>, <code className="text-amber-400 font-mono">{`{SOLANA_RPC_URL}`}</code>) directly stored in Durable Object SQLite.
	                  </p>
	                </div>

	                <button
	                  onClick={() => setEditingSecret({ key_name: 'NEW_VAR_' + Date.now().toString().slice(-4), secret_value: '', category: 'web3', description: '' })}
	                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all"
	                >
	                  <Plus className="w-4 h-4" />
	                  <span>New Workspace Variable</span>
	                </button>
	              </div>

	              {/* Grid of Configured Variables */}
	              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
	                {secrets.map((sec) => (
	                  <div
	                    key={sec.key_name}
	                    className="bg-gray-950 border border-gray-800 hover:border-indigo-500/50 rounded-xl p-4 flex flex-col justify-between space-y-3 transition-all group"
	                  >
	                    <div className="space-y-2">
	                      <div className="flex items-center justify-between">
	                        <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30">
	                          {`{${sec.key_name}}`}
	                        </span>
	                        <span className="text-[10px] font-mono text-gray-400 uppercase bg-gray-900 px-2 py-0.5 rounded border border-gray-800">
	                          {sec.category || 'general'}
	                        </span>
	                      </div>
	                      <p className="text-xs text-gray-400 leading-relaxed">{sec.description || 'Configured workspace constant.'}</p>
	                    </div>

	                    <div className="p-2.5 bg-gray-900 rounded-lg border border-gray-800 font-mono text-xs text-indigo-300 truncate">
	                      {sec.secret_value ? sec.secret_value : <span className="text-gray-600 italic">(Empty Value)</span>}
	                    </div>

	                    <div className="flex items-center justify-between pt-2 border-t border-gray-800/60">
	                      <button
	                        onClick={() => handleDeleteSecret(sec.key_name)}
	                        className="text-gray-500 hover:text-rose-400 text-xs flex items-center gap-1 transition-colors"
	                      >
	                        <Trash2 className="w-3.5 h-3.5" />
	                        <span>Delete</span>
	                      </button>

	                      <button
	                        onClick={() => setEditingSecret({ ...sec })}
	                        className="px-3 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-semibold rounded-lg transition-all"
	                      >
	                        Edit Variable
	                      </button>
	                    </div>
	                  </div>
	                ))}
	              </div>
	            </div>
	          )}

	          {/* TAB: CONSOLE CODE & CONST SEARCH BAR */}
	          {activeTab === 'code_search' && (
	            <div className="space-y-6 bg-gray-900/90 border border-gray-800 p-6 rounded-2xl">
	              <div>
	                <h2 className="text-lg font-bold text-white flex items-center gap-2">
	                  <Search className="w-5 h-5 text-indigo-400" />
	                  <span>Console Code & Constant Search</span>
	                </h2>
	                <p className="text-xs text-gray-400 mt-1">
	                  Search through code variables, constants (<code className="text-emerald-400 font-mono">PAY_WALLET</code>, <code className="text-indigo-400 font-mono">OPENAI_API_KEY</code>, <code className="text-amber-400 font-mono">price_usd</code>), and route definitions across the x402 Gateway.
	                </p>
	              </div>

	              {/* Search Bar Input */}
	              <div className="relative">
	                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
	                <input
	                  type="text"
	                  value={codeSearchQuery}
	                  onChange={(e) => setCodeSearchQuery(e.target.value)}
	                  placeholder="Type a const name or variable like PAY_WALLET, price_usd, or route..."
	                  className="w-full bg-gray-950 border border-gray-800 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-3 text-xs font-mono text-white outline-none"
	                />
	              </div>

	              {/* Filtered Code Results */}
	              <div className="space-y-4">
	                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Search Results</h3>

	                {/* 1. Variable Matches */}
	                {secrets.filter(s => s.key_name.toLowerCase().includes(codeSearchQuery.toLowerCase()) || s.secret_value.toLowerCase().includes(codeSearchQuery.toLowerCase())).map(sec => (
	                  <div key={sec.key_name} className="p-4 bg-gray-950 border border-indigo-500/30 rounded-xl space-y-2">
	                    <div className="flex items-center justify-between">
	                      <span className="text-xs font-mono font-bold text-emerald-400">const {sec.key_name} = "{sec.secret_value}";</span>
	                      <button
	                        onClick={() => setEditingSecret({ ...sec })}
	                        className="px-2.5 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded text-xs"
	                      >
	                        Edit Const
	                      </button>
	                    </div>
	                    <p className="text-[11px] text-gray-400 font-mono">{sec.description}</p>
	                  </div>
	                ))}

	                {/* 2. Route Matches */}
	                {routes.filter(r => r.name.toLowerCase().includes(codeSearchQuery.toLowerCase()) || r.path_pattern.toLowerCase().includes(codeSearchQuery.toLowerCase())).map(rt => (
	                  <div key={rt.id} className="p-4 bg-gray-950 border border-gray-800 rounded-xl space-y-2">
	                    <div className="flex items-center justify-between">
	                      <span className="text-xs font-mono text-indigo-300">const route_{rt.id} = &#123; path: "{rt.path_pattern}", priceUsd: {rt.price_usd} &#125;;</span>
	                      <button
	                        onClick={() => { setSelectedRoute(rt); setActiveTab('routes'); }}
	                        className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs"
	                      >
	                        Manage Route
	                      </button>
	                    </div>
	                    <p className="text-[11px] text-gray-400">{rt.name} ({rt.type})</p>
	                  </div>
	                ))}
	              </div>
	            </div>
	          )}

	          {/* TAB: PRODUCTION TO-DO CHECKLIST (ONE INSTRUCTION AT A TIME) */}
	          {activeTab === 'todo_list' && (
	            <div className="space-y-6 bg-gray-900/90 border border-gray-800 p-6 rounded-2xl">
	              <div>
	                <div className="flex items-center justify-between">
	                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
	                    <CheckSquare className="w-5 h-5 text-emerald-400" />
	                    <span>Structured Production Deployment Checklist</span>
	                  </h2>
	                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
	                    {todoList.filter(i => i.completed).length} of {todoList.length} Tasks Completed
	                  </span>
	                </div>
	                <p className="text-xs text-gray-400 mt-1">
	                  Designed for clear focus — follow these step-by-step actions one instruction at a time to take your x402 gateway live.
	                </p>
	              </div>

	              {/* Current Active Step Highlight Card (One instruction focus) */}
	              {(() => {
	                const currentTask = todoList.find(i => !i.completed) || todoList[todoList.length - 1];
	                return (
	                  <div className="p-6 bg-gradient-to-r from-indigo-950/60 via-gray-900 to-indigo-950/60 border-2 border-indigo-500/60 rounded-2xl space-y-4 shadow-xl">
	                    <div className="flex items-center justify-between">
	                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
	                        <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
	                        CURRENT FOCUS (Instruction Step #{currentTask.id})
	                      </span>
	                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
	                        {currentTask.category}
	                      </span>
	                    </div>

	                    <h3 className="text-lg font-bold text-white">{currentTask.title}</h3>
	                    <p className="text-xs text-gray-300 leading-relaxed">{currentTask.details}</p>

	                    <button
	                      onClick={() => toggleTodoItem(currentTask.id)}
	                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
	                        currentTask.completed
	                          ? 'bg-emerald-500 text-gray-950'
	                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg'
	                      }`}
	                    >
	                      <Check className="w-4 h-4" />
	                      <span>{currentTask.completed ? 'Step Completed!' : 'Mark Step as Complete & Advance'}</span>
	                    </button>
	                  </div>
	                );
	              })()}

	              {/* Complete Step List */}
	              <div className="space-y-3 pt-2">
	                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">All Production Checklist Steps</h3>
	                <div className="space-y-2">
	                  {todoList.map((item) => (
	                    <div
	                      key={item.id}
	                      onClick={() => toggleTodoItem(item.id)}
	                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
	                        item.completed
	                          ? 'bg-gray-950/50 border-gray-800 text-gray-500 line-through'
	                          : 'bg-gray-950 border-gray-800 hover:border-indigo-500/40 text-gray-200'
	                      }`}
	                    >
	                      <div className="flex items-center gap-3">
	                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
	                          item.completed ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'border-gray-700'
	                        }`}>
	                          {item.completed && <Check className="w-3.5 h-3.5" />}
	                        </div>
	                        <div>
	                          <div className="text-xs font-semibold">{item.id}. {item.title}</div>
	                          <div className="text-[10px] text-gray-500 font-mono">{item.category}</div>
	                        </div>
	                      </div>

	                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
	                        item.completed ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-gray-900 text-gray-400 border-gray-800'
	                      }`}>
	                        {item.completed ? 'DONE' : 'PENDING'}
	                      </span>
	                    </div>
	                  ))}
	                </div>
	              </div>
	            </div>
	          )}

          {/* TAB 4: REQUEST LOGS */}
          {activeTab === 'logs' && (
            <div className="space-y-4 bg-gray-900/90 border border-gray-800 p-6 rounded-2xl">
              <div>
                <h2 className="text-lg font-bold text-white">{t("logs_title")}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{t("logs_subtitle")}</p>
              </div>

              <div className="overflow-x-auto border border-gray-800 rounded-xl">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-gray-950 text-gray-400 uppercase border-b border-gray-800">
                    <tr>
                      <th className="p-3">{t("logs_col_time")}</th>
                      <th className="p-3">{t("logs_col_route")}</th>
                      <th className="p-3">{t("logs_col_status")}</th>
                      <th className="p-3">{t("logs_col_method")}</th>
                      <th className="p-3">{t("logs_col_cost")}</th>
                      <th className="p-3">{t("logs_col_latency")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {logs.map(log => (
                      <tr key={log.id} className="hover:bg-gray-800/30">
                        <td className="p-3 text-gray-500">{new Date(log.created_at).toLocaleTimeString()}</td>
                        <td className="p-3 text-indigo-300">{log.route_path}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-bold ${
                            log.response_code === 200 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {log.response_code}
                          </span>
                        </td>
                        <td className="p-3 text-gray-400">{log.payment_method}</td>
                        <td className="p-3 text-emerald-400 font-bold">${log.cost_usd.toFixed(4)}</td>
                        <td className="p-3 text-gray-400">{log.latency_ms}ms</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: PRODUCTION DEPLOYMENT GUIDE */}
          {activeTab === 'deploy' && (
            <div className="space-y-6 bg-gray-900/90 border border-gray-800 p-6 rounded-2xl">
              <div>
                <h2 className="text-lg font-bold text-white">{t("guide_title")}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{t("guide_subtitle")}</p>
              </div>

	              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
	                <div className="p-5 bg-gray-950 border border-gray-800 rounded-xl space-y-2">
	                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
	                    <Wallet className="w-4 h-4 text-indigo-400" />
	                    <span>{t("guide_step1_title")}</span>
	                  </h3>
	                  <p className="text-xs text-gray-400 leading-relaxed">{t("guide_step1_desc")}</p>
	                </div>

	                <div className="p-5 bg-gray-950 border border-gray-800 rounded-xl space-y-2">
	                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
	                    <Zap className="w-4 h-4 text-amber-400" />
	                    <span>{t("guide_step2_title")}</span>
	                  </h3>
	                  <p className="text-xs text-gray-400 leading-relaxed">{t("guide_step2_desc")}</p>
	                </div>

	                <div className="p-5 bg-gray-950 border border-gray-800 rounded-xl space-y-2">
	                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
	                    <Globe className="w-4 h-4 text-emerald-400" />
	                    <span>{t("guide_step3_title")}</span>
	                  </h3>
	                  <p className="text-xs text-gray-400 leading-relaxed">{t("guide_step3_desc")}</p>
	                </div>

	                <div className="p-5 bg-gray-950 border border-gray-800 rounded-xl space-y-2">
	                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
	                    <Terminal className="w-4 h-4 text-blue-400" />
	                    <span>{t("guide_step4_title")}</span>
	                  </h3>
	                  <p className="text-xs text-gray-400 leading-relaxed">{t("guide_step4_desc")}</p>
	                </div>
	              </div>
	            </div>
	          )}

          {/* TAB: CLOUDFLARE ACCESS OIDC & MFA SECURITY */}
          {activeTab === 'oidc' && (
            <div className="space-y-6 bg-gray-900/90 border border-gray-800 p-6 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-400" />
                    <span>Cloudflare Access OIDC & MFA Security Center</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Enforce Zero Trust Single Sign-On (SSO) and Multi-Factor Authentication (MFA) for the Admin Portal.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${
                    oidcConfig.mode === 'enforced'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    {oidcConfig.mode === 'enforced' ? '🔒 OIDC SSO ENFORCED' : '🔓 DEV SANDBOX MODE'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Mode Selector & Configuration Form */}
                <div className="bg-gray-950 border border-gray-800 p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-indigo-400" />
                    <span>Authentication Policy Settings</span>
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1">Access Control Mode</label>
                      <select
                        value={oidcConfig.mode}
                        onChange={(e) => setOidcConfig({ ...oidcConfig, mode: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="dev_open">Dev Sandbox (Open Admin Access for Testing)</option>
                        <option value="enforced">Cloudflare Access OIDC Enforced (Require Corporate SSO)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1">Cloudflare Access Team Domain</label>
                      <input
                        type="text"
                        value={oidcConfig.cloudflare_access_domain}
                        onChange={(e) => setOidcConfig({ ...oidcConfig, cloudflare_access_domain: e.target.value })}
                        placeholder="myorg.cloudflareaccess.com"
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1">OIDC Client ID</label>
                      <input
                        type="text"
                        value={oidcConfig.oidc_client_id}
                        onChange={(e) => setOidcConfig({ ...oidcConfig, oidc_client_id: e.target.value })}
                        placeholder="cf_access_client_x402"
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1">Allowed Email Domains (JSON Array)</label>
                      <input
                        type="text"
                        value={oidcConfig.allowed_domains}
                        onChange={(e) => setOidcConfig({ ...oidcConfig, allowed_domains: e.target.value })}
                        placeholder='["@company.com", "admin@cf.dev"]'
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="require_mfa"
                        checked={Boolean(oidcConfig.require_mfa)}
                        onChange={(e) => setOidcConfig({ ...oidcConfig, require_mfa: e.target.checked ? 1 : 0 })}
                        className="rounded bg-gray-900 border-gray-800 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="require_mfa" className="text-xs text-gray-300 cursor-pointer">
                        Require Hardware MFA Key / TOTP Verification for all admin sessions
                      </label>
                    </div>

                    <button
                      onClick={handleSaveOidc}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md mt-2"
                    >
                      Save Security Policy Settings
                    </button>
                  </div>
                </div>

                {/* Live OIDC Handshake Simulator & Verification Output */}
                <div className="bg-gray-950 border border-gray-800 p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Key className="w-4 h-4 text-emerald-400" />
                      <span>Live OIDC Handshake & Token Tester</span>
                    </h3>
                    <button
                      onClick={handleTestOidcHandshake}
                      disabled={isTestingOidc}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isTestingOidc ? 'animate-spin' : ''}`} />
                      <span>{isTestingOidc ? 'Verifying...' : 'Test Handshake'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    Test the JWT token claims, MFA status, and identity assertions passed by Cloudflare Zero Trust Access headers (<code className="text-indigo-300 font-mono">CF-Access-JWT-Assertion</code>).
                  </p>

                  {oidcTestResult ? (
                    <div className="space-y-3 bg-gray-900/90 border border-gray-800 p-4 rounded-xl">
                      <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-xs">
                        <span className="text-gray-400">Authenticated Identity:</span>
                        <span className="font-bold text-emerald-400 font-mono">{oidcTestResult.user}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-xs">
                        <span className="text-gray-400">Hardware MFA Status:</span>
                        <span className="font-bold text-indigo-300 font-mono">{oidcTestResult.mfaType}</span>
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-gray-400 mb-1">OIDC ID Token Claims JSON:</div>
                        <pre className="text-[11px] font-mono bg-gray-950 p-3 rounded-lg border border-gray-800 text-emerald-300 overflow-x-auto">
                          {JSON.stringify(oidcTestResult.idTokenClaims, null, 2)}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center border border-dashed border-gray-800 rounded-xl space-y-2">
                      <ShieldCheck className="w-8 h-8 text-gray-600 mx-auto" />
                      <div className="text-xs text-gray-400">Click <strong>"Test Handshake"</strong> above to verify OIDC token parsing.</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: GITHUB SYNC & LOCAL SETUP */}
          {activeTab === 'github' && (
            <div className="space-y-6 bg-gray-900/90 border border-gray-800 p-6 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-indigo-400" />
                    <span>GitHub Integration & Local Workstation Setup</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Synchronize your x402 gateway repository with GitHub and deploy locally via Wrangler CLI.
                  </p>
                </div>
                {ghConfig.last_sync_time && (
                  <span className="text-[11px] text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Last Synced: {new Date(ghConfig.last_sync_time).toLocaleTimeString()}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* GitHub Account Connect & 1-Click Push Card */}
                <div className="bg-gray-950 border border-gray-800 p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-indigo-400" />
                    <span>1. Connect Repository & Export Code</span>
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1">Target Repository Name</label>
                      <input
                        type="text"
                        value={ghConfig.target_repo}
                        onChange={(e) => setGhConfig({ ...ghConfig, target_repo: e.target.value })}
                        placeholder="x402-gateway-cloudflare"
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1">GitHub Username / Org</label>
                      <input
                        type="text"
                        value={ghConfig.gh_username}
                        onChange={(e) => setGhConfig({ ...ghConfig, gh_username: e.target.value })}
                        placeholder="your-github-username"
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1">Personal Access Token (PAT) / OAuth Token</label>
                      <input
                        type="password"
                        value={ghConfig.gh_token}
                        onChange={(e) => setGhConfig({ ...ghConfig, gh_token: e.target.value })}
                        placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleSaveGhConfig}
                        className="flex-1 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold transition-all border border-gray-700"
                      >
                        Save Credentials
                      </button>
                      <button
                        onClick={handlePushToGithub}
                        disabled={isPushingGh}
                        className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isPushingGh ? 'animate-spin' : ''}`} />
                        <span>{isPushingGh ? 'Pushing Repository...' : '1-Click Push to GitHub'}</span>
                      </button>
                    </div>

                    {ghPushResult && (
                      <div className="p-4 bg-gray-900/90 border border-emerald-500/30 rounded-xl space-y-2 mt-3 text-xs">
                        <div className="flex items-center justify-between text-emerald-400 font-bold">
                          <span>✅ Repository Sync Completed!</span>
                          <span className="font-mono text-[10px]">{ghPushResult.commitSha}</span>
                        </div>
                        <p className="text-gray-300">{ghPushResult.message}</p>
                        <a
                          href={ghPushResult.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-mono text-[11px] underline mt-1"
                        >
                          <span>View on GitHub: {ghPushResult.repoUrl}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Local Workstation Step-by-Step Terminal Commands */}
                <div className="bg-gray-950 border border-gray-800 p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>2. Local Terminal Commands</span>
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    Execute these commands on your terminal to run or deploy the gateway directly from your computer:
                  </p>

                  <div className="space-y-3 font-mono text-[11px]">
                    <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 space-y-1">
                      <div className="text-gray-500 text-[10px] uppercase font-sans">Step A: Clone & Install</div>
                      <code className="text-emerald-400 block select-all">
                        git clone https://github.com/{ghConfig.gh_username || 'username'}/{ghConfig.target_repo || 'x402-gateway-cloudflare'}.git
                      </code>
                      <code className="text-indigo-300 block select-all">cd {ghConfig.target_repo || 'x402-gateway-cloudflare'} && npm install</code>
                    </div>

                    <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 space-y-1">
                      <div className="text-gray-500 text-[10px] uppercase font-sans">Step B: Set Secrets via Wrangler</div>
                      <code className="text-amber-300 block select-all">npx wrangler secret put OPENAI_API_KEY</code>
                      <code className="text-amber-300 block select-all">npx wrangler secret put PAY_WALLET</code>
                    </div>

                    <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 space-y-1">
                      <div className="text-gray-500 text-[10px] uppercase font-sans">Step C: Deploy to Cloudflare Workers</div>
                      <code className="text-emerald-400 block select-all">npx wrangler deploy</code>
                    </div>
                  </div>

                  <div className="p-3 bg-indigo-950/30 border border-indigo-500/30 rounded-xl space-y-1.5 text-xs">
                    <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-indigo-400" />
                      <span>Why don't I see auth settings directly on GitHub?</span>
                    </div>
                    <p className="text-gray-400 text-[11px] leading-relaxed">
                      GitHub stores the open-source codebase repository. Security credentials (<code className="text-emerald-300">{`OPENAI_API_KEY`}</code>, <code className="text-emerald-300">{`PAY_WALLET`}</code>, and Cloudflare Access OIDC SSO rules) are stored securely inside Cloudflare Worker encrypted secrets and SQLite Durable Object storage. To set up GitHub OAuth for external client logins, create an OAuth App under GitHub Settings &gt; Developer Settings &gt; OAuth Apps using your Worker domain URL.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* MODAL 1: x402 PAYMENT CHALLENGE SETTLEMENT */}
      {showPayModal && pendingInvoice && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 w-full max-w-md rounded-2xl p-6 space-y-5 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400 fill-current" />
                <h3 className="font-bold text-white text-base">{t("pay_modal_title")}</h3>
              </div>
              <button onClick={() => setShowPayModal(false)} className="text-gray-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-gray-950 rounded-xl border border-gray-800 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Amount:</span>
                <span className="text-emerald-400 font-bold">${pendingInvoice.price_usd} USD</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Invoice ID:</span>
                <span className="text-indigo-400">{pendingInvoice.challenge_id}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Receiving Vault:</span>
                <span className="text-gray-300 truncate max-w-[180px]">{pendingInvoice.recipient_wallet}</span>
              </div>
            </div>

            <button
              onClick={handleSettleInvoice}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-gray-950 font-extrabold text-xs rounded-xl shadow-lg transition-all"
            >
              {t("pay_modal_simulate_btn")}
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD NEW ROUTE */}
      {showAddRouteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateRoute} className="bg-gray-900 border border-gray-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-white text-base">New x402 Proxy Route</h3>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Route Name</label>
              <input
                type="text"
                required
                placeholder="e.g. CoinGecko Crypto Feed"
                value={newRouteForm.name}
                onChange={e => setNewRouteForm({ ...newRouteForm, name: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 text-xs p-2.5 rounded-xl text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Path Pattern</label>
              <input
                type="text"
                required
                placeholder="/proxy/crypto-price"
                value={newRouteForm.path_pattern}
                onChange={e => setNewRouteForm({ ...newRouteForm, path_pattern: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 text-xs p-2.5 rounded-xl text-indigo-300 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Target Upstream URL</label>
              <input
                type="url"
                required
                placeholder="https://api.coingecko.com/..."
                value={newRouteForm.target_url}
                onChange={e => setNewRouteForm({ ...newRouteForm, target_url: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 text-xs p-2.5 rounded-xl text-emerald-300 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Price Per Request (USD)</label>
              <input
                type="number"
                step="0.0001"
                min="0.0001"
                required
                value={newRouteForm.price_usd}
                onChange={e => setNewRouteForm({ ...newRouteForm, price_usd: Number(e.target.value) })}
                className="w-full bg-gray-950 border border-gray-800 text-xs p-2.5 rounded-xl text-white font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAddRouteModal(false)} className="px-4 py-2 text-xs text-gray-400">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl">
                Create Route
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 3: CREATE API KEY */}
      {showAddKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateKey} className="bg-gray-900 border border-gray-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-white text-base">Issue Client API Key</h3>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Client / App Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Production AI Agent Bot"
                value={newKeyName}
                onChange={e => setNewKeyName(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 text-xs p-2.5 rounded-xl text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Initial Credit Balance (USD)</label>
              <input
                type="number"
                step="1"
                min="1"
                required
                value={newKeyBalance}
                onChange={e => setNewKeyBalance(Number(e.target.value))}
                className="w-full bg-gray-950 border border-gray-800 text-xs p-2.5 rounded-xl text-emerald-400 font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAddKeyModal(false)} className="px-4 py-2 text-xs text-gray-400">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl">
                Issue Key
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 4: TOP UP KEY BALANCE */}
      {showTopupModal && selectedKeyForTopup && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleTopupKey} className="bg-gray-900 border border-gray-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-white text-base">{t("modal_topup_title")}</h3>
            <p className="text-xs text-gray-400">Adding credits to: <span className="font-mono text-indigo-300">{selectedKeyForTopup.name}</span></p>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">{t("modal_topup_amount")}</label>
              <input
                type="number"
                step="5"
                min="5"
                required
                value={topupAmount}
                onChange={e => setTopupAmount(Number(e.target.value))}
                className="w-full bg-gray-950 border border-gray-800 text-sm p-3 rounded-xl text-emerald-400 font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowTopupModal(false)} className="px-4 py-2 text-xs text-gray-400">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl">
                {t("modal_topup_confirm")}
              </button>
            </div>
          </form>
        </div>
      )}

	      {/* MODAL 5: EDIT WORKSPACE VARIABLE */}
	      {editingSecret && (
	        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
	          <form onSubmit={handleSaveSecret} className="bg-gray-900 border border-indigo-500/40 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl">
	            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
	              <h3 className="font-bold text-white text-base flex items-center gap-2">
	                <Sliders className="w-4 h-4 text-indigo-400" />
	                <span>Edit Variable: <code className="text-emerald-400 font-mono">{`{${editingSecret.key_name}}`}</code></span>
	              </h3>
	              <button type="button" onClick={() => setEditingSecret(null)} className="text-gray-400 hover:text-white">
	                <XCircle className="w-5 h-5" />
	              </button>
	            </div>

	            <div className="space-y-1">
	              <label className="text-xs font-semibold text-gray-300">Variable Key Name</label>
	              <input
	                type="text"
	                required
	                value={editingSecret.key_name}
	                onChange={e => setEditingSecret({ ...editingSecret, key_name: e.target.value.toUpperCase() })}
	                className="w-full bg-gray-950 border border-gray-800 text-xs font-mono p-3 rounded-xl text-emerald-400 uppercase"
	              />
	            </div>

	            <div className="space-y-1">
	              <label className="text-xs font-semibold text-gray-300">Variable Value</label>
	              <textarea
	                rows={3}
	                required
	                value={editingSecret.secret_value}
	                onChange={e => setEditingSecret({ ...editingSecret, secret_value: e.target.value })}
	                className="w-full bg-gray-950 border border-gray-800 text-xs font-mono p-3 rounded-xl text-indigo-300 focus:border-indigo-500 outline-none"
	              />
	            </div>

	            <div className="grid grid-cols-2 gap-3">
	              <div className="space-y-1">
	                <label className="text-xs font-semibold text-gray-300">Category</label>
	                <select
	                  value={editingSecret.category || 'web3'}
	                  onChange={e => setEditingSecret({ ...editingSecret, category: e.target.value })}
	                  className="w-full bg-gray-950 border border-gray-800 text-xs p-2.5 rounded-xl text-gray-200"
	                >
	                  <option value="web3">web3</option>
	                  <option value="ai">ai</option>
	                  <option value="payments">payments</option>
	                  <option value="lightning">lightning</option>
	                  <option value="general">general</option>
	                </select>
	              </div>

	              <div className="space-y-1">
	                <label className="text-xs font-semibold text-gray-300">Description</label>
	                <input
	                  type="text"
	                  value={editingSecret.description || ''}
	                  onChange={e => setEditingSecret({ ...editingSecret, description: e.target.value })}
	                  className="w-full bg-gray-950 border border-gray-800 text-xs p-2.5 rounded-xl text-gray-200"
	                />
	              </div>
	            </div>

	            <div className="flex justify-end gap-2 pt-2">
	              <button type="button" onClick={() => setEditingSecret(null)} className="px-4 py-2 text-xs text-gray-400">
	                Cancel
	              </button>
	              <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg">
	                Save Workspace Variable
	              </button>
	            </div>
	          </form>
	        </div>
	      )}

	      {/* Footer */}
      <footer className="border-t border-gray-800/80 bg-[#0b0f19] px-4 lg:px-8 py-6 text-center text-xs text-gray-500">
        <p className="flex items-center justify-center gap-2">
          <span>x402 Monetized API Gateway</span>
          <span>•</span>
          <span>Powered by Cloudflare Workers Durable Objects & SQLite</span>
          <span>•</span>
          <span>HTTP 402 Standard</span>
        </p>
      </footer>

    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
