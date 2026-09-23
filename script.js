document.addEventListener("DOMContentLoaded", () => {
  // 1. CONTROL DE AUDIO (SAFAERA DESDE EL MINUTO 1:45 = 105 SEGUNDOS)
  const bgMusic = document.getElementById("bgMusic");
  const musicToggleBtn = document.getElementById("musicToggleBtn");
  const musicIcon = document.getElementById("musicIcon");
  const musicText = document.getElementById("musicText");
  const START_TIME = 105; // 1 min 45 seg

  bgMusic.currentTime = START_TIME;

  function playMusic() {
    if (bgMusic.currentTime < START_TIME) {
      bgMusic.currentTime = START_TIME;
    }
    bgMusic.play().then(() => {
      musicToggleBtn.classList.add("playing");
      musicIcon.innerText = "⏸️";
      musicText.innerText = "Pausar Safaera";
    }).catch(err => {
      console.log("Autoplay bloqueado por el navegador:", err);
    });
  }

  function pauseMusic() {
    bgMusic.pause();
    musicToggleBtn.classList.remove("playing");
    musicIcon.innerText = "🎵";
    musicText.innerText = "Safaera 🔊";
  }

  musicToggleBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  });

  // Primer toque en la pantalla inicia el audio si el navegador bloqueó el autoplay
  const handleFirstTouch = () => {
    if (bgMusic.paused) {
      playMusic();
    }
    document.removeEventListener("click", handleFirstTouch);
    document.removeEventListener("touchstart", handleFirstTouch);
  };
  document.addEventListener("click", handleFirstTouch);
  document.addEventListener("touchstart", handleFirstTouch);

  // 2. PÉTALOS FLOTANTES DE FONDO
  const petalsContainer = document.getElementById("petals-container");
  const petalColors = ["#fcd7e1", "#d8c5f2", "#bce3c5", "#fde2b6", "#cbe3f7"];

  function createPetal() {
    if (petalsContainer.children.length > 16) return;
    const petal = document.createElement("div");
    petal.classList.add("petal");
    
    const size = Math.random() * 8 + 8;
    const color = petalColors[Math.floor(Math.random() * petalColors.length)];
    
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;
    petal.style.background = color;
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${Math.random() * 4 + 7}s`;
    
    petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 12000);
  }
  setInterval(createPetal, 500);

  // 3. MENSAJES DE FLORES Y FOTOS (TOAST Y CONFETTI)
  const toastNote = document.getElementById("toastNote");

  const flowerMessages = {
    "fl-pink": "🌸 ¡Gracias por la paciencia y amabilidad que regalas cada día!",
    "fl-purple": "💜 ¡Tu energía positiva ilumina cualquier turno agotador!",
    "fl-mint": "🌿 Dosis de calma, paz y alegría para ti, Dra. Vanessa.",
    "fl-peach": "🍑 ¡Tu sonrisa y buena vibra son la mejor medicina!",
    "fl-blue": "💙 ¡Sigue logrando todo lo que te propones!",
    "fl-coral": "✨ Para mi amiga la camillera más linda del mundo."
  };

  const photoMessages = {
    "photo1": "📸 ¡Qué foto tan linda! Siempre con la mejor sonrisa ✨",
    "photo2": "🩺 ¡La doctora y camillera más dedicada de todas! 💪",
    "photo3": "✨ Momentos geniales e inolvidables junto a ti 🌸",
    "photo4": "💖 ¡Nunca dejes de brillar, Vanessa!"
  };

  function showToast(msg) {
    toastNote.style.opacity = "0";
    setTimeout(() => {
      toastNote.innerText = msg;
      toastNote.style.opacity = "1";
    }, 150);
  }

  function triggerConfetti(element) {
    if (typeof confetti === 'function') {
      const rect = element.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { x, y },
        colors: ['#bce3c5', '#fcd7e1', '#fde2b6', '#d8c5f2']
      });
    }
  }

  document.querySelectorAll(".flower-group").forEach(flower => {
    flower.addEventListener("click", () => {
      showToast(flowerMessages[flower.id] || "✨ ¡Eres increíble, Vanessa!");
      triggerConfetti(flower);
    });
  });

  document.querySelectorAll(".photo-template").forEach(photo => {
    photo.addEventListener("click", () => {
      showToast(photoMessages[photo.id] || "📸 ¡Una foto hermosa!");
      triggerConfetti(photo);
    });
  });

  // 4. ABRAZO VIRTUAL Y MODAL
  document.getElementById("btnHug").addEventListener("click", () => {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#bce3c5', '#fcd7e1', '#fde2b6', '#d8c5f2', '#cbe3f7']
      });
    }
    showToast("🤗 ¡Un abrazo súper fuerte enviado con mucho cariño!");
  });

  const btnLetter = document.getElementById("btnLetter");
  const modalOverlay = document.getElementById("modalOverlay");
  const btnCloseModal = document.getElementById("btnCloseModal");
  const btnModalCloseAction = document.getElementById("btnModalCloseAction");

  function openModal() { modalOverlay.classList.add("active"); }
  function closeModal() { modalOverlay.classList.remove("active"); }

  btnLetter.addEventListener("click", openModal);
  btnCloseModal.addEventListener("click", closeModal);
  btnModalCloseAction.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
});