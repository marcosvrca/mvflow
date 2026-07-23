/**
 * mvFlow landing — configure seu WhatsApp abaixo (somente números, com DDI).
 * Ex.: 5563999999999
 */
const WHATSAPP_NUMBER = "5563991120229";
const DEFAULT_WA_MSG =
  "Olá, Marcos! Vim pela landing da mvFlow e quero conversar sobre um projeto.";

function waLink(message = DEFAULT_WA_MSG) {
  const text = encodeURIComponent(message);
  if (!WHATSAPP_NUMBER) {
    return `mailto:marcosviniciusrdca2@gmail.com?subject=${encodeURIComponent(
      "Contato via mvFlow"
    )}&body=${text}`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function bindWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    const custom = el.getAttribute("data-wa-msg");
    el.setAttribute("href", waLink(custom || DEFAULT_WA_MSG));
    if (WHATSAPP_NUMBER) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    } else {
      el.removeAttribute("target");
    }
  });
}

function initNav() {
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const links = document.querySelector("[data-nav-links]");
  if (!nav || !toggle || !links) return;

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };

  toggle.addEventListener("click", () => {
    setOpen(!nav.classList.contains("is-open"));
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initScrollProgress() {
  const bar = document.querySelector(".scroll-progress span");
  if (!bar) return;

  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = `${pct}%`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  items.forEach((el) => io.observe(el));
}

function initYear() {
  const el = document.querySelector("[data-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  bindWhatsAppLinks();
  initNav();
  initScrollProgress();
  initReveal();
  initYear();
});
