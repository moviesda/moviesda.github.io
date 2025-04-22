const fs = require('fs');
const path = require('path');
const matter = require('gray-matter'); // FIX: use require for gray-matter too

function getAllMovies() {
    const contentDir = path.join(process.cwd(), 'src', 'content');
    const files = fs.readdirSync(contentDir);

    const movies = files.map((fileName) => {
        const filePath = path.join(contentDir, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        return {
            ...data,
            created_at: data.created_at ? String(data.created_at) : null,
            updated_at: data.updated_at ? String(data.updated_at) : null,
        };
    });

    return movies;
}

const baseUrl = 'https://moviesda.github.io'; // replace with your real domain
const outputDir = path.join(process.cwd(), 'public', 'sitemaps');

function generateSitemaps() {
    const movies = getAllMovies();
    const urls = movies.map((movie) => `${baseUrl}/movie/${movie.slug}`);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const chunkSize = 1000;
    const sitemapFiles = [];

    for (let i = 0; i < urls.length; i += chunkSize) {
        const chunk = urls.slice(i, i + chunkSize);
        const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunk.map((url) => `
    <url>
        <loc>${url}</loc>
    </url>`).join('')}
</urlset>`;

        const sitemapFilename = `sitemap-${Math.floor(i / chunkSize) + 1}.xml`;
        fs.writeFileSync(path.join(outputDir, sitemapFilename), sitemapContent);
        sitemapFiles.push(`${baseUrl}/sitemaps/${sitemapFilename}`);
    }

    // Create sitemap index
    const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles.map((fileUrl) => `
    <sitemap>
        <loc>${fileUrl}</loc>
    </sitemap>`).join('')}
</sitemapindex>`;

    fs.writeFileSync(path.join(outputDir, 'sitemap-index.xml'), sitemapIndexContent);

    console.log(`✅ Generated ${sitemapFiles.length} sitemap files!`);
}

generateSitemaps();
