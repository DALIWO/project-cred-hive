document.addEventListener("DOMContentLoaded", () => {

const menu = document.getElementById("menu");
const navLinks = document.getElementById("navLinks");

// ================================
// MOBILE NAVIGATION
// ================================

if (menu && navLinks) {

// Open / close mobile menu

menu.addEventListener("click", () => {

  navLinks.classList.toggle("active");
  document.body.classList.toggle("menu-open");

  if (navLinks.classList.contains("active")) {
    menu.textContent = "×";
    menu.setAttribute("aria-label", "Close menu");
  } else {
    menu.textContent = "☰";
    menu.setAttribute("aria-label", "Open menu");
  }

});


// Close menu when clicking a link

navLinks.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("active");
    document.body.classList.remove("menu-open");

    menu.textContent = "☰";
    menu.setAttribute("aria-label", "Open menu");

  });

});


// Close menu with Escape

document.addEventListener("keydown", (e) => {

  if (e.key === "Escape") {

    navLinks.classList.remove("active");
    document.body.classList.remove("menu-open");

    menu.textContent = "☰";
    menu.setAttribute("aria-label", "Open menu");

  }

});


}

// ================================
// SCROLL REVEAL
// ================================

const revealElements = document.querySelectorAll(
".section-title, .project, .service, .process, .about-big, .work-project"
);

if (revealElements.length) {

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


revealElements.forEach(element => {

  element.style.opacity = "0";

  element.style.transform = "translateY(40px)";

  element.style.transition =
    "opacity .8s ease, transform .8s cubic-bezier(.2,.8,.2,1)";

  observer.observe(element);

});


}

});