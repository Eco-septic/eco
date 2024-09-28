export const heroPagination = () => {
  const textContainer = document.getElementById("textAnimation");
  const text = textContainer.textContent.trim(); // Get the original text
  textContainer.textContent = ""; // Clear the container

  // Create a wrapper div to contain all character divs
  const wrapperDiv = document.createElement("div");
  wrapperDiv.className = "heroWrapperDiv"; // Tailwind classes for centering and layout
  textContainer.appendChild(wrapperDiv);

  // Split text into individual characters and wrap in divs
  text.split("").forEach((char, index) => {
    const charDiv = document.createElement("div");
    charDiv.className = "heroCharDic";
    charDiv.textContent = char === " " ? "\u00A0" : char; // Replace space with non-breaking space for correct spacing

    // Append each character div to the wrapper div
    wrapperDiv.appendChild(charDiv);

    // Animate the character div from top to its final position
    setTimeout(() => {
      charDiv.classList.remove("heroCharDic"); // Remove initial classes for animation
      charDiv.classList.add("heroCharDicAnimation"); // Add final classes for animation
    }, index * 100); // 0.1s delay for each character
  });

  const slider = document.getElementById("slider");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;
  const totalSlides = slider.children.length;

  // Helper function to update slider position with opacity transitions
  const updateSliderPosition = () => {
    Array.from(slider.children).forEach((img, index) => {
      if (index === currentIndex) {
        img.style.opacity = "1"; // Show the active image
        img.style.zIndex = "1"; // Make sure the current image is on top
      } else {
        img.style.opacity = "0"; // Hide other images
        img.style.zIndex = "0"; // Push non-active images back
      }
    });

    // Update dots to reflect the current slide
    dots.forEach((dot, index) => {
      dot.style.backgroundColor = index === currentIndex ? "gray" : "#E5E7EB"; // Change dot color for active slide
    });
  };

  // Next Button Event Listener
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSliderPosition();
  });

  // Previous Button Event Listener
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSliderPosition();
  });

  // Pagination Dots Event Listener
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      currentIndex = parseInt(dot.getAttribute("data-index"));
      updateSliderPosition();
    });
  });

  // Initial Slider Position
  updateSliderPosition();
};
