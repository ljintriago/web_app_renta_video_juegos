document.addEventListener('DOMContentLoaded', function() {
    let cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        card.style.display = 'block';
    });

    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault();

        let searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

        if (searchTerm === "") {
            cards.forEach(function(card) {
                card.style.display = 'block';
                card.classList.remove('text-center');
            });
        } else {
            cards.forEach(function(card) {
                let title = card.querySelector('.card-title').textContent.toLowerCase();

                if (title.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.classList.add('text-center');
                } else {
                    card.style.display = 'none';
                }
            });
        }
    });
});
