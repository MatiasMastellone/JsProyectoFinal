import { agregarAlCarrito } from "./funciones.js";

const arrayPrd = [
  {
    id: 1,
    nombre: "Baguales",
    descr: "Cerveza Berlina Rubia suave",
    precio: 595,
    img: "./res/img/baguales.jpg",
  },
  {
    id: 2,
    nombre: "Equilibrio BrewHouse",
    descr: "La nueva a IPA de BH es refrescante!",
    precio: 1625,
    img: "./res/img/equilibrioBH.jpg",
  },
  {
    id: 3,
    nombre: "Extra Stout",
    descr: "GAUKLER - Extra Stout",
    precio: 550,
    img: "./res/img/extrastout.jpg",
  },
  {
    id: 4,
    nombre: "Honey",
    descr: "GAUKLER - Honey",
    precio: 550,
    img: "./res/img/honey.jpg",
  },
  {
    id: 5,
    nombre: "Que miras bobo?",
    descr: " IPA 🇦🇷100% Argenta! Edición Limitada.",
    precio: 1625,
    img: "./res/img/quemirasbobo.jpg",
  },
  {
    id: 6,
    nombre: "Imperial Porter",
    descr: "SUR DEL SUR/BA - Imperial Porter (Collab. Salmón Birra)",
    precio: 1450,
    img: "./res/img/sdsimperialporter.jpg",
  },
];

//DOM
const productos = document.getElementById("productos");
const sector2 = document.getElementById("sector2");
const btCarrito = document.getElementById("btCarrito");
const buttonFinalizar = document.createElement("button");
buttonFinalizar.innerText = "Finalizar pedido";

const contenedor = document.createElement("div");
contenedor.classList.add("contenedor");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let nroPedido = localStorage.getItem("nrPedido") || "0000000";

console.log(arrayPrd);
let counter = 0;

arrayPrd.forEach((el) => {
  counter++;
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta");
  tarjeta.innerHTML = ` 
                    <div><img src="${el.img}" alt="${el.descr}" class="tarjeta_image"/></div>
                    <div class="tarjeta_informacion">
                        <span class="tarjeta_nombre">${el.nombre}</span>
                        <br>
                        <span class="tarjeta_nombre">${el.descr}</span>
                        <br>
                        <span class="tarjeta_precio">$${el.precio}</span>
                    </div> `;

  const buttonAgregar = document.createElement("button");
  buttonAgregar.innerText = "Agregar";

  buttonAgregar.addEventListener("click", () => {
    agregarAlCarrito(carrito, el);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Se guardo al carrito correctamente el producto " + el.nombre,
      showConfirmButton: false,
      timer: 2000,
    });
  });

  tarjeta.appendChild(buttonAgregar);

  productos.appendChild(tarjeta);
});

btCarrito.addEventListener("click", () => {
  productos.innerHTML = "";
  sector2.innerHTML = "";
  carrito.forEach((el) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.innerHTML = ` 
        <div><img src="${el.img}" alt="${el.descr}" class="tarjeta_image"/></div>
        <div class="tarjeta_informacion">
            <span class="tarjeta_nombre">${el.nombre}</span>
            <br>
            <span class="tarjeta_precio">$${el.precio}</span>
            <br>
            <span class="tarjeta_precio">Cantidad ${el.qty}</span>
        </div> `;

    productos.appendChild(tarjeta);
  });

  contenedor.innerHTML="";
  const aviso = document.createElement("div");
  aviso.innerText="Ingrese algun producto"
  contenedor.appendChild(aviso)

  carrito.length > 0? sector2.appendChild(buttonFinalizar): sector2.appendChild(contenedor);
  
});

buttonFinalizar.addEventListener("click", () => {
  productos.innerHTML = "";
  sector2.innerHTML = "";

  let totalProd = 0;
  let total = 0;
  let formulario =[
    "Nombre         Descripcion               Precio        Cantidad        Total Producto        \n"];
  
  const carrito1=carrito;
  carrito1.forEach((el) => {
    totalProd = el.precio * el.qty;
    total += totalProd;

    formulario.push(el.nombre + "      " +el.descr +"               $" + el.precio +"        " + el.qty +"        $" +totalProd +"\n");
  });

  formulario.push(
    "_________________________________________________________________________________________\n"
  );
  const totalFormated = new Intl.NumberFormat("de-DE", {style: "currency",currency: "ARS",}).format(total);

  formulario.push("TOTAL  $" + totalFormated + "\n");


  const form = document.createElement("p");
  form.classList.add("form");
  form.innerText = formulario;

  contenedor.innerHTML="";
  contenedor.appendChild(form);
  productos.appendChild(contenedor);

  const buttonPagar = document.createElement("button");
  buttonPagar.innerText = "Pagar";
  const buttonVaciar = document.createElement("button");
  buttonVaciar.innerText = "Vaciar carrito";

  buttonPagar.addEventListener("click", () => {

    nroPedido++;
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Muchas gracias por tu compra \n N° de pedido " +nroPedido.toString().padStart(6,"0")+ ' \n fecha ' + moment().format('LL'),
        showConfirmButton: true,
        confirmButtonText: 'Confirmar',
        timer: 6000,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          localStorage.setItem("nrPedido",nroPedido);
          localStorage.removeItem("carrito");
          location.reload();
        }else{
          nroPedido--;
        }
      
      });

    
  });

  buttonVaciar.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    location.reload();
  });


  sector2.appendChild(buttonPagar);
  sector2.appendChild(buttonVaciar);
  


})
