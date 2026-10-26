/* =====================================
   SHEILATTE
   script.js
===================================== */

// =====================
// IMAGE PATH
// =====================


const path = window.location.pathname;

const isNestedPage = /\/(menu|tentang|kontak)\/?$/.test(path);

const imagePath = (filename) => {
    return `${isNestedPage ? "../" : ""}assets/images/${filename}`;
};

// =====================
// Navbar Scroll
// =====================
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 60);
});

// =====================
// Mobile Menu
// =====================
const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuBtn.innerHTML = navMenu.classList.contains("active")
        ? '<i class="fas fa-xmark"></i>'
        : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// =====================
// Active Navbar
// =====================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
});

// =====================
// Scroll Reveal
// =====================
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
}, { threshold: 0.15 });

function observeReveal(elements) {
    elements.forEach((element) => {
        element.classList.add("hidden");
        observer.observe(element);
    });
}

observeReveal(document.querySelectorAll(
    ".hero-text,.hero-image,.about-image,.about-text,.promo-box,.contact-grid div"
));

// =====================
// Back To Top Button
// =====================
const topButton = document.createElement("button");
topButton.innerHTML = "↑";
topButton.id = "topButton";
topButton.setAttribute("aria-label", "Kembali ke atas");
document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
    topButton.classList.toggle("showTop", window.scrollY > 500);
});

topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// =====================
// Hero Parallax
// =====================
const heroImage = document.querySelector(".hero-image img");

