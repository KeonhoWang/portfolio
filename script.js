// ── Particle Background ──
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
let primaryRGB = "233, 69, 96";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.5 + 0.1,
  };
}

for (let i = 0; i < 80; i++) particles.push(createParticle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${primaryRGB}, ${p.opacity})`;
    ctx.fill();
  });

  particles.forEach((p1, i) => {
    particles.slice(i + 1).forEach((p2) => {
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(${primaryRGB}, ${0.1 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

// ── Typewriter ──
const phrases = [
  "Software Developer",
  "React Developer",
  "Python Developer",
  "Full-Stack Developer",
  "Creative Problem Solver",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById("typewriter");

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => {
      isDeleting = true;
    }, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(type, isDeleting ? 60 : 100);
}

type();

// ── Fade In on Scroll ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        entry.target.querySelectorAll(".skill-fill").forEach((bar) => {
          bar.style.width = bar.dataset.width + "%";
        });

        entry.target
          .querySelectorAll(".stat-number[data-target]")
          .forEach((el) => {
            const target = parseInt(el.dataset.target);
            let current = 0;
            const step = target / 60;
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              el.textContent =
                Math.floor(current) + (target >= 1000 ? "+" : "");
            }, 16);
          });
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// ── Contact Form ──
document.getElementById("form-submit").addEventListener("click", () => {
  const name = document.getElementById("form-name").value.trim();
  const email = document.getElementById("form-email").value.trim();
  const message = document.getElementById("form-message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields!");
    return;
  }

  document.getElementById("form-success").style.display = "block";
  document.getElementById("form-name").value = "";
  document.getElementById("form-email").value = "";
  document.getElementById("form-message").value = "";

  setTimeout(() => {
    document.getElementById("form-success").style.display = "none";
  }, 5000);
});

// ── Cursor Spotlight ──
const spotlight = document.getElementById("spotlight");

document.addEventListener("mousemove", (e) => {
  spotlight.style.left = e.clientX + "px";
  spotlight.style.top = e.clientY + "px";
});

// ── Scroll to Top ──
const scrollTopBtn = document.getElementById("scroll-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ── Theme Switcher ──
const themeDots = document.querySelectorAll(".theme-dot");

themeDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const color = dot.dataset.color;
    const shadow = dot.dataset.shadow;

    document.documentElement.style.setProperty("--primary", color);
    primaryRGB = shadow;

    themeDots.forEach((d) => d.classList.remove("active"));
    dot.classList.add("active");

    spotlight.style.background = `radial-gradient(circle, rgba(${shadow},0.08) 0%, transparent 70%)`;
  });
});

// ── Hamburger Menu ──
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
});
