const API_BASE_URL = 'https://fakestoreapi.com';

async function getAllProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
}

async function getProductCategories() {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    return response.json();
}

async function getProductsByCategory(category) {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    return response.json();
}
