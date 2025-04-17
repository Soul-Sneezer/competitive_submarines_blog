const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const frontMatter = require('front-matter');
const Prism = require('prismjs');
const katex = require('katex');
const loadLanguages = require('prismjs/components/');
// Load additional languages if needed
loadLanguages(['javascript', 'python', 'html', 'css', 'bash']);

// Custom renderer for math blocks and inline math
const renderer = new marked.Renderer();
const originalCodeRenderer = renderer.code.bind(renderer);
const originalInlineCodeRenderer = renderer.codespan.bind(renderer);

renderer.codespan = function(text) {
  if (text.startsWith('math-inline:')) {
    const math = text.slice('math-inline:'.length);
    return katex.renderToString(math, {
      displayMode: false,
      throwOnError: false
    });
  }
  return originalInlineCodeRenderer(text);
};

renderer.code = function(code, language) {
  if (language === 'math') {
    return katex.renderToString(code, {
      displayMode: true,
      throwOnError: false
    });
  }
  if (language === 'chart') {
    try {
      const chartConfig = JSON.parse(code);
      const chartId = `chart-${Math.random().toString(36).substr(2, 9)}`;
      return `
      <div class="chart-container" style="position: relative; height:${chartConfig.height || '300px'}; width:${chartConfig.width || '100%'}">
        <canvas id="${chartId}"></canvas>
      </div>
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          const ctx = document.getElementById('${chartId}').getContext('2d');
          new Chart(ctx, ${JSON.stringify(chartConfig.config)});
        });
      </script>
    `;
    } catch (error) {
      console.error('Error parsing chart configuration:', error);
      return `<div class="error">Error rendering chart: ${error.message}</div>`;
    }
  }
  return originalCodeRenderer(code, language);
};

// Configure marked options
marked.setOptions({
  headerIds: true,
  headerPrefix: 'post-',
  breaks: true,
  gfm: true,
  renderer: renderer,
  highlight: function(code, lang) {
    if (lang && Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    }
    return code;
  }
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-css.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-html.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
    <style>
        /* Custom styling for darker background and more vibrant colors */
        pre[class*="language-"] {
            background: #1a1a1a !important;
            border-radius: 4px;
            margin: 1.5em 0;
            padding: 1.5em;
        }
        .token.keyword {
            color: #ff79c6 !important;
        }
        .token.function {
            color: #50fa7b !important;
        }
        .token.string {
            color: #f1fa8c !important;
        }
        .token.comment {
            color: #6272a4 !important;
        }
        .token.number {
            color: #bd93f9 !important;
        }
        .token.operator {
            color: #ff79c6 !important;
        }
        /* Math styling */
        .katex {
            font-size: 1.1em;
            color: #f8f8f2;
        }
        .katex-display {
            margin: 1em 0;
            padding: 0.5em;
            background: #1a1a1a;
            border-radius: 4px;
        }
        /* Chart styling */
        .chart-container {
            margin: 1.5em 0;
            background: #1a1a1a;
            border-radius: 4px;
            padding: 1em;
        }
        canvas {
            max-width: 100%;
        }
        /* Error styling */
        .error {
            color: #ff5555;
            background: #1a1a1a;
            padding: 1em;
            border-radius: 4px;
            margin: 1em 0;
        }
    </style>
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