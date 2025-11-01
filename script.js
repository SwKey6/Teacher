// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.slide-up, .fade-in');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Initialize formula orbit animations
    initFormulaOrbits();
});

// Formula orbit animation
function initFormulaOrbits() {
    const formulas = document.querySelectorAll('.formula-item');
    if (formulas.length === 0) return;
    
    const subjectsSection = document.querySelector('.subjects');
    if (!subjectsSection) return;
    
    // Ellipse parameters - larger horizontal radius, smaller vertical radius
    const radiusX = 500; // Horizontal radius (half width)
    const radiusY = 250; // Vertical radius (half height)
    
    // Different speeds and delays for each formula
    const formulaConfigs = [
        { speed: 20, delay: 0, reverse: false },      // formula-1
        { speed: 25, delay: 2.5, reverse: true },    // formula-2
        { speed: 18, delay: 5, reverse: false },      // formula-3
        { speed: 22, delay: 1.25, reverse: true },    // formula-4
        { speed: 30, delay: 3.75, reverse: false },  // formula-5
        { speed: 24, delay: 6.25, reverse: true },   // formula-6
        { speed: 15, delay: 1.875, reverse: false },  // formula-7
        { speed: 20, delay: 3.125, reverse: true },  // formula-8
        { speed: 16, delay: 0.625, reverse: true },   // formula-9
        { speed: 28, delay: 4.375, reverse: false },  // formula-10
        { speed: 21, delay: 2.5, reverse: true },     // formula-11
        { speed: 19, delay: 5.625, reverse: false },  // formula-12
        { speed: 23, delay: 1.25, reverse: true },    // formula-13
        { speed: 17, delay: 2.5, reverse: false },   // formula-14
        { speed: 26, delay: 3.75, reverse: true },    // formula-15
        { speed: 27, delay: 5, reverse: false },      // formula-16
    ];
    
    formulas.forEach((formula, index) => {
        const config = formulaConfigs[index] || { speed: 20, delay: 0, reverse: false };
        let angle = (config.delay / config.speed) * 360;
        let rotation = 0;
        let startTime = Date.now() + (config.delay * 1000);
        
        function animateFormula(currentTime) {
            // Check if it's time to start this animation
            if (Date.now() < startTime) {
                requestAnimationFrame(animateFormula);
                return;
            }
            
            // Calculate position on ellipse
            const rad = (angle * Math.PI) / 180;
            const x = radiusX * Math.cos(rad);
            const y = radiusY * Math.sin(rad);
            
            // Update rotation (slower rotation)
            rotation += config.reverse ? -0.5 : 0.5;
            if (rotation > 360) rotation -= 360;
            if (rotation < 0) rotation += 360;
            
            // Update opacity based on position
            const opacity = 0.2 + (Math.abs(Math.sin(rad)) * 0.1);
            
            // Apply transform
            formula.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg)`;
            formula.style.opacity = opacity;
            
            // Update angle (speed depends on config.speed - higher speed = faster movement)
            // Normalize speed: divide by 20 to get reasonable speed (20 speed = 0.1 degree per frame)
            const speedMultiplier = config.speed / 20;
            const angleStep = (config.reverse ? -0.1 : 0.1) * speedMultiplier;
            angle += angleStep;
            if (angle > 360) angle -= 360;
            if (angle < 0) angle += 360;
            
            requestAnimationFrame(animateFormula);
        }
        
        // Start animation
        requestAnimationFrame(animateFormula);
    });
}

