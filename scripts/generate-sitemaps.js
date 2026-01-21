/**
 * Ryokome – Google-safe sitemap generator
 * Handles 1 → 100,000+ URLs
 */

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://ryokome.com";
const MAX_URLS_PER_SITEMAP = 50000;

// ---------- HELPERS ----------
function getHtmlFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath, baseDir));
    } else if (file.endsWith(".html")) {
      const urlPath = "/" + path.relative(baseDir, fullPath).replace(/\\/g, "/");
      results.push(urlPath.replace("/index.html", "/").replace(".html", ""));
    }
  });

  return results;
}

function writeUrlSet(fileName, urls) {
  const content =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${SITE_URL}${u}</loc></url>`).join("\n") +
    `\n</urlset>`;

  fs.writeFileSync(fileName, content, "utf8");
}

// ---------- MAIN ----------
console.log("🔄 Generating sitemaps for Ryokome…");

// MAIN PAGES (ROOT)
const MAIN_PAGES = [
  "/",
  "/flights",
  "/cars",
  "/hotels",
  "/about",
  "/privacy-policy",
  "/terms-of-service",
  "/cookie-policy",
  "/affiliate-disclosure",
];

writeUrlSet("sitemap-main.xml", MAIN_PAGES);

// BLOG
const blogDir = path.join(__dirname, "..", "blog");
let blogUrls = [];
if (fs.existsSync(blogDir)) {
  blogUrls = getHtmlFiles(blogDir, blogDir);
}
writeUrlSet("sitemap-blog.xml", blogUrls);

// ROUTES (PROGRAMMATIC)
const routesDir = path.join(__dirname, "..", "routes");
let routeUrls = [];
if (fs.existsSync(routesDir)) {
  routeUrls = getHtmlFiles(routesDir, routesDir);
}

// Split routes into chunks of 50k
const routeSitemaps = [];
for (let i = 0; i < routeUrls.length; i += MAX_URLS_PER_SITEMAP) {
  const chunk = routeUrls.slice(i, i + MAX_URLS_PER_SITEMAP);
  const index = Math.floor(i / MAX_URLS_PER_SITEMAP) + 1;
  const fileName = `sitemap-routes-${index}.xml`;
  writeUrlSet(fileName, chunk);
  routeSitemaps.push(fileName);
}

// SITEMAP INDEX
let sitemapIndex =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

["sitemap-main.xml", "sitemap-blog.xml", ...routeSitemaps].forEach((file) => {
  sitemapIndex +=
    `  <sitemap>\n` +
    `    <loc>${SITE_URL}/${file}</loc>\n` +
    `  </sitemap>\n`;
});

sitemapIndex += `</sitemapindex>`;
fs.writeFileSync("sitemap.xml", sitemapIndex, "utf8");

console.log("✅ Sitemaps generated successfully");
console.log(`   Main pages: ${MAIN_PAGES.length}`);
console.log(`   Blog pages: ${blogUrls.length}`);
console.log(`   Route pages: ${routeUrls.length}`);
console.log(`   Route sitemaps: ${routeSitemaps.length}`);
