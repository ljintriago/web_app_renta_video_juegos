const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

if (document.title === 'Carrito de compras'){
    document.addEventListener('DOMContentLoaded', () => {
        const tituloCompra = document.querySelector('.titulo-carrito');
        const carritoTotal = document.getElementById('total');
        const gamesArray = sessionStorage.getItem('games');
        
    
        tituloCompra.innerText += ' ' + sessionStorage.getItem('email');
    
        if(gamesArray !== null){
            const arrayConvertido = JSON.parse(gamesArray);
            const carritoNot = document.getElementById('btn-carrito');
            const carritoItemDetail = document.getElementById('container-detalle');
            
            let contadorCarrito = 0;
            let sumaPrecios = 0;
    
            arrayConvertido.forEach(game => {
                const gameItem = document.createElement('div');
                precioFixed = parseFloat(game.price.toFixed(2));
                gameItem.innerHTML = `
                <div class='carrito-item-compra'><img class='image-detalle-compra' src='${game.image}'><div class='text-cart-item-compras'><p>${game.nombre}</p><p> X ${game.quan}</p><p>${precioFixed}</p></div><div class='btn-container'><div><button class='btn-change-detail'>+</button><button class='btn-change-detail'>-</button></div></div></div><hr class='divider'>
                `;
    
                carritoItemDetail.appendChild(gameItem);
    
                gameItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    let games = sessionStorage.getItem('games');
                    if(e.target.className === 'btn-change-detail'){
                        if(e.target.innerText === '+'){
                            const arrayConvertido = JSON.parse(games);
                            const objEncontrado = arrayConvertido.find(juego => juego.id === game.id);
                            
                            if (objEncontrado) {
                                const indexEncontrado = arrayConvertido.findIndex(juego => juego.id === game.id);
                                objEncontrado.price = objEncontrado.price + (objEncontrado.price/objEncontrado.quan);
                                objEncontrado.quan = objEncontrado.quan + 1;
                                arrayConvertido[indexEncontrado] = objEncontrado;
    
                                const jsonArray = JSON.stringify(arrayConvertido);
                                sessionStorage.setItem('games', jsonArray);
                            } else {
                                arrayConvertido.push(objGame);
                                const jsonArray = JSON.stringify(arrayConvertido);
                                sessionStorage.setItem('games', jsonArray);
                            }
    
                            const notif =  document.getElementById('notif');
                            notif.innerText = parseInt(notif.innerText) + 1;
    
                        }
                        else if(e.target.innerText === '-'){
                            const arrayConvertido = JSON.parse(games);
                            const objEncontrado = arrayConvertido.find(juego => juego.id === game.id);
                            
                            if (objEncontrado.quan > 1) {
                                const indexEncontrado = arrayConvertido.findIndex(juego => juego.id === game.id);
                                objEncontrado.price = objEncontrado.price - (objEncontrado.price/objEncontrado.quan);
                                objEncontrado.quan = objEncontrado.quan - 1;
                                arrayConvertido[indexEncontrado] = objEncontrado;
                            } else {
                                const indexEncontrado = arrayConvertido.findIndex(juego => juego.id === game.id);
                                arrayConvertido.splice(indexEncontrado,1);
                            }
                            const jsonArray = JSON.stringify(arrayConvertido);
                            sessionStorage.setItem('games', jsonArray);
    
                            const notif =  document.getElementById('notif');
                            notif.innerText = parseInt(notif.innerText) - 1;
                        }
    
                        actualizarCarrito();
                        actualizarDetalle();
                    }
                });
            });
    
            for (let i = 0; i < arrayConvertido.length; i++) {
                contadorCarrito = contadorCarrito + arrayConvertido[i].quan;
                sumaPrecios += arrayConvertido[i].price;
            }
    
            sumaPrecios = parseFloat(sumaPrecios.toFixed(2));
            carritoTotal.innerText += ' $ ' + sumaPrecios;
            
    
            carritoNot.innerHTML += `<span id="notif" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        ${contadorCarrito}
                                    </span>`;
        }
    
        actualizarCarrito();
    });

    const accionComprar = document.getElementById('btn-comprar');

    accionComprar.addEventListener('click', () => {
        sessionStorage.removeItem('games');
    });
}

