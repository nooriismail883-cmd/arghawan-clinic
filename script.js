const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const backTop = document.getElementById("backTop");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuToggle.innerHTML = nav.classList.contains("open")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) backTop.classList.add("show");
  else backTop.classList.remove("show");
});

backTop.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.target);
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 45));
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = current.toLocaleString();
    }, 35);
    observer.unobserve(counter);
  });
}, { threshold: 0.7 });

counters.forEach(counter => counterObserver.observe(counter));

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("formMessage");
  message.textContent = `Thank you, ${name}! Please contact us directly on WhatsApp to complete your appointment request.`;
  message.style.color = "#0b5ed7";
  event.target.reset();
});

const appointmentDate = document.querySelector('input[name="Preferred Date"]');
if (appointmentDate) {
  appointmentDate.min = new Date().toISOString().split("T")[0];
}
