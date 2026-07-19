const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".site-nav");

function closeMenu() {
  menuButton?.setAttribute("aria-expanded", "false");
  navigation?.classList.remove("is-open");
  document.body.style.overflow = "";
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation?.classList.toggle("is-open", !isOpen);
  document.body.style.overflow = isOpen ? "" : "hidden";
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const subscribeForm = document.querySelector("[data-subscribe-form]");

subscribeForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = subscribeForm.querySelector(".form-message");
  message.textContent = "고맙습니다. 다음 글이 완성되면 알려드릴게요.";
  subscribeForm.reset();
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
