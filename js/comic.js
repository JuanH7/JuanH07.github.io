/* Lector interactivo del mini cómic. */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    window.SiteNavigation.init();
    const pages = window.PopUpBookData.comicPages;
    const frame = document.querySelector("#comic-frame");
    const art = document.querySelector("#comic-art");
    const pageNumber = document.querySelector("#comic-page-number");
    const pageList = document.querySelector("#comic-page-list");
    const status = document.querySelector("#comic-status");
    const previousButton = document.querySelector("#comic-previous");
    const progress = document.querySelector("#comic-progress");
    const backToTop = document.querySelector(".back-to-top");
    const foundHotspots = pages.map(() => new Set());
    let currentIndex = 0;
    let isAdvancing = false;
    let transitionTimer = null;

    if (!pages?.length || !frame || !art || !pageList) return;

    function renderPage() {
      const pageData = pages[currentIndex];
      const displayedNumber = String(pageData.number).padStart(2, "0");
      const hotspots = pageData.hotspots?.length ? pageData.hotspots : [{ x: 50, y: 50, label: "" }];

      clearTimeout(transitionTimer);
      transitionTimer = null;
      isAdvancing = false;
      frame.classList.remove("is-changing", "is-complete");
      art.replaceChildren();
      frame.querySelectorAll(".comic-hotspot").forEach((button) => button.remove());
      pageNumber.textContent = displayedNumber;

      if (pageData.image) {
        const image = document.createElement("img");
        image.src = pageData.image;
        image.alt = pageData.alt || `Ilustración de la página ${pageData.number}`;
        image.loading = "eager";
        art.append(image);
      }

      if (pageData.text) {
        const caption = document.createElement("p");
        caption.className = "comic-caption";
        caption.textContent = pageData.text;
        art.append(caption);
      }

      const description = pageData.alt || pageData.text;
      const accessibleDescription = description ? ` ${description}` : "";
      frame.setAttribute("aria-label", `Página ${pageData.number} de ${pages.length}.${accessibleDescription}`);
      previousButton.disabled = currentIndex === 0;
      progress.style.width = `${((currentIndex + 1) / pages.length) * 100}%`;
      status.textContent = `Página ${pageData.number} de ${pages.length}`;

      hotspots.forEach((hotspot, hotspotIndex) => {
        const button = document.createElement("button");
        const isFound = foundHotspots[currentIndex].has(hotspotIndex);
        const label = hotspot.label || `Zona ${hotspotIndex + 1} de la página ${pageData.number}`;
        const x = Number(hotspot.x);
        const y = Number(hotspot.y);
        button.className = `comic-hotspot${isFound ? " is-found" : ""}`;
        button.type = "button";
        button.style.setProperty("--hotspot-x", `${Number.isFinite(x) ? Math.min(100, Math.max(0, x)) : 50}%`);
        button.style.setProperty("--hotspot-y", `${Number.isFinite(y) ? Math.min(100, Math.max(0, y)) : 50}%`);
        button.setAttribute("aria-label", `Descubrir ${label}`);
        button.setAttribute("aria-pressed", String(isFound));
        button.innerHTML = '<svg aria-hidden="true" viewBox="0 0 32 32"><path d="M16 2.5 19.7 12.3 29.5 16l-9.8 3.7L16 29.5l-3.7-9.8L2.5 16l9.8-3.7L16 2.5Z"/></svg>';
        button.addEventListener("click", () => discoverHotspot(hotspotIndex, hotspots, button));
        frame.append(button);
      });

      pageList.querySelectorAll("button").forEach((button, index) => {
        if (index === currentIndex) button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
        button.disabled = index > currentIndex;
      });
    }

    function goToPage(index) {
      if (index < 0 || index >= currentIndex) return;
      currentIndex = index;
      renderPage();
      animatePageChange();
    }

    function discoverHotspot(hotspotIndex, hotspots, button) {
      if (isAdvancing) return;
      foundHotspots[currentIndex].add(hotspotIndex);
      button.classList.add("is-found");
      button.setAttribute("aria-pressed", "true");

      if (foundHotspots[currentIndex].size < hotspots.length) return;

      if (currentIndex === pages.length - 1) {
        frame.classList.add("is-complete");
        status.textContent = `Fin del mini cómic. Página ${pages[currentIndex].number} de ${pages.length}`;
        frame.querySelectorAll(".comic-hotspot").forEach((hotspotButton) => {
          hotspotButton.disabled = true;
        });
        return;
      }

      isAdvancing = true;
      frame.querySelectorAll(".comic-hotspot").forEach((hotspotButton) => {
        hotspotButton.disabled = true;
      });
      frame.classList.add("is-changing");
      const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 520;
      transitionTimer = setTimeout(() => {
        currentIndex += 1;
        renderPage();
        animatePageChange();
      }, delay);
    }

    function animatePageChange() {
      frame.classList.remove("is-changing");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      requestAnimationFrame(() => frame.classList.add("is-changing"));
    }

    pages.forEach((pageData, index) => {
      const button = document.createElement("button");
      button.className = "comic-page-button";
      button.type = "button";
      button.textContent = String(pageData.number).padStart(2, "0");
      button.setAttribute("aria-label", `Ir a la página ${pageData.number}`);
      button.addEventListener("click", () => goToPage(index));
      pageList.append(button);
    });

    previousButton.addEventListener("click", () => goToPage(currentIndex - 1));

    document.addEventListener("keydown", (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowLeft" || event.key === "PageUp") goToPage(currentIndex - 1);
    });

    if (backToTop) {
      backToTop.addEventListener("click", () => {
        document.querySelector("#comic-reader").scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
      });
    }

    renderPage();
  });
})();
