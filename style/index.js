document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");
  if (!menuBtn || !menu) return;

  const openMenu = () => {
    menu.classList.remove("translate-x-full", "opacity-0", "pointer-events-none");
    menu.classList.add("translate-x-0", "opacity-100");
  };

  const closeMenu = () => {
    menu.classList.add("translate-x-full", "opacity-0", "pointer-events-none");
    menu.classList.remove("translate-x-0", "opacity-100");
  };

  menuBtn.addEventListener("click", () => {
    if (menu.classList.contains("translate-x-full")) openMenu();
    else closeMenu();
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
  });

  // Optional: close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});
