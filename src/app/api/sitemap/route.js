// pages/api/sitemap.js
import { NextResponse } from "next/server";
export  async function GET(req, res) {
    // Set the base URL of your application
    const baseUrl = 'https://www.superclasses.site';

    // Define the static paths you want to include in the sitemap
    const staticPaths = [
        { url: '', priority: 1.0 },
     
        { url: 'login', priority: 0.9 },
        { url: 'privacy-policy', priority: 0.8 },
        { url: 'terms-of-service', priority: 0.9 },
    ];

    // Get the current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];

    // Generate the XML structure for the sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPaths.map((path) => `
    <url>
        <loc>${baseUrl}/${path.url}</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>${path.priority}</priority>
    </url>`).join('')}
</urlset>`;

    // Set the response headers and send the sitemap XML
    const response = new NextResponse(sitemap);
  response.headers.set('Content-Type', 'application/xml');
  return response;
}
