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

                gameCard.innerHTML = `
                    <div class="card">
                        <img src="${game.background_image}" class="card-img-top" alt="${game.name}">
                        <div class="card-body">
                            <h5 class="card-title">${game.name}</h5>
                            <p class="card-text">Fecha de lanzamiento: ${game.released}</p>
                            <div class="btn-group">
                                <a href="#" class="btn btn-neon">Comprar</a>
                                <a href="detalle.html?id=${game.id}" class="btn btn-neon">Detalle del juego</a>
                            </div>
                        </div>
                    </div>
                `;

                searchResults.appendChild(gameCard);
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

                    gameCard.innerHTML = `
                        <div class="card">
                            <img src="${game.background_image}" class="card-img-top" alt="${game.name}">
                            <div class="card-body">
                                <h5 class="card-title">${game.name}</h5>
                                <p class="card-text">Fecha de lanzamiento: ${game.released}</p>
                                <div class="btn-group">
                                    <a href="#" class="btn btn-neon">Comprar</a>
                                    <a href="#" class="btn btn-neon">Detalle del juego</a>
                                </div>
                            </div>
                        </div>
                    `;

                    searchResults.appendChild(gameCard);
                });
            })
            .catch(error => console.error('Error searching games:', error));
    });
});
