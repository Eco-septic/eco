// pagination.js
export function productPagination() {
  const filterButtons = document.querySelectorAll(".filter-button");
  const productItems = document.querySelectorAll(".product-item");
  const paginationDotsContainer = document.getElementById(
    "productPaginationDots",
  );
  const prevPageBtn = document.getElementById("productPrevPageBtn");
  const nextPageBtn = document.getElementById("productNextPageBtn");
  const nextSkip = document.getElementById("productNextSkipBtn");
  const prevSkip = document.getElementById("productPrevSkipBtn");
  // Elements

  // Default variables
  let filteredItems = Array.from(productItems);
  let currentPage = 0;
  const itemsPerPage = 8;
  const curFilter = new Map();
  const allButton = Array.from(filterButtons).find(
    (button) => button.getAttribute("data-filter") === "all",
  );

  // Store the initial filter button corresponding to "all"
  curFilter.set("button", allButton);
  let prevPage = 0;

  // Apply Filter Function
  const applyFilter = (filter) => {
    productItems.forEach((item) => {
      item.style.display = "none";
      item.classList.remove("slide-left", "slide-right");
    });

    filteredItems = Array.from(productItems).filter((item) => {
      return item.getAttribute("data-item") === filter || filter === "all";
    });

    currentPage = 0; // Reset to first page on new filter
    updatePagination(); // Update visible items based on filtered list
  };

  // Update Pagination Function
  const updatePagination = () => {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    currentPage = Math.max(0, Math.min(currentPage, totalPages - 1));

    const directionClass =
      currentPage > prevPage ? "slide-left" : "slide-right";
    prevPage = currentPage;

    filteredItems.forEach((item, index) => {
      if (
        index >= currentPage * itemsPerPage &&
        index < (currentPage + 1) * itemsPerPage
      ) {
        item.style.display = "block";
        item.classList.add(directionClass);
      } else {
        item.style.display = "none";
        item.classList.remove("slide-left", "slide-right");
      }
    });

    renderPaginationDots(totalPages);
    updateButtonStates(totalPages);
  };

  // Render Pagination Dots
  const renderPaginationDots = (totalPages) => {
    paginationDotsContainer.innerHTML = "";

    // Define how many dots to show on either side of the current page
    const dotsToShow = 1; // Number of dots to show on each side

    // Calculate the start and end page numbers
    let startPage = Math.max(0, currentPage - dotsToShow); // At least show page 0
    let endPage = Math.min(totalPages - 1, currentPage + dotsToShow); // At most show the last page

    // Adjust start and end to ensure we always show 3 dots
    if (endPage - startPage < 2) {
      if (currentPage === totalPages - 1) {
        startPage = Math.max(0, endPage - 2); // Adjust if at the last page
      } else if (currentPage === 0) {
        endPage = Math.min(totalPages - 1, startPage + 2); // Adjust if at the first page
      } else {
        // Center the dots around the current page
        startPage = Math.max(0, currentPage - 1);
        endPage = Math.min(totalPages - 1, currentPage + 1);
      }
    }

    // Create the pagination dots for the visible range
    for (let i = startPage; i <= endPage; i++) {
      const dot = document.createElement("button");
      dot.classList.add("px-2", "py-1", "inactive", "rounded-lg");
      dot.textContent = i + 1; // Display 1-based index for user

      if (i === currentPage) {
        dot.classList.remove("inactive");
        dot.classList.add("bg-blue-500", "text-white");
        dot.disabled = true;
      } else {
        dot.disabled = false;
        dot.classList.remove("bg-blue-500", "text-white"); // Ensure to remove active classes for non-current dots
      }

      dot.addEventListener("click", () => {
        currentPage = i;
        updatePagination();
      });

      paginationDotsContainer.appendChild(dot);
    }
  };

  // Update Navigation Button States
  const updateButtonStates = (totalPages) => {
    prevPageBtn.disabled = currentPage === 0;
    nextPageBtn.disabled = currentPage === totalPages - 1;
    prevSkip.disabled = currentPage < 3;
    nextSkip.disabled = currentPage > totalPages - 3;
  };

  // Filter Button Event Listener
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (curFilter.get("button")) {
        curFilter.get("button").classList.remove("bg-blue-500");
        curFilter.get("button").classList.add("inactive");
      }
      button.classList.add("bg-blue-500");
      button.classList.remove("inactive");
      curFilter.set("button", button);

      const filter = button.getAttribute("data-filter");
      applyFilter(filter);
    });
  });

  // Next and Previous Buttons
  prevPageBtn.addEventListener("click", () => {
    currentPage = Math.max(0, currentPage - 1);
    updatePagination();
  });

  nextPageBtn.addEventListener("click", () => {
    currentPage = Math.min(
      currentPage + 1,
      Math.ceil(filteredItems.length / itemsPerPage) - 1,
    );
    updatePagination();
  });
  // Next Skip Button (Skip 3 Pages)
  nextSkip.addEventListener("click", () => {
    currentPage = Math.min(
      currentPage + 3,
      Math.ceil(filteredItems.length / itemsPerPage) - 1,
    );
    updatePagination();
  });

  // Previous Skip Button (Skip 3 Pages)
  prevSkip.addEventListener("click", () => {
    currentPage = Math.max(0, currentPage - 3);
    updatePagination();
  });

  // Initial Setup: Show All Items
  applyFilter("all");
}

