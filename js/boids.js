document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const header = document.querySelector('header');
    const boidsContainer = document.getElementById('boids-container');
    
    // Set initial container size and position
    function updateContainer() {
        const rect = header.getBoundingClientRect();
        boidsContainer.style.width = `${rect.width}px`;
        boidsContainer.style.height = `${rect.height}px`;
        boidsContainer.style.left = `${rect.left}px`;
        boidsContainer.style.top = `${rect.top}px`;
        return rect;
    }
    
    let headerRect = updateContainer();

    // Configuration
    const BOID_COUNT = 20;
    const VISUAL_RANGE = 100;
    const PROTECTED_RANGE = 30;
    const MAX_SPEED = 3;
    const MAX_FORCE = 0.05;

    // Mouse position (header-relative)
    let mouseX = -1000;
    let mouseY = -1000;

    // Track mouse movement within header
    header.addEventListener('mousemove', (e) => {
        const rect = header.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    header.addEventListener('mouseleave', () => {
        mouseX = -1000;
        mouseY = -1000;
    });

    // Boid class
    class Boid {
        constructor() {
            // Initialize within header bounds
            this.x = Math.random() * headerRect.width;
            this.y = Math.random() * headerRect.height;
            this.vx = Math.random() * 4 - 2;
            this.vy = Math.random() * 4 - 2;
            
            // Create boid element
            this.element = document.createElement('div');
            this.element.className = 'boid';
            this.element.style.position = 'absolute';
            boidsContainer.appendChild(this.element);
        }
        
        // Flocking rules
        flock(boids) {
            let separation = { x: 0, y: 0 };
            let alignment = { x: 0, y: 0 };
            let cohesion = { x: 0, y: 0 };
            let totalNeighbors = 0;
            
            for (const other of boids) {
                if (other === this) continue;
                
                const dx = other.x - this.x;
                const dy = other.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < VISUAL_RANGE) {
                    // Separation
                    if (distance < PROTECTED_RANGE) {
                        separation.x -= dx;
                        separation.y -= dy;
                    }
                    
                    // Alignment
                    alignment.x += other.vx;
                    alignment.y += other.vy;
                    
                    // Cohesion
                    cohesion.x += other.x;
                    cohesion.y += other.y;
                    
                    totalNeighbors++;
                }
            }
            
            if (totalNeighbors > 0) {
                // Alignment
                alignment.x /= totalNeighbors;
                alignment.y /= totalNeighbors;
                alignment = this.normalize(alignment);
                alignment.x *= MAX_SPEED;
                alignment.y *= MAX_SPEED;
                alignment = this.limitForce(alignment);
                
                // Cohesion
                cohesion.x /= totalNeighbors;
                cohesion.y /= totalNeighbors;
                cohesion.x -= this.x;
                cohesion.y -= this.y;
                cohesion = this.normalize(cohesion);
                cohesion.x *= MAX_SPEED;
                cohesion.y *= MAX_SPEED;
                cohesion = this.limitForce(cohesion);
                
                // Separation
                separation = this.normalize(separation);
                separation = this.limitForce(separation);
            }
            
            // Apply weights
            this.vx += separation.x * 1.5 + alignment.x * 1.0 + cohesion.x * 1.0;
            this.vy += separation.y * 1.5 + alignment.y * 1.0 + cohesion.y * 1.0;
        }
        
        // Avoid mouse cursor
        avoidMouse() {
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = 100 / (distance + 0.1);
                this.vx += (dx / distance) * force * 0.2;
                this.vy += (dy / distance) * force * 0.2;
            }
        }
        
        // Normalize vector
        normalize(vector) {
            const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
            if (length > 0) {
                vector.x /= length;
                vector.y /= length;
            }
            return vector;
        }
        
        // Limit force
        limitForce(vector) {
            const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
            if (length > MAX_FORCE) {
                vector.x = (vector.x / length) * MAX_FORCE;
                vector.y = (vector.y / length) * MAX_FORCE;
            }
            return vector;
        }
        
        // Limit speed
        limitSpeed() {
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > MAX_SPEED) {
                this.vx = (this.vx / speed) * MAX_SPEED;
                this.vy = (this.vy / speed) * MAX_SPEED;
            }
        }
        
        // Update boid position
        update(boids) {
            headerRect = updateContainer();
            
            this.flock(boids);
            this.avoidMouse();
            this.limitSpeed();
            
            // Update position
            this.x += this.vx;
            this.y += this.vy;
            
            // Boundary checks (bounce)
            if (this.x < 0) {
                this.x = 0;
                this.vx *= -0.8;
            }
            if (this.x > headerRect.width) {
                this.x = headerRect.width;
                this.vx *= -0.8;
            }
            if (this.y < 0) {
                this.y = 0;
                this.vy *= -0.8;
            }
            if (this.y > headerRect.height) {
                this.y = headerRect.height;
                this.vy *= -0.8;
            }
            
            // Update DOM element
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
            const angle = Math.atan2(this.vy, this.vx) * 180 / Math.PI + 90;
            this.element.style.transform = `rotate(${angle}deg)`;
        }
    }

    // Create boids
    const boids = [];
    for (let i = 0; i < BOID_COUNT; i++) {
        boids.push(new Boid());
    }

    // Animation loop
    function animate() {
        for (const boid of boids) {
            boid.update(boids);
        }
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        headerRect = updateContainer();
    });

    // Handle scroll (for fixed headers)
    window.addEventListener('scroll', () => {
        headerRect = updateContainer();
    });
});