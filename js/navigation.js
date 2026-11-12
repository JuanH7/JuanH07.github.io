/* =========================================================
   NAVIGATION.JS — Menú, scroll y estado activo
   ========================================================= */

window.SiteNavigation = (function () {
  function init() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const open = links.getAttribute("data-open") === "true";
        links.setAttribute("data-open", String(!open));
        toggle.setAttribute("aria-expanded", String(!open));
      });
      links.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          links.setAttribute("data-open", "false");
          toggle.setAttribute("aria-expanded", "false");
        })
      );
    }

    // Resalta el enlace de la sección visible usando IntersectionObserver.
    const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
    const sections = [...navAnchors]
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navAnchors.forEach((a) => a.removeAttribute("aria-current"));
            const match = [...navAnchors].find(
              (a) => a.getAttribute("href") === "#" + entry.target.id
            );
            if (match) match.setAttribute("aria-current", "true");
          });
        },
        { rootMargin: "-45% 0px -45% 0px" }
      );
      sections.forEach((s) => observer.observe(s));
    }
  }

  return { init };
})();
