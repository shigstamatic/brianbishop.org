const addHomeContextHeader = () => {
  const params = new URLSearchParams(window.location.search);
  const isAlbumEraPage = document.querySelector(".album-era-shell");

  if (!isAlbumEraPage || params.get("from") !== "index") {
    return;
  }

  const siteRootPrefix = "../".repeat(window.location.pathname.replace(/\/$/, "").split("/").filter(Boolean).length);

  document.body.classList.add("home-context-active");
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
      <header class="site-header home-context-header" data-site-header>
        <a class="brand" href="${siteRootPrefix}" aria-label="Brian Bishop home">
          <span class="brand-text">
            <img class="brand-wordmark" src="${siteRootPrefix}assets/brianbishop-wordmark.svg" width="1626" height="397" alt="Brian Bishop">
            <span class="brand-subtitle">Long-running builds, small experiments, field notes, photos.</span>
          </span>
        </a>
        <nav class="nav" aria-label="Brian Bishop sections">
          <a href="${siteRootPrefix}">All</a>
          <a href="${siteRootPrefix}?filter=physical">Physical</a>
          <a class="active" href="${siteRootPrefix}?filter=digital" aria-current="true">Digital</a>
          <a href="${siteRootPrefix}?filter=note">Notes</a>
          <a href="${siteRootPrefix}?filter=photo">Photos</a>
          <a href="${siteRootPrefix}?filter=ephemera">Ephemera</a>
        </nav>
      </header>
    `,
  );

  document.querySelectorAll("a[href]").forEach((link) => {
    const url = new URL(link.getAttribute("href"), window.location.href);

    if (url.origin === window.location.origin && url.pathname.includes("/album-era/")) {
      url.searchParams.set("from", "index");
      link.setAttribute("href", `${url.pathname}${url.search}${url.hash}`);
    }
  });

  const homeContextHeader = document.querySelector(".home-context-header");
  const setHomeContextOffset = () => {
    document.documentElement.style.setProperty(
      "--home-context-header-height",
      `${homeContextHeader?.offsetHeight || 78}px`,
    );
  };

  setHomeContextOffset();
  window.addEventListener("resize", setHomeContextOffset);
  window.requestAnimationFrame(setHomeContextOffset);
};

addHomeContextHeader();

const header = document.querySelector("[data-site-header]");
const filterButtons = document.querySelectorAll("[data-filter]");
const categoryItems = document.querySelectorAll("[data-category]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption-output]");
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
