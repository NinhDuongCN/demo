document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const textContent = card.querySelector('.card-name').innerHTML.toLowerCase();
        if (textContent.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
