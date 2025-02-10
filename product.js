document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');

    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('col-md-4', 'mb-4');

                productCard.innerHTML = `
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">$${product.price}</p>
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                `;
                productContainer.appendChild(productCard);
            });

            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = event.target.dataset.id;
                    addToCart(productId);
                });
            });
        });
});

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Product added to cart!");
}