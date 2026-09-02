/* =====================================
   SHEILATTE
   script.js
===================================== */

// =====================
// IMAGE PATH
// =====================

const isMenuPage = window.location.pathname.includes("/menu/");

const imagePath = (filename) => {
    return `${isMenuPage ? "../" : ""}assets/images/${filename}`;
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
        image: "assets/images/sheilatte.webp", description: "Espresso + Fresh Milk + Secret Cream",
        details: "Racikan khas Sheilatte yang memadukan espresso pilihan, fresh milk, dan secret cream lembut untuk menghasilkan kopi susu yang creamy dan istimewa.",
        ingredients: ["Double Shot Espresso", "Fresh Milk", "Secret Cream Sheilatte"],
        taste: "Creamy dan lembut, rasa kopi seimbang dengan manis ringan, serta aftertaste milky yang nyaman.",
        serving: "Paling nikmat disajikan dingin untuk menemani waktu santai atau memulai hari."
    },
    {
        id: 2, name: "Caramel Latte", category: "Kopi", price: "Rp30.000",
       bestSeller: true,
        image: "assets/images/caramel.jpg", description: "Latte dengan saus caramel premium",
        details: "Perpaduan espresso, susu lembut, dan saus caramel premium yang menghadirkan rasa manis hangat dengan aroma kopi yang tetap terasa.",
        ingredients: ["Double Shot Espresso", "Fresh Milk", "Saus Caramel Premium"],
        taste: "Manis caramel yang lembut, tekstur creamy, dengan aroma kopi yang hangat.",
        serving: "Sajikan dingin atau hangat sebagai teman sore hari."
    },
    {
        id: 3, name: "Americano", category: "Kopi", price: "Rp24.000",
       bestSeller: true,
        image: "assets/images/americano.jpeg", description: "Espresso dengan cita rasa kuat",
        details: "Americano merupakan minuman kopi klasik yang dibuat dari espresso yang dipadukan dengan air panas. Minuman ini menghasilkan rasa kopi yang kuat, bersih, dan ringan untuk dinikmati kapan saja.",
        ingredients: ["Double Shot Espresso", "Air Panas", "100% Arabica Coffee Beans"],
        taste: "Aroma kopi kuat, sedikit pahit, sentuhan dark chocolate, dan aftertaste bersih.",
        serving: "Nikmati tanpa gula saat pagi atau ketika membutuhkan fokus."
    },
    {
        id: 4, name: "Cappuccino", category: "Kopi", price: "Rp30.000",
       bestSeller: true,
        image: "assets/images/cappuccino.jpg", description: "Espresso dengan steamed milk dan foam lembut",
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
    image: "assets/images/hazelnut-latte.jpg",

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

    image: "assets/images/vanilla-latte.jpg",

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

    image: "assets/images/mocha-latte.jpg",

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

    image: "assets/images/matcha-latte.jpeg",

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

    image: "assets/images/chocolate-latte.jpg",

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

    image: "assets/images/taro-latte.jpg",

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

    image: "assets/images/lemon-tea.jpg",

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

    image: "assets/images/lychee-tea.jpg",

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

    image: "assets/images/peach-tea.jpg",

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

    image: "assets/images/butter-croissant.jpg",

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

    image: "assets/images/chocolate-cake.jpg",

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
}
];

const productGrid = document.getElementById("productGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
let activeFilter = "Semua";

function productCardTemplate(product, index) {
    return `
        <article class="card product-card" style="animation-delay:${index * 45}ms">
            <div class="product-image-wrap">
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='assets/images/sheilatte.webp';">
            </div>
            <span class="category-badge">${product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span class="price">${product.price}</span>
            <button class="detail-btn" type="button" aria-expanded="false">Lihat Detail</button>
            <div class="detail-content">
                <h4>Tentang ${product.name}</h4>
                <p>${product.details}</p>
                <h4>Komposisi</h4>
                ${detailList(product.ingredients)}
                <h4>Karakter Rasa</h4>
                <p>${product.taste}</p>
                <h4>Rekomendasi Penyajian</h4>
                <p>${product.serving}</p>
                <button class="detail-btn close-detail-btn" type="button">Tutup Detail</button>
            </div>
        </article>`;
}

function renderProducts(category = activeFilter) {

    if (!productGrid) return;

    activeFilter = category;


    // =========================================
    // CEK HALAMAN
    // =========================================

    const isMenuPage =
        window.location.pathname.includes("/menu/");


    // =========================================
    // TENTUKAN PRODUK YANG AKAN DITAMPILKAN
    // =========================================

    let visibleProducts;


    if (isMenuPage) {

        /*
         * HALAMAN MENU
         *
         * Menampilkan SEMUA produk.
         * Filter kategori tetap berlaku.
         */

        visibleProducts =
            category === "Semua"

                ? products

                : products.filter(
                    (product) =>
                        product.category === category
                );

    } else {

        /*
         * HALAMAN HOME
         *
         * Hanya menampilkan Best Seller.
         */

        visibleProducts =
            products.filter(
                (product) =>
                    product.bestSeller === true
            );

    }


    // =========================================
    // TAMPILKAN PRODUK
    // =========================================

    productGrid.innerHTML =
        visibleProducts
            .map(productCardTemplate)
            .join("");


    // =========================================
    // ANIMASI
    // =========================================

    observeReveal(
        productGrid.querySelectorAll(
            ".product-card"
        )
    );


    // =========================================
    // DETAIL BUTTON
    // =========================================

    bindDetailButtons();

}
function detailList(items) {
    return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function bindDetailButtons() {
    productGrid.querySelectorAll(".detail-btn").forEach((button) => {
        button.addEventListener("click", function () {
            const card = this.closest(".card");
            const detail = card.querySelector(".detail-content");
            const isCloseButton = this.classList.contains("close-detail-btn");
            const isOpen = isCloseButton
                ? false
                : detail.classList.toggle("active-detail");

            if (isCloseButton) detail.classList.remove("active-detail");

            const openButton = card.querySelector(".detail-btn:not(.close-detail-btn)");
            openButton.hidden = isOpen;
            openButton.textContent = "Lihat Detail";
            openButton.setAttribute("aria-expanded", String(isOpen));
        });
    });
}

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
    const button = event.target.closest(".btn,.card button,.filter-btn,.modal-close");
    if (!button) return;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const rect = button.getBoundingClientRect();

    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - diameter / 2}px`;
    circle.style.top = `${event.clientY - rect.top - diameter / 2}px`;
    circle.classList.add("ripple");
    button.querySelector(".ripple")?.remove();
    button.appendChild(circle);
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