if (heroImage) {
    window.addEventListener("scroll", () => {
        heroImage.style.transform =
            `translateY(${window.scrollY * 0.15}px)`;
    });
}
// =====================
// Product Data & Menu
// =====================
const products = [
    {
        id: 1, name: "Sheilatte Signature", category: "Kopi", price: "Rp32.000",
       bestSeller: true,
        image: imagePath("sheilatte.webp"), description: "Espresso + Fresh Milk + Secret Cream",
        details: "Racikan khas Sheilatte yang memadukan espresso pilihan, fresh milk, dan secret cream lembut untuk menghasilkan kopi susu yang creamy dan istimewa.",
        ingredients: ["Double Shot Espresso", "Fresh Milk", "Secret Cream Sheilatte"],
        taste: "Creamy dan lembut, rasa kopi seimbang dengan manis ringan, serta aftertaste milky yang nyaman.",
        serving: "Paling nikmat disajikan dingin untuk menemani waktu santai atau memulai hari."
    },
    {
        id: 2, name: "Caramel Latte", category: "Kopi", price: "Rp30.000",
       bestSeller: true,
        image: imagePath("caramel.jpg"), description: "Latte dengan saus caramel premium",
        details: "Perpaduan espresso, susu lembut, dan saus caramel premium yang menghadirkan rasa manis hangat dengan aroma kopi yang tetap terasa.",
        ingredients: ["Double Shot Espresso", "Fresh Milk", "Saus Caramel Premium"],
        taste: "Manis caramel yang lembut, tekstur creamy, dengan aroma kopi yang hangat.",
        serving: "Sajikan dingin atau hangat sebagai teman sore hari."
    },
    {
        id: 3, name: "Americano", category: "Kopi", price: "Rp24.000",
       bestSeller: true,
        image: imagePath("americano.jpeg"), description: "Espresso dengan cita rasa kuat",
        details: "Americano merupakan minuman kopi klasik yang dibuat dari espresso yang dipadukan dengan air panas. Minuman ini menghasilkan rasa kopi yang kuat, bersih, dan ringan untuk dinikmati kapan saja.",
        ingredients: ["Double Shot Espresso", "Air Panas", "100% Arabica Coffee Beans"],
        taste: "Aroma kopi kuat, sedikit pahit, sentuhan dark chocolate, dan aftertaste bersih.",
        serving: "Nikmati tanpa gula saat pagi atau ketika membutuhkan fokus."
    },
    {
        id: 4, name: "Cappuccino", category: "Kopi", price: "Rp30.000",
       bestSeller: true,
        image: imagePath("cappuccino.jpg"), description: "Espresso dengan steamed milk dan foam lembut",
        details: "Cappuccino klasik dengan keseimbangan espresso, steamed milk, dan foam susu lembut yang membuat setiap tegukan terasa hangat dan nyaman.",
        ingredients: ["Double Shot Espresso", "Steamed Milk", "Milk Foam"],
        taste: "Kopi terasa jelas dengan tekstur foam ringan dan creamy.",
        serving: "Sangat cocok disajikan hangat bersama pastry favorit."
    },
   {
    id: 5,
    name: "Hazelnut Latte",
    category: "Kopi",
    price: "Rp32.000",
    bestSeller: false,
   image: imagePath("hazelnut-latte.jpg"),

    description:
        "Latte creamy dengan aroma hazelnut",

    details:
        "Perpaduan espresso pilihan, fresh milk, dan hazelnut syrup yang menghasilkan rasa kopi creamy dengan aroma kacang hazelnut yang lembut.",

    ingredients: [
        "Double Shot Espresso",
        "Fresh Milk",
        "Hazelnut Syrup"
    ],

    taste:
        "Creamy, manis lembut, dengan aroma hazelnut yang khas.",

    serving:
        "Nikmat disajikan dingin maupun hangat."
},

{
    id: 6,
    name: "Vanilla Latte",
    category: "Kopi",
    price: "Rp31.000",
    bestSeller: false,

    image: imagePath("vanilla-latte.jpg"),

    description:
        "Latte lembut dengan sentuhan vanilla",

    details:
        "Espresso dan fresh milk dipadukan dengan vanilla syrup untuk menciptakan minuman kopi yang lembut, creamy, dan harum.",

    ingredients: [
        "Double Shot Espresso",
        "Fresh Milk",
        "Vanilla Syrup"
    ],

    taste:
        "Lembut, creamy, sedikit manis, dengan aroma vanilla yang harum.",

    serving:
        "Cocok dinikmati dingin untuk menemani aktivitas sehari-hari."
},

{
    id: 7,
    name: "Mocha Latte",
    category: "Kopi",
    price: "Rp32.000",
    bestSeller: false,

    image: imagePath("mocha-latte.jpg"),

    description:
        "Perpaduan kopi dan cokelat yang creamy",

    details:
        "Espresso, fresh milk, dan cokelat premium berpadu menghasilkan rasa kopi cokelat yang kaya namun tetap lembut.",

    ingredients: [
        "Double Shot Espresso",
        "Fresh Milk",
        "Chocolate Sauce"
    ],

    taste:
        "Rasa kopi dan cokelat seimbang dengan tekstur creamy.",

    serving:
        "Nikmat disajikan dingin dengan tambahan whipped cream."
},

{
    id: 8,
    name: "Matcha Latte",
    category: "Non-Kopi",
    price: "Rp30.000",
    bestSeller: false,

    image: imagePath("matcha-latte.jpeg"),

    description:
        "Matcha premium dengan fresh milk",

    details:
        "Matcha pilihan yang dipadukan dengan fresh milk menghasilkan minuman creamy dengan karakter rasa matcha yang khas.",

    ingredients: [
        "Premium Matcha",
        "Fresh Milk",
        "Simple Syrup"
    ],

    taste:
        "Creamy, sedikit earthy, dengan rasa matcha yang lembut.",

    serving:
        "Paling nikmat disajikan dingin."
},

{
    id: 9,
    name: "Chocolate Latte",
    category: "Non-Kopi",
    price: "Rp29.000",
    bestSeller: false,

    image: imagePath("chocolate-latte.jpg"),

    description:
        "Cokelat creamy dengan fresh milk",

    details:
        "Minuman cokelat dengan perpaduan chocolate sauce dan fresh milk yang menghasilkan rasa manis dan creamy.",

    ingredients: [
        "Premium Chocolate",
        "Fresh Milk",
        "Chocolate Sauce"
    ],

    taste:
        "Cokelat terasa kaya, manis, creamy, dan nyaman diminum.",

    serving:
        "Cocok disajikan dingin maupun hangat."
},

{
    id: 10,
    name: "Taro Latte",
    category: "Non-Kopi",
    price: "Rp29.000",
    bestSeller: false,

    image: imagePath("taro-latte.jpg"),

    description:
        "Taro creamy dengan rasa manis lembut",

    details:
        "Taro powder yang creamy dipadukan dengan fresh milk untuk menghasilkan minuman dengan aroma dan rasa taro yang khas.",

    ingredients: [
        "Premium Taro Powder",
        "Fresh Milk",
        "Simple Syrup"
    ],

    taste:
        "Manis lembut, creamy, dengan aroma taro yang khas.",

    serving:
        "Nikmat disajikan dingin dengan es."
},

{
    id: 11,
    name: "Lemon Tea",
    category: "Tea",
    price: "Rp22.000",
    bestSeller: false,

    image: imagePath("lemon-tea.jpg"),

    description:
        "Teh segar dengan perasan lemon",

    details:
        "Teh pilihan dengan perpaduan lemon segar yang memberikan rasa ringan dan menyegarkan.",

    ingredients: [
        "Premium Tea",
        "Fresh Lemon",
        "Simple Syrup"
    ],

    taste:
        "Segar, sedikit asam, manis ringan, dengan aroma lemon.",

    serving:
        "Sangat cocok disajikan dingin dengan es."
},

{
    id: 12,
    name: "Lychee Tea",
    category: "Tea",
    price: "Rp24.000",
    bestSeller: false,

    image: imagePath("lychee-tea.jpg"),

    description:
        "Teh segar dengan aroma buah lychee",

    details:
        "Teh pilihan yang dipadukan dengan rasa lychee untuk menghasilkan minuman yang ringan, fruity, dan menyegarkan.",

    ingredients: [
        "Premium Tea",
        "Lychee Syrup",
        "Lychee Fruit"
    ],

    taste:
        "Manis, fruity, ringan, dengan aroma lychee yang segar.",

    serving:
        "Paling nikmat disajikan dingin."
},

{
    id: 13,
    name: "Peach Tea",
    category: "Tea",
    price: "Rp24.000",
    bestSeller: false,

    image: imagePath("peach-tea.jpg"),

    description:
        "Teh dengan rasa peach yang menyegarkan",

    details:
        "Teh pilihan dengan perpaduan peach yang memberikan rasa fruity dan aroma buah yang menyegarkan.",

    ingredients: [
        "Premium Tea",
        "Peach Syrup",
        "Fresh Peach"
    ],

    taste:
        "Manis ringan, fruity, dan menyegarkan.",

    serving:
        "Disajikan dingin dengan es agar lebih segar."
},

{
    id: 14,
    name: "Butter Croissant",
    category: "Snack",
    price: "Rp20.000",
    bestSeller: false,

    image: imagePath("butter-croissant.jpg"),

    description:
        "Croissant renyah dengan aroma butter",

    details:
        "Croissant dengan tekstur luar yang renyah dan bagian dalam yang lembut dengan aroma butter yang khas.",

    ingredients: [
        "Premium Flour",
        "Butter",
        "Milk"
    ],

    taste:
        "Gurih, buttery, renyah di luar dan lembut di dalam.",

    serving:
        "Sangat cocok sebagai teman kopi di pagi atau sore hari."
},

{
    id: 15,
    name: "Chocolate Cake",
    category: "Snack",
    price: "Rp18.000",
    bestSeller: false,

    image: imagePath("chocolate-cake.jpg"),

    description:
        "Cake lembut dengan topping cokelat",

    details:
        "Chocolate Cake dengan tekstur lembut dengan lapisan cokelat yang manis dan cocok dipadukan dengan berbagai minuman Sheilatte.",

    ingredients: [
        "Premium Flour",
        "Milk",
        "Chocolate"
    ],

    taste:
        "Lembut, manis, dengan rasa cokelat yang kaya.",

    serving:
        "Cocok dinikmati bersama Latte atau Cappuccino."
},
{
    id: 16,
    name: "Waffle",
    category: "Snack",
    price: "Rp18.000",
    bestSeller: false,

    image: imagePath("waffle.jpg"),

    description:
        "Waffle lembut dengan topping eskrim dan buah strawberi",

    details:
        "Waffle dengan tekstur lembut dengan es krim yang manis dan cocok dipadukan dengan berbagai minuman Sheilatte.",

    ingredients: [
        "Premium Flour",
        "Milk",
        "Vanilla"
    ],

    taste:
        "Lembut, manis, dengan rasa manis yang kaya.",

    serving:
        "Cocok dinikmati bersama Latte atau Cappuccino."

  } 
];


