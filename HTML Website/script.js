document.addEventListener("DOMContentLoaded", () => {
  const accessibilityBtn = document.getElementById("accessibility-toggle");

  if (accessibilityBtn) {
    const savedMode = localStorage.getItem("accessibility-mode") === "true";
    document.body.classList.toggle("accessibility-mode", savedMode);

    const updateButton = () => {
      const enabled = document.body.classList.contains("accessibility-mode");
      accessibilityBtn.textContent = enabled
        ? "Disable Accessibility Mode"
        : "Enable Accessibility Mode";
      accessibilityBtn.setAttribute("aria-pressed", String(enabled));
    };

    updateButton();

    accessibilityBtn.addEventListener("click", () => {
      const enabled = document.body.classList.toggle("accessibility-mode");
      localStorage.setItem("accessibility-mode", String(enabled));
      updateButton();
    });
  }

  const services = [
    { name: "Wedding Styling", category: "Weddings", price: 3500, popularity: 5, packageType: "Luxury" },
    { name: "Birthday Party Setup", category: "Birthdays", price: 2800, popularity: 4, packageType: "Family" },
    { name: "Graduation Decor", category: "Graduations", price: 4200, popularity: 4, packageType: "Statement" },
    { name: "Corporate Event Styling", category: "Corporate", price: 5500, popularity: 5, packageType: "Premium" },
    { name: "Engagement Party Decor", category: "Engagements", price: 4300, popularity: 5, packageType: "Luxury" },
    { name: "Proposal Setup", category: "Proposals", price: 3900, popularity: 4, packageType: "Romantic" },
    { name: "Baby Shower Styling", category: "Baby Showers", price: 3200, popularity: 4, packageType: "Theme" }
  ];

  const list = document.getElementById("service-list");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");
  const filterButtons = document.querySelectorAll(".filter-btn");
  let activeCategory = "all";

  function getServiceBadges(item) {
    const badges = [];

    if (item.popularity >= 5) badges.push("Most Popular");
    if (item.price <= 3000) badges.push("Best Value");
    if (item.packageType === "Luxury" || item.packageType === "Premium") badges.push("Premium");
    if (item.category === "Proposals" || item.category === "Engagements") badges.push("Romantic");

    return badges.length ? badges.map((badge) => `<span class="service-badge">${badge}</span>`).join("") : "";
  }

  function renderServices(items) {
    if (!list) return;

    if (!items.length) {
      list.innerHTML = "<p>No services match your search.</p>";
      return;
    }

    list.innerHTML = items
      .map(
        (item) => `
          <article class="service-card">
            <div class="service-badges">${getServiceBadges(item)}</div>
            <h3>${item.name}</h3>
            <p>Category: ${item.category}</p>
            <p>Package Type: ${item.packageType}</p>
            <p>Price: R${item.price}</p>
            <p>Popularity: ${item.popularity}/5</p>
          </article>
        `
      )
      .join("");
  }

  function getFilteredServices() {
    const query = (searchInput?.value || "").toLowerCase();
    const sortBy = sortSelect?.value || "popular";

    const filtered = services.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesQuery =
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.packageType.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });

    filtered.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "package-type") return a.packageType.localeCompare(b.packageType);
      if (sortBy === "popular") return b.popularity - a.popularity;
      return a.name.localeCompare(b.name);
    });

    return filtered;
  }

  if (searchInput && sortSelect && list) {
    searchInput.addEventListener("input", () => renderServices(getFilteredServices()));
    sortSelect.addEventListener("change", () => renderServices(getFilteredServices()));

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.category;

        filterButtons.forEach((btn) => {
          btn.classList.toggle("active", btn === button);
        });

        renderServices(getFilteredServices());
      });
    });

    renderServices(services);
  }

  const contactForm = document.getElementById("contact-form");
  const contactErrorBox = document.getElementById("form-error");

  if (contactForm && contactErrorBox) {
    contactForm.addEventListener("submit", (event) => {
      const requiredFields = [
        contactForm.querySelector("#contact-name"),
        contactForm.querySelector("#contact-email"),
        contactForm.querySelector("#contact-phone"),
        contactForm.querySelector("#subject")
      ];

      const missingRequired = requiredFields.some((field) => !field.value.trim());

      if (missingRequired || !contactForm.checkValidity()) {
        event.preventDefault();
        contactErrorBox.textContent = "Please complete the required fields before sending your message.";
        contactErrorBox.style.color = "#b00020";
        contactForm.reportValidity();
      } else {
        contactErrorBox.textContent = "";
        contactErrorBox.style.color = "";
      }
    });
  }

  const enquiryForm = document.getElementById("enquiry-form");
  const enquiryResponse = document.getElementById("enquiry-response");

  if (enquiryForm && enquiryResponse) {
    enquiryForm.addEventListener("submit", (event) => {
      const requiredFields = [
        enquiryForm.querySelector("#name"),
        enquiryForm.querySelector("#email"),
        enquiryForm.querySelector("#phone"),
        enquiryForm.querySelector("#event")
      ];

      const missingRequired = requiredFields.some((field) => !field.value.trim());

      if (missingRequired || !enquiryForm.checkValidity()) {
        event.preventDefault();
        enquiryResponse.textContent = "Please complete the required fields before sending your enquiry.";
        enquiryResponse.style.color = "#b00020";
        enquiryForm.reportValidity();
      } else {
        enquiryResponse.textContent = "Your enquiry has been sent successfully.";
        enquiryResponse.style.color = "#0a7a2d";
      }
    });

    enquiryForm.addEventListener("input", () => {
      if (enquiryForm.checkValidity()) {
        enquiryResponse.textContent = "";
        enquiryResponse.style.color = "";
      }
    });
  }

  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;

      tabButtons.forEach((btn) => {
        btn.classList.toggle("active", btn === button);
        btn.setAttribute("aria-selected", String(btn === button));
      });

      tabPanels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === target);
      });
    });
  });

  const faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.parentElement;
      const isOpen = item.classList.contains("open");

      faqButtons.forEach((btn) => {
        const parent = btn.parentElement;
        parent.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  const modal = document.getElementById("promo-modal");
  if (modal) {
    const closeModal = () => {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
    };

    const openModal = () => {
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
    };

    const hasSeenModal = sessionStorage.getItem("sunrise-modal-seen");
    if (!hasSeenModal) {
      setTimeout(openModal, 1200);
      sessionStorage.setItem("sunrise-modal-seen", "true");
    }

    const modalClose = document.getElementById("modal-close");
    modalClose?.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("active")) closeModal();
    });
  }

  const reviewSlider = document.querySelector(".review-slider");
  if (reviewSlider) {
    const slides = Array.from(reviewSlider.querySelectorAll(".review-slide"));
    const prevBtn = reviewSlider.querySelector(".slider-prev");
    const nextBtn = reviewSlider.querySelector(".slider-next");
    let currentIndex = 0;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
    };

    prevBtn?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });

    nextBtn?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    });

    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, 5000);
  }

  const mapElement = document.getElementById("map");
  if (mapElement && window.L) {
    const map = L.map("map").setView([-29.858, 31.021], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    L.marker([-29.858, 31.021])
      .addTo(map)
      .bindPopup("Sunrise Decor<br>123 Florida Road, Durban")
      .openPopup();
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const galleryItems = document.querySelectorAll(".gallery-item img");

  if (lightbox && lightboxImage && lightboxClose) {
    galleryItems.forEach((img) => {
      img.addEventListener("click", () => {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
      });
    });

    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
    });

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.classList.contains("active")) {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
      }
    });
  }

  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      mainNav.setAttribute("aria-hidden", String(!isOpen));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        mainNav.setAttribute("aria-hidden", "true");
      });
    });
  }
});