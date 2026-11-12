/* =========================================================
   MAIN.JS — Orquesta la página: apertura del libro, revelado
   al hacer scroll, historia, galería y progreso de lectura.
   ========================================================= */

(function () {
  const data = window.PopUpBookData;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let resetIdleDialogue = () => {};

  document.addEventListener("DOMContentLoaded", () => {
    window.SiteNavigation.init();
    window.DogGuide.init();
    window.CharactersModule.init();

    initBookOpening();
    renderStory();
    renderGallery();
    renderBookPageComparisons();
    initCompareSliders();
    initRevealOnScroll();
    initProgressBar();
    initBackToTopButtons();
    wireSectionDialogues();
    wireIllustrationDialogues();
  });

  /* --- Comparador de bocetos e ilustraciones finales --- */
  function initCompareSliders() {
    document.querySelectorAll(".compare-slider").forEach((wrap) => {
      const range = wrap.querySelector('input[type="range"]');
      const after = wrap.querySelector(".after");
      if (!range || !after) return;
      const update = () => {
        after.style.clipPath = `inset(0 0 0 ${range.value}%)`;
      };
      range.addEventListener("input", update);
      range.addEventListener("change", () => window.DogGuide.say("compare", { force: true }));
      update();
    });
  }

  function renderBookPageComparisons() {
    const container = document.querySelector("#book-page-comparisons");
    if (!container) return;

    container.innerHTML = data.bookPagePairs
      .map((page) => {
        const pageNumber = String(page.number).padStart(2, "0");
        const sliderId = `book-page-compare-${page.number}`;
        return `
        <article class="book-page-comparison" data-reveal>
          <h4>Página ${pageNumber}</h4>
          <div class="compare-slider">
            <img class="layer before" src="${escapeHTML(page.sketch)}" alt="Boceto de la página ${pageNumber}" loading="lazy">
            <img class="layer after" src="${escapeHTML(page.final)}" alt="Versión final de la página ${pageNumber}" loading="lazy">
            <label class="visually-hidden" for="${sliderId}">Comparar boceto e ilustración final de la página ${pageNumber}</label>
            <input id="${sliderId}" type="range" min="0" max="100" value="50" aria-label="Comparar boceto e ilustración final de la página ${pageNumber}">
          </div>
          <div class="compare-labels" aria-hidden="true"><span>Boceto</span><span>Final</span></div>
        </article>`;
      })
      .join("");
  }

  /* --- Portada: abrir el libro --- */
  function initBookOpening() {
    const hero = document.querySelector(".hero");
    const openBtn = document.querySelector("#open-book-btn");
    if (!hero || !openBtn) return;

    openBtn.addEventListener("click", () => {
      hero.setAttribute("data-open", "true");
      openBtn.setAttribute("aria-expanded", "true");
      window.DogGuide.say("intro", { force: true, state: "celebrating" });
    });
  }

  /* --- Revelado progresivo con IntersectionObserver --- */
  function initRevealOnScroll() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((el) => observer.observe(el));
  }

  /* --- Historia por escenas --- */
  function renderStory() {
    const container = document.querySelector("#story-scenes");
    if (!container) return;
    container.innerHTML = data.storyScenes
      .map(
        (s, i) => `
      <div class="scene" data-reveal>
        <div class="scene-art${s.image ? " has-image" : ""}">${s.image ? `<img src="${escapeHTML(s.image)}" alt="${escapeHTML(s.title)}" loading="lazy">` : escapeHTML(s.art || s.title)}</div>
        <div class="scene-text">
          <p class="id-tag">Escena ${String(i + 1).padStart(2, "0")}</p>
          <h3>${escapeHTML(s.title)}</h3>
          <p>${escapeHTML(s.text)}</p>
        </div>
      </div>`
      )
      .join("");
  }

  /* --- Galería con filtros --- */
  function renderGallery() {
    const filtersEl = document.querySelector("#gallery-filters");
    const gridEl = document.querySelector("#gallery-grid");
    if (!filtersEl || !gridEl) return;

    const categories = [{ id: "todos", label: "Todos" }, ...data.galleryCategories];
    filtersEl.innerHTML = categories
      .map(
        (c, i) =>
          `<button class="filter-btn" data-filter="${c.id}" aria-pressed="${i === 0}">${escapeHTML(c.label)}</button>`
      )
      .join("");

    function draw(filter) {
      const items = filter === "todos" ? data.galleryItems : data.galleryItems.filter((g) => g.category === filter);
      gridEl.innerHTML = items
        .map((g) => `<figure class="gallery-item" data-reveal><img src="${escapeHTML(g.image)}" alt="${escapeHTML(g.caption)}" loading="lazy"><figcaption>${escapeHTML(g.caption)}</figcaption></figure>`)
        .join("");
      initRevealOnScroll();
    }

    filtersEl.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        filtersEl.querySelectorAll(".filter-btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        draw(btn.getAttribute("data-filter"));
        window.DogGuide.say("gallery", { force: true });
      });
    });

    draw("todos");
  }

  /* --- Indicador de progreso de lectura --- */
  function initProgressBar() {
    const bar = document.querySelector("#reading-progress");
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      bar.style.width = Math.min(100, Math.max(0, scrolled * 100)) + "%";
    };
    document.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    update();
  }

  /* --- Botones "volver al inicio" / "ver personajes de nuevo" --- */
  function initBackToTopButtons() {
    document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = document.querySelector(btn.getAttribute("data-scroll-to"));
        if (!target) return;
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        const navLinks = [...document.querySelectorAll(".nav-links a")];
        navLinks.forEach((link) => link.removeAttribute("aria-current"));
        const activeLink = navLinks.find((link) => link.getAttribute("href") === `#${target.id}`);
        if (activeLink) activeLink.setAttribute("aria-current", "true");
      });
    });
  }

  /* --- Diálogos por sección: reacciona al contenido bajo el centro de pantalla --- */
  function wireSectionDialogues() {
    const map = {
      inicio: "welcome",
      introduccion: "intro",
      personajes: "characters",
      creacion: "process",
      historia: "story",
      galeria: "gallery",
      cierre: "closing",
    };
    const sections = Object.keys(map)
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    let activeSection = null;
    let idleTimer = null;
    const nudgedSections = new Set();

    function scheduleIdleDialogue(sectionId) {
      clearTimeout(idleTimer);
      resetIdleDialogue = () => scheduleIdleDialogue(activeSection);
      if (!sectionId || nudgedSections.has(sectionId)) return;
      idleTimer = setTimeout(() => {
        if (sectionId !== activeSection) return;
        const modalOpen = document.querySelector("#character-modal")?.getAttribute("data-visible") === "true";
        if (modalOpen) return;
        nudgedSections.add(sectionId);
        const idleDialogue = `idle${sectionId.charAt(0).toUpperCase()}${sectionId.slice(1)}`;
        window.DogGuide.say(idleDialogue, { force: true });
      }, 8000);
    }

    function activateSection(section) {
      if (section.id === activeSection) return;
      activeSection = section.id;
      const modalOpen = document.querySelector("#character-modal")?.getAttribute("data-visible") === "true";
      if (!(section.id === "personajes" && modalOpen)) {
        window.DogGuide.say(map[section.id], { force: true });
      }
      scheduleIdleDialogue(activeSection);
    }

    let updateTimer = null;
    function updateActiveSection() {
      updateTimer = null;
      const marker = window.innerHeight * 0.42;
      const section = sections.find((item) => {
        const bounds = item.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom > marker;
      });
      if (section) activateSection(section);
    }

    function queueSectionUpdate() {
      if (updateTimer) return;
      updateTimer = setTimeout(updateActiveSection, 60);
    }

    window.addEventListener("scroll", queueSectionUpdate, { passive: true });
    window.addEventListener("resize", queueSectionUpdate);
    queueSectionUpdate();

    document.addEventListener("pointerdown", () => resetIdleDialogue(), { passive: true });
    document.addEventListener("keydown", () => resetIdleDialogue());
  }

  function wireIllustrationDialogues() {
    document.addEventListener("click", (event) => {
      const visual = event.target.closest(
        ".scene-art, .page-art, .book-interior .art, .character-card .art, .gallery-item"
      );
      if (!visual) return;
      const trigger = visual.closest(".gallery-item") ? "galleryItem" : "detail";
      window.DogGuide.say(trigger, { force: true });
      resetIdleDialogue();
    });
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
})();
