// Article Loader and Renderer
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const articleFile = urlParams.get('file');
  
  if (!articleFile) {
    showError('No article specified');
    return;
  }
  
  loadArticle(articleFile);
  setupScrollToTop();
});

// Configure marked.js for better rendering
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {
        console.error('Highlighting error:', err);
      }
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true,
  headerIds: true,
  headerPrefix: 'heading-'
});

async function loadArticle(filename) {
  try {
    showLoading();
    
    // First, try to load article metadata
    const metadata = await loadArticleMetadata(filename);
    
    // Load the markdown content
    const response = await fetch(`articles/${filename}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const markdownContent = await response.text();
    
    // Parse and render the content
    const htmlContent = marked.parse(markdownContent);
    
    // Extract title from content if not in metadata
    const title = extractTitleFromContent(markdownContent) || metadata?.title || 'Untitled Article';
    
    // Update page elements
    updatePageTitle(title);
    updateArticleInfo(title, metadata);
    renderArticleContent(htmlContent);
    calculateReadingTime(markdownContent);
    
    // Add language labels to code blocks
    addCodeLanguageLabels();
    
    // Hide loading and show content
    hideLoading();
    showContent();
    
  } catch (error) {
    console.error('Error loading article:', error);
    hideLoading();
    showError(`Failed to load article: ${error.message}`);
  }
}

async function loadArticleMetadata(filename) {
  try {
    const response = await fetch('data/articles.json');
    if (!response.ok) return null;
    
    const articles = await response.json();
    return articles.find(article => article.file === filename);
  } catch (error) {
    console.warn('Could not load article metadata:', error);
    return null;
  }
}

function extractTitleFromContent(markdown) {
  const lines = markdown.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('# ')) {
      return trimmedLine.substring(2).trim();
    }
  }
  return null;
}

function updatePageTitle(title) {
  document.title = `${title} - Fisher's Fishes`;
  document.getElementById('article-title').textContent = title;
  document.getElementById('article-title-breadcrumb').textContent = title;
}

function updateArticleInfo(title, metadata) {
  if (metadata) {
    // Update author
    if (metadata.author) {
      const authorElement = document.getElementById('article-author');
      authorElement.querySelector('span').textContent = metadata.author;
      authorElement.style.display = 'flex';
    }
    
    // Update date
    if (metadata.date) {
      const dateElement = document.getElementById('article-date');
      const dateObj = new Date(metadata.date);
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      dateElement.querySelector('span').textContent = formattedDate;
      dateElement.style.display = 'flex';
    }
  }
}

function renderArticleContent(htmlContent) {
  const contentElement = document.getElementById('article-content');
  contentElement.innerHTML = htmlContent;
  
  // Process all images to add loading and error handling
  const images = contentElement.querySelectorAll('img');
  images.forEach(img => {
    img.loading = 'lazy';
    img.onerror = function() {
      this.style.display = 'none';
      console.warn('Failed to load image:', this.src);
    };
  });
  
  // Process all links to open external ones in new tab
  const links = contentElement.querySelectorAll('a');
  links.forEach(link => {
    if (link.hostname && link.hostname !== window.location.hostname) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
  
  // Add copy button to code blocks
  addCopyButtonsToCodeBlocks();
}

function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  const readingTimeText = minutes === 1 ? '1 min read' : `${minutes} min read`;
  document.getElementById('reading-time-text').textContent = readingTimeText;
}

function addCodeLanguageLabels() {
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach(block => {
    const pre = block.parentElement;
    const classList = block.className;
    
    // Extract language from class (e.g., "language-python" -> "python")
    const langMatch = classList.match(/language-(\w+)/);
    if (langMatch) {
      const language = langMatch[1];
      pre.setAttribute('data-language', language);
    } else if (block.className.includes('hljs')) {
      // Try to detect language from hljs classes
      const hljsLangMatch = classList.match(/hljs-(\w+)/) || classList.match(/(\w+)-hljs/);
      if (hljsLangMatch) {
        pre.setAttribute('data-language', hljsLangMatch[1]);
      }
    }
  });
}

function addCopyButtonsToCodeBlocks() {
  const codeBlocks = document.querySelectorAll('pre');
  codeBlocks.forEach((pre, index) => {
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    copyButton.className = 'copy-button';
    copyButton.title = 'Copy code';
    copyButton.setAttribute('data-index', index);
    
    // Position the button
    pre.style.position = 'relative';
    copyButton.style.position = 'absolute';
    copyButton.style.top = '1rem';
    copyButton.style.right = '1rem';
    copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
    copyButton.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    copyButton.style.borderRadius = '4px';
    copyButton.style.color = '#fff';
    copyButton.style.padding = '0.5rem';
    copyButton.style.cursor = 'pointer';
    copyButton.style.fontSize = '0.8rem';
    copyButton.style.transition = 'all 0.3s ease';
    copyButton.style.zIndex = '10';
    
    // Hover effects
    copyButton.addEventListener('mouseenter', () => {
      copyButton.style.background = 'rgba(255, 255, 255, 0.2)';
      copyButton.style.transform = 'scale(1.05)';
    });
    
    copyButton.addEventListener('mouseleave', () => {
      copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
      copyButton.style.transform = 'scale(1)';
    });
    
    // Copy functionality
    copyButton.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      const text = code.textContent;
      
      try {
        await navigator.clipboard.writeText(text);
        copyButton.innerHTML = '<i class="fas fa-check"></i>';
        copyButton.style.background = 'rgba(0, 255, 0, 0.2)';
        
        setTimeout(() => {
          copyButton.innerHTML = '<i class="fas fa-copy"></i>';
          copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
        }, 2000);
        
      } catch (err) {
        console.error('Failed to copy code:', err);
        copyButton.innerHTML = '<i class="fas fa-times"></i>';
        copyButton.style.background = 'rgba(255, 0, 0, 0.2)';
        
        setTimeout(() => {
          copyButton.innerHTML = '<i class="fas fa-copy"></i>';
          copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
        }, 2000);
      }
    });
    
    pre.appendChild(copyButton);
  });
}

function setupScrollToTop() {
  const scrollButton = document.getElementById('scroll-to-top');
  
  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Show/hide scroll button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollButton.style.opacity = '1';
    } else {
      scrollButton.style.opacity = '0.7';
    }
  });
}

