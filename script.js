const header = document.querySelector("[data-site-header]");
const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-category]");
const photoStrip = document.querySelector("[data-photo-strip]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 16);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

document.querySelector("[data-photo-prev]")?.addEventListener("click", () => {
  photoStrip?.scrollBy({ left: -photoStrip.clientWidth * 0.8, behavior: "smooth" });
});

document.querySelector("[data-photo-next]")?.addEventListener("click", () => {
  photoStrip?.scrollBy({ left: photoStrip.clientWidth * 0.8, behavior: "smooth" });
});
