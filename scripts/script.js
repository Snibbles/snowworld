document.addEventListener("DOMContentLoaded", () => {
  // Carousel 1: Main Image Carousel
  const carousel = document.querySelector("main > div:nth-of-type(1) ul");
  const navDots = document.querySelectorAll("main > div:nth-of-type(1) nav button");

  function updateActiveDot(index) {
    navDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function handleScroll() {
    const scrollLeft = carousel.scrollLeft;
    const slideWidth = carousel.offsetWidth;
    const currentIndex = Math.round(scrollLeft / slideWidth);
    updateActiveDot(currentIndex);
  }

  function updateCarousel(index) {
    carousel.scrollTo({
      left: carousel.offsetWidth * index,
      behavior: "smooth",
    });
    updateActiveDot(index);
  }

  navDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateCarousel(index);
    });
  });

  carousel.addEventListener("scroll", handleScroll);

  updateActiveDot(0);
});

document.addEventListener("DOMContentLoaded", () => {
  // Carousel 2: Secondary Carousel with Navigation Dots
  const carousel2 = document.querySelector("main div:nth-of-type(3) ul");
  const navContainer2 = document.querySelector("main div:nth-of-type(3) nav");
  const slides2 = document.querySelectorAll("main div:nth-of-type(3) ul li");

  if (!carousel2 || !navContainer2 || !slides2.length) {
    console.error("Carousel elements not found or misconfigured!");
    return;
  }

  let navDots2 = [];

  function calculateDots() {
    const slideWidth = slides2[0].offsetWidth + parseFloat(getComputedStyle(carousel2).gap || 0);
    const visibleSlides = Math.floor(carousel2.offsetWidth / slideWidth);
    const totalDots = Math.max(0, slides2.length - visibleSlides + 1);

    return totalDots;
  }

  function hasOverflow() {
    const slideWidth = slides2[0].offsetWidth + parseFloat(getComputedStyle(carousel2).gap || 0);
    const totalSlidesWidth = slideWidth * slides2.length;
    return totalSlidesWidth > carousel2.offsetWidth;
  }

  function createNavDots() {
    if (!hasOverflow()) {
      navContainer2.style.display = "none";
      return;
    }

    navContainer2.style.display = "";
    const totalDots = calculateDots();
    navContainer2.innerHTML = "";
    navDots2 = [];

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      navContainer2.appendChild(dot);
      navDots2.push(dot);
    }

    navDots2.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        updateCarousel2(index);
      });
    });
  }

  function calculateActiveIndex() {
    const slideWidth = slides2[0].offsetWidth + parseFloat(getComputedStyle(carousel2).gap || 0);
    const scrollLeft = carousel2.scrollLeft;
    const index = Math.round(scrollLeft / slideWidth);
    return index;
  }

  function updateActiveDot(index) {
    navDots2.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function updateCarousel2(index) {
    const slideWidth = slides2[0].offsetWidth + parseFloat(getComputedStyle(carousel2).gap || 0);
    carousel2.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    });
    updateActiveDot(index);
  }

  carousel2.addEventListener("scroll", () => {
    const activeIndex = calculateActiveIndex();
    updateActiveDot(activeIndex);
  });

  window.addEventListener("resize", () => {
    createNavDots();
    updateActiveDot(calculateActiveIndex());
  });

  createNavDots();
  updateActiveDot(0);
});

// Hamburger Menu Settings
const hamMenu = document.querySelector("header nav > button");
const offScreenMenu = document.querySelector("header > div:nth-of-type(2)");
const body = document.body;

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");

  if (offScreenMenu.classList.contains("active")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
});