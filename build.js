const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');

// Ensure public directory exists
fs.ensureDirSync('public');

// Copy static assets
fs.copySync('src/static', 'public', { overwrite: true });

// Read the base template
const template = fs.readFileSync('src/templates/base.html', 'utf-8');

// Function to convert markdown to HTML
function convertMarkdownToHtml(markdown, title) {
    const content = marked(markdown);
    return template
        .replace('{{title}}', title)
        .replace('{{content}}', content);
}

// Process pages
const pagesDir = 'src/pages';
const pages = fs.readdirSync(pagesDir);

pages.forEach(page => {
    if (page.endsWith('.md')) {
        const markdown = fs.readFileSync(path.join(pagesDir, page), 'utf-8');
        const title = page.replace('.md', '');
        const html = convertMarkdownToHtml(markdown, title);
        fs.writeFileSync(path.join('public', `${title}.html`), html);
    }
});

// Process blog posts
const postsDir = 'src/posts';
const posts = fs.readdirSync(postsDir);

posts.forEach(post => {
    if (post.endsWith('.md')) {
        const markdown = fs.readFileSync(path.join(postsDir, post), 'utf-8');
        const title = post.replace('.md', '');
        const html = convertMarkdownToHtml(markdown, title);
        fs.writeFileSync(path.join('public', 'posts', `${title}.html`), html);
    }
});

console.log('Build completed successfully!'); 