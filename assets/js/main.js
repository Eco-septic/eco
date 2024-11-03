// main.js
import { toggleTheme, setupThemeToggle } from "./theme.js";
import { scrollPercent } from "./scrollPercent.js";
import "fslightbox";
window.toggleTheme = toggleTheme;
setupThemeToggle();

document.addEventListener("DOMContentLoaded", scrollPercent);
