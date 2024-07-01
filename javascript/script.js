document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault();

        let searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

        let cards = document.querySelectorAll('.card');

        // Ocultar todas las tarjetas
        cards.forEach(function(card) {
            card.style.display = 'none';
        });

        // Mostrar la tarjeta que coincide con el término de búsqueda
        cards.forEach(function(card) {
            let title = card.querySelector('.card-title').textContent.toLowerCase();

            if (title.includes(searchTerm)) {
                card.style.display = 'block';
                card.classList.add('text-center'); // Centrar la tarjeta encontrada
            }
        });
    });
});
