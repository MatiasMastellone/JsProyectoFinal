export const agregarAlCarrito = (carrito, producto) => {
  let actualizo;
  let carritoAux = carrito;

  if (carritoAux.length > 0) {
    carritoAux.forEach((element) => {
      if (element.id === producto.id) {
        element.qty++;
        actualizo = 1;
      }
    });
  }
  if (actualizo != 1) {
    const productoNuevo = producto;
    productoNuevo.qty = 1;
    carritoAux.push(productoNuevo);
  }

  carrito = carritoAux;
};
