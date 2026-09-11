/* =========================================================
   CREDHIVE — GLOBAL JAVASCRIPT
   Works across:
   index.html
   about.html
   work.html
   services.html
   process.html
   contact.html
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     GLOBAL SETTINGS
  ======================================================= */

  const body = document.body;
  const navbar = document.querySelector(".navbar");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  const menuButton = document.getElementById("menu");
  const mobileMenu = document.getElementById("navLinks");

  function openMenu() {
    if (!mobileMenu || !menuButton) return;

    mobileMenu.classList.add("active");
    body.classList.add("menu-open");

    menuButton.setAttribute("aria-label", "Close menu");
    menuButton.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    if (!mobileMenu || !menuButton) return;

    mobileMenu.classList.remove("active");
    body.classList.remove("menu-open");

    menuButton.setAttribute("aria-label", "Open menu");
    menuButton.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    if (!mobileMenu) return;

    if (mobileMenu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (menuButton && mobileMenu) {

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", toggleMenu);

    /* Close when clicking a navigation link */

    mobileMenu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {
        closeMenu();
      });

    });

    /* Close with Escape */

    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {
        closeMenu();
      }

    });

    /* Close when clicking outside menu */

    document.addEventListener("click", event => {

      if (
        mobileMenu.classList.contains("active") &&
        !mobileMenu.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }

    });

    /* Close menu when resizing to desktop */

    window.addEventListener("resize", () => {

      if (window.innerWidth > 800) {
        closeMenu();
      }

    });

  }


  /* =======================================================
     NAVBAR SCROLL EFFECT
  ======================================================= */

  let lastScroll = 0;

  function handleNavbarScroll() {

    if (!navbar) return;

    const currentScroll = window.scrollY;

    if (currentScroll > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    /*
      Optional hide/show behavior.

      We only hide the navbar when scrolling down
      after a significant amount of movement.
    */

    if (currentScroll > lastScroll && currentScroll > 180) {
      navbar.classList.add("nav-hidden");
    } else {
      navbar.classList.remove("nav-hidden");
    }

    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  }

  let scrollTicking = false;

  window.addEventListener("scroll", () => {

    if (!scrollTicking) {

      window.requestAnimationFrame(() => {
        handleNavbarScroll();
        scrollTicking = false;
      });

      scrollTicking = true;
    }

  });


  /* =======================================================
     ACTIVE NAVIGATION LINK
  ======================================================= */

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const allNavLinks = document.querySelectorAll(
    ".navbar a, .mobile-menu a"
  );

  allNavLinks.forEach(link => {

    const href = link.getAttribute("href");

    if (!href) return;

    const cleanHref = href.split("#")[0];

    if (
      cleanHref === currentPage ||
      (currentPage === "" && cleanHref === "index.html") ||
      (currentPage === "index.html" && cleanHref === "./")
    ) {
      link.classList.add("active");
    }

  });


  /* =======================================================
     SMOOTH ANCHOR SCROLL
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", event => {

      const targetID = anchor.getAttribute("href");

      if (
        !targetID ||
        targetID === "#" ||
        targetID.length < 2
      ) {
        return;
      }

      const target = document.querySelector(targetID);

      if (!target) return;

      event.preventDefault();

      const navbarHeight = navbar
        ? navbar.offsetHeight
        : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion
          ? "auto"
          : "smooth"
      });

    });

  });


  /* =======================================================
     PAGE LOAD REVEAL
  ======================================================= */

  window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

  });


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealSelectors = [
    ".section-title",
    ".project",
    ".service",
    ".process",
    ".about-big",
    ".work-project",
    ".about-who-content",
    ".about-service-card",
    ".about-principle",
    ".about-why-item",
    ".about-story-grid",
    ".about-tech-list span",
    ".work-project-header",
    ".work-project-details",
    ".service-card",
    ".process-step",
    ".process-item",
    ".contact-section",
    ".contact-card"
  ];

  const revealElements = document.querySelectorAll(
    revealSelectors.join(", ")
  );

  if (
    revealElements.length &&
    !prefersReducedMotion
  ) {

    const revealObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            revealObserver.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    revealElements.forEach((element, index) => {

      element.classList.add("reveal");

      /*
        Small stagger for elements that appear together.
      */

      const delay =
        Math.min(index % 5, 4) * 70;

      element.style.setProperty(
        "--reveal-delay",
        `${delay}ms`
      );

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });

  }


  /* =======================================================
     HERO TEXT REVEAL
  ======================================================= */

  const heroTextElements = document.querySelectorAll(
    ".hero-title span, .work-heading, .about-page-title, .cta-title, .about-final-cta h2"
  );

  if (
    heroTextElements.length &&
    !prefersReducedMotion
  ) {

    heroTextElements.forEach((element, index) => {

      element.classList.add("hero-reveal");

      element.style.setProperty(
        "--hero-delay",
        `${index * 100}ms`
      );

    });

  }


  /* =======================================================
     NUMBER / STAT COUNTER
  ======================================================= */

  const counters = document.querySelectorAll(
    "[data-counter]"
  );

  function animateCounter(element) {

    const target = parseFloat(
      element.getAttribute("data-counter")
    );

    if (Number.isNaN(target)) return;

    const suffix =
      element.getAttribute("data-suffix") || "";

    const prefix =
      element.getAttribute("data-prefix") || "";

    const duration = 1600;

    const startTime = performance.now();

    function updateCounter(currentTime) {

      const elapsed = currentTime - startTime;

      const progress = Math.min(
        elapsed / duration,
        1
      );

      /*
        Ease-out animation.
      */

      const eased =
        1 - Math.pow(1 - progress, 3);

      const currentValue =
        target * eased;

      element.textContent =
        prefix +
        Math.round(currentValue) +
        suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent =
          prefix +
          target +
          suffix;
      }

    }

    requestAnimationFrame(updateCounter);
  }

  if (
    counters.length &&
    !prefersReducedMotion
  ) {

    const counterObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            animateCounter(entry.target);

            counterObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.7
      }
    );

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });

  }


  /* =======================================================
     MAGNETIC BUTTON EFFECT
  ======================================================= */

  const magneticElements = document.querySelectorAll(
    ".cta-button, .about-page-button, .about-final-button, .work-project-link"
  );

  if (
    !prefersReducedMotion &&
    window.innerWidth > 800
  ) {

    magneticElements.forEach(element => {

      element.addEventListener("mousemove", event => {

        const rect =
          element.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        element.style.transform =
          `translate(${x * 0.12}px, ${y * 0.12}px)`;

      });

      element.addEventListener("mouseleave", () => {

        element.style.transform =
          "translate(0, 0)";

      });

    });

  }


  /* =======================================================
     PROJECT IMAGE PARALLAX
  ======================================================= */

  const projectImages = document.querySelectorAll(
    ".project-image, .work-project-image img"
  );

  if (
    !prefersReducedMotion &&
    window.innerWidth > 900 &&
    projectImages.length
  ) {

    projectImages.forEach(image => {

      const parent =
        image.closest(
          ".project, .work-project"
        );

      if (!parent) return;

      parent.addEventListener(
        "mousemove",
        event => {

          const rect =
            parent.getBoundingClientRect();

          const x =
            (event.clientX - rect.left) /
            rect.width -
            0.5;

          const y =
            (event.clientY - rect.top) /
            rect.height -
            0.5;

          image.style.transform =
            `scale(1.05) translate(${x * 8}px, ${y * 8}px)`;

        }
      );

      parent.addEventListener(
        "mouseleave",
        () => {

          image.style.transform =
            "";

        }
      );

    });

  }


  /* =======================================================
     PROJECT IMAGE SCROLL COLOR
  ======================================================= */

  const scrollColorTargets = document.querySelectorAll(
    ".project-image, .work-project-image"
  );

  if (scrollColorTargets.length) {

    const imageColorObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-in-view");
          imageColorObserver.unobserve(entry.target);

        });

      },
      {
        threshold: 0.35
      }
    );

    scrollColorTargets.forEach(target => {
      imageColorObserver.observe(target);
    });

  }


  /* =======================================================
     TILT EFFECT FOR CARDS
  ======================================================= */

  const tiltCards = document.querySelectorAll(
    ".contact-card, .about-service-card"
  );

  if (
    !prefersReducedMotion &&
    window.innerWidth > 900
  ) {

    tiltCards.forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left;

          const y =
            event.clientY -
            rect.top;

          const rotateX =
            ((y / rect.height) - 0.5) * -4;

          const rotateY =
            ((x / rect.width) - 0.5) * 4;

          card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-4px)`;

        }
      );

      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform =
            "";

        }
      );

    });

  }


  /* =======================================================
     CONTACT FORM
  ======================================================= */

  const contactForm =
    document.querySelector("#contactForm");

  if (contactForm) {

    const formStatus =
      document.querySelector("#formStatus");

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        let valid = true;

        const requiredFields =
          contactForm.querySelectorAll(
            "[required]"
          );

        requiredFields.forEach(field => {

          field.classList.remove(
            "input-error"
          );

          if (!field.value.trim()) {

            valid = false;

            field.classList.add(
              "input-error"
            );

          }

        });

        /* Validate email */

        const email =
          contactForm.querySelector(
            'input[type="email"]'
          );

        if (
          email &&
          email.value.trim()
        ) {

          const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (!emailPattern.test(email.value)) {

            valid = false;

            email.classList.add(
              "input-error"
            );

          }

        }

        if (!valid) {

          if (formStatus) {

            formStatus.textContent =
              "Please complete the required fields.";

            formStatus.className =
              "form-status error";

          }

          return;

        }

        /*
          Front-end success state.

          Connect this form to your backend,
          Formspree, Netlify Forms, or another
          form service when you're ready.
        */

        const submitButton =
          contactForm.querySelector(
            'button[type="submit"], input[type="submit"]'
          );

        if (submitButton) {

          submitButton.disabled = true;

          if (
            submitButton.tagName === "BUTTON"
          ) {

            submitButton.textContent =
              "Sending...";

          }

        }

        if (formStatus) {

          formStatus.textContent =
            "Thanks — your enquiry is ready to be sent.";

          formStatus.className =
            "form-status success";

        }

        /*
          Keep the form data available for
          a real backend integration.
        */

        const formData =
          new FormData(contactForm);

        console.log(
          "CredHive enquiry:",
          Object.fromEntries(formData.entries())
        );

      }
    );

    /* Remove validation errors while typing */

    contactForm
      .querySelectorAll("input, textarea, select")
      .forEach(field => {

        field.addEventListener(
          "input",
          () => {

            field.classList.remove(
              "input-error"
            );

          }
        );

      });

  }


  /* =======================================================
     CHECKBOX / SERVICE SELECTION
  ======================================================= */

  const serviceCheckboxes =
    document.querySelectorAll(
      'input[type="checkbox"]'
    );

  serviceCheckboxes.forEach(checkbox => {

    checkbox.addEventListener(
      "change",
      () => {

        const label =
          checkbox.closest("label");

        if (!label) return;

        label.classList.toggle(
          "selected",
          checkbox.checked
        );

      }
    );

  });


  /* =======================================================
     CUSTOM RADIO BUTTON VISUAL STATE
  ======================================================= */

  const radioButtons =
    document.querySelectorAll(
      'input[type="radio"]'
    );

  radioButtons.forEach(radio => {

    radio.addEventListener(
      "change",
      () => {

        const name =
          radio.getAttribute("name");

        if (!name) return;

        document
          .querySelectorAll(
            `input[type="radio"][name="${name}"]`
          )
          .forEach(input => {

            const label =
              input.closest("label");

            if (label) {

              label.classList.toggle(
                "selected",
                input.checked
              );

            }

          });

      }
    );

  });


  /* =======================================================
     DYNAMIC FOOTER YEAR
  ======================================================= */

  const yearElements =
    document.querySelectorAll(
      "[data-year], #year, .current-year"
    );

  yearElements.forEach(element => {

    element.textContent =
      new Date().getFullYear();

  });


  /* =======================================================
     BACK TO TOP
  ======================================================= */

  const backToTop =
    document.querySelector(
      "[data-back-to-top]"
    );

  if (backToTop) {

    backToTop.addEventListener(
      "click",
      event => {

        event.preventDefault();

        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion
            ? "auto"
            : "smooth"
        });

      }
    );

    window.addEventListener(
      "scroll",
      () => {

        if (window.scrollY > 500) {

          backToTop.classList.add(
            "visible"
          );

        } else {

          backToTop.classList.remove(
            "visible"
          );

        }

      }
    );

  }


  /* =======================================================
     LAZY IMAGE LOADING
  ======================================================= */

  const images =
    document.querySelectorAll(
      "img[data-src]"
    );

  if (images.length) {

    const imageObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting)
              return;

            const image =
              entry.target;

            image.src =
              image.dataset.src;

            image.removeAttribute(
              "data-src"
            );

            imageObserver.unobserve(
              image
            );

          });

        },
        {
          rootMargin: "200px"
        }
      );

    images.forEach(image => {
      imageObserver.observe(image);
    });

  }


  /* =======================================================
     IMAGE ERROR HANDLING
  ======================================================= */

  document
    .querySelectorAll("img")
    .forEach(image => {

      image.addEventListener(
        "error",
        () => {

          image.classList.add(
            "image-error"
          );

          console.warn(
            "CredHive image could not be loaded:",
            image.src
          );

        }
      );

    });


  /* =======================================================
     ESCAPE ACTIVE FOCUS
  ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key !== "Escape")
        return;

      const activeElement =
        document.activeElement;

      if (
        activeElement &&
        typeof activeElement.blur === "function"
      ) {
        activeElement.blur();
      }

    }
  );


  /* =======================================================
     PAGE VISIBILITY
  ======================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (document.hidden) {

        body.classList.add(
          "page-hidden"
        );

      } else {

        body.classList.remove(
          "page-hidden"
        );

      }

    }
  );


  /* =======================================================
     DEBUG MESSAGE
  ======================================================= */

  console.log(
    "%cCredHive",
    `
      font-size: 28px;
      font-weight: 700;
      color: #c8ff36;
      background: #0b0b0b;
      padding: 8px 14px;
      border-radius: 6px;
    `
  );

  console.log(
    "%cDigital solutions built around your business.",
    `
      font-size: 13px;
      color: #999;
    `
  );

});