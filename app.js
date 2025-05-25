const productos = [];
let total = 0;

const listaProductos = document.getElementById("lista-productos");
const contador = document.getElementById("contador");
const totalTexto = document.getElementById("total");
const carritoLista = document.getElementById("carrito-lista");

document.querySelectorAll(".agregar-carrito").forEach(btn => {
  btn.addEventListener("click", function () {
    const producto = this.closest(".producto");
    const nombre = producto.dataset.nombre;
    const precio = parseFloat(producto.dataset.precio);
    productos.push({ nombre, precio });
    actualizarCarrito();
  });
});

function actualizarCarrito() {
  listaProductos.innerHTML = "";
  total = 0;
  productos.forEach((p, i) => {
    total += p.precio;
    const li = document.createElement("li");
    li.innerHTML = `${p.nombre} - $${p.precio.toFixed(2)} <button onclick="eliminarProducto(${i})">❌</button>`;
    listaProductos.appendChild(li);
  });
  contador.textContent = productos.length;
  totalTexto.textContent = total.toFixed(2);
}

function eliminarProducto(index) {
  productos.splice(index, 1);
  actualizarCarrito();
}

document.getElementById("vaciar-carrito").addEventListener("click", () => {
  productos.length = 0;
  actualizarCarrito();
});

document.getElementById("comprar").addEventListener("click", () => {
  if (productos.length === 0) {
    alert("El carrito está vacío");
    return;
  }
  const mensaje = productos.map(p => `• ${p.nombre} - $${p.precio.toFixed(2)}`).join("%0A");
  const totalMsg = `%0A%0ATotal: $${total.toFixed(2)}`;
  const textoFinal = `Hola, quiero comprar:%0A${mensaje}${totalMsg}`;
  const telefono = "+573122058303"; // Reemplaza con tu número real
  window.open(`https://wa.me/${telefono}?text=${textoFinal}`, "_blank");
});

document.getElementById("carrito-btn").addEventListener("click", (e) => {
  e.preventDefault();
  carritoLista.style.display = carritoLista.style.display === "flex" ? "none" : "flex";
});

window.addEventListener("click", function (e) {
  if (!carritoLista.contains(e.target) && !document.getElementById("carrito-btn").contains(e.target)) {
    carritoLista.style.display = "none";
  }
});
