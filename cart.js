document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(productId => {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(res => res.json())
            .then(product => { 
                const cartItem = document.createElement('div');
                cartItem.classList.add('card', 'mb-3');

                cartItem.innerHTML = `
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${product.image}" class="card-img" alt="${product.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">Price: $${product.price}</p>
                                <button class="btn btn-danger remove-from-cart" data-id="${product.id}">Remove</button>
                            </div>
                        </div>
                    </div>
                `;

                cartItemsContainer.appendChild(cartItem);

                const removeButtons = cartItem.querySelectorAll('.remove-from-cart');
                removeButtons.forEach(button => {
                    button.addEventListener('click', (event) => {
                        const productIdToRemove = event.target.dataset.id;
                        if (confirm("Are you sure you want to remove this product?")) {
                            cart = cart.filter(id => id !== productIdToRemove);
                            localStorage.setItem('cart', JSON.stringify(cart));
                            cartItem.remove();

                            if (cart.length === 0) {
                                cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
                            }
                        }
                    });
                });

            }) 
            .catch(error => {
                console.error("Error fetching product details:", error);
                const errorMessage = document.createElement('p');
                errorMessage.textContent = "Error loading product details. Please try again later.";
                cartItemsContainer.appendChild(errorMessage);
            });
    });
});