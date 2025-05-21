document.addEventListener('DOMContentLoaded', () => {
  loadCards('data/activities.json',  'activities-container');
  loadCards('data/resources.json',   'resources-container');
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