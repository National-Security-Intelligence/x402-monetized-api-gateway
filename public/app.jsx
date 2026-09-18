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
  Rocket
} from 'lucide-react';

// Multi-language translation dictionary for 8 global locales
const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
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
    nav_playground: "Interactive Playground",
    nav_routes: "Monetized Routes",
    nav_keys: "API Keys & Ledger",
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
  es: {
    app_title: "Pasarela x402",
    app_subtitle: "Motor de API Monetizada y Micro-pagos Web3 L402",
    nav_playground: "Entorno de Prueba Interactive",
    nav_routes: "Rutas Monetizadas",
    nav_keys: "Claves API y Saldo",
    nav_logs: "Registros e Ingresos",
    nav_deploy: "Guía de Producción",

    stat_revenue: "Ingresos Totales",
    stat_requests: "Llamadas de Proxy",
    stat_paid_calls: "Aprobaciones Pagadas",
    stat_blocked_402: "Desafíos 402 Bloqueados",
    stat_latency: "Latencia Media Edge",
    stat_active_keys: "Claves API Activas",

    pg_title: "Banco de Pruebas de Protocolo de Micro-pagos x402",
    pg_subtitle: "Pruebe desafíos HTTP 402 Payment Required, tokens L402 Macaroon y micropagos Web3 USDC en vivo.",
    pg_select_endpoint: "Seleccionar Ruta de API",
    pg_auth_mode: "Método de Pago y Autorización",
    pg_auth_none: "1. Ninguno (Activar Desafío 402)",
    pg_auth_key: "2. Clave API Prepagada",
    pg_auth_sandbox: "3. Micropago de Prueba Sandbox",
    pg_auth_l402: "4. Token Macaroon L402",
    pg_send_btn: "Enviar Solicitud",
    pg_executing: "Procesando Verificación...",
    pg_req_payload: "Carga de Solicitud JSON",
    pg_res_status: "Estado de Respuesta",
    pg_res_latency: "Latencia",
    pg_res_headers: "Encabezados de Pasarela",
    pg_res_body: "Carga Útil de Respuesta",
    pg_settle_invoice_btn: "Pagar $0.0015 y Resolver L402",
    pg_code_snippets: "Generador de Código de Cliente",

    step_1: "1. Enviar Solicitud sin Autenticar",
    step_2: "2. La Pasarela Devuelve HTTP 402",
    step_3: "3. Pagar Desafío / Proveer Clave",
    step_4: "4. La Pasarela Ejecuta API y Devuelve 200",

    routes_title: "Rutas Monetizadas de la Pasarela",
    routes_subtitle: "Configure destinos de proxy, tarifas por llamada y protocolos de pago permitidos.",
    routes_add_btn: "Nueva Ruta Proxy",
    routes_col_name: "Nombre de Ruta",
    routes_col_pattern: "Patrón de Ruta",
    routes_col_type: "Tipo de Ruta",
    routes_col_price: "Precio / Llamada",
    routes_col_status: "Estado",
    routes_col_actions: "Acciones",
    routes_active: "Activo",
    routes_inactive: "Inactivo",

    keys_title: "Claves API y Libro Mayor de Créditos",
    keys_subtitle: "Administre claves API de clientes, otorgue saldos de prueba y audite transacciones.",
    keys_add_btn: "Crear Clave API",
    keys_faucet_btn: "Reclamar $10.00 de Prueba",
    keys_col_key: "Secreto de Clave API",
    keys_col_name: "Nombre de Clave",
    keys_col_balance: "Saldo",
    keys_col_spent: "Gasto Total",
    keys_col_status: "Estado",
    keys_topup_btn: "Recargar",
    ledger_title: "Transacciones Recientes del Libro Mayor",

    logs_title: "Registros de Solicitudes y Auditoría de Pagos",
    logs_subtitle: "Registro en tiempo real de desafíos 402, verificaciones de pago y ejecución de proxies.",
    logs_col_time: "Hora",
    logs_col_route: "Ruta de la API",
    logs_col_status: "Código de Estado",
    logs_col_method: "Método de Pago",
    logs_col_cost: "Ingresos",
    logs_col_latency: "Latencia",
    logs_col_ip: "IP del Cliente",
    logs_inspect: "Inspeccionar",

    guide_title: "Lista de Verificación para Producción en Cloudflare",
    guide_subtitle: "Cómo conectar su dominio personalizado, billeteras Web3 reales, nodos Lightning y Stripe.",
    guide_step1_title: "1. Conectar Billetera de Liquidación Web3 / EVM",
    guide_step1_desc: "Reemplace la dirección de prueba en wrangler.json con su billetera de producción en Base / Arbitrum / Solana para recibir USDC real.",
    guide_step2_title: "2. Configurar Nodo Lightning L402 REST",
    guide_step2_desc: "Vincule credenciales REST de Alby, LND o Strike para emitir facturas BOLT11 reales y tokens Macaroon.",
    guide_step3_title: "3. Vincular Dominio Personalizado en Cloudflare",
    guide_step3_desc: "Añada su dominio API (ej. api.sudominio.com) en el Panel de Cloudflare -> Workers para protección SSL y DDoS Edge.",
    guide_step4_title: "4. Desplegar con Wrangler CLI",
    guide_step4_desc: "Ejecute 'wrangler deploy' en su terminal para desplegar la pasarela x402 directamente en su cuenta de Cloudflare.",

    modal_close: "Cerrar",
    modal_save: "Guardar Ruta",
    modal_cancel: "Cancelar",
    modal_create_key: "Crear Clave",
    modal_topup_title: "Recargar Saldo de Clave API",
    modal_topup_amount: "Monto a Recargar (USD)",
    modal_topup_confirm: "Confirmar Depósito",
    pay_modal_title: "Desafío de Micropago x402",
    pay_modal_desc: "La pasarela interceptó su llamada y emitió una factura HTTP 402.",
    pay_modal_instant: "Liquidación Instantánea en Red de Prueba (1 Clic)",
    pay_modal_simulate_btn: "Simular Pago y Desbloquear Preimagen",
    toast_402_issued: "¡Se devolvió HTTP 402 Pago Requerido!",
    toast_200_ok: "¡200 OK: Micropago verificado y proxy ejecutado!",
    toast_faucet_claimed: "¡Se agregaron $10.00 de saldo de prueba a la clave demo!"
  },
  fr: {
    app_title: "Passerelle x402",
    app_subtitle: "Moteur d'API Monétisée & Micro-paiements L402 Web3",
    nav_playground: "Espace de Test Interactif",
    nav_routes: "Routes Monétisées",
    nav_keys: "Clés API & Solde",
    nav_logs: "Journaux & Revenus",
    nav_deploy: "Guide de Production",

    stat_revenue: "Revenu Total Passerelle",
    stat_requests: "Appels Proxy Totaux",
    stat_paid_calls: "Vérifications Payées",
    stat_blocked_402: "Défis 402 Bloqués",
    stat_latency: "Latence Moyenne Edge",
    stat_active_keys: "Clés API Actives",

    pg_title: "Banc d'Essai du Protocole de Micro-Paiement x402",
    pg_subtitle: "Testez les défis HTTP 402 Payment Required, tokens L402 Macaroon et règlements USDC Web3 en direct.",
    pg_select_endpoint: "Sélectionner la Route API",
    pg_auth_mode: "Méthode de Paiement & Auth",
    pg_auth_none: "1. Aucun (Déclencher Défi 402)",
    pg_auth_key: "2. Clé API Préchargée",
    pg_auth_sandbox: "3. Micro-paiement Testnet Sandbox",
    pg_auth_l402: "4. Token Macaroon L402",
    pg_send_btn: "Envoyer la Requête",
    pg_executing: "Traitement de la Vérification...",
    pg_req_payload: "Charge Utile JSON Requête",
    pg_res_status: "Statut de la Réponse",
    pg_res_latency: "Latence",
    pg_res_headers: "En-têtes de Passerelle",
    pg_res_body: "Charge Utile de Réponse",
    pg_settle_invoice_btn: "Payer 0.0015$ & Régler L402",
    pg_code_snippets: "Générateur de Code Client",

    step_1: "1. Envoyer Requête Non Authentifiée",
    step_2: "2. La Passerelle Renvoie HTTP 402",
    step_3: "3. Régler le Défi / Fournir la Clé",
    step_4: "4. La Passerelle Exécute l'API & Renvoie 200",

    routes_title: "Routes API Monétisées",
    routes_subtitle: "Configurez les cibles proxy, tarifs par appel et protocoles de paiement autorisés.",
    routes_add_btn: "Nouvelle Route Proxy",
    routes_col_name: "Nom de Route",
    routes_col_pattern: "Format du Chemin",
    routes_col_type: "Type de Route",
    routes_col_price: "Prix / Appel",
    routes_col_status: "Statut",
    routes_col_actions: "Actions",
    routes_active: "Actif",
    routes_inactive: "Inactif",

    keys_title: "Clés API & Registre de Crédit",
    keys_subtitle: "Gérez les clés API clients, créditez des soldes de test et inspectez les transactions.",
    keys_add_btn: "Créer une Clé API",
    keys_faucet_btn: "Obtenir 10.00$ de Test",
    keys_col_key: "Secret de la Clé API",
    keys_col_name: "Nom de la Clé",
    keys_col_balance: "Solde",
    keys_col_spent: "Total Dépensé",
    keys_col_status: "Statut",
    keys_topup_btn: "Recharger",
    ledger_title: "Transactions Récentes du Registre",

    logs_title: "Journaux de Requêtes & Audit de Paiement",
    logs_subtitle: "Journalisation en temps réel pour défis 402, vérifications de paiements et exécutions proxy.",
    logs_col_time: "Heure",
    logs_col_route: "Chemin API",
    logs_col_status: "Code Statut",
    logs_col_method: "Mode de Paiement",
    logs_col_cost: "Revenu",
    logs_col_latency: "Latence",
    logs_col_ip: "IP Client",
    logs_inspect: "Inspecter",

    guide_title: "Guide de Déploiement en Production Cloudflare",
    guide_subtitle: "Connectez votre domaine personnalisé, vos portefeuilles Web3, vos nœuds Lightning et Stripe.",
    guide_step1_title: "1. Connecter le Portefeuille Web3 / EVM",
    guide_step1_desc: "Remplacez l'adresse de test dans wrangler.json par votre portefeuille de production sur Base / Arbitrum / Solana pour recevoir des USDC.",
    guide_step2_title: "2. Configurer le Nœud Lightning L402 REST",
    guide_step2_desc: "Liez vos identifiants REST Alby, LND ou Strike pour émettre de vraies factures BOLT11 et des jetons Macaroon.",
    guide_step3_title: "3. Attacher un Domaine Personnalisé Cloudflare",
    guide_step3_desc: "Ajoutez votre domaine API (ex. api.votre-domaine.com) dans le tableau de bord Cloudflare -> Workers pour la protection SSL et DDoS.",
    guide_step4_title: "4. Déployer avec Wrangler CLI",
    guide_step4_desc: "Exécutez 'wrangler deploy' dans votre terminal pour déployer cette passerelle x402 directement sur votre compte Cloudflare.",

    modal_close: "Fermer",
    modal_save: "Enregistrer la Route",
    modal_cancel: "Annuler",
    modal_create_key: "Créer la Clé",
    modal_topup_title: "Recharger le Solde de la Clé API",
    modal_topup_amount: "Montant à Recharger (USD)",
    modal_topup_confirm: "Confirmer le Dépôt",
    pay_modal_title: "Défi de Micro-Paiement x402",
    pay_modal_desc: "La passerelle a intercepté votre appel et a émis une facture HTTP 402.",
    pay_modal_instant: "Règlement Instantané Testnet (1 Clic)",
    pay_modal_simulate_btn: "Simuler le Paiement & Déverrouiller le Pré-image",
    toast_402_issued: "Code HTTP 402 Paiement Requis renvoyé !",
    toast_200_ok: "200 OK : Micro-paiement vérifié & proxy exécuté !",
    toast_faucet_claimed: "10.00$ de crédits de test ajoutés à la clé démo !"
  },
  de: {
    app_title: "x402 Gateway",
    app_subtitle: "Monetisierte API Engine & L402 Web3 Mikrozahlungen",
    nav_playground: "Interaktives Testfeld",
    nav_routes: "Monetisierte Routen",
    nav_keys: "API-Schlüssel & Guthaben",
    nav_logs: "Protokolle & Einnahmen",
    nav_deploy: "Produktions-Guide",

    stat_revenue: "Gesamteinnahmen Gateway",
    stat_requests: "Gesamte Proxy-Aufrufe",
    stat_paid_calls: "Bezahlte Prüfungen",
    stat_blocked_402: "402 Blockierte Challenges",
    stat_latency: "Durchschnittliche Edge-Latenz",
    stat_active_keys: "Aktive API-Schlüssel",

    pg_title: "x402 Mikrozahlungs-Protokoll Testumgebung",
    pg_subtitle: "Testen Sie HTTP 402 Payment Required Challenges, L402 Macaroons und Web3 USDC Zahlungen live.",
    pg_select_endpoint: "Ziel-API-Route Wählen",
    pg_auth_mode: "Zahlungs- & Auth-Methode",
    pg_auth_none: "1. Keine (402 Challenge Auslösen)",
    pg_auth_key: "2. Prepaid API-Schlüssel",
    pg_auth_sandbox: "3. Testnet Sandbox Mikrozahlung",
    pg_auth_l402: "4. L402 Macaroon Token",
    pg_send_btn: "Anfrage Senden",
    pg_executing: "Verarbeitung Läuft...",
    pg_req_payload: "Anfrage JSON Inhalt",
    pg_res_status: "Antwort Status",
    pg_res_latency: "Latenz",
    pg_res_headers: "Gateway Header",
    pg_res_body: "Antwort Inhalt",
    pg_settle_invoice_btn: "0,0015 $ Zahlen & L402 Begleichen",
    pg_code_snippets: "Client-Code-Generator",

    step_1: "1. Unauthentifizierte Anfrage Senden",
    step_2: "2. Gateway Liefert HTTP 402 Zurück",
    step_3: "3. Challenge Begleichen / Schlüssel Angeben",
    step_4: "4. Gateway Führt API Aus & Liefert 200",

    routes_title: "Monetisierte API Gateway Routen",
    routes_subtitle: "Konfigurieren Sie Proxy-Ziele, Preise pro Aufruf und erlaubte Zahlungsprotokolle.",
    routes_add_btn: "Neue Proxy-Route",
    routes_col_name: "Routenname",
    routes_col_pattern: "Pfadmuster",
    routes_col_type: "Routentyp",
    routes_col_price: "Preis / Aufruf",
    routes_col_status: "Status",
    routes_col_actions: "Aktionen",
    routes_active: "Aktiv",
    routes_inactive: "Inaktiv",

    keys_title: "API-Schlüssel & Kredit-Hauptbuch",
    keys_subtitle: "Verwalten Sie Kunden-Schlüssel, gewähren Sie Testguthaben und prüfen Sie Transaktionen.",
    keys_add_btn: "API-Schlüssel Erstellen",
    keys_faucet_btn: "10,00 $ Test-Guthaben Holen",
    keys_col_key: "API-Schlüssel Geheimnis",
    keys_col_name: "Schlüsselname",
    keys_col_balance: "Guthaben",
    keys_col_spent: "Gesamtausgaben",
    keys_col_status: "Status",
    keys_topup_btn: "Aufladen",
    ledger_title: "Aktuelle Transaktionen im Hauptbuch",

    logs_title: "Anfrageprotokolle & Zahlungsprüfung",
    logs_subtitle: "Echtzeit-Protokollierung von 402 Challenges, Zahlungsprüfungen und Proxy-Ausführungen.",
    logs_col_time: "Zeit",
    logs_col_route: "API-Pfad",
    logs_col_status: "Statuscode",
    logs_col_method: "Zahlungsmethode",
    logs_col_cost: "Einnahmen",
    logs_col_latency: "Latenz",
    logs_col_ip: "Client IP",
    logs_inspect: "Inspezieren",

    guide_title: "Produktions-Checkliste für Cloudflare",
    guide_subtitle: "So verbinden Sie Ihre eigene Domain, echte Web3 Wallets, Lightning Nodes und Stripe.",
    guide_step1_title: "1. Web3 / EVM Wallet Verbinden",
    guide_step1_desc: "Ersetzen Sie die Testadresse in wrangler.json durch Ihre echte Wallet auf Base / Arbitrum / Solana für USDC-Empfang.",
    guide_step2_title: "2. Lightning L402 REST Node Einrichten",
    guide_step2_desc: "Binden Sie Alby-, LND- oder Strike-Zugangsdaten ein, um echte BOLT11-Rechnungen und Macaroons auszugeben.",
    guide_step3_title: "3. Eigene Domain in Cloudflare Verknüpfen",
    guide_step3_desc: "Fügen Sie Ihre API-Domain (z.B. api.ihredomain.com) im Cloudflare Dashboard -> Workers für SSL und DDoS-Schutz hinzu.",
    guide_step4_title: "4. Mit Wrangler CLI Bereitstellen",
    guide_step4_desc: "Führen Sie 'wrangler deploy' in Ihrem Terminal aus, um dieses x402 Gateway direkt in Ihrem Cloudflare Konto zu veröffentlichen.",

    modal_close: "Schließen",
    modal_save: "Route Speichern",
    modal_cancel: "Abbrechen",
    modal_create_key: "Schlüssel Erstellen",
    modal_topup_title: "API-Schlüssel Guthaben Aufladen",
    modal_topup_amount: "Aufladebetrag (USD)",
    modal_topup_confirm: "Einzahlung Bestätigen",
    pay_modal_title: "x402 Mikrozahlungs-Challenge",
    pay_modal_desc: "Das Gateway hat Ihren Aufruf abgefangen und eine HTTP 402 Rechnung ausgestellt.",
    pay_modal_instant: "Sofortige Testnet-Abrechnung (1-Klick)",
    pay_modal_simulate_btn: "Zahlung Simulieren & Preimage Freischalten",
    toast_402_issued: "HTTP 402 Zahlung Erforderlich zurückgegeben!",
    toast_200_ok: "200 OK: Mikrozahlung verifiziert & Proxy ausgeführt!",
    toast_faucet_claimed: "10,00 $ Testguthaben zum Demo-Schlüssel hinzugefügt!"
  },
  zh: {
    app_title: "x402 API 网关",
    app_subtitle: "货币化 API 引擎与 L402 Web3 微支付结算中心",
    nav_playground: "交互式测试控制台",
    nav_routes: "货币化 API 路由",
    nav_keys: "API 密钥与账本",
    nav_logs: "请求日志与收益",
    nav_deploy: "生产部署指南",

    stat_revenue: "网关总收益",
    stat_requests: "代理请求总数",
    stat_paid_calls: "已付费成功数",
    stat_blocked_402: "402 拦截挑战数",
    stat_latency: "平均边缘延迟",
    stat_active_keys: "活跃 API 密钥",

    pg_title: "x402 微支付协议测试台",
    pg_subtitle: "实时测试 HTTP 402 Payment Required 挑战、L402 Macaroon 令牌及 Web3 USDC 结算。",
    pg_select_endpoint: "选择目标 API 路由",
    pg_auth_mode: "支付与身份验证方式",
    pg_auth_none: "1. 无认证（触发 402 挑战）",
    pg_auth_key: "2. 预充值 API 密钥",
    pg_auth_sandbox: "3. 测试网 Sandbox 微支付",
    pg_auth_l402: "4. L402 Macaroon 凭证",
    pg_send_btn: "发送请求",
    pg_executing: "正在验证握手...",
    pg_req_payload: "请求 JSON 内容",
    pg_res_status: "响应状态码",
    pg_res_latency: "请求延迟",
    pg_res_headers: "网关响应头",
    pg_res_body: "响应数据",
    pg_settle_invoice_btn: "支付 $0.0015 并解锁 L402",
    pg_code_snippets: "客户端代码生成器",

    step_1: "1. 发送未授权请求",
    step_2: "2. 网关返回 HTTP 402 响应",
    step_3: "3. 完成微支付 / 提供 API 密钥",
    step_4: "4. 网关执行 API 并返回 200",

    routes_title: "货币化 API 网关路由设置",
    routes_subtitle: "配置代理目标地址、单次调用计费规则与允许的支付协议。",
    routes_add_btn: "新建代理路由",
    routes_col_name: "路由名称",
    routes_col_pattern: "路径模式",
    routes_col_type: "路由类型",
    routes_col_price: "单次价格",
    routes_col_status: "状态",
    routes_col_actions: "操作",
    routes_active: "已启用",
    routes_inactive: "已禁用",

    keys_title: "API 密钥与信用账本管理",
    keys_subtitle: "管理客户端密钥、发放测试额度及审计 SQLite 账本扣款记录。",
    keys_add_btn: "创建 API 密钥",
    keys_faucet_btn: "领取 $10.00 测试水龙头",
    keys_col_key: "API 密钥 Secret",
    keys_col_name: "密钥名称",
    keys_col_balance: "当前余额",
    keys_col_spent: "累计消费",
    keys_col_status: "状态",
    keys_topup_btn: "充值",
    ledger_title: "最近账本交易明细",

    logs_title: "实时请求日志与支付审计",
    logs_subtitle: "毫秒级边缘日志，记录 402 拦截、微支付验证及 API 代理执行过程。",
    logs_col_time: "时间",
    logs_col_route: "API 路径",
    logs_col_status: "状态码",
    logs_col_method: "支付方式",
    logs_col_cost: "产生的收益",
    logs_col_latency: "延迟",
    logs_col_ip: "客户端 IP",
    logs_inspect: "查看详情",

    guide_title: "Cloudflare 生产环境部署清单",
    guide_subtitle: "如何绑定自定义域名、配置 Web3 真实钱包、闪电网络及 Stripe 充值。",
    guide_step1_title: "1. 连接 Web3 / EVM 结算钱包",
    guide_step1_desc: "将 wrangler.json 中的测试钱包地址替换为您的 Base / Arbitrum / Solana 主网收款地址，直接接收 USDC。",
    guide_step2_title: "2. 配置闪电网络 L402 REST 节点",
    guide_step2_desc: "绑定 Alby、LND 或 Strike API 凭据，生成真实的 BOLT11 闪电发票与 Macaroon 凭证。",
    guide_step3_title: "3. 绑定 Cloudflare 自定义 API 域名",
    guide_step3_desc: "在 Cloudflare 控制台 -> Workers 触发器中添加您的自定义域名（例如 api.yourdomain.com），享受 Edge 全球 DDoS 与 SSL 保护。",
    guide_step4_title: "4. 使用 Wrangler CLI 一键部署",
    guide_step4_desc: "在终端运行 'wrangler deploy' 即可将基于 SQLite Durable Object 的 x402 网关直接发布到 Cloudflare 账号。",

    modal_close: "关闭",
    modal_save: "保存路由",
    modal_cancel: "取消",
    modal_create_key: "创建密钥",
    modal_topup_title: "充值 API 密钥余额",
    modal_topup_amount: "充值金额 (USD)",
    modal_topup_confirm: "确认充值",
    pay_modal_title: "x402 微支付挑战框",
    pay_modal_desc: "网关已拦截您的请求并生成了 HTTP 402 发票。",
    pay_modal_instant: "1-Click 测试网一键模拟结算",
    pay_modal_simulate_btn: "模拟支付并获取 Preimage 密钥",
    toast_402_issued: "已返回 HTTP 402 Payment Required 响应！",
    toast_200_ok: "200 OK：微支付已验证，代理服务执行成功！",
    toast_faucet_claimed: "已成功为 Demo 密钥注入 $10.00 测试额度！"
  },
  ja: {
    app_title: "x402 ゲートウェイ",
    app_subtitle: "収益化 API エンジン & L402 Web3 マイクロペイメント",
    nav_playground: "インタラクティブ・テスト環境",
    nav_routes: "収益化 API ルート",
    nav_keys: "API キー & 残高",
    nav_logs: "ログ & 収益分析",
    nav_deploy: "本番デプロイガイド",

    stat_revenue: "ゲートウェイ総収益",
    stat_requests: "総プロキシ呼び出し数",
    stat_paid_calls: "決済済みリクエスト",
    stat_blocked_402: "402 ブロックチャレンジ",
    stat_latency: "平均エッジレイテンシ",
    stat_active_keys: "アクティブ API キー",

    pg_title: "x402 マイクロ決済プロトコル・テストベンチ",
    pg_subtitle: "HTTP 402 Payment Required チャレンジ、L402 Macaroon、Web3 USDC マイクロ決済をリアルタイムでテスト。",
    pg_select_endpoint: "ターゲット API ルートの選択",
    pg_auth_mode: "決済 & 認証方式",
    pg_auth_none: "1. 認証なし (402 チャレンジを発生)",
    pg_auth_key: "2. 事前チャージ済み API キー",
    pg_auth_sandbox: "3. テストネット Sandbox 決済",
    pg_auth_l402: "4. L402 Macaroon トークン",
    pg_send_btn: "リクエスト送信",
    pg_executing: "検証処理中...",
    pg_req_payload: "リクエスト JSON ペイロード",
    pg_res_status: "レスポンスステータス",
    pg_res_latency: "レイテンシ",
    pg_res_headers: "ゲートウェイヘッダー",
    pg_res_body: "レスポンスデータ",
    pg_settle_invoice_btn: "$0.0015 を支払って L402 解除",
    pg_code_snippets: "クライアントコード生成器",

    step_1: "1. 未認証リクエストを送信",
    step_2: "2. ゲートウェイが HTTP 402 を返却",
    step_3: "3. 決済を実行 / APIキーを提供",
    step_4: "4. API を実行して 200 を返却",

    routes_title: "収益化 API ゲートウェイルート設定",
    routes_subtitle: "プロキシターゲット、コールごとの料金、許可する決済プロトコルを設定。",
    routes_add_btn: "新規プロキシルート",
    routes_col_name: "ルート名",
    routes_col_pattern: "パスパターン",
    routes_col_type: "ルートタイプ",
    routes_col_price: "料金 / 回",
    routes_col_status: "ステータス",
    routes_col_actions: "操作",
    routes_active: "有効",
    routes_inactive: "無効",

    keys_title: "API キー & クレジット台帳",
    keys_subtitle: "クライアント API キーの管理、テスト残高の発行、SQLite 取引履歴の確認。",
    keys_add_btn: "API キーを作成",
    keys_faucet_btn: "$10.00 テストクレジットを取得",
    keys_col_key: "API キーシークレット",
    keys_col_name: "キー名",
    keys_col_balance: "現在の残高",
    keys_col_spent: "累計使用額",
    keys_col_status: "ステータス",
    keys_topup_btn: "チャージ",
    ledger_title: "最近の取引履歴",

    logs_title: "リアルタイムリクエストログ & 決済監査",
    logs_subtitle: "402 チャレンジ、マイクロ決済検証、プロキシ実行のミリ秒単位のエッジログ。",
    logs_col_time: "日時",
    logs_col_route: "API パス",
    logs_col_status: "ステータス",
    logs_col_method: "決済方式",
    logs_col_cost: "収益",
    logs_col_latency: "レイテンシ",
    logs_col_ip: "クライアント IP",
    logs_inspect: "詳細を見る",

    guide_title: "Cloudflare 本番デプロイ・チェックリスト",
    guide_subtitle: "カスタムドメイン、Web3 ウォレット、Lightning ノード、Stripe 決済の連携方法。",
    guide_step1_title: "1. Web3 / EVM 決済ウォレットを接続",
    guide_step1_desc: "wrangler.json のテストアドレスを Base / Arbitrum / Solana の本番ウォレットアドレスに変更してリアル USDC を受信。",
    guide_step2_title: "2. Lightning L402 REST ノードの設定",
    guide_step2_desc: "Alby、LND、Strike API と連携し、本物の BOLT11 請求書と Macaroon トークンを発行。",
    guide_step3_title: "3. Cloudflare カスタムドメインの紐付け",
    guide_step3_desc: "Cloudflare ダッシュボード -> Workers で API 用ドメイン (例: api.yourdomain.com) を追加し、DDoS 防御と SSL を適用。",
    guide_step4_title: "4. Wrangler CLI でデプロイ",
    guide_step4_desc: "ターミナルで 'wrangler deploy' を実行し、SQLite Durable Object x402 ゲートウェイを直接デプロイ。",

    modal_close: "閉じる",
    modal_save: "ルートを保存",
    modal_cancel: "キャンセル",
    modal_create_key: "キーを作成",
    modal_topup_title: "API キー残高のチャージ",
    modal_topup_amount: "チャージ金額 (USD)",
    modal_topup_confirm: "入金を確定",
    pay_modal_title: "x402 マイクロ決済チャレンジ",
    pay_modal_desc: "ゲートウェイがリクエストをインターセプトし、HTTP 402 請求書を発行しました。",
    pay_modal_instant: "1-Click テストネット模擬決済",
    pay_modal_simulate_btn: "決済をシミュレートして Preimage を取得",
    toast_402_issued: "HTTP 402 Payment Required が返却されました！",
    toast_200_ok: "200 OK: マイクロ決済が検証され、プロキシが実行されました！",
    toast_faucet_claimed: "デモキーに $10.00 のテストクレジットが追加されました！"
  },
  pt: {
    app_title: "Gateway x402",
    app_subtitle: "Motor de API Monetizada e Micropagamentos Web3 L402",
    nav_playground: "Ambiente de Testes Interativo",
    nav_routes: "Rotas Monetizadas",
    nav_keys: "Chaves de API e Saldo",
    nav_logs: "Registros e Receita",
    nav_deploy: "Guia de Produção",

    stat_revenue: "Receita Total do Gateway",
    stat_requests: "Chamadas de Proxy Totais",
    stat_paid_calls: "Aprovações Pagas",
    stat_blocked_402: "Desafios 402 Bloqueados",
    stat_latency: "Latência Média na Borda",
    stat_active_keys: "Chaves de API Ativas",

    pg_title: "Bancada de Testes do Protocolo de Micropagamentos x402",
    pg_subtitle: "Teste desafios HTTP 402 Payment Required, tokens L402 Macaroon e pagamentos Web3 USDC ao vivo.",
    pg_select_endpoint: "Selecionar Rota de API",
    pg_auth_mode: "Método de Pagamento e Autenticação",
    pg_auth_none: "1. Nenhum (Disparar Desafio 402)",
    pg_auth_key: "2. Chave de API Pré-paga",
    pg_auth_sandbox: "3. Micropagamento Testnet Sandbox",
    pg_auth_l402: "4. Token Macaroon L402",
    pg_send_btn: "Enviar Requisição",
    pg_executing: "Processando Verificação...",
    pg_req_payload: "Carga Útil JSON da Requisição",
    pg_res_status: "Status da Resposta",
    pg_res_latency: "Latência",
    pg_res_headers: "Cabeçalhos do Gateway",
    pg_res_body: "Carga Útil da Resposta",
    pg_settle_invoice_btn: "Pagar $0.0015 e Resolver L402",
    pg_code_snippets: "Gerador de Código do Cliente",

    step_1: "1. Enviar Requisição Não Autenticada",
    step_2: "2. O Gateway Retorna HTTP 402",
    step_3: "3. Pagar Desafio / Fornecer Chave",
    step_4: "4. O Gateway Executa a API e Retorna 200",

    routes_title: "Rotas Monetizadas do Gateway de API",
    routes_subtitle: "Configure destinos de proxy, preços por chamada e protocolos de pagamento permitidos.",
    routes_add_btn: "Nova Rota Proxy",
    routes_col_name: "Nome da Rota",
    routes_col_pattern: "Padrão do Caminho",
    routes_col_type: "Tipo de Rota",
    routes_col_price: "Preço / Chamada",
    routes_col_status: "Status",
    routes_col_actions: "Ações",
    routes_active: "Ativo",
    routes_inactive: "Inativo",

    keys_title: "Chaves de API e Livro Razão de Créditos",
    keys_subtitle: "Gerencie chaves de API de clientes, conceda saldos de teste e inspecione transações.",
    keys_add_btn: "Criar Chave de API",
    keys_faucet_btn: "Resgatar $10.00 de Teste",
    keys_col_key: "Segredo da Chave de API",
    keys_col_name: "Nome da Chave",
    keys_col_balance: "Saldo",
    keys_col_spent: "Gasto Total",
    keys_col_status: "Status",
    keys_topup_btn: "Recarregar",
    ledger_title: "Transações Recentes do Livro Razão",

    logs_title: "Registros de Requisições e Auditoria de Pagamentos",
    logs_subtitle: "Auditoria em tempo real de desafios 402, verificações de pagamento e execuções proxy.",
    logs_col_time: "Hora",
    logs_col_route: "Caminho da API",
    logs_col_status: "Código de Status",
    logs_col_method: "Método de Pagamento",
    logs_col_cost: "Receita",
    logs_col_latency: "Latência",
    logs_col_ip: "IP do Cliente",
    logs_inspect: "Inspecionar",

    guide_title: "Lista de Verificação para Produção no Cloudflare",
    guide_subtitle: "Como conectar seu domínio personalizado, carteiras Web3, nós Lightning e Stripe.",
    guide_step1_title: "1. Conectar Carteira de Liquidação Web3 / EVM",
    guide_step1_desc: "Substitua o endereço de teste em wrangler.json pela sua carteira de produção em Base / Arbitrum / Solana para receber USDC.",
    guide_step2_title: "2. Configurar Nó Lightning L402 REST",
    guide_step2_desc: "Vincule credenciais REST de Alby, LND ou Strike para emitir faturas BOLT11 reais e tokens Macaroon.",
    guide_step3_title: "3. Vincular Domínio Personalizado no Cloudflare",
    guide_step3_desc: "Adicione seu domínio API no Painel do Cloudflare -> Workers para proteção SSL e DDoS na Borda.",
    guide_step4_title: "4. Implantar com Wrangler CLI",
    guide_step4_desc: "Execute 'wrangler deploy' no terminal para implantar este gateway x402 diretamente na sua conta Cloudflare.",

    modal_close: "Fechar",
    modal_save: "Salvar Rota",
    modal_cancel: "Cancelar",
    modal_create_key: "Criar Chave",
    modal_topup_title: "Recarregar Saldo da Chave de API",
    modal_topup_amount: "Valor a Recarregar (USD)",
    modal_topup_confirm: "Confirmar Depósito",
    pay_modal_title: "Desafio de Micropagamento x402",
    pay_modal_desc: "O gateway interceptou sua chamada e emitiu uma fatura HTTP 402.",
    pay_modal_instant: "Liquidação Instantânea em Testnet (1 Clique)",
    pay_modal_simulate_btn: "Simular Pagamento e Desbloquear Preimage",
    toast_402_issued: "HTTP 402 Pagamento Necessário retornado!",
    toast_200_ok: "200 OK: Micropagamento verificado e proxy executado!",
    toast_faucet_claimed: "Adicionado $10.00 de saldo de teste à chave demo!"
  },
  ar: {
    app_title: "بوابة x402",
    app_subtitle: "محرك API لتحقيق الدخل والدفعات الصغيرة عبر Web3 L402",
    nav_playground: "بيئة الاختبار التفاعلية",
    nav_routes: "مسارات API المربحة",
    nav_keys: "مفاتيح API والسجل",
    nav_logs: "السجلات والإيرادات",
    nav_deploy: "دليل الإنتاج",

    stat_revenue: "إجمالي إيرادات البوابة",
    stat_requests: "إجمالي طلبات الوكيل",
    stat_paid_calls: "عمليات التحقق المدفوعة",
    stat_blocked_402: "التحديات المحظورة 402",
    stat_latency: "متوسط التأخير عند الحافة",
    stat_active_keys: "مفاتيح API النشطة",

    pg_title: "منصة اختبار بروتوكول الدفعات الصغيرة x402",
    pg_subtitle: "اختبر تحديات HTTP 402 Payment Required ورموز L402 Macaroon ودفعات USDC المباشرة.",
    pg_select_endpoint: "اختر مسار API المستهدف",
    pg_auth_mode: "طريقة الدفع والمصادقة",
    pg_auth_none: "1. بدون مصادقة (تفعيل تحدي 402)",
    pg_auth_key: "2. مفتاح API مسبق الدفع",
    pg_auth_sandbox: "3. دفع رملي لاختبار الشبكة",
    pg_auth_l402: "4. رمز L402 Macaroon",
    pg_send_btn: "إرسال الطلب",
    pg_executing: "جاري جلب التحقق...",
    pg_req_payload: "حمولة الطلب JSON",
    pg_res_status: "حالة الاستجابة",
    pg_res_latency: "زمن الاستجابة",
    pg_res_headers: "رؤوس البوابة",
    pg_res_body: "حمولة الاستجابة",
    pg_settle_invoice_btn: "ادفع $0.0015 وفك L402",
    pg_code_snippets: "مولد كود العميل",

    step_1: "1. إرسال طلب غير موثق",
    step_2: "2. البوابة تعيد HTTP 402",
    step_3: "3. دفع التحدي / تقديم المفتاح",
    step_4: "4. البوابة تنفذ API وتعيد 200",

    routes_title: "مسارات بوابة API المربحة",
    routes_subtitle: "تكوين وجهات الوكيل، وقواعد التسعير لكل مكالمة، وبروتوكولات الدفع المسموح بها.",
    routes_add_btn: "مسار وكيل جديد",
    routes_col_name: "اسم المسار",
    routes_col_pattern: "نمط المسار",
    routes_col_type: "نوع المسار",
    routes_col_price: "السعر / مكالمة",
    routes_col_status: "الحالة",
    routes_col_actions: "الإجراءات",
    routes_active: "نشط",
    routes_inactive: "غير نشط",

    keys_title: "مفاتيح API وسجل الائتمان",
    keys_subtitle: "إدارة مفاتيح API للعملاء، وإصدار أرصدة الاختبار، وفحص معاملات SQLite.",
    keys_add_btn: "إنشاء مفتاح API",
    keys_faucet_btn: "مطالبة $10.00 للاختبار",
    keys_col_key: "سر مفتاح API",
    keys_col_name: "اسم المفتاح",
    keys_col_balance: "الرصيد الحقيقي",
    keys_col_spent: "إجمالي الإنفاق",
    keys_col_status: "الحالة",
    keys_topup_btn: "إعادة الشحن",
    ledger_title: "معاملات السجل الأخيرة",

    logs_title: "سجلات الطلبات ومراجعة الدفع الفورية",
    logs_subtitle: "تدقيق حقيقي لتحديات 402 والتحقق من الدفعات الصغيرة وتطبيقات الوكيل.",
    logs_col_time: "الوقت",
    logs_col_route: "مسار API",
    logs_col_status: "رمز الحالة",
    logs_col_method: "طريقة الدفع",
    logs_col_cost: "الإيراد",
    logs_col_latency: "التأخير",
    logs_col_ip: "عنوان IP",
    logs_inspect: "معاينة",

    guide_title: "قائمة التحقق لنشر الإنتاج على Cloudflare",
    guide_subtitle: "كيفية ربط النطاق المخصص، والمحافظ الحقيقية، وعقد Lightning، و Stripe.",
    guide_step1_title: "1. ربط محفظة التسوية Web3 / EVM",
    guide_step1_desc: "استبدل عنوان الاختبار في wrangler.json بمحفظتك الحقيقية على Base / Arbitrum / Solana لاستلام USDC.",
    guide_step2_title: "2. إعداد عقدة Lightning L402 REST",
    guide_step2_desc: "ربط بيانات اعتماد Alby أو LND أو Strike REST لإصدار فواتير BOLT11 حقيقية ورموز Macaroon.",
    guide_step3_title: "3. ربط نطاق مخصص في Cloudflare",
    guide_step3_desc: "أضف نطاق API المخصص (مثل api.yourdomain.com) في لوحة Cloudflare للحماية والتشفير.",
    guide_step4_title: "4. النشر باستخدام Wrangler CLI",
    guide_step4_desc: "قم بتشغيل 'wrangler deploy' في جهازك لنشر بوابة x402 مباشرة إلى حسابك في Cloudflare.",

    modal_close: "إغلاق",
    modal_save: "حفظ المسار",
    modal_cancel: "إلغاء",
    modal_create_key: "إنشاء المفتاح",
    modal_topup_title: "إعادة شحن رصيد مفتاح API",
    modal_topup_amount: "مبلغ الشحن (USD)",
    modal_topup_confirm: "تأكيد الإيداع",
    pay_modal_title: "تحدي الدفع المصغر x402",
    pay_modal_desc: "اعترضت البوابة طلبك وأصدرت فاتورة HTTP 402.",
    pay_modal_instant: "تسوية فورية بنقرة واحدة لشعار الاختبار",
    pay_modal_simulate_btn: "محاكاة الدفع وإلغاء قفل المفتاح Preimage",
    toast_402_issued: "تمت إعادة استجابة HTTP 402 الدفع مطلوب!",
    toast_200_ok: "200 OK: تم التحقق من الدفع المصغر وتم تنفيذ الوكيل!",
    toast_faucet_claimed: "تمت إضافة رصيد اختبار بقيمة $10.00 إلى مفتاح العرض!"
  }
};

