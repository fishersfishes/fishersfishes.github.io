document.addEventListener('DOMContentLoaded', () => {
const mainContent = document.querySelector('main');
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-indicator';
scrollIndicator.innerHTML = '↓ Scroll to explore ↓';
document.querySelector('header').appendChild(scrollIndicator);

window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.3) {
    mainContent.classList.add('content-visible');
    } else {
    mainContent.classList.remove('content-visible');
    }
});

if (window.scrollY > window.innerHeight * 0.3) {
    mainContent.classList.add('content-visible');
}
});