export function newsPagination() {
  const newsItems = document.querySelectorAll(".news-card");
  const newsPaginationDotsContainer =
    document.getElementById("newsPaginationDots");
  const newsPrevPageBtn = document.getElementById("newsPrevPageBtn");
  const newsNextPageBtn = document.getElementById("newsNextPageBtn");
  const newsPrevSkipBtn = document.getElementById("newsPrevSkipBtn");
  const newsNextSkipBtn = document.getElementById("newsNextSkipBtn");

  // Default variables
  let prevPage = 0;
  let currentPage = 0;
  const itemsPerPage = 3; // Adjust based on your design

  // Update Pagination Function
  const updateNewsPagination = () => {
    const totalPages = Math.ceil(newsItems.length / itemsPerPage);
    currentPage = Math.max(0, Math.min(currentPage, totalPages - 1));
    const directionClass =
      currentPage > prevPage ? "slide-left" : "slide-right";
    prevPage = currentPage;
    newsItems.forEach((item, index) => {
      if (
        index >= currentPage * itemsPerPage &&
        index < (currentPage + 1) * itemsPerPage
      ) {
        item.style.display = "block";
        item.classList.add(directionClass);
      } else {
        item.style.display = "none";
        item.classList.remove("slide-left", "slide-right");
      }
    });

    renderNewsPaginationDots(totalPages);
    updateNewsButtonStates(totalPages);
  };

  // Render Pagination Dots
  const renderNewsPaginationDots = (totalPages) => {
    newsPaginationDotsContainer.innerHTML = "";

    const dotsToShow = 1; // Number of dots to show on each side
    let startPage = Math.max(0, currentPage - dotsToShow);
    let endPage = Math.min(totalPages - 1, currentPage + dotsToShow);

    // Adjust to ensure exactly 3 dots are shown
    if (endPage - startPage < 2) {
      if (currentPage === totalPages - 1) {
        startPage = Math.max(0, endPage - 2);
      } else if (currentPage === 0) {
        endPage = Math.min(totalPages - 1, startPage + 2);
      } else {
        startPage = Math.max(0, currentPage - 1);
        endPage = Math.min(totalPages - 1, currentPage + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const dot = document.createElement("button");
      dot.classList.add("px-2", "py-1", "inactive", "rounded-lg");
      dot.textContent = i + 1; // Display 1-based index
      dot.disabled = false;
      if (i === currentPage) {
        dot.classList.remove("inactive");
        dot.classList.add("bg-blue-500", "text-white");
        dot.disabled = true;
      }

      dot.addEventListener("click", () => {
        currentPage = i;
        updateNewsPagination();
      });

      newsPaginationDotsContainer.appendChild(dot);
    }
  };

  // Update Navigation Button States
  const updateNewsButtonStates = (totalPages) => {
    newsPrevPageBtn.disabled = currentPage === 0;
    newsNextPageBtn.disabled = currentPage === totalPages - 1;
    newsPrevSkipBtn.disabled = currentPage < 3;
    newsNextSkipBtn.disabled = currentPage > totalPages - 3;
  };

  // Next and Previous Buttons
  newsPrevPageBtn.addEventListener("click", () => {
    currentPage = Math.max(0, currentPage - 1);
    updateNewsPagination();
  });

  newsNextPageBtn.addEventListener("click", () => {
    currentPage = Math.min(
      currentPage + 1,
      Math.ceil(newsItems.length / itemsPerPage) - 1,
    );
    updateNewsPagination();
  });

  // Next Skip Button (Skip 3 Pages)
  newsNextSkipBtn.addEventListener("click", () => {
    currentPage = Math.min(
      currentPage + 3,
      Math.ceil(newsItems.length / itemsPerPage) - 1,
    );
    updateNewsPagination();
  });

  // Previous Skip Button (Skip 3 Pages)
  newsPrevSkipBtn.addEventListener("click", () => {
    currentPage = Math.max(0, currentPage - 3);
    updateNewsPagination();
  });

  // Initial Setup: Show All Items
  updateNewsPagination();
}
