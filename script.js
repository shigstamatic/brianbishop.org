const header = document.querySelector("[data-site-header]");
const filterButtons = document.querySelectorAll("[data-filter]");
const categoryItems = document.querySelectorAll("[data-category]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 16);
});

const applyFilter = (filter) => {
  filterButtons.forEach((item) => {
    item.classList.toggle("active", item.dataset.filter === filter);
  });

  categoryItems.forEach((item) => {
    const shouldShow = filter === "all" || item.dataset.category === filter;
    item.classList.toggle("is-hidden", !shouldShow);
  });
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    applyFilter(filter);
    window.history.replaceState(null, "", filter === "all" ? window.location.pathname : `?filter=${filter}`);
  });
});

const requestedFilter = new URLSearchParams(window.location.search).get("filter");
if (requestedFilter && document.querySelector(`[data-filter="${requestedFilter}"]`)) {
  applyFilter(requestedFilter);
}

document.querySelectorAll("[data-lightbox-src]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage || !lightboxCaption) {
      return;
    }

    const image = button.querySelector("img");
    lightboxImage.src = button.dataset.lightboxSrc;
    lightboxImage.alt = image?.alt || "";
    lightboxCaption.textContent = button.dataset.lightboxCaption || "";
    lightbox.showModal();
  });
});

lightboxClose?.addEventListener("click", () => {
  lightbox?.close();
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});
