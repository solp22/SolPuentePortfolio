
// === FECHA NAV ===
function actualizarFecha() {
  const fecha = new Date();

  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  const diaSemana = dias[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];

  let horas = fecha.getHours();
  const minutos = fecha.getMinutes().toString().padStart(2, '0');

  const ampm = horas >= 12 ? 'pm' : 'am';
  horas = horas % 12 || 12;

  const esMobile = window.innerWidth <= 768;

  const fechaEl = document.getElementById('fecha');

  if (esMobile) {
    fechaEl.textContent = `${horas}:${minutos}${ampm}`;
  } else {
    fechaEl.textContent = `${diaSemana} ${dia} ${mes} ${horas}:${minutos}${ampm}`;
  }
}

actualizarFecha();
setInterval(actualizarFecha, 60000);

// por si redimensionan la pantalla
window.addEventListener("resize", actualizarFecha);




// === ICONOS ===
const icons = document.querySelectorAll(".icon-wrap");

// === ANIMACION MOVIENDO MOUSE ===

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

if (window.innerWidth >= 768) {

  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
  });

  function animate() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    icons.forEach((icon, index) => {
      const depth = (index + 1) * 20;

      gsap.set(icon, {
        x: currentX * depth,
        y: currentY * depth
      });
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// === HOVER ICONOS ===

if (window.innerWidth >= 768) {

  icons.forEach(icon => {

    icon.addEventListener("mouseenter", () => {
      gsap.to(icon, {
        scale: 1.12,
        y: "-=6",
        duration: 0.25,
        ease: "power3.out"
      });
    });

    icon.addEventListener("mouseleave", () => {
      gsap.to(icon, {
        scale: 1,
        y: "+=6",
        duration: 0.3,
        ease: "power3.out"
      });
    });

  });

}

// === HAMBURGUESA ===
const hamburger = document.getElementById("hamburguesa");
const menu = document.querySelector(".mobile-menu");
const menuLinks = menu.querySelectorAll("a");


hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    hamburger.classList.remove("active");
  });
});


// === ACTIVAR TABS TRABAJOS COMPU ===

const images = document.querySelectorAll("#trabajos img");
const tabs = document.querySelectorAll(".tabs-click div");

images[0].classList.add("activa");

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => {
    images.forEach(img => img.style.zIndex = 1);
    images[i].style.zIndex = 10;
  });
});
tabs.forEach((tab, i) => {

  // HOVER ENTER
  tab.addEventListener("mouseenter", () => {

 images[i].style.filter = "brightness(0.9)";    
  });

  // HOVER LEAVE
  tab.addEventListener("mouseleave", () => {
      images[i].style.filter = "brightness(1)";

  });

});

// === ACTIVAR TABS TRABAJOS CELU ===

const imagesCel = document.querySelectorAll("#trabajosCelu > img");
const tabsCel = document.querySelectorAll(".tabs-click-celu div");

images[0].classList.add("activa");

tabsCel.forEach((tab, i) => {
  tab.addEventListener("click", () => {
    imagesCel.forEach(img => img.style.zIndex = 1);
    imagesCel[i].style.zIndex = 10;
  });
});

// === MOSTRAR TRABAJOS SEGÚN TAB ===
const seccionesDesktop = document.querySelectorAll("#trabajos .seccion");
const seccionesCelu = document.querySelectorAll("#trabajosCelu .seccion");

seccionesDesktop[0].classList.add("activa");
seccionesCelu[0].classList.add("activa");

tabs.forEach((tab, i) => {

  tab.addEventListener("click", () => {

    images.forEach(img => img.classList.remove("activa"));
    images[i].classList.add("activa");

    seccionesDesktop.forEach(sec => sec.classList.remove("activa"));
    seccionesDesktop[i].classList.add("activa");

  });

});

tabsCel.forEach((tab, i) => {
  tab.addEventListener("click", () => {

    // Carpetas
    imagesCel.forEach(img => img.classList.remove("activa"));
    imagesCel[i].classList.add("activa");

    // Secciones mobile
    seccionesCelu.forEach(sec => sec.classList.remove("activa"));
    seccionesCelu[i].classList.add("activa");

  });
});



// === ACTIVAR TABS DESDE NAV ===

const navTrabajos = document.querySelectorAll('a[data-trabajo]');

navTrabajos.forEach(link => {
  link.addEventListener("click", () => {

    const index = link.dataset.trabajo;
    const esMobile = window.innerWidth <= 767;

    if (esMobile) {

      imagesCel.forEach(img => img.classList.remove("activa"));
      imagesCel[index].classList.add("activa");

      seccionesCelu.forEach(sec => sec.classList.remove("activa"));
      seccionesCelu[index].classList.add("activa");

    } else {

      images.forEach(img => img.classList.remove("activa"));
      images[index].classList.add("activa");

      seccionesDesktop.forEach(sec => sec.classList.remove("activa"));
      seccionesDesktop[index].classList.add("activa");
    }

  });
});


document.querySelectorAll("#trabajosCelu .slider-container")
.forEach(container => {

  const slider = container.querySelector(".slider");
  const slides = container.querySelectorAll(".slide");
  const nextBtn = container.querySelector(".siguiente");
  const prevBtn = container.querySelector(".anterior");
  const paginacion = container.querySelector(".paginacion");

  let index = 0;

  // === CREAR PUNTOS ===
  slides.forEach((_, i) => {
    const punto = document.createElement("div");
    punto.classList.add("punto");
    if (i === 0) punto.classList.add("activo");

    punto.addEventListener("click", () => {
      index = i;
      actualizar();
    });

    paginacion.appendChild(punto);
  });

  const puntos = paginacion.querySelectorAll(".punto");

  function actualizar() {
    slider.style.transform = `translateX(-${index * 100}%)`;

    puntos.forEach(p => p.classList.remove("activo"));
    puntos[index].classList.add("activo");
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    actualizar();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    actualizar();
  });

});

AOS.init({
    disable: function () {
      return window.innerWidth < 768; // desactiva en celu
    }
  });
