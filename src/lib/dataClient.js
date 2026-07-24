import { getStoredSession } from "./authClient";
import { isBackendConfigured, platformConfig } from "./platformConfig";

function getAccessToken() {
  return getStoredSession()?.access_token || "";
}

function restHeaders() {
  const token = getAccessToken();
  return {
    apikey: platformConfig.supabaseAnonKey,
    Authorization: `Bearer ${token || platformConfig.supabaseAnonKey}`,
    "Content-Type": "application/json",
  };
}

async function restGet(path) {
  if (!isBackendConfigured()) {
    throw new Error("Backend is not connected yet.");
  }

  const response = await fetch(`${platformConfig.supabaseUrl}/rest/v1/${path}`, {
    headers: restHeaders(),
  });

  const payload = await response.json().catch(() => []);
  if (!response.ok) {
    throw new Error(payload.message || payload.error_description || "Database request failed.");
  }

  return payload;
}

function mapProject(project) {
  return {
    id: project.id,
    name: project.name,
    type: project.project_type,
    status: project.status?.replaceAll("_", " ") || "Project",
    clientStatus: project.client_status_label || "Project active.",
    due: project.delivery_deadline || project.shoot_date || "TBD",
    image: "/images/wedding-hero.png",
  };
}

export async function fetchClientPortalData() {
  const [projects, galleries, favorites, downloads, orders, invoices] = await Promise.all([
    restGet("projects?select=id,name,project_type,status,client_status_label,shoot_date,delivery_deadline&order=created_at.desc&limit=12"),
    restGet("galleries?select=id,title,published,downloads_enabled,purchase_enabled,expires_at&order=created_at.desc&limit=12"),
    restGet("favorite_collections?select=id,name,purpose&order=created_at.desc&limit=30"),
    restGet("downloads?select=id,download_type,resolution,created_at&order=created_at.desc&limit=30"),
    restGet("orders?select=id,status,total,created_at&order=created_at.desc&limit=30"),
    restGet("invoices?select=id,status,amount_due,due_date&order=created_at.desc&limit=30"),
  ]);

  return {
    projects: projects.map(mapProject),
    galleries,
    favorites,
    downloads,
    orders,
    invoices,
  };
}

export async function fetchAdminDashboardData() {
  const [clients, projects, galleries, media, orders, invoices, products, downloads] = await Promise.all([
    restGet("clients?select=id,email,tags,created_at&order=created_at.desc&limit=200"),
    restGet("projects?select=id,status,shoot_date,delivery_deadline&order=created_at.desc&limit=200"),
    restGet("galleries?select=id,published,expires_at&order=created_at.desc&limit=200"),
    restGet("media_assets?select=id,file_type,upload_status,visibility&order=created_at.desc&limit=200"),
    restGet("orders?select=id,status,total,created_at&order=created_at.desc&limit=200"),
    restGet("invoices?select=id,status,amount_due&order=created_at.desc&limit=200"),
    restGet("product_variant_margins?select=id,size_label,supplier_cost,retail_price,sale_price,gross_margin_dollars,gross_margin_percent&limit=100"),
    restGet("downloads?select=id,download_type,created_at&order=created_at.desc&limit=200"),
  ]);

  const activeProjects = projects.filter((project) => !["DELIVERED", "ARCHIVED", "CANCELLED"].includes(project.status)).length;
  const editingProjects = projects.filter((project) => ["EDITING", "PROOFING", "READY_FOR_REVIEW"].includes(project.status)).length;
  const pendingOrders = orders.filter((order) => ["PENDING_PAYMENT", "PAID", "PROCESSING", "SENT_TO_LAB"].includes(order.status)).length;
  const outstandingPayments = invoices
    .filter((invoice) => !["paid", "cancelled", "void"].includes(invoice.status))
    .reduce((sum, invoice) => sum + Number(invoice.amount_due || 0), 0);

  return {
    metrics: [
      { label: "Total Clients", value: String(clients.length), note: "Live database" },
      { label: "Active Projects", value: String(activeProjects), note: "Booked / editing / proofing" },
      { label: "Projects Being Edited", value: String(editingProjects), note: "Editing queue" },
      { label: "Published Galleries", value: String(galleries.filter((gallery) => gallery.published).length), note: "Client visible" },
      { label: "Recent Orders", value: String(pendingOrders), note: "Need action" },
      { label: "Outstanding Payments", value: `$${outstandingPayments.toLocaleString()}`, note: "Invoices" },
      { label: "Media Assets", value: String(media.length), note: "Metadata records" },
      { label: "Recent Downloads", value: String(downloads.length), note: "Tracked history" },
    ],
    products,
  };
}