const productGrid = document.getElementById("productGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
let activeFilter = "Semua";

const CART_KEY = "sheilatteCart";
const OAT_SIDE_PRICE = 5000;

let cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
let selectedProduct = null;

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
}

function formatRupiah(amount) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(amount);
}

function parsePrice(price) {
    return Number(String(price).replace(/[^\d]/g, "")) || 0;
}

function getItemPrice(item) {
    return item.price + (item.milk === "Oat Side" ? OAT_SIDE_PRICE : 0);
}

function renderProducts(category = activeFilter) {
    if (!productGrid) return;

    activeFilter = category;

    const showAllProducts =
        document.querySelector(".menu-filters") !== null;

    const visibleProducts = showAllProducts
        ? (
            category === "Semua"
                ? products
                : products.filter((product) => product.category === category)
        )
        : products.filter((product) => product.bestSeller === true);

    productGrid.innerHTML = visibleProducts
        .map(productCardTemplate)
        .join("");

    observeReveal(productGrid.querySelectorAll(".product-card"));
    bindAddToCartButtons();
}

function bindAddToCartButtons() {
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const product = products.find(
                (item) => item.id === Number(button.dataset.productId)
            );

            if (product) openCustomization(product);
        });
    });
}

// Membuat modal pemilihan modifikasi
const customizationModal = document.createElement("div");
customizationModal.id = "customizationModal";
customizationModal.className = "order-modal";
customizationModal.hidden = true;

