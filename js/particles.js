document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 8 + 2;
    const posX = Math.random() * 100;
    const duration = Math.random() * 15 + 10; 
    const delay = Math.random() * 15;
    const opacity = Math.random() * 0.6 + 0.2;
    const animationType = Math.floor(Math.random() * 3);
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}vw`;
    particle.style.opacity = opacity;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    if (animationType === 0) {
        particle.style.animationName = 'fall';
    } else if (animationType === 1) {
        particle.style.animationName = 'fall2';
    } else {
        particle.style.animationName = 'fall3';
    }
    
    particlesContainer.appendChild(particle);
    }
});