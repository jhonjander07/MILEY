const carrito = [];
const burbuja = document.getElementById("burbuja-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");
const contenedorCarrito = document.getElementById("carrito");
const toggleCarrito = document.getElementById("toggle-carrito");
const vaciarBtn = document.getElementById("vaciar-carrito");
const comprarBtn = document.getElementById("comprar");
const botonesAgregar = document.querySelectorAll(".agregar-carrito");

toggleCarrito.addEventListener("click", () => {
  contenedorCarrito.classList.toggle("oculto");
});

botonesAgregar.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const producto = btn.closest(".producto");
    const nombre = producto.querySelector(".nombre").textContent;
    const precioTexto = producto.querySelector(".precio").textContent;
    const precio = parseFloat(precioTexto.replace(/[^0-9.-]+/g, ""));
    carrito.push({ nombre, precio });
    actualizarCarrito();
  });
});

vaciarBtn.addEventListener("click", () => {
  carrito.length = 0;
  actualizarCarrito();
});

comprarBtn.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }
  const resumen = carrito
    .map((item) => `• ${item.nombre} - $${item.precio.toFixed(2)}`)
    .join("%0A");
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);
  const mensaje = `Hola, quiero comprar:%0A${resumen}%0A%0ATotal: $${total.toFixed(2)}`;
  const numeroWhatsApp = "3122058303"; // <-- Reemplaza con tu número real
  window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, "_blank");
});

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio;
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - $${item.precio.toFixed(2)} <button onclick="eliminarDelCarrito(${index})" style="cursor: pointer;">❌</button>`;
    listaCarrito.appendChild(li);
  });

  totalElemento.textContent = `Total: $${total.toFixed(2)}`;
  burbuja.textContent = carrito.length;
}

let clicDentro = false;

document.addEventListener("mousedown", function (e) {
  const carrito = document.getElementById("carrito");
  const boton = document.getElementById("toggle-carrito");

  clicDentro = carrito.contains(e.target) || boton.contains(e.target);
});

document.addEventListener("click", function () {
  if (!clicDentro) {
    document.getElementById("carrito").classList.add("oculto");
  }
});