customizationModal.innerHTML = `
    <div class="order-modal-box" role="dialog"
        aria-modal="true" aria-labelledby="orderModalTitle">

        <button class="modal-close" type="button"
            aria-label="Tutup">&times;</button>

        <h2 id="orderModalTitle">Sesuaikan Pesanan</h2>
        <p id="customProductDescription"></p>

        <form id="customizationForm">
            <div id="sugarOptions" class="option-group">
                <label for="sugarChoice">Tingkat gula</label>
                <select id="sugarChoice">
                    <option value="Normal Sugar">Normal Sugar</option>
                    <option value="Less Sugar">Less Sugar</option>
                    <option value="No Sugar">No Sugar</option>
                </select>
            </div>

            <div id="iceOptions" class="option-group">
                <label for="iceChoice">Pilihan es</label>
                <select id="iceChoice">
                    <option value="Normal Ice">Normal Ice</option>
                    <option value="Less Ice">Less Ice</option>
                    <option value="No Ice">No Ice</option>
                </select>
            </div>

            <div id="blendOptions" class="option-group">
                <label for="blendChoice">Penyajian</label>
                <select id="blendChoice">
                    <option value="Regular">Regular</option>
                    <option value="Blend">Blend</option>
                </select>
            </div>

            <div id="milkOptions" class="option-group">
                <label for="milkChoice">Pilihan susu</label>
                <select id="milkChoice">
                    <option value="Regular Milk">Regular Milk</option>
                    <option value="Oat Side">Oat Side (+Rp5.000)</option>
                </select>
            </div>

            <div class="option-group">
                <label for="orderQuantity">Jumlah</label>
                <input id="orderQuantity" type="number"
                    min="1" max="99" value="1" required>
            </div>

            <p id="customPrice" class="custom-price"></p>

            <button class="btn add-confirm-btn" type="submit">
                Masukkan ke Keranjang
            </button>
        </form>
    </div>
`;

document.body.appendChild(customizationModal);

const customizationForm =
    document.getElementById("customizationForm");

function openCustomization(product) {
    selectedProduct = product;

    document.getElementById("orderModalTitle").textContent = product.name;
    document.getElementById("customProductDescription").textContent =
        product.description;

    const isDrink = ["Kopi", "Non-Kopi", "Tea"].includes(product.category);
    const isCoffee = product.category === "Kopi";
    const isTea = product.category === "Tea";

    document.getElementById("sugarOptions").hidden = !isDrink;
    document.getElementById("iceOptions").hidden = !isDrink;
    document.getElementById("blendOptions").hidden = !isCoffee;
    document.getElementById("milkOptions").hidden = !isCoffee && !isTea && !isDrink;

    // Reset pilihan setiap kali produk baru dipilih.
    customizationForm.reset();

    document.getElementById("customPrice").textContent =
        `Harga: ${formatRupiah(parsePrice(product.price))}`;

    customizationModal.hidden = false;
    document.body.classList.add("modal-open");
}

function closeCustomization() {
    customizationModal.hidden = true;
    document.body.classList.remove("modal-open");
    selectedProduct = null;
}

