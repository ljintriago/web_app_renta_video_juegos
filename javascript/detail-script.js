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
            })
            .catch(error => console.error('Error fetching game details:', error));
    } else {
        console.error('No game ID provided in URL');
    }
});
