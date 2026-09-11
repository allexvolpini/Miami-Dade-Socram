let currentIndex = 0;
let imagesList = [];

function initGallery() {
  const items = document.querySelectorAll(".galeria-item img");
  imagesList = Array.from(items).map((img) => img.src);
}

function openLightbox(index) {
  if (imagesList.length === 0) initGallery();
  
  currentIndex = index;
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");

  if (lightbox && lightboxImg) {
    lightboxImg.src = imagesList[currentIndex];
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function showImage(index) {
  const lightboxImg = document.getElementById("lightbox-img");
  if (lightboxImg && imagesList[index]) {
    lightboxImg.src = imagesList[index];
  }
}

function nextImage(e) {
  if (e) e.stopPropagation();
  currentIndex = (currentIndex + 1) % imagesList.length;
  showImage(currentIndex);
}

function prevImage(e) {
  if (e) e.stopPropagation();
  currentIndex = (currentIndex - 1 + imagesList.length) % imagesList.length;
  showImage(currentIndex);
}

function closeModal() {
  const lightbox = document.getElementById("lightbox-modal");
  if (lightbox) {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initGallery();

  const lightbox = document.getElementById("lightbox-modal");
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.classList.contains("lightbox-content")) {
        closeModal();
      }
    });
  }

  // Teclado
  document.addEventListener("keydown", function (e) {
    if (!lightbox || !lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });

  // Gestos no celular (Swipe)
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightbox) {
    lightbox.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener("touchend", function (e) {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 40) nextImage();
      if (touchEndX > touchStartX + 40) prevImage();
    }, { passive: true });
  }
});