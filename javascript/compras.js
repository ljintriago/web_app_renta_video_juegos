const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

document.addEventListener('DOMContentLoaded', () => {
    const tituloCompra = document.querySelector('.titulo-carrito');
    const gamesArray = sessionStorage.getItem('games');

    tituloCompra.innerText += ' ' + sessionStorage.getItem('email');

    if(gamesArray !== null){
        const arrayConvertido = JSON.parse(gamesArray);
        const carritoNot = document.getElementById('btn-carrito');
        const carritoItemDetail = document.getElementById('container-detalle');
        let contadorCarrito = 0;

        for (let i = 0; i < arrayConvertido.length; i++) {
            contadorCarrito = contadorCarrito + arrayConvertido[i].quan;
        }

        
        carritoNot.innerHTML += `<span id="notif" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    ${contadorCarrito}
                                </span>`;
    }

    actualizarCarrito();
});

function actualizarCarrito() {
    const gamesArray = sessionStorage.getItem('games');

    if (gamesArray !== null) {
        const arrayConvertido = JSON.parse(gamesArray);
        const carritoNot = document.getElementById('btn-carrito');
        let carritoContainer = '';
        let contadorCarrito = 0;

        for (let i = 0; i < arrayConvertido.length; i++) {
            precioFixed = parseFloat(arrayConvertido[i].price.toFixed(2));
            carritoContainer += `<div class='carrito-item'><img class='image-detalle' src='${arrayConvertido[i].image}'><div class='text-cart-item'><p>${arrayConvertido[i].nombre}</p><p> X ${arrayConvertido[i].quan}</p><p>${precioFixed}</p></div></div><hr class='divider'>`;
            contadorCarrito = contadorCarrito + arrayConvertido[i].quan;
        }

        carritoNot.innerHTML += `<span id="notif" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            ${contadorCarrito}
        </span>`;

        const popoverCarrito = bootstrap.Popover.getOrCreateInstance('#btn-carrito');

        popoverCarrito.setContent({
            '.popover-body': `<div class='container-carrito'>${carritoContainer}</div><a class='btn btn-neon' href='./carrito.html'>Ver el carrito</a>`
        });

    }
};



function sesion(){
    
	const sesionIni= sessionStorage.getItem('email');
    
    if(sesionIni != null )
  {
  document.getElementById("abrirSesion").innerHTML ="Cerrar Sesion";
  }
  
  
  
  document.getElementById('abrirSesion').onclick = () => {
  
  if(sesionIni != null )
  {
  document.getElementById("abrirSesion").innerHTML ="Cerrar Sesion";
  sessionStorage.removeItem('email');
  }
  
  
  }
  
}

sesion();