function actualizarDetalle(){
    const carritoTotal = document.getElementById('total');
    const carritoItemDetail = document.getElementById('container-detalle');
    const gamesArray = sessionStorage.getItem('games');
    const arrayConvertido = JSON.parse(gamesArray);
    carritoItemDetail.innerHTML = '';

    let contadorCarrito = 0;
    let sumaPrecios = 0;

    arrayConvertido.forEach(game => {
        const gameItem = document.createElement('div');
        precioFixed = parseFloat(game.price.toFixed(2));
        gameItem.innerHTML = `
        <div class='carrito-item-compra'><img class='image-detalle-compra' src='${game.image}'><div class='text-cart-item-compras'><p>${game.nombre}</p><p> X ${game.quan}</p><p>${precioFixed}</p></div><div class='btn-container'><div><button class='btn-change-detail'>+</button><button class='btn-change-detail'>-</button></div></div></div><hr class='divider'>
        `;

        carritoItemDetail.appendChild(gameItem);

        gameItem.addEventListener('click', (e) => {
            e.preventDefault();
            let games = sessionStorage.getItem('games');
            if(e.target.className === 'btn-change-detail'){
                if(e.target.innerText === '+'){
                    const arrayConvertido = JSON.parse(games);
                    const objEncontrado = arrayConvertido.find(juego => juego.id === game.id);
                    
                    if (objEncontrado) {
                        const indexEncontrado = arrayConvertido.findIndex(juego => juego.id === game.id);
                        objEncontrado.price = objEncontrado.price + (objEncontrado.price/objEncontrado.quan);
                        objEncontrado.quan = objEncontrado.quan + 1;
                        arrayConvertido[indexEncontrado] = objEncontrado;

                        const jsonArray = JSON.stringify(arrayConvertido);
                        sessionStorage.setItem('games', jsonArray);
                    } else {
                        arrayConvertido.push(objGame);
                        const jsonArray = JSON.stringify(arrayConvertido);
                        sessionStorage.setItem('games', jsonArray);
                    }

                    const notif =  document.getElementById('notif');
                    notif.innerText = parseInt(notif.innerText) + 1;

                }
                else if(e.target.innerText === '-'){
                    const arrayConvertido = JSON.parse(games);
                    const objEncontrado = arrayConvertido.find(juego => juego.id === game.id);
                    
                    if (objEncontrado.quan > 1) {
                        const indexEncontrado = arrayConvertido.findIndex(juego => juego.id === game.id);
                        objEncontrado.price = objEncontrado.price - (objEncontrado.price/objEncontrado.quan);
                        objEncontrado.quan = objEncontrado.quan - 1;
                        arrayConvertido[indexEncontrado] = objEncontrado;
                    } else {
                        const indexEncontrado = arrayConvertido.findIndex(juego => juego.id === game.id);
                        arrayConvertido.splice(indexEncontrado,1);
                    }
                    const jsonArray = JSON.stringify(arrayConvertido);
                    sessionStorage.setItem('games', jsonArray);

                    const notif =  document.getElementById('notif');
                    notif.innerText = parseInt(notif.innerText) - 1;
                }
                actualizarCarrito();
                actualizarDetalle();
            }
        });
    });

    for (let i = 0; i < arrayConvertido.length; i++) {
        contadorCarrito = contadorCarrito + arrayConvertido[i].quan;
        sumaPrecios += arrayConvertido[i].price;
    }

    sumaPrecios = parseFloat(sumaPrecios.toFixed(2));
    carritoTotal.innerText = 'Total: $ ' + sumaPrecios;
};

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

        const notif =  document.getElementById('notif');
        notif.innerText = contadorCarrito;

        const popoverCarrito = bootstrap.Popover.getOrCreateInstance('#btn-carrito');

        popoverCarrito.setContent({
            '.popover-body': `<div class='container-carrito'>${carritoContainer}</div><a class='btn btn-neon' href='./carrito.html'>Ver el carrito</a>`
        });

    }
};