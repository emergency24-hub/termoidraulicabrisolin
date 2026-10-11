/**
 * Interazioni del sito e aggiornamento dei dati aziendali.
 * I dati sono definiti in config.js, caricato prima di questo file.
 */
(function () {
  "use strict";

  const company = window.BRISOLIN || {};
  const phoneNumber = (company.telefono || "").replace(/[^+0-9]/g, "");
  const fullAddress = [company.indirizzo, company.cap, company.citta]
    .filter(Boolean)
    .join(", ");
  const email = (company.email || "").trim();
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Testi e link: aggiornati centralmente da config.js.
  document.querySelectorAll("[data-company]").forEach((element) => {
    element.textContent = company.nome || "";
  });

  document.querySelectorAll("[data-phone]").forEach((element) => {
    element.textContent = company.telefono || "";
    if (element.tagName === "A") element.href = `tel:${phoneNumber}`;
  });

  document.querySelectorAll("[data-email]").forEach((element) => {
    element.textContent = email;
    if (element.tagName !== "A") return;

    if (emailIsValid) {
      element.href = `mailto:${email}`;
    } else {
      // Evita di aprire un messaggio destinato a un indirizzo non valido.
      element.removeAttribute("href");
      element.title = "Indirizzo email provvisorio: aggiornalo in config.js";
      element.classList.add("email-placeholder");
    }
  });

  document.querySelectorAll("[data-address]").forEach((element) => {
    element.textContent = fullAddress;
  });

  document.querySelectorAll("[data-map]").forEach((element) => {
    const query = encodeURIComponent(fullAddress);
    if (element.tagName === "A") {
      element.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
    } else if (element.tagName === "IFRAME") {
      element.src = `https://maps.google.com/maps?q=${query}&output=embed`;
    }
  });

  // Menu mobile accessibile.
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".links");
  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Chiudi il menu" : "Apri il menu");
      menuButton.textContent = isOpen ? "✕" : "☰";
    });
  }

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
