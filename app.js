
  const carrito = [];
  const listaCarrito = document.getElementById('lista-carrito');
  const totalElement = document.getElementById('total');
  const vaciarBtn = document.getElementById('vaciar-carrito');
  const comprarBtn = document.getElementById('comprar');

  // Función para actualizar la vista del carrito
  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.nombre} - $${item.precio.toFixed(2)}
        <button onclick="eliminarDelCarrito(${index})" style="
        background-color: white;
        cursor: pointer;
        ">❌</button> 
      `;
      listaCarrito.appendChild(li);
      total += item.precio;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Eliminar producto por índice
  function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
  }

  // Escuchar los botones "Agregar"
  document.querySelectorAll('.agregar-carrito').forEach(boton => {
    boton.addEventListener('click', () => {
      const producto = boton.closest('.producto');
      const nombre = producto.querySelector('.nombre').textContent.trim();
      const precioTexto = producto.querySelector('.precio').textContent.replace('$', '').replace(',', '').trim();
      const precio = parseFloat(precioTexto);

      carrito.push({ nombre, precio });
      actualizarCarrito();
    });
  });

  // Vaciar carrito
  vaciarBtn.addEventListener('click', () => {
    carrito.length = 0;
    actualizarCarrito();
  });

  // Comprar vía WhatsApp
  comprarBtn.addEventListener('click', () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    let mensaje = "Hola, quiero comprar:\n";
    let total = 0;

    carrito.forEach(item => {
      mensaje += `- ${item.nombre}: $${item.precio.toFixed(2)}\n`;
      total += item.precio;
    });

    mensaje += `\nTotal: $${total.toFixed(2)}`;

    const numeroTelefono = "+573122058303"; // Reemplaza con tu número de WhatsApp
    const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
  });

  // Hacer la función global para eliminar
  window.eliminarDelCarrito = eliminarDelCarrito;
  const toggleBtn = document.getElementById('toggle-carrito');
  const carritoDiv = document.getElementById('carrito');

  // Alternar visibilidad con botón
  toggleBtn.addEventListener('click', (e) => {
    carritoDiv.classList.toggle('oculto');
    e.stopPropagation(); // evita que el clic cierre el carrito de inmediato
  });

  // Evitar que clics dentro del carrito lo cierren
  carritoDiv.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Cerrar el carrito si haces clic fuera
  document.addEventListener('click', () => {
    carritoDiv.classList.add('oculto');
  });
