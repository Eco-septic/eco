// theme.js

export function toggleTheme() {
  const checkbox = document.getElementById("darkmode-toggle");
  const isDarkMode = checkbox.checked;

  localStorage.setItem("isDark", isDarkMode.toString());

  document.documentElement.className = isDarkMode ? "dark" : "light";
}

export function initialTheme() {
  return localStorage.getItem("isDark") === "true";
}

export function setupThemeToggle() {
  document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("darkmode-toggle");
    const toggleLabel = document.querySelector(".darkmode-toggle-label");
    const sunIcon = toggleLabel.querySelector("svg.sun");
    const moonIcon = toggleLabel.querySelector("svg.moon");

    checkbox.checked = initialTheme();

    setTimeout(() => {
      toggleLabel.classList.add("sunMoonTransition");
      sunIcon.classList.add("sunMoonTransition");
      moonIcon.classList.add("sunMoonTransition");
    }, 100);
  });
}
window.toggleTheme = toggleTheme;
