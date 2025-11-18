// Blog Category Filter - AODA Compliant
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.category-filter');
    const blogCards = document.querySelectorAll('.blog-card');
    const noPostsMessage = document.querySelector('.no-posts');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter blog posts
            let visibleCount = 0;

            blogCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');

                if (category === 'all' || cardCategories.includes(category)) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide "no posts" message
            if (visibleCount === 0) {
                noPostsMessage.style.display = 'block';
            } else {
                noPostsMessage.style.display = 'none';
            }
        });

        // Keyboard accessibility
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});