function showLoading() {
  document.getElementById('loading-screen').style.display = 'flex';
  document.getElementById('article-main').style.display = 'none';
  document.getElementById('error-message').style.display = 'none';
}

function hideLoading() {
  document.getElementById('loading-screen').style.display = 'none';
}

function showContent() {
  const main = document.getElementById('article-main');
  main.style.display = 'block';
  
  // Trigger fade-in animation
  setTimeout(() => {
    main.classList.add('loaded');
  }, 100);
}

function showError(message) {
  document.getElementById('loading-screen').style.display = 'none';
  document.getElementById('article-main').style.display = 'none';
  
  const errorElement = document.getElementById('error-message');
  const errorText = errorElement.querySelector('p');
  errorText.textContent = message;
  errorElement.style.display = 'flex';
}

// Add table of contents functionality
function generateTableOfContents() {
  const headings = document.querySelectorAll('.article-content h1, .article-content h2, .article-content h3');
  
  if (headings.length < 3) return; // Don't show TOC for short articles
  
  const tocContainer = document.createElement('div');
  tocContainer.className = 'table-of-contents';
  tocContainer.innerHTML = '<h3><i class="fas fa-list"></i> Table of Contents</h3>';
  
  const tocList = document.createElement('ul');
  
  headings.forEach((heading, index) => {
    const id = `toc-${index}`;
    heading.id = id;
    
    const li = document.createElement('li');
    li.className = `toc-${heading.tagName.toLowerCase()}`;
    
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = heading.textContent;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    li.appendChild(link);
    tocList.appendChild(li);
  });
  
  tocContainer.appendChild(tocList);
  
  // Insert TOC after the article info
  const articleInfo = document.querySelector('.article-info');
  articleInfo.parentNode.insertBefore(tocContainer, articleInfo.nextSibling);
}

