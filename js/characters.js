/* =========================================================
   CHARACTERS.JS — Grid de personajes + modal de detalle
   ========================================================= */

window.CharactersModule = (function () {
  const { characters } = window.PopUpBookData;
  let overlay, cardTpl, lastFocused, dogGuide, dogGuideParent, dogGuideNextSibling;

  function init() {
    const grid = document.querySelector("#characters-grid");
    overlay = document.querySelector("#character-modal");
    dogGuide = document.querySelector(".dog-guide");
    dogGuideParent = dogGuide?.parentNode;
    dogGuideNextSibling = dogGuide?.nextSibling;
    if (!grid || !overlay) return;

    grid.innerHTML = characters.map(cardHTML).join("");
    grid.querySelectorAll("[data-open-character]").forEach((btn) => {
      btn.addEventListener("click", () => openModal(btn.getAttribute("data-open-character")));
    });

    overlay.querySelector(".modal-close").addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.getAttribute("data-visible") === "true") closeModal();
    });
  }

  function cardHTML(c) {
    return `
      <article class="character-card" style="--card-accent:${c.color}">
        <div class="art${c.image ? " has-image" : ""}" aria-hidden="true">${c.image ? `<img src="${escapeHTML(c.image)}" alt="" loading="lazy">` : "Imagen no disponible<br>" + escapeHTML(c.name)}</div>
        ${c.isGuide ? '<span class="guide-badge">Guía del recorrido</span>' : ""}
        <p class="id-tag">Personaje ${String(c.id).padStart(2, "0")}</p>
        <h3>${escapeHTML(c.name)}</h3>
        <p class="role">${escapeHTML(c.role)}</p>
        <p>${escapeHTML(c.description)}</p>
        <button class="btn btn-ghost" data-open-character="${c.slug}">Descubrir personaje</button>
      </article>`;
  }

  function openModal(slug) {
    const c = characters.find((ch) => ch.slug === slug);
    if (!c) return;
    lastFocused = document.activeElement;
    if (dogGuide && dogGuide.parentNode !== overlay) overlay.append(dogGuide);

    overlay.querySelector("#modal-title").textContent = c.name;
    const modalArt = overlay.querySelector(".modal-art");
    modalArt.classList.toggle("has-image", Boolean(c.image));
    modalArt.innerHTML = c.image
      ? `<img src="${c.image}" alt="${escapeHTML(c.name)}" loading="lazy">`
      : "Imagen no disponible";
    overlay.querySelector(".modal-role").textContent = c.role;
    overlay.querySelector(".modal-description").textContent = c.description;
    overlay.querySelector(".modal-personality").textContent = c.personality;
    overlay.querySelector(".modal-traits").innerHTML = c.traits.map((t) => `<li>${escapeHTML(t)}</li>`).join("");

    overlay.querySelector(".modal-process").textContent = c.storyRole;

    overlay.setAttribute("data-visible", "true");
    overlay.querySelector(".modal-close").focus();
    document.body.style.overflow = "hidden";

    if (window.DogGuide) {
      const dialogue = c.slug === "personaje-02" ? "valentina" : "characterOpen";
      window.DogGuide.say(dialogue, { force: true, message: c.guideFact || c.storyRole });
    }
  }

  function closeModal() {
    overlay.setAttribute("data-visible", "false");
    if (dogGuide && dogGuideParent && dogGuide.parentNode !== dogGuideParent) {
      dogGuideParent.insertBefore(dogGuide, dogGuideNextSibling);
    }
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  return { init };
})();
