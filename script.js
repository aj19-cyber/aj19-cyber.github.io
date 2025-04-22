document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".mobile-menu-toggle")
  const sidebar = document.querySelector(".sidebar")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active")

      const bars = menuToggle.querySelectorAll(".toggle-bar")
      bars.forEach((bar) => bar.classList.toggle("active"))

      if (sidebar.classList.contains("active")) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
    })
  }

  document.addEventListener("click", (event) => {
    if (
      window.innerWidth <= 768 &&
      sidebar &&
      sidebar.classList.contains("active") &&
      !event.target.closest(".sidebar") &&
      !event.target.closest(".mobile-menu-toggle")
    ) {
      sidebar.classList.remove("active")
      document.body.style.overflow = ""

      if (menuToggle) {
        const bars = menuToggle.querySelectorAll(".toggle-bar")
        bars.forEach((bar) => bar.classList.remove("active"))
      }
    }
  })

  const style = document.createElement("style")
  style.textContent = `
        .toggle-bar.active:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        .toggle-bar.active:nth-child(2) {
            opacity: 0;
        }
        .toggle-bar.active:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    `
  document.head.appendChild(style)

  const carousel = document.getElementById("monaCarousel")
  if (carousel) {
    const bootstrapCarousel = new bootstrap.Carousel(carousel, {
      interval: 5000,
      wrap: true,
      touch: true,
    })
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  const galleryImages = document.querySelectorAll(".gallery-image")
  if (galleryImages.length > 0) {
    const lightbox = document.createElement("div")
    lightbox.className = "lightbox"
    lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            padding: 2rem;
        `

    const lightboxImg = document.createElement("img")
    lightboxImg.className = "lightbox-img"
    lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        `

    const closeBtn = document.createElement("button")
    closeBtn.className = "lightbox-close"
    closeBtn.innerHTML = "&times;"
    closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        `

    lightbox.appendChild(lightboxImg)
    lightbox.appendChild(closeBtn)
    document.body.appendChild(lightbox)

    galleryImages.forEach((img) => {
      img.style.cursor = "pointer"
      img.addEventListener("click", function () {
        lightboxImg.src = this.src
        lightbox.style.display = "flex"
        document.body.style.overflow = "hidden"
      })
    })

    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none"
      document.body.style.overflow = ""
    })

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none"
        document.body.style.overflow = ""
      }
    })
  }
})
