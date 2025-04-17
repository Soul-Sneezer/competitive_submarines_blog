const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const frontMatter = require('front-matter');

// Configure marked options
marked.setOptions({
  headerIds: true,
  headerPrefix: 'post-',
  breaks: true,
  gfm: true
});

// Template for blog posts
const blogTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}} - Competitive Submarines Blog</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="post_style.css">
</head>
<body>
    <header>
        <div class="container">
            <h1>{{title}}</h1>
            <div class="post-date">{{date}}</div>
        </div>
    </header>
    
    <main>
        <div class="container">
            {{content}}
        </div>
    </main>

    <footer>
        <div class="container">
            <a href="index.html" class="back-to-home">← Back to Home</a>
        </div>
    </footer>
</body>
</html>`;

// Template for submarine in index.html
const submarineTemplate = `
    <div class="submarine" onclick="window.location.href='{{filename}}'">
        <div class="submarine-body">
            <div class="submarine-window"></div>
            <div class="submarine-propeller"></div>
        </div>
        <div class="submarine-title">{{title}}</div>
    </div>`;

async function buildBlog() {
    try {
        // Read all markdown files from blog_posts directory
        const postsDir = path.join(__dirname, 'blog_posts');
        const files = await fs.readdir(postsDir);
        const markdownFiles = files.filter(file => file.endsWith('.md'));

        // Process each markdown file
        const posts = [];
        for (const file of markdownFiles) {
            const content = await fs.readFile(path.join(postsDir, file), 'utf-8');
            const { attributes, body } = frontMatter(content);
            
            // Convert markdown to HTML
            const htmlContent = marked(body);
            
            // Generate HTML file
            const htmlFileName = `blog${posts.length}.html`;
            const formattedDate = new Date(attributes.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const finalHtmlContent = blogTemplate
                .replace(/\{\{title\}\}/g, attributes.title)
                .replace('{{date}}', formattedDate)
                .replace('{{content}}', htmlContent);
            
            await fs.writeFile(htmlFileName, finalHtmlContent);
            
            posts.push({
                title: attributes.title,
                filename: htmlFileName
            });
        }

        // Update index.html
        const indexContent = await fs.readFile('index.html', 'utf-8');
        const submarinesHtml = posts.map(post => 
            submarineTemplate
                .replace('{{filename}}', post.filename)
                .replace('{{title}}', post.title)
        ).join('\n');

        // Find the container for submarines and replace its content
        const updatedIndex = indexContent.replace(
            /<div class="submarines-container">[\s\S]*?<\/div>/,
            `<div class="submarines-container">\n${submarinesHtml}\n</div>`
        );

        await fs.writeFile('index.html', updatedIndex);
        
        console.log('Blog build completed successfully!');
    } catch (error) {
        console.error('Error building blog:', error);
    }
}

// Run the build
buildBlog(); 