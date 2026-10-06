// Product data stored in JavaScript objects

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1299,
        emoji: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1999,
        emoji: "⌚"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 1599,
        emoji: "👟"
    },
    {
        id: 4,
        name: "Backpack",
        price: 899,
        emoji: "🎒"
    },
    {
        id: 5,
        name: "Mobile Phone",
        price: 12999,
        emoji: "📱"
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        price: 1499,
        emoji: "🔊"
    }
];

let cart = [];

// DOM elements

const productContainer =
    document.getElementById("productContainer");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const totalPrice =
    document.getElementById("totalPrice");

const checkoutBtn =
    document.getElementById("checkoutBtn");

const searchInput =
    document.getElementById("searchInput");


// Render products

function displayProducts(productList) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {
        productContainer.innerHTML =
            "<p>No products found.</p>";
        return;
    }

    productList.forEach(product => {

        const productCard =
            document.createElement("div");

        productCard.className = "product";

        productCard.innerHTML = `
            <div class="emoji">${product.emoji}</div>

            <h3>${product.name}</h3>

            <div class="price">
                ₹${product.price}
            </div>

            <button onclick="addToCart(${product.id})">
                🛒 Add to Cart
            </button>
        `;

        productContainer.appendChild(productCard);
    });
}


// Add product to cart

function addToCart(productId) {

    const product =
        products.find(item => item.id === productId);

    const existingItem =
        cart.find(item => item.id === productId);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}


// Update cart

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty">Your cart is empty.</p>';

        checkoutBtn.disabled = true;

    } else {

        checkoutBtn.disabled = false;

        cart.forEach(item => {

            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <div>
                    <strong>${item.emoji} ${item.name}</strong>
                    <br>
                    ₹${item.price} × ${item.quantity}
                </div>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${item.id})">
                        -
                    </button>

                    <strong>${item.quantity}</strong>

                    <button onclick="increaseQuantity(${item.id})">
                        +
                    </button>

                    <button
                        class="remove"
                        onclick="removeFromCart(${item.id})">
                        Remove
                    </button>

                </div>
            `;

            cartItems.appendChild(cartItem);
        });
    }

    updateCartSummary();
}


// Increase quantity

function increaseQuantity(productId) {

    const item =
        cart.find(product => product.id === productId);

    if (item) {
        item.quantity++;
    }

    updateCart();
}


// Decrease quantity

function decreaseQuantity(productId) {

    const item =
        cart.find(product => product.id === productId);

    if (!item) return;

    if (item.quantity > 1) {

        item.quantity--;

    } else {

        cart =
            cart.filter(product => product.id !== productId);
    }

    updateCart();
}


// Remove item

function removeFromCart(productId) {

    cart =
        cart.filter(product => product.id !== productId);

    updateCart();
}


// Cart count and total

function updateCartSummary() {

    let count = 0;
    let total = 0;

    cart.forEach(item => {

        count += item.quantity;

        total += item.price * item.quantity;
    });

    cartCount.textContent = count;

    totalPrice.textContent = total;
}


// Search products

searchInput.addEventListener("input", function () {

    const searchText =
        searchInput.value.toLowerCase();

    const filteredProducts =
        products.filter(product =>
            product.name
                .toLowerCase()
                .includes(searchText)
        );

    displayProducts(filteredProducts);
});


// Checkout modal

const checkoutModal =
    document.getElementById("checkoutModal");

const closeModal =
    document.getElementById("closeModal");

const checkoutDetails =
    document.getElementById("checkoutDetails");

const checkoutTotal =
    document.getElementById("checkoutTotal");


// Open checkout

checkoutBtn.addEventListener("click", function () {

    checkoutDetails.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        const checkoutItem =
            document.createElement("div");

        checkoutItem.className = "checkout-item";

        checkoutItem.innerHTML = `
            <span>
                ${item.emoji} ${item.name}
                × ${item.quantity}
            </span>

            <strong>
                ₹${itemTotal}
            </strong>
        `;

        checkoutDetails.appendChild(checkoutItem);
    });

    checkoutTotal.textContent = total;

    checkoutModal.style.display = "block";
});


// Close modal

closeModal.addEventListener("click", function () {

    checkoutModal.style.display = "none";
});


// Close modal when clicking outside

window.addEventListener("click", function (event) {

    if (event.target === checkoutModal) {

        checkoutModal.style.display = "none";
    }
});


// Place order

document
    .getElementById("placeOrderBtn")
    .addEventListener("click", function () {

        alert(
            "🎉 Order placed successfully!\nThank you for shopping with MiniShop."
        );

        cart = [];

        updateCart();

        checkoutModal.style.display = "none";
    });


// Initial display

displayProducts(products);

updateCart();
