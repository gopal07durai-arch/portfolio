// Simple typing effect for the hero section
const textArray = ["Aspiring Software Engineer", "Java & React Developer", "AI & Tech Enthusiast"];
let textIndex = 0;
let charIndex = 0;
const typingElement = document.querySelector(".typing-text");

function type() {
  if (charIndex < textArray[textIndex].length) {
    typingElement.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100); // typing speed
  } else {
    setTimeout(erase, 2000); // wait before erasing
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50); // erasing speed
  } else {
    textIndex = (textIndex + 1) % textArray.length;
    setTimeout(type, 500); // wait before typing next string
  }
}

document.addEventListener("DOMContentLoaded", () => {
    // Start typing effect
    if(typingElement) {
        setTimeout(type, 1000);
    }
    
    // Smooth scrolling is handled by CSS (scroll-behavior: smooth), 
    // but just in case, we can add a slight reveal animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply initial state for fade-in elements
    document.querySelectorAll('section, .project-card, .education-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Custom Cursor Logic
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");
    
    window.addEventListener("mousemove", function(e) {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // animate the outline to follow instantly, less trailing
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 150, fill: "forwards" });
    });

    // Interactive Card Hover Logic (3D Tilt & Glow)
    const interactiveCards = document.querySelectorAll(".interactive-card");
    
    interactiveCards.forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });
});
