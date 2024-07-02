document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'f903547292c54301b90b9236e3972427'; // Reemplaza 'YOUR_API_KEY' con tu clave API de RAWG
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id'); // Obtener el ID del juego desde los parámetros de la URL

    if (gameId) {
        fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('product-title').textContent = data.name;
                document.getElementById('product-image').src = data.background_image;
                document.getElementById('product-platform').textContent = data.platforms.map(p => p.platform.name).join(', ');
                document.getElementById('product-genre').textContent = data.genres.map(g => g.name).join(', ');
                document.getElementById('product-description').textContent = data.description_raw || "Descripción no disponible";

                let gameTitle = data.name.toLowerCase().trim().replace(/\s+/g, '');
                fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}`)
                .then(response => response.json())
                .then(data => {
                    let precio;
                    
                    if(data.length === 0){
                        precio = "Free to play"
                    }
                    else{
                        precio = '$ ' + data[0].cheapest;
                    }

                    document.getElementById('product-price').textContent = precio;
                    
                });
            })
            .catch(error => console.error('Error fetching game details:', error));
    } else {
        console.error('No game ID provided in URL');
    }

    
    const gamesArray = sessionStorage.getItem('games');

    if(gamesArray !== null){
        const arrayConvertido = JSON.parse(gamesArray);
        const carritoNot = document.getElementById('btn-carrito');
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

const addGame = document.getElementById('btn-add-game');

addGame.addEventListener('click', (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = parseInt(urlParams.get('id'));
    const email = sessionStorage.getItem('email');
    if(email !== null){
        const posicionSimbolo = document.getElementById('product-price').innerText.indexOf('$');
        const precioJuego = parseFloat(document.getElementById('product-price').innerText.substring(posicionSimbolo + 2));
        let objGame = {id: gameId, nombre: document.getElementById('product-title').innerText, quan: 1, image: document.getElementById('product-image').src, price: precioJuego};
    
        let games = sessionStorage.getItem('games');
        if(games !== null){
            const arrayConvertido = JSON.parse(games);
            const objEncontrado = arrayConvertido.find(juego => juego.id === gameId);
    
            if (objEncontrado) {
                const indexEncontrado = arrayConvertido.findIndex(juego => juego.id === gameId);
                objEncontrado.quan = objEncontrado.quan + 1;
                objEncontrado.price = objEncontrado.price + precioJuego;
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
            actualizarCarrito();
        }
        else{
            let gameArray = [];
            gameArray.push(objGame);
            const jsonArray = JSON.stringify(gameArray);
            sessionStorage.setItem('games', jsonArray);

            const carritoNot = document.getElementById('btn-carrito');
            carritoNot.innerHTML += `<span id="notif" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                ${gameArray.length}
            </span>`;

            actualizarCarrito();
        }
    }
    else{
        window.location.href = './login.html'
    }
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
            '.popover-body': `<div class='container-carrito'>${carritoContainer}</div><a class='btn btn-neon' href='./pages/carrito.html'>Ver el carrito</a>`
        });

    }
}