// Add search functionality within the article
function addInPageSearch() {
  const searchContainer = document.createElement('div');
  searchContainer.className = 'in-page-search';
  searchContainer.innerHTML = `
    <div class="search-box">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Search in article..." id="article-search">
      <button id="clear-search"><i class="fas fa-times"></i></button>
    </div>
    <div id="search-results"></div>
  `;
  
  // Add search styles
  const searchStyles = `
    .in-page-search {
      position: sticky;
      top: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin: 2rem 0;
      z-index: 100;
    }
    
    .search-box {
      display: flex;
      align-items: center;
      padding: 1rem;
      gap: 0.5rem;
      border-bottom: 1px solid #eee;
    }
    
    #article-search {
      flex: 1;
      border: none;
      outline: none;
      font-size: 1rem;
      padding: 0.5rem;
    }
    
    #clear-search {
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
      padding: 0.5rem;
    }
    
    .search-highlight {
      background: yellow;
      padding: 0.1rem 0.2rem;
      border-radius: 2px;
    }
    
    #search-results {
      max-height: 200px;
      overflow-y: auto;
      display: none;
    }
    
    .search-result {
      padding: 0.5rem 1rem;
      cursor: pointer;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .search-result:hover {
      background: #f5f5f5;
    }
  `;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = searchStyles;
  document.head.appendChild(styleSheet);
  
  // Insert search box
  const articleContent = document.querySelector('.article-content');
  articleContent.parentNode.insertBefore(searchContainer, articleContent);
  
  // Search functionality
  const searchInput = document.getElementById('article-search');
  const clearButton = document.getElementById('clear-search');
  const resultsContainer = document.getElementById('search-results');
  
  let searchTimeout;
  
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(e.target.value);
    }, 300);
  });
  
  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchHighlights();
    resultsContainer.style.display = 'none';
  });
}

function performSearch(query) {
  const resultsContainer = document.getElementById('search-results');
  
  if (query.length < 2) {
    clearSearchHighlights();
    resultsContainer.style.display = 'none';
    return;
  }
  
  clearSearchHighlights();
  
  const articleContent = document.querySelector('.article-content');
  const walker = document.createTreeWalker(
    articleContent,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  
  const matches = [];
  let node;
  
  while (node = walker.nextNode()) {
    const text = node.textContent;
    const regex = new RegExp(query, 'gi');
    const match = text.match(regex);
    
    if (match) {
      const highlightedText = text.replace(regex, match => `<span class="search-highlight">${match}</span>`);
      const wrapper = document.createElement('span');
      wrapper.innerHTML = highlightedText;
      node.parentNode.replaceChild(wrapper, node);
      
      matches.push({
        element: wrapper,
        context: text.substring(Math.max(0, text.toLowerCase().indexOf(query.toLowerCase()) - 30), text.toLowerCase().indexOf(query.toLowerCase()) + query.length + 30)
      });
    }
  }
  
  // Show results
  if (matches.length > 0) {
    resultsContainer.innerHTML = matches.map((match, index) => 
      `<div class="search-result" onclick="scrollToMatch(${index})">
        ...${match.context}...
      </div>`
    ).join('');
    resultsContainer.style.display = 'block';
    
    // Store matches for scrolling
    window.searchMatches = matches;
  } else {
    resultsContainer.innerHTML = '<div class="search-result">No results found</div>';
    resultsContainer.style.display = 'block';
  }
}

function scrollToMatch(index) {
  if (window.searchMatches && window.searchMatches[index]) {
    window.searchMatches[index].element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
}

function clearSearchHighlights() {
  const highlights = document.querySelectorAll('.search-highlight');
  highlights.forEach(highlight => {
    const parent = highlight.parentNode;
    parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
    parent.normalize();
  });
}

// Enhanced article loading with progress tracking
function showLoadingProgress() {
  const loadingScreen = document.getElementById('loading-screen');
  const progressBar = document.createElement('div');
  progressBar.className = 'loading-progress-bar';
  progressBar.innerHTML = `
    <div class="progress-track">
      <div class="progress-fill" id="progress-fill"></div>
    </div>
    <div class="progress-text">Loading article content...</div>
  `;
  
  loadingScreen.appendChild(progressBar);
  
  // Add progress bar styles
  const progressStyles = `
    .loading-progress-bar {
      margin-top: 2rem;
      width: 300px;
    }
    
    .progress-track {
      width: 100%;
      height: 4px;
      background: #f0f0f0;
      border-radius: 2px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #f9a10c, #ec670a);
      width: 0%;
      transition: width 0.3s ease;
    }
    
    .progress-text {
      margin-top: 1rem;
      font-size: 0.9rem;
      color: #666;
    }
  `;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = progressStyles;
  document.head.appendChild(styleSheet);
}

// Export functions for use in other scripts if needed
window.ArticleLoader = {
  loadArticle,
  generateTableOfContents,
  addInPageSearch
};