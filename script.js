// Shopping cart functionality
let cart = [];
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeBtn = document.querySelector('.close');

// Add to Cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const product = event.target.closest('.product');
        const id = product.getAttribute('data-id');
        const name = product.getAttribute('data-name');
        const price = parseFloat(product.getAttribute('data-price'));

        // Check if item is already in cart
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        updateCart();
    });
});

// Update Cart
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.textContent = `${item.name} x ${item.quantity} - $${item.price * item.quantity}`;
        cartItems.appendChild(li);
    });

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
}

// Show Cart
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

// Close Cart
closeBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Close Cart when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});
