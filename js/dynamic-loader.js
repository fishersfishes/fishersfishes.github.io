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
    const imageTag = item.image ? `<img src="${item.image}" alt="${item.title}">` : '';

    // Make entire card clickable if there's a valid link
    if (item.link && item.link !== '#') {
      card.addEventListener('click', () => {
        window.location.href = item.link;
      });
      card.style.cursor = 'pointer';
    }

    const titleTag = `<h3>${item.title}</h3>`;
    const descriptionTag = `<p>${item.short_description || ''}</p>`;

    card.innerHTML = `
      ${imageTag}
      ${titleTag}
      ${descriptionTag}
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

  // Display message when no articles are available
  if (!articles || articles.length === 0) {
    container.innerHTML = '<div class="no-articles-message">Editing in progress, check back soon for new content!</div>';
    return;
  }

  articles.forEach((article, index) => {
    const card = document.createElement('div');
    card.className = 'simple-card article-card';
    card.style.setProperty('--i', index);

    const imageTag = article.image ? `<img src="${article.image}" alt="${article.title}">` : '';

    const dateObj = article.date ? new Date(article.date) : null;
    const formattedDate = dateObj
      ? dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : '';

    const authorLine = article.author
      ? `<div class="article-meta-item"><i class="fas fa-user"></i> ${article.author}</div>`
      : '';

    const dateLine = formattedDate
      ? `<div class="article-meta-item"><i class="fas fa-calendar-alt"></i> ${formattedDate}</div>`
      : '';

    const metaLine = `<div class="article-meta">${authorLine}${dateLine}</div>`;

    if (article.file) {
      card.addEventListener('click', () => {
        window.location.href = `article.html?file=${article.file}`;
      });
      card.style.cursor = 'pointer';
    }

    card.innerHTML = `
      ${imageTag}
      <h3>${article.title}</h3>
      ${metaLine}
      <p>${article.short_description || ''}</p>
    `;
    container.appendChild(card);
  });
}
