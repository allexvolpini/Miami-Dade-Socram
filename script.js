document.addEventListener("DOMContentLoaded", function () {
  // Configuração das imagens e modal
  const galleryItems = document.querySelectorAll(".galeria-item img");
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");

  if (!galleryItems.length || !lightbox || !lightboxImg) return;

  let currentIndex = 0;
  const imagesList = Array.from(galleryItems).map((img) => img.src);

  // Função para exibir a imagem selecionada
  function showImage(index) {
    lightboxImg.src = imagesList[index];
  }

  // Evento de clique em cada foto da galeria
  galleryItems.forEach((img, index) => {
    img.addEventListener("click", function (e) {
      e.stopPropagation();
      currentIndex = index;
      showImage(currentIndex);
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Próxima imagem
  function nextImage() {
    currentIndex = (currentIndex + 1) % imagesList.length;
    showImage(currentIndex);
  }

  // Imagem anterior
  function prevImage() {
    currentIndex = (currentIndex - 1 + imagesList.length) % imagesList.length;
    showImage(currentIndex);
  }

  // Fechar Modal
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

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });
});