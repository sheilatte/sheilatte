/* =====================================
   SHEILATTE
   script.js - FINAL VERSION
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       PAGE DETECTION
    ===================================== */

    const currentPath = window.location.pathname;

    const isMenuPage =
        currentPath.includes("/menu/") ||
        currentPath.endsWith("/menu");



    /* =====================================
       NAVBAR
    ===================================== */

    const header = document.getElementById("header");
    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".nav-menu");


    // Navbar scroll effect

    if (header) {

        window.addEventListener("scroll", () => {

            header.classList.toggle(
                "scrolled",
                window.scrollY > 60
            );

        });

    }


    // Mobile menu

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            menuBtn.innerHTML =
                navMenu.classList.contains("active")
                    ? '<i class="fas fa-xmark"></i>'
                    : '<i class="fas fa-bars"></i>';

        });


        // Close mobile menu after clicking link

        navMenu
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener("click", () => {

                    navMenu.classList.remove("active");

                    menuBtn.innerHTML =
                        '<i class="fas fa-bars"></i>';

                });

            });

    }



    /* =====================================
       ACTIVE NAVBAR
    ===================================== */

    const sections =
        document.querySelectorAll("section");

    const navLinks =
        document.querySelectorAll(".nav-menu a");


    function updateActiveNavbar() {

        /*
         * HALAMAN MENU
         *
         * Menu selalu aktif.
         */

        if (isMenuPage) {

            navLinks.forEach((link) => {

                const href =
                    link.getAttribute("href") || "";

                const isMenuLink =
                    href === "index.html" ||
                    href === "./" ||
                    href === "#menu";

                link.classList.toggle(
                    "active",
                    isMenuLink
                );

            });

            return;
        }


        /*
         * HALAMAN HOME
         */

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >= sectionTop
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            const href =
                link.getAttribute("href") || "";


            /*
             * Hanya link section Home
             * yang menggunakan #.
             */

            if (href.startsWith("#")) {

                link.classList.toggle(
                    "active",
                    href === `#${currentSection}`
                );

            } else {

                /*
                 * Link ke halaman Menu
                 * jangan dianggap sebagai
                 * active section di Home.
                 */

                link.classList.remove("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavbar
    );

    updateActiveNavbar();



    /* =====================================
       SCROLL REVEAL
    ===================================== */

    let revealObserver = null;


    if ("IntersectionObserver" in window) {

        revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "show"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

    }


    function observeReveal(elements) {

        if (!elements) return;


        elements.forEach((element) => {

            element.classList.add("hidden");


            if (revealObserver) {

                revealObserver.observe(element);

            } else {

                /*
                 * Fallback jika browser
                 * tidak mendukung IntersectionObserver.
                 */

                element.classList.add("show");

            }

        });

    }



    /* =====================================
       INITIAL REVEAL ELEMENTS
    ===================================== */

    observeReveal(
        document.querySelectorAll(
            ".hero-text, \
             .hero-image, \
             .about-image, \
             .about-text, \
             .promo-box, \
             .contact-grid div"
        )
    );



    /* =====================================
       BACK TO TOP
    ===================================== */

    const topButton =
        document.createElement("button");

    topButton.innerHTML = "↑";

    topButton.id = "topButton";

    topButton.setAttribute(
        "aria-label",
        "Kembali ke atas"
    );

    document.body.appendChild(topButton);


    window.addEventListener("scroll", () => {

        topButton.classList.toggle(
            "showTop",
            window.scrollY > 500
        );

    });


    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );



    /* =====================================
       HERO PARALLAX
    ===================================== */

    const heroImage =
        document.querySelector(
            ".hero-image img"
        );


    /*
     * Hanya dijalankan jika
     * hero image memang ada.
     *
     * Ini penting karena halaman
     * menu tidak memiliki hero-image.
     */

    if (heroImage) {

        window.addEventListener(
            "scroll",
            () => {

                heroImage.style.transform =
                    `translateY(${window.scrollY * 0.15}px)`;

            }
        );

    }



    /* =====================================
       PRODUCT DATA
    ===================================== */

    const products = [

        /* =================================
           BEST SELLER 1
        ================================= */

        {
            id: 1,

            name: "Sheilatte Signature",

            category: "Kopi",

            price: "Rp32.000",

            bestSeller: true,

            image:
                "assets/images/sheilatte.webp",

            description:
                "Espresso + Fresh Milk + Secret Cream",

            details:
                "Racikan khas Sheilatte yang memadukan espresso pilihan, fresh milk, dan secret cream lembut untuk menghasilkan kopi susu yang creamy dan istimewa.",

            ingredients: [
                "Double Shot Espresso",
                "Fresh Milk",
                "Secret Cream Sheilatte"
            ],

            taste:
                "Creamy dan lembut, rasa kopi seimbang dengan manis ringan, serta aftertaste milky yang nyaman.",

            serving:
                "Paling nikmat disajikan dingin untuk menemani waktu santai atau memulai hari."
        },


        /* =================================
           BEST SELLER 2
        ================================= */

        {
            id: 2,

            name: "Caramel Latte",

            category: "Kopi",

            price: "Rp30.000",

            bestSeller: true,

            image:
                "assets/images/caramel.jpg",

            description:
                "Latte dengan saus caramel premium",

            details:
                "Perpaduan espresso, susu lembut, dan saus caramel premium yang menghadirkan rasa manis hangat dengan aroma kopi yang tetap terasa.",

            ingredients: [
                "Double Shot Espresso",
                "Fresh Milk",
                "Saus Caramel Premium"
            ],

            taste:
                "Manis caramel yang lembut, tekstur creamy, dengan aroma kopi yang hangat.",

            serving:
                "Sajikan dingin atau hangat sebagai teman sore hari."
        },


        /* =================================
           BEST SELLER 3
        ================================= */

        {
            id: 3,

            name: "Americano",

            category: "Kopi",

            price: "Rp24.000",

            bestSeller: true,

            image:
                "assets/images/americano.jpeg",

            description:
                "Espresso dengan cita rasa kuat",

            details:
                "Americano merupakan minuman kopi klasik yang dibuat dari espresso yang dipadukan dengan air panas. Minuman ini menghasilkan rasa kopi yang kuat, bersih, dan ringan untuk dinikmati kapan saja.",

            ingredients: [
                "Double Shot Espresso",
                "Air Panas",
                "100% Arabica Coffee Beans"
            ],

            taste:
                "Aroma kopi kuat, sedikit pahit, sentuhan dark chocolate, dan aftertaste bersih.",

            serving:
                "Nikmati tanpa gula saat pagi atau ketika membutuhkan fokus."
        },


        /* =================================
           BEST SELLER 4
        ================================= */

        {
            id: 4,

            name: "Cappuccino",

            category: "Kopi",

            price: "Rp30.000",

            bestSeller: true,

            image:
                "assets/images/cappuccino.jpg",

            description:
                "Espresso dengan steamed milk dan foam lembut",

            details:
                "Cappuccino klasik dengan keseimbangan espresso, steamed milk, dan foam susu lembut yang membuat setiap tegukan terasa hangat dan nyaman.",

            ingredients: [
                "Double Shot Espresso",
                "Steamed Milk",
                "Milk Foam"
            ],

            taste:
                "Kopi terasa jelas dengan tekstur foam ringan dan creamy.",

            serving:
                "Sangat cocok disajikan hangat bersama pastry favorit."
        },


        /* =================================
           MENU 5
        ================================= */

        {
            id: 5,

            name: "Hazelnut Latte",

            category: "Kopi",

            price: "Rp32.000",

            bestSeller: false,

            image:
                "assets/images/hazelnut-latte.jpg",

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


        /* =================================
           MENU 6
        ================================= */

        {
            id: 6,

            name: "Vanilla Latte",

            category: "Kopi",

            price: "Rp31.000",

            bestSeller: false,

            image:
                "assets/images/vanilla-latte.jpg",

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


        /* =================================
           MENU 7
        ================================= */

        {
            id: 7,

            name: "Mocha Latte",

            category: "Kopi",

            price: "Rp32.000",

            bestSeller: false,

            image:
                "assets/images/mocha-latte.jpg",

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


        /* =================================
           MENU 8
        ================================= */

        {
            id: 8,

            name: "Matcha Latte",

            category: "Non-Kopi",

            price: "Rp30.000",

            bestSeller: false,

            image:
                "assets/images/matcha-latte.jpg",

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


        /* =================================
           MENU 9
        ================================= */

        {
            id: 9,

            name: "Chocolate Latte",

            category: "Non-Kopi",

            price: "Rp29.000",

            bestSeller: false,

            image:
                "assets/images/chocolate-latte.jpg",

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


        /* =================================
           MENU 10
        ================================= */

        {
            id: 10,

            name: "Taro Latte",

            category: "Non-Kopi",

            price: "Rp29.000",

            bestSeller: false,

            image:
                "assets/images/taro-latte.jpg",

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


        /* =================================
           MENU 11
        ================================= */

        {
            id: 11,

            name: "Lemon Tea",

            category: "Tea",

            price: "Rp22.000",

            bestSeller: false,

            image:
                "assets/images/lemon-tea.jpg",

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


        /* =================================
           MENU 12
        ================================= */

        {
            id: 12,

            name: "Lychee Tea",

            category: "Tea",

            price: "Rp24.000",

            bestSeller: false,

            image:
                "assets/images/lychee-tea.jpg",

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


        /* =================================
           MENU 13
        ================================= */

        {
            id: 13,

            name: "Peach Tea",

            category: "Tea",

            price: "Rp24.000",

            bestSeller: false,

            image:
                "assets/images/peach-tea.jpg",

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


        /* =================================
           MENU 14
        ================================= */

        {
            id: 14,

            name: "Butter Croissant",

            category: "Snack",

            price: "Rp20.000",

            bestSeller: false,

            image:
                "assets/images/butter-croissant.jpg",

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


        /* =================================
           MENU 15
        ================================= */

        {
            id: 15,

            name: "Chocolate Donut",

            category: "Snack",

            price: "Rp18.000",

            bestSeller: false,

            image:
                "assets/images/chocolate-donut.jpg",

            description:
                "Donat lembut dengan topping cokelat",

            details:
                "Donat lembut dengan lapisan cokelat yang manis dan cocok dipadukan dengan berbagai minuman Sheilatte.",

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



    /* =====================================
       PRODUCT GRID
    ===================================== */

    const productGrid =
        document.getElementById(
            "productGrid"
        );


    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );


    let activeFilter = "Semua";



    /* =====================================
       IMAGE PATH HELPER
    ===================================== */

    function getImagePath(image) {

        if (!image) {

            return isMenuPage
                ? "../assets/images/sheilatte.webp"
                : "assets/images/sheilatte.webp";

        }


        /*
         * Data produk selalu menggunakan
         *
         * assets/images/nama-file
         *
         * Untuk menu/index.html perlu ../
         */

        return isMenuPage
            ? `../${image}`
            : image;

    }



    /* =====================================
       FALLBACK IMAGE
    ===================================== */

    function getFallbackImage() {

        return isMenuPage
            ? "../assets/images/sheilatte.webp"
            : "assets/images/sheilatte.webp";

    }



    /* =====================================
       DETAIL LIST
    ===================================== */

    function detailList(items) {

        if (!Array.isArray(items)) {

            return "";

        }


        return `
            <ul>
                ${items
                    .map(
                        (item) =>
                            `<li>${item}</li>`
                    )
                    .join("")
                }
            </ul>
        `;

    }



    /* =====================================
       PRODUCT CARD TEMPLATE
    ===================================== */

    function productCardTemplate(
        product,
        index
    ) {

        const imagePath =
            getImagePath(product.image);

        const fallbackImage =
            getFallbackImage();


        return `

            <article
                class="card product-card"
                style="animation-delay:${index * 45}ms"
            >


                <!-- PRODUCT IMAGE -->

                <div class="product-image-wrap">

                    <img
                        src="${imagePath}"
                        alt="${product.name}"
                        loading="lazy"
                        onerror="
                            this.onerror=null;
                            this.src='${fallbackImage}';
                        "
                    >

                </div>


                <!-- CATEGORY -->

                <span class="category-badge">

                    ${product.category}

                </span>


                <!-- NAME -->

                <h3>

                    ${product.name}

                </h3>


                <!-- DESCRIPTION -->

                <p>

                    ${product.description}

                </p>


                <!-- PRICE -->

                <span class="price">

                    ${product.price}

                </span>


                <!-- DETAIL BUTTON -->

                <button
                    class="detail-btn"
                    type="button"
                    aria-expanded="false"
                >

                    Lihat Detail

                </button>


                <!-- DETAIL -->

                <div class="detail-content">


                    <h4>

                        Tentang
                        ${product.name}

                    </h4>


                    <p>

                        ${product.details}

                    </p>


                    <h4>

                        Komposisi

                    </h4>


                    ${detailList(
                        product.ingredients
                    )}


                    <h4>

                        Karakter Rasa

                    </h4>


                    <p>

                        ${product.taste}

                    </p>


                    <h4>

                        Rekomendasi Penyajian

                    </h4>


                    <p>

                        ${product.serving}

                    </p>


                    <button
                        class="detail-btn close-detail-btn"
                        type="button"
                    >

                        Tutup Detail

                    </button>


                </div>


            </article>

        `;

    }



    /* =====================================
       RENDER PRODUCTS
    ===================================== */

    function renderProducts(
        category = activeFilter
    ) {

        /*
         * Kalau halaman tidak mempunyai
         * productGrid, hentikan.
         */

        if (!productGrid) {

            return;

        }


        activeFilter = category;


        let visibleProducts;


        /* =================================
           HOME
           Hanya Best Seller
        ================================= */

        if (!isMenuPage) {

            visibleProducts =
                products.filter(
                    (product) =>
                        product.bestSeller === true
                );

        }


        /* =================================
           MENU
           Semua Produk + Filter
        ================================= */

        else {

            if (category === "Semua") {

                visibleProducts =
                    products;

            } else {

                visibleProducts =
                    products.filter(
                        (product) =>
                            product.category ===
                            category
                    );

            }

        }


        /* =================================
           EMPTY STATE
        ================================= */

        if (
            visibleProducts.length === 0
        ) {

            productGrid.innerHTML = `

                <div class="empty-menu">

                    <h3>
                        Menu belum tersedia
                    </h3>

                    <p>
                        Belum ada produk
                        pada kategori ini.
                    </p>

                </div>

            `;

            return;

        }


        /* =================================
           RENDER
        ================================= */

        productGrid.innerHTML =
            visibleProducts
                .map(
                    productCardTemplate
                )
                .join("");


        /* =================================
           REVEAL
        ================================= */

        observeReveal(
            productGrid.querySelectorAll(
                ".product-card"
            )
        );


        /* =================================
           DETAIL BUTTON
        ================================= */

        bindDetailButtons();

    }



    /* =====================================
       DETAIL BUTTONS
    ===================================== */

    function bindDetailButtons() {

        if (!productGrid) {

            return;

        }


        productGrid
            .querySelectorAll(
                ".detail-btn"
            )
            .forEach((button) => {


                button.addEventListener(
                    "click",
                    function () {


                        const card =
                            this.closest(
                                ".product-card"
                            );


                        if (!card) {

                            return;

                        }


                        const detail =
                            card.querySelector(
                                ".detail-content"
                            );


                        const openButton =
                            card.querySelector(
                                ".detail-btn:not(.close-detail-btn)"
                            );


                        const isCloseButton =
                            this.classList.contains(
                                "close-detail-btn"
                            );


                        /* =========================
                           CLOSE DETAIL
                        ========================= */

                        if (
                            isCloseButton
                        ) {

                            detail.classList.remove(
                                "active-detail"
                            );


                            if (openButton) {

                                openButton.hidden =
                                    false;

                                openButton.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }


                            return;

                        }


                        /* =========================
                           OPEN DETAIL
                        ========================= */

                        const isCurrentlyOpen =
                            detail.classList.contains(
                                "active-detail"
                            );


                        /*
                         * Tutup detail pada
                         * kartu lain.
                         */

                        productGrid
                            .querySelectorAll(
                                ".detail-content.active-detail"
                            )
                            .forEach(
                                (otherDetail) => {

                                    otherDetail.classList.remove(
                                        "active-detail"
                                    );

                                    const otherCard =
                                        otherDetail.closest(
                                            ".product-card"
                                        );

                                    const otherButton =
                                        otherCard?.querySelector(
                                            ".detail-btn:not(.close-detail-btn)"
                                        );


                                    if (
                                        otherButton
                                    ) {

                                        otherButton.hidden =
                                            false;

                                        otherButton.setAttribute(
                                            "aria-expanded",
                                            "false"
                                        );

                                    }

                                }
                            );


                        if (
                            isCurrentlyOpen
                        ) {

                            detail.classList.remove(
                                "active-detail"
                            );

                            this.hidden =
                                false;

                            this.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        } else {

                            detail.classList.add(
                                "active-detail"
                            );

                            this.hidden =
                                true;

                            this.setAttribute(
                                "aria-expanded",
                                "true"
                            );

                        }

                    }
                );

            });

    }



    /* =====================================
       FILTER BUTTONS
    ===================================== */

    if (filterButtons.length > 0) {

        filterButtons.forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {


                        const selectedFilter =
                            button.dataset.filter;


                        if (
                            !selectedFilter
                        ) {

                            return;

                        }


                        if (
                            selectedFilter ===
                            activeFilter
                        ) {

                            return;

                        }


                        /* =========================
                           ACTIVE BUTTON
                        ========================= */

                        filterButtons.forEach(
                            (filterButton) => {

                                filterButton.classList.toggle(
                                    "active",
                                    filterButton ===
                                    button
                                );

                            }
                        );


                        /* =========================
                           RENDER FILTER
                        ========================= */

                        renderProducts(
                            selectedFilter
                        );

                    }
                );

            }
        );

    }



    /* =====================================
       INITIAL PRODUCT RENDER
    ===================================== */

    renderProducts();



    /* =====================================
       BUTTON RIPPLE
    ===================================== */

    document.addEventListener(
        "click",
        (event) => {


            const button =
                event.target.closest(
                    ".btn, \
                     .btn-outline, \
                     .card button, \
                     .filter-btn, \
                     .modal-close"
                );


            if (!button) {

                return;

            }


            /*
             * Hindari ripple jika
             * elemen berada di luar body.
             */

            if (!document.body.contains(button)) {

                return;

            }


            const diameter =
                Math.max(
                    button.clientWidth,
                    button.clientHeight
                );


            const rect =
                button.getBoundingClientRect();


            const circle =
                document.createElement(
                    "span"
                );


            circle.style.width =
                `${diameter}px`;


            circle.style.height =
                `${diameter}px`;


            circle.style.left =
                `${event.clientX -
                    rect.left -
                    diameter / 2}px`;


            circle.style.top =
                `${event.clientY -
                    rect.top -
                    diameter / 2}px`;


            circle.classList.add(
                "ripple"
            );


            const oldRipple =
                button.querySelector(
                    ".ripple"
                );


            if (oldRipple) {

                oldRipple.remove();

            }


            button.appendChild(
                circle
            );

        }
    );



    /* =====================================
       COFFEE CURSOR TRAIL
    ===================================== */

    const trail = [
        "🫘",
        "☕",
        "🤎"
    ];


    let lastX = 0;
    let lastY = 0;


    document.addEventListener(
        "mousemove",
        (event) => {


            /*
             * Kurangi efek pada perangkat
             * dengan pointer coarse/touch.
             */

            if (
                window.matchMedia(
                    "(pointer: coarse)"
                ).matches
            ) {

                return;

            }


            const distance =
                Math.hypot(
                    event.clientX - lastX,
                    event.clientY - lastY
                );


            if (distance < 50) {

                return;

            }


            lastX =
                event.clientX;

            lastY =
                event.clientY;


            createTrail(
                event.clientX,
                event.clientY
            );

        }
    );


    function createTrail(x, y) {

        const element =
            document.createElement(
                "span"
            );


        element.className =
            "coffee-trail";


        element.textContent =
            trail[
                Math.floor(
                    Math.random() *
                    trail.length
                )
            ];


        element.style.left =
            `${x +
                (Math.random() - 0.5) *
                30}px`;


        element.style.top =
            `${y +
                (Math.random() - 0.5) *
                20}px`;


        element.style.fontSize =
            `${16 +
                Math.random() * 6}px`;


        element.style.setProperty(
            "--moveX",
            `${Math.random() * 80 - 40}px`
        );


        element.style.setProperty(
            "--moveY",
            `${-60 -
                Math.random() * 60}px`
        );


        element.style.setProperty(
            "--rotate",
            `${Math.random() * 60 - 30}deg`
        );


        document.body.appendChild(
            element
        );


        setTimeout(
            () => {

                element.remove();

            },
            900
        );

    }



    /* =====================================
       CONSOLE
    ===================================== */

    console.log(
        "%c☕ Welcome to Sheilatte",
        "color:#8B5E3C;font-size:20px;font-weight:bold"
    );


    console.log(
        `%cPage: ${
            isMenuPage
                ? "MENU"
                : "HOME"
        }`,
        "color:#8B5E3C;font-weight:bold"
    );


    console.log(
        `%cProducts: ${products.length}`,
        "color:#8B5E3C;font-weight:bold"
    );


    console.log(
        `%cBest Sellers: ${
            products.filter(
                product =>
                    product.bestSeller === true
            ).length
        }`,
        "color:#8B5E3C;font-weight:bold"
    );

});