function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [activeTab, setActiveTab] = useState('playground');
  const [stats, setStats] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [keysData, setKeysData] = useState({ keys: [], ledger: [] });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Playground state
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [authMode, setAuthMode] = useState('none');
  const [customApiKey, setCustomApiKey] = useState('x402_live_demo888899990000');
  const [customL402Preimage, setCustomL402Preimage] = useState('');
  const [reqBody, setReqBody] = useState('');
  const [playgroundRes, setPlaygroundRes] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [handshakeStep, setHandshakeStep] = useState(0);
  const [snippetLang, setSnippetLang] = useState('curl');

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

  // Auto-detect browser language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('x402_preferred_lang');
    if (savedLang && I18N_DICT[savedLang]) {
      setCurrentLang(savedLang);
    } else if (navigator.language) {
      const browserCode = navigator.language.split('-')[0].toLowerCase();
      if (I18N_DICT[browserCode]) {
        setCurrentLang(browserCode);
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
    const dict = I18N_DICT[currentLang] || I18N_DICT.en;
    return dict[key] || I18N_DICT.en[key] || key;
  };

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

  return (
    <div className={`min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col font-sans ${isRtl ? 'rtl' : 'ltr'}`}>
      
      {/* Top Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl transition-all duration-300 animate-bounce ${
          notification.type === 'success' ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200' :
          notification.type === 'warning' ? 'bg-amber-950/90 border-amber-500/50 text-amber-200' :
          'bg-rose-950/90 border-rose-500/50 text-rose-200'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> :
           notification.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-amber-400" /> :
           <XCircle className="w-5 h-5 text-rose-400" />}
          <span className="text-sm font-medium">{notification.msg}</span>
        </div>
      )}

      {/* HEADER / NAVBAR */}
      <header className="border-b border-gray-800 bg-[#111827]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center">
                <Coins className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">{t("app_title")}</h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md">
                  SQLite Cloudflare Edge
                </span>
              </div>
              <p className="text-xs text-gray-400 hidden sm:block">{t("app_subtitle")}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Multi-language Selector Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/80 hover:bg-gray-700 border border-gray-700/80 text-xs font-medium text-gray-200 transition">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>{LANGUAGES.find(l => l.code === currentLang)?.flag} {LANGUAGES.find(l => l.code === currentLang)?.name}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
              
              <div className="absolute right-0 mt-1 w-44 bg-[#111827] border border-gray-700 rounded-xl shadow-2xl py-1 hidden group-hover:block z-50">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-gray-400 border-b border-gray-800 flex items-center gap-1">
                  <Languages className="w-3 h-3 text-indigo-400" /> Global Locales
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-indigo-600/20 transition ${
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

            {/* Quick Faucet Claim */}
            <button
              onClick={handleClaimFaucet}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t("keys_faucet_btn")}</span>
            </button>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-4 border-t border-gray-800/60 overflow-x-auto">
          {[
            { id: 'playground', label: t("nav_playground"), icon: Terminal },
            { id: 'routes', label: t("nav_routes"), icon: Layers },
            { id: 'keys', label: t("nav_keys"), icon: Key },
            { id: 'logs', label: t("nav_logs"), icon: BarChart3 },
            { id: 'deploy', label: t("nav_deploy"), icon: Rocket }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-3 border-b-2 text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-gray-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* TOP STATS BAR */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-[#111827] border border-gray-800 rounded-xl p-3.5 flex flex-col justify-between">
              <div className="text-[11px] font-medium text-gray-400 flex items-center justify-between">
                <span>{t("stat_revenue")}</span>
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-xl font-bold text-white mt-1">
                ${stats.totalRevenueUsd.toFixed(4)}
              </div>
              <div className="text-[10px] text-emerald-400 mt-1 font-mono">SQLite Durable Ledger</div>
            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-xl p-3.5 flex flex-col justify-between">
              <div className="text-[11px] font-medium text-gray-400 flex items-center justify-between">
                <span>{t("stat_requests")}</span>
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div className="text-xl font-bold text-white mt-1">
                {stats.totalRequests}
              </div>
              <div className="text-[10px] text-gray-400 mt-1">Total Edge Invocations</div>
            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-xl p-3.5 flex flex-col justify-between">
              <div className="text-[11px] font-medium text-gray-400 flex items-center justify-between">
                <span>{t("stat_paid_calls")}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-xl font-bold text-emerald-400 mt-1">
                {stats.paidRequests}
              </div>
              <div className="text-[10px] text-emerald-400/80 mt-1">Settled Micro-payments</div>
            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-xl p-3.5 flex flex-col justify-between">
              <div className="text-[11px] font-medium text-gray-400 flex items-center justify-between">
                <span>{t("stat_blocked_402")}</span>
                <Lock className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-xl font-bold text-amber-400 mt-1">
                {stats.blocked402Requests}
              </div>
              <div className="text-[10px] text-amber-400/80 mt-1">HTTP 402 Standard</div>
            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-xl p-3.5 flex flex-col justify-between">
              <div className="text-[11px] font-medium text-gray-400 flex items-center justify-between">
                <span>{t("stat_latency")}</span>
                <Clock className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-xl font-bold text-white mt-1">
                {stats.avgLatencyMs} ms
              </div>
              <div className="text-[10px] text-blue-400 mt-1">Cloudflare Edge Execution</div>
            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-xl p-3.5 flex flex-col justify-between">
              <div className="text-[11px] font-medium text-gray-400 flex items-center justify-between">
                <span>{t("stat_active_keys")}</span>
                <Key className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <div className="text-xl font-bold text-purple-300 mt-1">
                {stats.activeKeys}
              </div>
              <div className="text-[10px] text-purple-400 mt-1">Pre-funded Balances</div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: INTERACTIVE PLAYGROUND & HANDSHAKE TESTBENCH           */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'playground' && (
          <div className="space-y-6">
            
            {/* Header / Intro Banner */}
            <div className="bg-gradient-to-r from-indigo-950/60 via-[#111827] to-purple-950/40 border border-indigo-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    {t("pg_title")}
                  </h2>
                  <p className="text-xs text-gray-300 mt-1 max-w-3xl">
                    {t("pg_subtitle")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-3 py-1 bg-gray-900 border border-gray-700 rounded-lg text-indigo-300">
                    HTTP 402 + L402 Spec
                  </span>
                </div>
              </div>

              {/* Protocol Handshake Visual Pipeline Step Tracker */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-2 pt-4 border-t border-gray-800/80">
                {[
                  { step: 1, label: t("step_1") },
                  { step: 2, label: t("step_2") },
                  { step: 3, label: t("step_3") },
                  { step: 4, label: t("step_4") }
                ].map((s) => {
                  const isCurrent = handshakeStep === s.step;
                  const isPassed = handshakeStep > s.step;
                  return (
                    <div
                      key={s.step}
                      className={`px-3 py-2 rounded-xl text-[11px] font-medium border flex items-center gap-2 transition-all ${
                        isCurrent ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 ring-1 ring-indigo-500/50' :
                        isPassed ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400' :
                        'bg-gray-900/60 border-gray-800 text-gray-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent ? 'bg-indigo-500 text-white' :
                        isPassed ? 'bg-emerald-500 text-gray-950' : 'bg-gray-800 text-gray-400'
                      }`}>
                        {isPassed ? '✓' : s.step}
                      </div>
                      <span className="truncate">{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TESTBENCH CONTROLS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Form Inputs & Route Picker */}
              <div className="lg:col-span-5 space-y-4 bg-[#111827] border border-gray-800 rounded-2xl p-5 shadow-lg">
                
                {/* Endpoint Selection */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    {t("pg_select_endpoint")}
                  </label>
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {routes.map((route) => {
                      const isSelected = selectedRoute?.id === route.id;
                      return (
                        <button
                          key={route.id}
                          onClick={() => handleSelectRoute(route)}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-indigo-600/15 border-indigo-500/80 text-white ring-1 ring-indigo-500/30'
                              : 'bg-gray-900/60 border-gray-800/80 text-gray-300 hover:border-gray-700'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="font-semibold text-gray-200 flex items-center gap-2">
                              {route.type === 'builtin_ai' && <Cpu className="w-3.5 h-3.5 text-indigo-400" />}
                              {route.type === 'builtin_scraper' && <FileText className="w-3.5 h-3.5 text-emerald-400" />}
                              {route.type === 'builtin_sandbox' && <Code2 className="w-3.5 h-3.5 text-amber-400" />}
                              {route.type === 'builtin_devtools' && <QrCode className="w-3.5 h-3.5 text-purple-400" />}
                              {route.type === 'custom_proxy' && <Globe className="w-3.5 h-3.5 text-blue-400" />}
                              <span>{route.name}</span>
                            </div>
                            <div className="font-mono text-[11px] text-gray-400">{route.path_pattern}</div>
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-mono font-bold text-emerald-400 text-[11px]">
                              ${route.price_usd.toFixed(4)}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Authentication Mode Selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    {t("pg_auth_mode")}
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'none', label: t("pg_auth_none"), sub: "Will trigger 402 challenge response" },
                      { id: 'api_key', label: t("pg_auth_key"), sub: "Deducts automatically from key balance" },
                      { id: 'sandbox', label: t("pg_auth_sandbox"), sub: "Bypasses payment using sandbox header" },
                      { id: 'l402', label: t("pg_auth_l402"), sub: "Validates Macaroon + preimage proof" }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setAuthMode(mode.id)}
                        className={`text-left p-2.5 rounded-xl border text-xs transition ${
                          authMode === mode.id
                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200'
                            : 'bg-gray-900/40 border-gray-800 text-gray-400 hover:text-gray-200'
                        }`}
                      >
                        <div className="font-semibold">{mode.label}</div>
                        <div className="text-[10px] opacity-70">{mode.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* API Key Input Field when AuthMode === 'api_key' */}
                {authMode === 'api_key' && (
                  <div className="pt-1">
                    <label className="block text-[11px] font-medium text-gray-400 mb-1">X-API-Key Header Secret</label>
                    <input
                      type="text"
                      value={customApiKey}
                      onChange={(e) => setCustomApiKey(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-1.5 text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                )}

                {/* L402 Preimage Input Field when AuthMode === 'l402' */}
                {authMode === 'l402' && (
                  <div className="pt-1">
                    <label className="block text-[11px] font-medium text-gray-400 mb-1">Macaroon Preimage Key</label>
                    <input
                      type="text"
                      placeholder="e.g. preimage_abc123xyz"
                      value={customL402Preimage}
                      onChange={(e) => setCustomL402Preimage(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-1.5 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                )}

                {/* JSON Body Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    {t("pg_req_payload")}
                  </label>
                  <textarea
                    rows={5}
                    value={reqBody}
                    onChange={(e) => setReqBody(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs font-mono text-gray-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Submit Request Button */}
                <button
                  onClick={() => executePlaygroundRequest()}
                  disabled={isExecuting || !selectedRoute}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                  {isExecuting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isExecuting ? t("pg_executing") : t("pg_send_btn")}</span>
                </button>

              </div>

              {/* Right Column: Live Output Inspector & Response Body */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Execution Response Inspector */}
                <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5 shadow-lg space-y-4 min-h-[420px] flex flex-col">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Gateway Response Output</span>
                    </div>

                    {playgroundRes && (
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold border ${
                          playgroundRes.status === 200 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                          playgroundRes.status === 402 ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                          'bg-rose-500/10 border-rose-500/30 text-rose-400'
                        }`}>
                          HTTP {playgroundRes.status} {playgroundRes.statusText}
                        </span>
                        <span className="text-gray-400">{playgroundRes.elapsedMs} ms</span>
                      </div>
                    )}
                  </div>

                  {/* 402 Payment Trigger Banner */}
                  {playgroundRes?.status === 402 && (
                    <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-pulse">
                      <div className="flex items-center gap-3">
                        <Lock className="w-6 h-6 text-amber-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-amber-200">HTTP 402 Payment Required Intercepted</div>
                          <div className="text-[11px] text-amber-300/80">
                            Challenge ID: <span className="font-mono text-amber-200">{playgroundRes.data?.x402?.challenge_id}</span> • Price: ${playgroundRes.data?.x402?.price_usd?.toFixed(4)}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setShowPayModal(true)}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs rounded-lg shadow-md transition whitespace-nowrap"
                      >
                        {t("pg_settle_invoice_btn")}
                      </button>
                    </div>
                  )}

                  {/* 200 OK Success Banner */}
                  {playgroundRes?.status === 200 && (
                    <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 flex items-center gap-3 text-xs text-emerald-300">
                      <Unlock className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-bold">Payment Challenge Cleared!</span> Upstream proxy target executed successfully on Cloudflare edge.
                      </div>
                    </div>
                  )}

                  {/* JSON Response View */}
                  <div className="flex-1 bg-gray-950 border border-gray-800 rounded-xl p-4 overflow-auto font-mono text-xs text-gray-300 max-h-[300px]">
                    {playgroundRes ? (
                      <pre>{JSON.stringify(playgroundRes.data, null, 2)}</pre>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-2 py-12">
                        <Terminal className="w-8 h-8 opacity-40" />
                        <p className="text-xs">Click "Send Request" to test the x402 gateway challenge loop.</p>
                      </div>
                    )}
                  </div>

                  {/* Headers View */}
                  {playgroundRes?.headers && (
                    <div className="border-t border-gray-800 pt-3">
                      <div className="text-[11px] font-semibold text-gray-400 mb-1">{t("pg_res_headers")}</div>
                      <div className="flex flex-wrap gap-2 font-mono text-[10px]">
                        {Object.entries(playgroundRes.headers).map(([k, v]) => (
                          <span key={k} className="px-2 py-0.5 bg-gray-900 border border-gray-800 rounded text-gray-400">
                            <strong className="text-gray-300">{k}:</strong> {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Client Code Snippet Generator */}
                <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5 shadow-lg space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-200">
                      <Code2 className="w-4 h-4 text-indigo-400" />
                      <span>{t("pg_code_snippets")}</span>
                    </div>

                    <div className="flex gap-1">
                      {['curl', 'js', 'python', 'go'].map((snip) => (
                        <button
                          key={snip}
                          onClick={() => setSnippetLang(snip)}
                          className={`px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-bold transition ${
                            snippetLang === snip
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-800 text-gray-400 hover:text-white'
                          }`}
                        >
                          {snip}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-950 border border-gray-800 rounded-xl p-3 font-mono text-xs text-indigo-200 overflow-x-auto relative group">
                    <pre>{getCodeSnippet()}</pre>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(getCodeSnippet());
                        showToast("Code snippet copied to clipboard!", "success");
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 opacity-0 group-hover:opacity-100 transition"
                      title="Copy code"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: MONETIZED ROUTES & PRICING CONFIGURATOR                */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'routes' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111827] border border-gray-800 rounded-2xl p-5 shadow-lg">
              <div>
                <h2 className="text-lg font-bold text-white">{t("routes_title")}</h2>
                <p className="text-xs text-gray-400 mt-1">{t("routes_subtitle")}</p>
              </div>

              <button
                onClick={() => setShowAddRouteModal(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
              >
                <Plus className="w-4 h-4" />
                <span>{t("routes_add_btn")}</span>
              </button>
            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-900/80 border-b border-gray-800 text-gray-400 uppercase tracking-wider font-semibold text-[10px]">
                      <th className="py-3.5 px-4">{t("routes_col_name")}</th>
                      <th className="py-3.5 px-4">{t("routes_col_pattern")}</th>
                      <th className="py-3.5 px-4">{t("routes_col_type")}</th>
                      <th className="py-3.5 px-4">{t("routes_col_price")}</th>
                      <th className="py-3.5 px-4">{t("routes_col_status")}</th>
                      <th className="py-3.5 px-4 text-right">{t("routes_col_actions")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {routes.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-800/30 transition">
                        <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                          <Layers className="w-4 h-4 text-indigo-400" />
                          <span>{r.name}</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-indigo-300">{r.path_pattern}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700 text-gray-300 text-[10px] font-mono">
                            {r.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                          ${r.price_usd.toFixed(4)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {t("routes_active")}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={async () => {
                              if (confirm(`Delete route ${r.name}?`)) {
                                await fetch(`./api/routes/${r.id}`, { method: 'DELETE' });
                                showToast(`Deleted route ${r.name}`, "info");
                                fetchData();
                              }
                            }}
                            className="p-1.5 text-gray-400 hover:text-rose-400 transition"
                            title="Delete route"
                          >
                            <Trash2 className="w-4 h-4" />
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

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: API KEYS & LEDGER MANAGEMENT                           */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'keys' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111827] border border-gray-800 rounded-2xl p-5 shadow-lg">
              <div>
                <h2 className="text-lg font-bold text-white">{t("keys_title")}</h2>
                <p className="text-xs text-gray-400 mt-1">{t("keys_subtitle")}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleClaimFaucet}
                  className="px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t("keys_faucet_btn")}</span>
                </button>

                <button
                  onClick={() => setShowAddKeyModal(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t("keys_add_btn")}</span>
                </button>
              </div>
            </div>

            {/* Keys Table */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-900/80 border-b border-gray-800 text-gray-400 uppercase tracking-wider font-semibold text-[10px]">
                      <th className="py-3.5 px-4">{t("keys_col_name")}</th>
                      <th className="py-3.5 px-4">{t("keys_col_key")}</th>
                      <th className="py-3.5 px-4">{t("keys_col_balance")}</th>
                      <th className="py-3.5 px-4">{t("keys_col_spent")}</th>
                      <th className="py-3.5 px-4">{t("keys_col_status")}</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {keysData.keys.map((k) => (
                      <tr key={k.id} className="hover:bg-gray-800/30 transition">
                        <td className="py-3.5 px-4 font-semibold text-white">{k.name}</td>
                        <td className="py-3.5 px-4 font-mono text-indigo-300 flex items-center gap-2">
                          <span>{k.key_secret}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(k.key_secret);
                              showToast("API Key copied!", "success");
                            }}
                            className="p-1 hover:text-white text-gray-400"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                          ${k.balance_usd.toFixed(4)}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-gray-400">
                          ${k.total_spent.toFixed(4)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {k.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedKeyForTopup(k);
                              setShowTopupModal(true);
                            }}
                            className="px-2.5 py-1 bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-300 text-[11px] font-semibold rounded-lg transition"
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

            {/* Ledger Transactions */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5 shadow-lg space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Coins className="w-4 h-4 text-indigo-400" />
                <span>{t("ledger_title")}</span>
              </h3>

              <div className="divide-y divide-gray-800/60 max-h-60 overflow-y-auto font-mono text-xs">
                {keysData.ledger.map((tx) => (
                  <div key={tx.id} className="py-2.5 flex items-center justify-between text-gray-300">
                    <div>
                      <div className="font-semibold text-white">{tx.description}</div>
                      <div className="text-[10px] text-gray-500">{new Date(tx.created_at).toLocaleString()} • Ref: {tx.ref_id}</div>
                    </div>
                    <div className={`font-bold ${tx.type === 'topup' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {tx.type === 'topup' ? '+' : '-'}${Math.abs(tx.amount_usd).toFixed(4)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: REAL-TIME REQUEST LOGS & AUDIT LOGS                    */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'logs' && (
          <div className="space-y-4">
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">{t("logs_title")}</h2>
                <p className="text-xs text-gray-400 mt-1">{t("logs_subtitle")}</p>
              </div>

              <button
                onClick={fetchData}
                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold rounded-xl border border-gray-700 flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Logs</span>
              </button>
            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-900/80 border-b border-gray-800 text-gray-400 uppercase tracking-wider font-semibold text-[10px]">
                      <th className="py-3.5 px-4">{t("logs_col_time")}</th>
                      <th className="py-3.5 px-4">{t("logs_col_route")}</th>
                      <th className="py-3.5 px-4">{t("logs_col_status")}</th>
                      <th className="py-3.5 px-4">{t("logs_col_method")}</th>
                      <th className="py-3.5 px-4">{t("logs_col_cost")}</th>
                      <th className="py-3.5 px-4">{t("logs_col_latency")}</th>
                      <th className="py-3.5 px-4">{t("logs_col_ip")}</th>
                      <th className="py-3.5 px-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 font-mono">
                    {logs.map((l) => (
                      <tr key={l.id} className="hover:bg-gray-800/30 transition">
                        <td className="py-3 px-4 text-gray-400 text-[11px] whitespace-nowrap">
                          {new Date(l.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="py-3 px-4 font-semibold text-indigo-300">{l.path}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            l.status_code === 200 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                            l.status_code === 402 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                            'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          }`}>
                            {l.status_code}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-300 text-[11px]">{l.payment_method}</td>
                        <td className="py-3 px-4 text-emerald-400 font-bold">${l.cost_usd.toFixed(4)}</td>
                        <td className="py-3 px-4 text-gray-400">{l.latency_ms} ms</td>
                        <td className="py-3 px-4 text-gray-500">{l.client_ip}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setInspectLog(l)}
                            className="text-xs text-indigo-400 hover:text-indigo-300 underline font-sans"
                          >
                            {t("logs_inspect")}
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

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: PRODUCTION DEPLOYMENT GUIDE                            */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'deploy' && (
          <div className="space-y-6">
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-lg space-y-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Rocket className="w-5 h-5 text-indigo-400" />
                <span>{t("guide_title")}</span>
              </h2>
              <p className="text-xs text-gray-400">{t("guide_subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5 space-y-2">
                <div className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-indigo-400" />
                  <span>{t("guide_step1_title")}</span>
                </div>
                <p className="text-xs text-gray-300">{t("guide_step1_desc")}</p>
              </div>

              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5 space-y-2">
                <div className="text-sm font-bold text-purple-400 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span>{t("guide_step2_title")}</span>
                </div>
                <p className="text-xs text-gray-300">{t("guide_step2_desc")}</p>
              </div>

              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5 space-y-2">
                <div className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>{t("guide_step3_title")}</span>
                </div>
                <p className="text-xs text-gray-300">{t("guide_step3_desc")}</p>
              </div>

              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5 space-y-2">
                <div className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>{t("guide_step4_title")}</span>
                </div>
                <p className="text-xs text-gray-300">{t("guide_step4_desc")}</p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ------------------------------------------------------------- */}
      {/* MODAL: 402 PAYMENT CHALLENGE SETTLEMENT                       */}
      {/* ------------------------------------------------------------- */}
      {showPayModal && pendingInvoice && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-gray-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">{t("pay_modal_title")}</h3>
              </div>
              <button onClick={() => setShowPayModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-gray-300">{t("pay_modal_desc")}</p>

            <div className="bg-gray-950 border border-gray-800 rounded-xl p-3 font-mono text-xs space-y-1.5 text-gray-300">
              <div><strong className="text-gray-400">Invoice ID:</strong> {pendingInvoice.challenge_id}</div>
              <div><strong className="text-gray-400">Price:</strong> <span className="text-emerald-400 font-bold">${pendingInvoice.price_usd?.toFixed(4)} USDC</span></div>
              <div><strong className="text-gray-400">Payment Hash:</strong> {pendingInvoice.payment_hash}</div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleSettleInvoice}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t("pay_modal_simulate_btn")}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD ROUTE */}
      {showAddRouteModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-gray-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">Add New Proxy Route</h3>
              <button onClick={() => setShowAddRouteModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateRoute} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-medium mb-1">Route Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CoinGecko Price Proxy"
                  value={newRouteForm.name}
                  onChange={e => setNewRouteForm({ ...newRouteForm, name: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Path Pattern</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /proxy/coingecko"
                  value={newRouteForm.path_pattern}
                  onChange={e => setNewRouteForm({ ...newRouteForm, path_pattern: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 font-mono text-indigo-300 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Upstream Target URL</label>
                <input
                  type="url"
                  placeholder="https://api.coingecko.com/..."
                  value={newRouteForm.target_url}
                  onChange={e => setNewRouteForm({ ...newRouteForm, target_url: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 font-mono text-gray-300 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Price per Request (USD)</label>
                <input
                  type="number"
                  step="0.0001"
                  min="0.0001"
                  value={newRouteForm.price_usd}
                  onChange={e => setNewRouteForm({ ...newRouteForm, price_usd: Number(e.target.value) })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 font-mono text-emerald-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddRouteModal(false)}
                  className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg"
                >
                  {t("modal_cancel")}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg"
                >
                  {t("modal_save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE API KEY */}
      {showAddKeyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-gray-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">Issue Client API Key</h3>
              <button onClick={() => setShowAddKeyModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateKey} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-medium mb-1">Key Label / Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AutoGPT Agent Key"
                  value={newKeyName}
                  onChange={e => setNewKeyName(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Initial Credit Balance (USD)</label>
                <input
                  type="number"
                  step="1.0"
                  value={newKeyBalance}
                  onChange={e => setNewKeyBalance(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 font-mono text-emerald-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddKeyModal(false)}
                  className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg"
                >
                  {t("modal_cancel")}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg"
                >
                  {t("modal_create_key")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TOPUP KEY */}
      {showTopupModal && selectedKeyForTopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-gray-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">{t("modal_topup_title")}</h3>
              <button onClick={() => setShowTopupModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleTopupKey} className="space-y-3 text-xs">
              <div className="bg-gray-950 border border-gray-800 rounded-lg p-3 text-gray-300 font-mono">
                <div>Key Name: <strong>{selectedKeyForTopup.name}</strong></div>
                <div>Current Balance: <strong className="text-emerald-400">${selectedKeyForTopup.balance_usd.toFixed(4)}</strong></div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">{t("modal_topup_amount")}</label>
                <input
                  type="number"
                  step="5"
                  min="1"
                  value={topupAmount}
                  onChange={e => setTopupAmount(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 font-mono text-emerald-400 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTopupModal(false)}
                  className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg"
                >
                  {t("modal_cancel")}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg"
                >
                  {t("modal_topup_confirm")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: INSPECT LOG */}
      {inspectLog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-gray-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">Log Inspector ({inspectLog.id})</h3>
              <button onClick={() => setInspectLog(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="bg-gray-950 border border-gray-800 rounded-xl p-3 font-mono text-xs space-y-2 text-gray-300 overflow-auto max-h-80">
              <div><strong>Path:</strong> {inspectLog.path}</div>
              <div><strong>Status:</strong> {inspectLog.status_code}</div>
              <div><strong>Method:</strong> {inspectLog.payment_method}</div>
              <div><strong>Latency:</strong> {inspectLog.latency_ms} ms</div>
              <div><strong>Request Preview:</strong></div>
              <pre className="bg-gray-900 p-2 rounded text-indigo-300">{inspectLog.request_preview || "N/A"}</pre>
              <div><strong>Response Preview:</strong></div>
              <pre className="bg-gray-900 p-2 rounded text-emerald-300">{inspectLog.response_preview || "N/A"}</pre>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setInspectLog(null)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg text-xs font-semibold"
              >
                {t("modal_close")}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
