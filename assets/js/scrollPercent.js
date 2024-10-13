export const scrollPercent = () => {
  const scrollBtn = document.querySelector(".scroll-progress-btn");
  const progressCircle = document.getElementById("progress-circle");
  const radius = progressCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  progressCircle.style.strokeDasharray = `${circumference}`;
  progressCircle.style.strokeDashoffset = `${circumference}`;

  function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
  }

  window.addEventListener("scroll", () => {
    const scrollPercent =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    setProgress(scrollPercent);

    // Show or hide the button based on scroll position
    if (scrollPercent > 5) {
      scrollBtn.classList.remove("hidden");
      scrollBtn.classList.add("flex");
    }
    if (scrollPercent > 6) {
      scrollBtn.classList.remove("opacity-0", "pointer-events-none");
    } else {
      scrollBtn.classList.add("opacity-0", "pointer-events-none");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};