customizationModal.querySelector(".modal-close")
    .addEventListener("click", closeCustomization);

customizationModal.addEventListener("click", (event) => {
    if (event.target === customizationModal) closeCustomization();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !customizationModal.hidden) {
        closeCustomization();
    }
});

document.getElementById("milkChoice").addEventListener("change", () => {
    if (!selectedProduct) return;

    const basePrice = parsePrice(selectedProduct.price);
    const extra = document.getElementById("milkChoice").value === "Oat Side"
        ? OAT_SIDE_PRICE
        : 0;

    document.getElementById("customPrice").textContent =
        `Harga per item: ${formatRupiah(basePrice + extra)}`;
});

customizationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!selectedProduct) return;

    const quantity = Math.min(
        99,
        Math.max(1, Number(document.getElementById("orderQuantity").value) || 1)
    );

    const isDrink = ["Kopi", "Non-Kopi", "Tea"].includes(selectedProduct.category);
    const isCoffee = selectedProduct.category === "Kopi";

    const options = {
        sugar: isDrink
            ? document.getElementById("sugarChoice").value
            : "-",
        ice: isDrink
            ? document.getElementById("iceChoice").value
            : "-",
        serving: isCoffee
            ? document.getElementById("blendChoice").value
            : "Regular",
        milk: isDrink
            ? document.getElementById("milkChoice").value
            : "-",
    };

    const itemKey = [
        selectedProduct.id,
        options.sugar,
        options.ice,
        options.serving,
        options.milk
    ].join("|");

    const existing = cart.find((item) => item.key === itemKey);

    if (existing) {
        existing.quantity = Math.min(99, existing.quantity + quantity);
    } else {
        cart.push({
            key: itemKey,
            id: selectedProduct.id,
            name: selectedProduct.name,
            image: selectedProduct.image,
            price: parsePrice(selectedProduct.price),
            quantity,
            ...options
        });
    }

    saveCart();
    closeCustomization();
    showCartMessage(`${selectedProduct.name} ditambahkan ke keranjang.`);
});

// Membuat keranjang mengambang di kanan bawah
const cartWidget = document.createElement("aside");
cartWidget.id = "cartWidget";
cartWidget.className = "cart-widget";

cartWidget.innerHTML = `
    <button id="cartToggle" class="cart-toggle" type="button"
        aria-expanded="false">
        <i class="fas fa-shopping-cart"></i>
        Keranjang (<span id="cartCount">0</span>)
        <span id="cartTotalShort"></span>
    </button>

    <div id="cartPanel" class="cart-panel" hidden>
        <div class="cart-panel-heading">
            <h2>Keranjang Saya</h2>
            <button id="cartClose" type="button" aria-label="Tutup keranjang">
                &times;
            </button>
        </div>

        <div id="cartItems"></div>

        <div class="cart-total-row">
            <span>Total</span>
            <strong id="cartTotal">Rp0</strong>
        </div>

        <button id="checkoutButton" class="btn checkout-btn" type="button">
            Lanjut ke Pembayaran
        </button>
    </div>
`;

document.body.appendChild(cartWidget);

function showCartMessage(message) {
    let notice = document.getElementById("cartNotice");

    if (!notice) {
        notice = document.createElement("div");
        notice.id = "cartNotice";
        notice.className = "cart-notice";
        document.body.appendChild(notice);
    }

    notice.textContent = message;
    notice.classList.add("visible");

    window.clearTimeout(notice._timer);
    notice._timer = window.setTimeout(() => {
        notice.classList.remove("visible");
    }, 2200);
}

function renderCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce(
        (sum, item) => sum + getItemPrice(item) * item.quantity,
        0
    );

    document.getElementById("cartCount").textContent = count;
    document.getElementById("cartTotalShort").textContent =
        formatRupiah(total);
    document.getElementById("cartTotal").textContent = formatRupiah(total);

    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Keranjang masih kosong.</p>';
    } else {
        cartItems.innerHTML = cart.map((item) => `
            <article class="cart-item">
                <div>
                    <strong>${escapeHTML(item.name)}</strong>
                    <small>${escapeHTML(item.sugar)} · ${escapeHTML(item.ice)}</small>
                    <small>${escapeHTML(item.serving)} · ${escapeHTML(item.milk)}</small>
                    <small>${formatRupiah(getItemPrice(item))} / item</small>
                    <div class="quantity-controls">
                        <button type="button" data-action="minus"
                            data-key="${escapeHTML(item.key)}">−</button>
                        <span>${item.quantity}</span>
                        <button type="button" data-action="plus"
                            data-key="${escapeHTML(item.key)}">+</button>
                        <button type="button" data-action="remove"
                            data-key="${escapeHTML(item.key)}">Hapus</button>
                    </div>
                </div>
                <strong>${formatRupiah(getItemPrice(item) * item.quantity)}</strong>
            </article>
        `).join("");
    }

    document.getElementById("checkoutButton").disabled = cart.length === 0;
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

