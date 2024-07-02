const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'f903547292c54301b90b9236e3972427'; // Reemplaza 'YOUR_API_KEY' con tu clave API de RAWG
    const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=9`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const searchResults = document.getElementById('searchResults');
            searchResults.innerHTML = ''; // Limpiar resultados previos

            data.results.forEach(game => {
                const gameCard = document.createElement('div');
                gameCard.classList.add('col-md-4', 'mb-4');
                let gameTitle = game.name.toLowerCase().trim().replace(/\s+/g, '');
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
                    gameCard.innerHTML = `
                    <div class="card">
                        <img src="${game.background_image}" class="card-img-top" alt="${game.name}">
                        <div class="card-body">
                            <h5 class="card-title">${game.name}</h5>
                            <p class="card-text">Fecha de lanzamiento: ${game.released}</p>
                            <p class="card-text">Precio: ${precio}</p>
                            <div class="btn-group">
                                <a href="#" class="btn btn-neon">Añadir a carrito</a>
                                <a href="detalle.html?id=${game.id}" class="btn btn-pink">Detalle del juego</a>
                            </div>
                        </div>
                    </div>
                `;
                });

                searchResults.appendChild(gameCard);

                gameCard.addEventListener('click', (e) => {
                    if(e.target.className === 'btn btn-neon'){
                        e.preventDefault();
                        const email = sessionStorage.getItem('email');
                        if(email !== null){
                            const posicionSimbolo = e.currentTarget.children[0].children[1].children[2].innerHTML.indexOf('$');
                            const precioJuego = (e.currentTarget.children[0].children[1].children[2].innerHTML === 'Free to play') ? 0 : parseFloat(e.currentTarget.children[0].children[1].children[2].innerHTML.substring(posicionSimbolo + 2));
                            let objGame = {id: game.id, nombre: game.name, quan: 1, image: game.background_image, price: precioJuego};

                            let games = sessionStorage.getItem('games');
                            if(games !== null){
                                const arrayConvertido = JSON.parse(games);
                                const objEncontrado = arrayConvertido.find(juego => juego.id === game.id);

                                if (objEncontrado) {
                                    const indexEncontrado = arrayConvertido.findIndex(juego => juego.id === game.id);
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
                    }
                });

            });
        })
        .catch(error => console.error('Error fetching games:', error));

    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault();

        let searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        const apiUrlSearch = `https://api.rawg.io/api/games?key=${apiKey}&search=${searchTerm}&page_size=9`;

        fetch(apiUrlSearch)
            .then(response => response.json())
            .then(data => {
                const searchResults = document.getElementById('searchResults');
                searchResults.innerHTML = ''; // Limpiar resultados previos

                data.results.forEach(game => {
                    const gameCard = document.createElement('div');
                    gameCard.classList.add('col-md-4', 'mb-4');
                    let gameTitle = game.name.toLowerCase().trim().replace(/\s+/g, '');
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
                        gameCard.innerHTML = `
                        <div class="card">
                            <img src="${game.background_image}" class="card-img-top" alt="${game.name}">
                            <div class="card-body">
                                <h5 class="card-title">${game.name}</h5>
                                <p class="card-text">Fecha de lanzamiento: ${game.released}</p>
                                <p class="card-text">Precio: ${precio}</p>
                                <div class="btn-group">
                                    <a href="#" class="btn btn-neon">Añadir a carrito</a>
                                    <a href="detalle.html?id=${game.id}" class="btn btn-pink">Detalle del juego</a>
                                </div>
                            </div>
                        </div>
                    `;
                    });

                    searchResults.appendChild(gameCard);

                    gameCard.addEventListener('click', (e) => {
                        if(e.target === 'a.btn.btn-neon'){
                            e.preventDefault();
                            const email = sessionStorage.getItem('email');
                            if(email !== null){
                                const posicionSimbolo = e.currentTarget.children[0].children[1].children[2].innerHTML.indexOf('$');
                                const precioJuego = (e.currentTarget.children[0].children[1].children[2].innerHTML === 'Free to play') ? 0 : parseFloat(e.currentTarget.children[0].children[1].children[2].innerHTML.substring(posicionSimbolo + 2));
                                let objGame = {id: game.id, nombre: game.name, quan: 1, image: game.background_image, price: precioJuego};
    
                                let games = sessionStorage.getItem('games');
                                if(games !== null){
                                    const arrayConvertido = JSON.parse(games);
                                    const objEncontrado = arrayConvertido.find(juego => juego.id === game.id);
    
                                    if (objEncontrado) {
                                        const indexEncontrado = arrayConvertido.findIndex(juego => juego.id === game.id);
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
                        }
                    });
                });
            })
            .catch(error => console.error('Error searching games:', error));
    });
    
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
            '.popover-body': `<div class='container-carrito'>${carritoContainer}</div><a class='btn btn-neon' href='./pages/carrito.html'>Ver el carrito</a>`
        });

    }
}

