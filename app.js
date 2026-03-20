(() => {
  const body = document.body;
  const menu = document.getElementById("mobile-menu");
  const openButton = document.querySelector(".menu-toggle");
  const closeButton = menu?.querySelector(".menu-close");
  const menuLinks = menu ? Array.from(menu.querySelectorAll("a")) : [];

  if (!menu || !openButton || !closeButton) {
    return;
  }

  let restoreFocusEl = null;

  const openMenu = () => {
    restoreFocusEl = document.activeElement;
    menu.hidden = false;
    requestAnimationFrame(() => {
      body.classList.add("menu-open");
      openButton.setAttribute("aria-expanded", "true");
      menuLinks[0]?.focus();
    });
  };

  const closeMenu = () => {
    body.classList.remove("menu-open");
    openButton.setAttribute("aria-expanded", "false");
    window.setTimeout(() => {
      menu.hidden = true;
      restoreFocusEl?.focus?.();
    }, 220);
  };

  openButton.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);

  menu.addEventListener("click", (event) => {
    if (event.target === menu) {
      closeMenu();
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && body.classList.contains("menu-open")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720 && body.classList.contains("menu-open")) {
      closeMenu();
    }
  });
})();