document.getElementById("cartToggle").addEventListener("click", () => {
    const panel = document.getElementById("cartPanel");
    panel.hidden = !panel.hidden;

    document.getElementById("cartToggle").setAttribute(
        "aria-expanded",
        String(!panel.hidden)
    );
});

document.getElementById("cartClose").addEventListener("click", () => {
    document.getElementById("cartPanel").hidden = true;
    document.getElementById("cartToggle").setAttribute("aria-expanded", "false");
});

document.getElementById("cartItems").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const item = cart.find((entry) => entry.key === button.dataset.key);
    if (!item) return;

    if (button.dataset.action === "plus") item.quantity++;
    if (button.dataset.action === "minus") item.quantity--;
    if (button.dataset.action === "remove") {
        cart = cart.filter((entry) => entry.key !== item.key);
    }

    cart = cart.filter((entry) => entry.quantity > 0);
    saveCart();
});

document.getElementById("checkoutButton").addEventListener("click", () => {
    if (cart.length === 0) return;
    window.location.href = "../pembayaran/";
});

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;
        if (selectedFilter === activeFilter) return;

        filterButtons.forEach((filterButton) => {
            filterButton.classList.toggle(
                "active",
                filterButton === button
            );
        });

        renderProducts(selectedFilter);
    });
});

renderProducts();
renderCart();


filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;
        if (selectedFilter === activeFilter) return;

        filterButtons.forEach((filterButton) => {
            filterButton.classList.toggle("active", filterButton === button);
        });
        renderProducts(selectedFilter);
    });
});

renderProducts();

// =====================
// Button Ripple
// =====================

document.addEventListener("click", (event) => {

    const button = event.target.closest(
        ".btn, .card button, .filter-btn, .modal-close"
    );

    if (!button) return;

    // Jangan beri ripple pada tombol submit/form
    if (button.type === "submit") return;

    const oldRipple = button.querySelector(".ripple");

    if (oldRipple) {
        oldRipple.remove();
    }

    const circle = document.createElement("span");
    circle.className = "ripple";

    const rect = button.getBoundingClientRect();

    const diameter = Math.max(
        button.clientWidth,
        button.clientHeight
    );

    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;

    circle.style.left =
        `${event.clientX - rect.left - diameter / 2}px`;

    circle.style.top =
        `${event.clientY - rect.top - diameter / 2}px`;

    button.appendChild(circle);

    setTimeout(() => {
        circle.remove();
    }, 600);
});


// =====================
// Coffee Cursor Trail
// =====================
const trail = ["🫘", "☕", "🤎"];
let lastX = 0;
let lastY = 0;

document.addEventListener("mousemove", (event) => {
    const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
    if (distance < 50) return;

    lastX = event.clientX;
    lastY = event.clientY;
    createTrail(event.clientX, event.clientY);
});

function createTrail(x, y) {
    const element = document.createElement("span");
    element.className = "coffee-trail";
    element.textContent = trail[Math.floor(Math.random() * trail.length)];
    element.style.left = `${x + (Math.random() - 0.5) * 30}px`;
    element.style.top = `${y + (Math.random() - 0.5) * 20}px`;
    element.style.fontSize = `${16 + Math.random() * 6}px`;
    element.style.setProperty("--moveX", `${Math.random() * 80 - 40}px`);
    element.style.setProperty("--moveY", `${-60 - Math.random() * 60}px`);
    element.style.setProperty("--rotate", `${Math.random() * 60 - 30}deg`);
    document.body.appendChild(element);

    setTimeout(() => element.remove(), 900);
}

console.log("%c☕ Welcome to Sheilatte", "color:#8B5E3C;font-size:20px;font-weight:bold");
