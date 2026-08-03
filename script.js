const header = document.querySelector("[data-site-header]");
const filterButtons = document.querySelectorAll("[data-filter]");
const categoryItems = document.querySelectorAll("[data-category]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxCount = document.querySelector("[data-lightbox-count]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const lightboxPrev = document.querySelector("[data-lightbox-prev]");
const lightboxNext = document.querySelector("[data-lightbox-next]");
const year = document.querySelector("[data-year]");
const lightboxItems = Array.from(document.querySelectorAll("[data-lightbox-src]"));
let activeLightboxIndex = 0;

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

const showLightboxItem = (index) => {
  if (!lightboxImage || !lightboxCaption || lightboxItems.length === 0) {
    return;
  }

  activeLightboxIndex = (index + lightboxItems.length) % lightboxItems.length;
  const item = lightboxItems[activeLightboxIndex];
  const image = item.querySelector("img");

  lightboxImage.src = item.dataset.lightboxSrc;
  lightboxImage.alt = image?.alt || "";
  lightboxCaption.textContent = item.dataset.lightboxCaption || "";

  if (lightboxCount) {
    lightboxCount.textContent = `${activeLightboxIndex + 1} / ${lightboxItems.length}`;
  }
};

const stepLightbox = (direction) => {
  showLightboxItem(activeLightboxIndex + direction);
};

lightboxItems.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (!lightbox) {
      return;
    }

    showLightboxItem(index);
    lightbox.showModal();
    lightbox.focus({ preventScroll: true });
  });
});

lightboxClose?.addEventListener("click", () => {
  lightbox?.close();
});

lightboxPrev?.addEventListener("click", () => {
  stepLightbox(-1);
});

lightboxNext?.addEventListener("click", () => {
  stepLightbox(1);
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox?.open) {
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    stepLightbox(-1);
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    stepLightbox(1);
  }
});
