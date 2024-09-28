// animation.js

export function setupIntersectionObservers(
  productTitle,
  productDescription,
  newsTitle,
  newsDescription,
  productItems,
  filterButtons,
  newsItems,
) {
  const observerOptions = {
    threshold: 0.3, // Trigger when 15% of the element is visible
  };

  const productObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateElements(productTitle, productDescription);
        animateFilterButtons(filterButtons);
        animateProductItems(productItems);
        productObserver.unobserve(entry.target); // Stop observing after animation
      }
    });
  }, observerOptions);

  const newsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateElements(newsTitle, newsDescription);
        animateNewsItems(newsItems);
        newsObserver.unobserve(entry.target); // Stop observing after animation
      }
    });
  }, observerOptions);

  productObserver.observe(
    document.querySelector(
      "section[aria-label='products categories featuring']",
    ),
  );
  newsObserver.observe(
    document.querySelector("section[aria-label='news featuring']"),
  );
}

function animateElements(...elements) {
  elements.forEach((element) => {
    element.classList.remove("opacity-0", "-translate-y-full");
  });
}

function animateFilterButtons(filterButtons) {
  filterButtons.forEach((button, index) => {
    if (button.getAttribute("data-filter") === "all") {
      button.classList.remove("PaginationDots");
      button.classList.add("PaginationDotsActive");
    }
    setTimeout(() => {
      button.classList.remove("opacity-0", "translate-y-10");
    }, index * 100); // Staggered effect for filter buttons
  });
}

function animateProductItems(productItems) {
  productItems.forEach((item, index) => {
    setTimeout(() => {
      item
        .querySelector(".product-title")
        .classList.remove("opacity-0", "translate-y-5");
    }, index * 150); // Staggered effect for product items
  });
}
function animateNewsItems(newsItems) {
  newsItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.remove("opacity-0", "translate-y-5");
    }, index * 150); // Staggered effect for product items
  });
}
