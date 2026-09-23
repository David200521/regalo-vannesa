document.addEventListener("DOMContentLoaded", () => {
  // 1. GENERACIÓN DE PÉTALOS FLOTANTES
  const petalsContainer = document.getElementById("petals-container");
  const petalColors = ["#fcd7e1", "#d8c5f2", "#bce3c5", "#fde2b6", "#cbe3f7"];

  function createPetal() {
    if (petalsContainer.children.length > 25) return;
    const petal = document.createElement("div");
    petal.classList.add("petal");
    
    const size = Math.random() * 10 + 10;
    const color = petalColors[Math.floor(Math.random() * petalColors.length)];
    
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;
    petal.style.background = color;
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${Math.random() * 5 + 6}s`;
    
    petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 11000);
  }

  setInterval(createPetal, 450);

  // 2. MENSAJES DE LAS FLORES
  const toastNote = document.getElementById("toastNote");
  const flowerMessages = {
    "fl-pink": "🌸 ¡Gracias por la paciencia y amabilidad que regalas cada día!",
    "fl-purple": "💜 ¡Tu energía positiva ilumina cualquier turno agotador!",
    "fl-mint": "🌿 Dosis de calma, paz y alegría para ti, Dra. Vanessa.",
    "fl-peach": "🍑 ¡Tu sonrisa y buena vibra son la mejor medicina!",
    "fl-blue": "💙 ¡Sigue logrando todo lo que te propones!",
    "fl-coral": "✨ Para mi amiga la camillera más linda del mundo."
  };

  const flowers = document.querySelectorAll(".flower-group");
  flowers.forEach(flower => {
    flower.addEventListener("click", (e) => {
      const id = flower.id;
      const msg = flowerMessages[id] || "✨ ¡Eres increíble, Vanessa!";
      
      toastNote.style.opacity = "0";
      setTimeout(() => {
        toastNote.innerText = msg;
        toastNote.style.opacity = "1";
      }, 150);

      // Explosión pequeña de confetti al tocar la flor
      if (typeof confetti === 'function') {
        const rect = flower.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        
        confetti({
          particleCount: 15,
          spread: 40,
          origin: { x, y },
          colors: ['#bce3c5', '#fcd7e1', '#fde2b6', '#d8c5f2']
        });
      }
    });
  });

  // 3. EVENTO DE ABRAZO VIRTUAL (CONFETTI FLOREAL)
  const btnHug = document.getElementById("btnHug");
  btnHug.addEventListener("click", () => {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#bce3c5', '#fcd7e1', '#fde2b6', '#d8c5f2', '#cbe3f7']
      });
    }
    toastNote.innerText = "🤗 ¡Un abrazo súper fuerte enviado con mucho cariño!";
  });

  // 4. MODAL CARTA
  const btnLetter = document.getElementById("btnLetter");
  const modalOverlay = document.getElementById("modalOverlay");
  const btnCloseModal = document.getElementById("btnCloseModal");
  const btnModalCloseAction = document.getElementById("btnModalCloseAction");

  function openModal() {
    modalOverlay.classList.add("active");
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
  }

  btnLetter.addEventListener("click", openModal);
  btnCloseModal.addEventListener("click", closeModal);
  btnModalCloseAction.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
});