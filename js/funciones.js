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

export async function llamarApi() {
  const url =
    "https://weatherapi-com.p.rapidapi.com/current.json?q=-34.74028402645809%2C-58.38597554696959";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f43e0ecd61msh603ca065c85e478p15e90djsn7806e23e0974",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    return result;
  } catch (error) {
    console.error(error);
  }

}
