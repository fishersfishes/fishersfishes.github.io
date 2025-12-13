document.addEventListener('DOMContentLoaded', () => {
  loadCards('data/activities.json', 'activities-container');
  loadCards('data/resources.json', 'resources-container');
  loadArticles('data/articles.json', 'articles-container');
  loadUpcoming('data/upcoming.json', 'upcoming-container');
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

function loadUpcoming(jsonPath, containerId) {
  fetch(jsonPath)
    .then(res => res.json())
    .then(data => renderUpcoming(data, containerId))
    .catch(err => {
      console.error(`Error loading ${jsonPath}:`, err);
      const el = document.getElementById(containerId);
      if (el) el.innerHTML = '<div class="simple-card"><p>Error loading upcoming events.</p></div>';
    });
}

function renderUpcoming(events, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  if (!events || events.length === 0) {
    container.innerHTML = '<div class="no-articles-message">No upcoming events right now. Check back soon!</div>';
    return;
  }

  events.forEach((ev) => {
    const card = document.createElement('div');
    card.className = 'event-card';

    const header = document.createElement('div');
    header.className = 'event-header';
    const dateStr = ev.date ? new Date(ev.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
    const dateTag = dateStr ? `<span class="event-date">${dateStr}</span>` : '';
    const timeTag = ev.time ? `<span class="event-time">${ev.time}</span>` : '';
    header.innerHTML = `<h3>${ev.title}</h3>`
      + (ev.speaker ? `<p class="speaker">by <strong>${ev.speaker}</strong></p>` : '')
      + `<div class="event-meta">${dateTag} ${timeTag}</div>`;

    const content = document.createElement('div');
    content.className = 'event-content';

    const aside = document.createElement('aside');
    aside.className = 'event-portrait-wrap';
    if (ev.portrait) {
      const img = document.createElement('img');
      img.className = 'event-portrait';
      img.src = ev.portrait;
      img.alt = ev.speaker ? `Portrait of ${ev.speaker}` : 'Speaker portrait';
      aside.appendChild(img);
    }

    const body = document.createElement('div');
    body.className = 'event-body';
    const desc = document.createElement('p');
    desc.textContent = ev.description || '';
    body.appendChild(desc);

    if (ev.link) {
      const linkWrap = document.createElement('div');
      linkWrap.className = 'event-link';
      linkWrap.innerHTML = `<a href="${ev.link}" target="_blank" rel="noopener" aria-label="Join Zoom">Join on Zoom</a>`;
      body.appendChild(linkWrap);
    }

    content.appendChild(aside);
    content.appendChild(body);

    card.appendChild(header);
    card.appendChild(content);
    container.appendChild(card);
  });
}
