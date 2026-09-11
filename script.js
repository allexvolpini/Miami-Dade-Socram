document.addEventListener("DOMContentLoaded", function () {
  // Elementos do Modal e Galeria
  const galleryItems = document.querySelectorAll(".galeria-item");
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");

  if (!galleryItems.length || !lightbox || !lightboxImg) return;

  let currentIndex = 0;
  // Captura as URLs das imagens dentro das divs
  const imagesList = Array.from(galleryItems).map((item) => {
    const img = item.querySelector("img");
    return img ? img.src : "";
  });

  function showImage(index) {
    lightboxImg.src = imagesList[index];
  }

  // Clique/Toque nos itens da galeria (Funciona em PC e Celular)
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      currentIndex = index;
      showImage(currentIndex);
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function nextImage() {
    currentIndex = (currentIndex + 1) % imagesList.length;
    showImage(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + imagesList.length) % imagesList.length;
    showImage(currentIndex);
  }

  function closeModal() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      nextImage();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      prevImage();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target.classList.contains("lightbox-content")) {
      closeModal();
    }
  });

  // Navegação pelo teclado
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });

  // --- SUPORTE A GESTOS (SWIPE) NO CELULAR ---
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  lightbox.addEventListener(
    "touchend",
    function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    const swipeThreshold = 50; // Distância mínima para registrar o deslize
    if (touchEndX < touchStartX - swipeThreshold) {
      nextImage(); // Deslizou para a esquerda (próxima)
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      prevImage(); // Deslizou para a direita (anterior)
    }
  }
});