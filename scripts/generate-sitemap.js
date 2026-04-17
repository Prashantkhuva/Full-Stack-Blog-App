import { Client, Databases, Query } from 'appwrite';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load .env variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Configuration
const appWriteUrl = process.env.VITE_APPWRITE_URL;
const appWriteProjectId = process.env.VITE_APPWRITE_PROJECT_ID;
const appWriteDatabaseId = process.env.VITE_APPWRITE_DATABASE_ID;
const appWriteCollectionId = process.env.VITE_APPWRITE_COLLECTION_ID;
const siteUrl = process.env.VITE_BASE_URL || 'https://mega-blog-prashantkhuvas-projects.vercel.app';

if (!appWriteUrl || !appWriteProjectId || !appWriteDatabaseId || !appWriteCollectionId) {
  console.error("Missing Appwrite environment variables. Ensure .env is populated.");
  process.exit(1);
}

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint(appWriteUrl)
  .setProject(appWriteProjectId);

const databases = new Databases(client);

async function generateSitemap() {
  console.log("Fetching posts to build sitemap...");
  const currentDate = new Date().toISOString().split('T')[0];
  let sitemapEntries = [];

  // Add static routes
  const staticRoutes = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/all-posts', changefreq: 'daily', priority: '0.9' },
    { url: '/login', changefreq: 'monthly', priority: '0.5' },
    { url: '/signup', changefreq: 'monthly', priority: '0.5' },
  ];

  staticRoutes.forEach(route => {
    sitemapEntries.push(`
  <url>
    <loc>${siteUrl}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`);
  });

  try {
    // Fetch active posts from Appwrite
    const response = await databases.listDocuments(
      appWriteDatabaseId,
      appWriteCollectionId,
      [Query.equal("status", "active"), Query.limit(100)] // Pagination can be added if needed
    );

    console.log(`Found ${response.documents.length} active posts.`);

    response.documents.forEach(post => {
      // Use $updatedAt for lastmod, fallback to currentDate if missing
      const lastModDate = post.$updatedAt ? post.$updatedAt.split('T')[0] : currentDate;
      
      sitemapEntries.push(`
  <url>
    <loc>${siteUrl}/post/${post.$id}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
    });

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('')}
</urlset>`;

    // Write to public/sitemap.xml
    const publicDir = path.resolve(__dirname, '../public');
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    
    fs.writeFileSync(sitemapPath, sitemapContent);
    console.log(`Sitemap successfully generated at ${sitemapPath}`);

  } catch (error) {
    console.warn("Appwrite returned an error (likely strict origin/auth policies). Generating basic static sitemap instead.", error.message);
    
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('')}
</urlset>`;

    const publicDir = path.resolve(__dirname, '../public');
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    
    fs.writeFileSync(sitemapPath, sitemapContent);
    console.log(`Basic static sitemap generated at ${sitemapPath}`);
  }
}

generateSitemap();
