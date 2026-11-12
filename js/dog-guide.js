/* =========================================================
   DOG-GUIDE.JS — Perro guía: diálogos y estados
   ========================================================= */

window.DogGuide = (function () {
  const data = window.PopUpBookData.dogDialogues;
  let avatarEl, bubbleEl, bubbleTextEl, closeBtn;
  let lastTrigger = null;
  let hideTimer = null;
  let petResetTimer = null;
  let petCount = 0;

  function init() {
    avatarEl = document.querySelector(".dog-avatar-btn");
    bubbleEl = document.querySelector(".dog-bubble");
    bubbleTextEl = document.querySelector(".dog-bubble-text");
    closeBtn = document.querySelector(".dog-bubble-close");

    if (!avatarEl) return;

    avatarEl.addEventListener("click", () => {
      clearTimeout(petResetTimer);
      petCount += 1;

      if (petCount === 1) say("dogPet", { force: true, state: "petted" });
      else if (petCount === 2) say("dogPetAgain", { force: true, state: "petted" });
      else say("dogAnnoyed", { force: true, state: "barking" });

      petResetTimer = setTimeout(() => {
        petCount = 0;
      }, 4500);
    });
    closeBtn?.addEventListener("click", hide);

    // Accesibilidad: también activable con teclado (Enter/Espacio via click nativo en <button>).
  }

  /** Muestra un mensaje asociado a un disparador (ver data.dogDialogues).
   *  No repite el mismo disparador automáticamente salvo que force:true. */
  function say(trigger, { force = false, state = "talking", message: customMessage = null } = {}) {
    if (!avatarEl) return;
    if (trigger === lastTrigger && !force) return;

    const options = customMessage ? [customMessage] : data[trigger] || data.welcome;
    let message = options[Math.floor(Math.random() * options.length)];
    if (options.length > 1 && message === bubbleTextEl.textContent) {
      message = options[(options.indexOf(message) + 1) % options.length];
    }

    bubbleTextEl.textContent = message;
    bubbleEl.setAttribute("data-visible", "true");
    avatarEl.setAttribute("data-state", state);
    lastTrigger = trigger;

    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => setState("idle"), 1200);
  }

  function hide() {
    clearTimeout(hideTimer);
    bubbleEl.setAttribute("data-visible", "false");
    setState("idle");
  }

  function setState(state) {
    if (avatarEl) avatarEl.setAttribute("data-state", state);
  }

  return { init, say, hide, setState };
})();
