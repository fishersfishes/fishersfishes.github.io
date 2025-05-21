document.addEventListener('DOMContentLoaded', () => {
  loadCards('data/activities.json', 'activities-container');
  loadCards('data/resources.json', 'resources-container');
  loadArticles('data/articles.json', 'articles-container');
});

function loadCards(jsonPath, containerId) {
  fetch(jsonPath)
    .then(res => res.json())
    .then(data => createCards(data, containerId))
    .catch(err => {
      console.error(`Error loading ${jsonPath}:`, err);
      document.getElementById(containerId).innerHTML =
        '<div class="simple-card"><p>Error loading content. Please try again later.</p></div>';
    });
}

function createCards(items, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  items.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'simple-card';
    card.style.setProperty('--i', index);
    const imageTag = item.image
      ? `<img src="${item.image}" alt="${item.title}">`
      : '';

    const linkTag = item.link && item.link !== '#'
      ? `<a href="${item.link}">View Details</a>`
      : '';

    card.innerHTML = `
      ${imageTag}
      <h3>${item.title}</h3>
      <p>${item.short_description || ''}</p>
      ${linkTag}
    `;
    container.appendChild(card);
  });
}

function loadArticles(jsonPath, containerId) {
  fetch(jsonPath)
    .then(res => res.json())
    .then(data => createArticleCards(data, containerId))
    .catch(err => {
      console.error(`Error loading ${jsonPath}:`, err);
      document.getElementById(containerId).innerHTML =
        '<div class="simple-card"><p>Error loading articles. Please try again later.</p></div>';
    });
}

function createArticleCards(articles, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  articles.forEach((article, index) => {
    const card = document.createElement('div');
    card.className = 'simple-card article-card';
    card.style.setProperty('--i', index);
    
    const imageTag = article.image
      ? `<img src="${article.image}" alt="${article.title}">`
      : '';
    
    // Format the date nicely if it exists
    const dateObj = article.date ? new Date(article.date) : null;
    const formattedDate = dateObj 
      ? dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : '';
    
    // Add icons for author and date
    const authorLine = article.author 
      ? `<div class="article-meta-item"><i class="fas fa-user"></i> ${article.author}</div>` 
      : '';
    
    const dateLine = formattedDate 
      ? `<div class="article-meta-item"><i class="fas fa-calendar-alt"></i> ${formattedDate}</div>` 
      : '';
    
    const metaLine = `<div class="article-meta">${authorLine}${dateLine}</div>`;

    // Create a link to the article file
    const articleLink = article.file
      ? `<a href="articles/${article.file}">Read Article</a>`
      : '';

    card.innerHTML = `
      ${imageTag}
      <h3>${article.title}</h3>
      ${metaLine}
      <p>${article.short_description || ''}</p>
      ${articleLink}
    `;
    container.appendChild(card);
  });
}