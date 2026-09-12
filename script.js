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
    const closeBtn = lightbox.querySelector(".lightbox-close");
    if (closeBtn) closeBtn.focus();
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

  const grid = document.querySelector(".grid-galeria");
  if (grid) {
    grid.addEventListener("click", function (e) {
      const item = e.target.closest(".galeria-item");
      if (!item || !grid.contains(item)) return;
      const index = Number(item.dataset.index);
      if (!Number.isNaN(index)) openLightbox(index);
    });
  }

  const lightbox = document.getElementById("lightbox-modal");
  if (lightbox) {
    const closeBtn = lightbox.querySelector(".lightbox-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        closeModal();
      });
    }
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

  const fab = document.querySelector(".whatsapp-float");
  const finalCta = document.querySelector(".final-cta");
  if (fab && finalCta && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        fab.classList.toggle("is-hidden", entries[0].isIntersecting);
      },
      { threshold: 0.35 }
    );
    observer.observe(finalCta);
  }

  const header = document.querySelector("header");
  if (header) {
    let lastY = 0;
    const showAfter = 72;
    const delta = 6;

    const onScroll = function () {
      const y = window.scrollY || 0;
      if (y <= showAfter) {
        header.classList.remove("is-hidden");
        lastY = y;
        return;
      }
      if (y > lastY + delta) {
        header.classList.add("is-hidden");
      } else if (y < lastY - delta) {
        header.classList.remove("is-hidden");
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    header.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("is-hidden");
      });
    });
  }
});