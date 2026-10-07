const PRODUCTS = [
  {
    id: 1,
    name: "Sample Industrial Product",
    category: "Industrial",
    price: "Price on Request",
    stock: "In Stock",
    featured: true,
    images: [],
    description:
      "Original Alang industrial product. Detailed specifications and product information will be available here."
  },
  {
    id: 2,
    name: "Original Alang Metal Product",
    category: "Metal",
    price: "Price on Request",
    stock: "In Stock",
    featured: false,
    images: [],
    description:
      "Original industrial product sourced from Alang, Gujarat."
  }
];

/* ================================
   GLOBAL SETTINGS
================================ */

const WHATSAPP_NUMBER = "";

/*
  IMPORTANT:
  The actual logo is stored in:
  src/aop-logo.png

  The Worker serves it through:
  /aop-logo.png
*/

const LOGO_SOURCE =
  "https://raw.githubusercontent.com/avinashbaraiya1113-lang/Alang-original-product-catalog/main/src/aop-logo.png";


/* ================================
   HTML ESCAPE
================================ */

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* ================================
   PRODUCT DATA
================================ */

function getProducts() {
  return PRODUCTS;
}


/* ================================
   MAIN HTML
================================ */

function renderPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<meta
  name="description"
  content="ALANG ORIGINAL PRODUCTS - Original industrial products from Alang, Gujarat."
/>

<title>ALANG ORIGINAL PRODUCTS | AOP</title>

<style>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg: #05070a;
  --panel: #0c1015;
  --panel2: #111820;
  --metal: #c5cbd1;
  --muted: #8d98a3;
  --white: #f5f7f9;
  --red: #ff2020;
  --red-dark: #a40000;
  --border: rgba(255,255,255,.12);
  --glow: rgba(255,20,20,.30);
}

body {
  background:
    radial-gradient(
      circle at 50% -10%,
      rgba(255,30,30,.14),
      transparent 38%
    ),
    linear-gradient(
      180deg,
      #030507 0%,
      #070a0e 45%,
      #030507 100%
    );

  color: var(--white);
  font-family:
    Inter,
    Arial,
    Helvetica,
    sans-serif;

  min-height: 100vh;
  overflow-x: hidden;
}

/* ================================
   INDUSTRIAL BACKGROUND
================================ */

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;

  background-image:
    linear-gradient(
      rgba(255,255,255,.018) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(255,255,255,.018) 1px,
      transparent 1px
    );

  background-size: 42px 42px;

  mask-image:
    linear-gradient(
      to bottom,
      black,
      transparent 85%
    );

  z-index: -1;
}


/* ================================
   HEADER
================================ */

header {
  position: relative;

  width: 100%;

  padding:
    34px
    20px
    28px;

  text-align: center;

  border-bottom:
    1px solid
    rgba(255,255,255,.10);

  background:
    linear-gradient(
      180deg,
      rgba(10,13,17,.97),
      rgba(5,7,10,.92)
    );

  box-shadow:
    0 12px 40px
    rgba(0,0,0,.45);
}


/* ================================
   LOGO
================================ */

.logo-wrap {
  display: flex;

  justify-content: center;
  align-items: center;

  margin-bottom: 22px;
}

.main-logo {
  display: block;

  width: min(
    430px,
    82vw
  );

  max-height: 230px;

  object-fit: contain;

  filter:
    drop-shadow(
      0 0 18px
      rgba(255,20,20,.20)
    );

  transition:
    transform .35s ease,
    filter .35s ease;
}

.main-logo:hover {
  transform: scale(1.025);

  filter:
    drop-shadow(
      0 0 30px
      rgba(255,20,20,.35)
    );
}


/* ================================
   BRAND NAME
================================ */

.brand-name {
  font-size: clamp(
    25px,
    5vw,
    48px
  );

  font-weight: 900;

  letter-spacing:
    .10em;

  line-height: 1.1;

  color: #ffffff;

  text-shadow:
    0 2px 12px
    rgba(255,255,255,.10);
}

.brand-short {
  color: var(--red);
}


/* ================================
   ANIMATED TAGLINE
================================ */

.tagline-window {
  width: 100%;

  overflow: hidden;

  margin:
    20px
    auto
    0;

  padding:
    10px 0;

  border-top:
    1px solid
    rgba(255,30,30,.18);

  border-bottom:
    1px solid
    rgba(255,30,30,.18);
}

.tagline {
  display: inline-block;

  white-space: nowrap;

  color: #ff2929;

  font-size: clamp(
    13px,
    2.3vw,
    20px
  );

  font-weight: 900;

  letter-spacing:
    .13em;

  animation:
    taglineMove
    14s
    linear
    infinite;

  text-shadow:
    0 0 10px
    rgba(255,0,0,.45);
}

@keyframes taglineMove {

  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }

}


/* ================================
   MAIN
================================ */

main {
  width: min(
    1250px,
    calc(100% - 28px)
  );

  margin:
    28px
    auto
    60px;
}


/* ================================
   TOP BAR
================================ */

.topbar {
  display: flex;

  gap: 12px;

  flex-wrap: wrap;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 24px;
}

.search-box {
  flex: 1 1 300px;

  position: relative;
}

.search-box input {
  width: 100%;

  padding:
    15px
    18px;

  border-radius: 12px;

  border:
    1px solid
    var(--border);

  background:
    rgba(255,255,255,.045);

  color: white;

  outline: none;

  font-size: 15px;

  transition:
    border-color .25s,
    box-shadow .25s;
}

.search-box input:focus {
  border-color:
    rgba(255,40,40,.65);

  box-shadow:
    0 0 0 3px
    rgba(255,20,20,.08);
}

.category-select {
  flex: 0 1 220px;

  padding:
    15px
    18px;

  border-radius: 12px;

  border:
    1px solid
    var(--border);

  background:
    #0d1218;

  color: white;

  outline: none;

  font-size: 15px;
}


/* ================================
   SECTION TITLE
================================ */

.section-heading {
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 15px;

  margin:
    30px 0
    18px;
}

.section-heading h2 {
  font-size:
    clamp(21px, 4vw, 30px);

  letter-spacing:
    .06em;
}

.section-heading span {
  color:
    var(--muted);

  font-size: 13px;
}


/* ================================
   PRODUCTS GRID
================================ */

.products-grid {
  display: grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(
        250px,
        1fr
      )
    );

  gap: 18px;
}


/* ================================
   PRODUCT CARD
================================ */

.product-card {
  position: relative;

  overflow: hidden;

  background:
    linear-gradient(
      145deg,
      rgba(20,26,33,.96),
      rgba(7,10,14,.98)
    );

  border:
    1px solid
    rgba(255,255,255,.10);

  border-radius: 18px;

  min-height: 100%;

  transition:
    transform .3s ease,
    border-color .3s ease,
    box-shadow .3s ease;

  box-shadow:
    0 12px 35px
    rgba(0,0,0,.25);
}

.product-card::before {
  content: "";

  position: absolute;

  inset: 0;

  border-radius: inherit;

  padding: 1px;

  background:
    linear-gradient(
      130deg,
      transparent 25%,
      rgba(255,35,35,.35),
      transparent 75%
    );

  mask:
    linear-gradient(#000 0 0)
    content-box,
    linear-gradient(#000 0 0);

  mask-composite:
    exclude;

  opacity: .4;

  animation:
    borderFlow
    5s
    linear
    infinite;

  pointer-events: none;
}

@keyframes borderFlow {

  0% {
    transform:
      translateX(-30%);
  }

  100% {
    transform:
      translateX(30%);
  }

}

.product-card:hover {
  transform:
    translateY(-5px);

  border-color:
    rgba(255,35,35,.45);

  box-shadow:
    0 18px 45px
    rgba(0,0,0,.45),
    0 0 28px
    rgba(255,20,20,.08);
}


/* ================================
   PRODUCT IMAGE
================================ */

.product-image {
  width: 100%;

  height: 230px;

  background:
    radial-gradient(
      circle,
      rgba(255,255,255,.08),
      rgba(0,0,0,.4)
    );

  display: flex;

  align-items: center;

  justify-content: center;

  overflow: hidden;
}

.product-image img {
  width: 100%;

  height: 100%;

  object-fit: cover;

  transition:
    transform .4s ease;
}

.product-card:hover
.product-image img {
  transform:
    scale(1.045);
}

.image-placeholder {
  color:
    #66717c;

  text-align: center;

  padding: 30px;

  font-weight: 700;

  letter-spacing: .08em;
}


/* ================================
   PRODUCT CONTENT
================================ */

.product-content {
  padding: 18px;
}

.product-category {
  color:
    #aeb7bf;

  font-size: 11px;

  font-weight: 800;

  letter-spacing:
    .13em;

  text-transform:
    uppercase;

  margin-bottom: 8px;
}

.product-title {
  font-size: 20px;

  font-weight: 850;

  margin-bottom: 10px;

  line-height: 1.25;
}

.product-description {
  color:
    #9ba5af;

  font-size: 13px;

  line-height: 1.6;

  min-height: 42px;

  margin-bottom: 15px;
}

.product-bottom {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 10px;
}

.price {
  color:
    #ffffff;

  font-size: 17px;

  font-weight: 850;
}

.stock {
  font-size: 11px;

  font-weight: 900;

  padding:
    6px
    9px;

  border-radius: 999px;

  text-transform:
    uppercase;
}

.stock.in {
  color:
    #7dff9a;

  background:
    rgba(20,190,65,.10);

  border:
    1px solid
    rgba(20,190,65,.22);
}

.stock.out {
  color:
    #ff6868;

  background:
    rgba(255,30,30,.10);

  border:
    1px solid
    rgba(255,30,30,.22);
}


/* ================================
   FEATURED
================================ */

.featured-badge {
  position: absolute;

  top: 12px;

  left: 12px;

  z-index: 2;

  padding:
    7px 10px;

  border-radius:
    999px;

  background:
    rgba(255,25,25,.90);

  color: white;

  font-size: 10px;

  font-weight: 900;

  letter-spacing:
    .08em;

  box-shadow:
    0 5px 18px
    rgba(255,0,0,.25);
}


/* ================================
   BUTTONS
================================ */

.buttons {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 9px;

  margin-top: 16px;
}

.btn {
  border: none;

  border-radius: 10px;

  padding:
    11px
    12px;

  cursor: pointer;

  font-weight: 800;

  font-size: 12px;

  transition:
    transform .2s,
    opacity .2s;
}

.btn:hover {
  transform:
    translateY(-2px);
}

.btn-view {
  background:
    #202832;

  color: white;

  border:
    1px solid
    rgba(255,255,255,.08);
}

.btn-wa {
  background:
    #20b95a;

  color: white;
}


/* ================================
   EMPTY STATE
================================ */

.empty {
  padding:
    60px 20px;

  text-align: center;

  border:
    1px dashed
    rgba(255,255,255,.12);

  border-radius: 16px;

  color:
    #7e8994;
}


/* ================================
   MODAL
================================ */

.modal {
  position: fixed;

  inset: 0;

  z-index: 1000;

  display: none;

  align-items: center;

  justify-content: center;

  padding: 15px;

  background:
    rgba(0,0,0,.80);

  backdrop-filter:
    blur(10px);
}

.modal.show {
  display: flex;
}

.modal-box {
  position: relative;

  width:
    min(
      950px,
      100%
    );

  max-height:
    92vh;

  overflow-y: auto;

  border-radius: 20px;

  border:
    1px solid
    rgba(255,255,255,.12);

  background:
    linear-gradient(
      145deg,
      #11171e,
      #06090d
    );

  box-shadow:
    0 30px 90px
    rgba(0,0,0,.65);
}

.modal-close {
  position: absolute;

  right: 14px;

  top: 14px;

  z-index: 5;

  width: 40px;

  height: 40px;

  border-radius: 50%;

  border:
    1px solid
    rgba(255,255,255,.15);

  background:
    rgba(0,0,0,.60);

  color: white;

  font-size: 20px;

  cursor: pointer;
}

.modal-content {
  display: grid;

  grid-template-columns:
    minmax(0, 1.1fr)
    minmax(0, .9fr);
}

.gallery {
  padding: 20px;
}

.main-gallery-image {
  width: 100%;

  height: 450px;

  border-radius: 14px;

  object-fit: cover;

  background:
    #0a0e13;
}

.thumbnails {
  display: flex;

  gap: 8px;

  overflow-x: auto;

  margin-top: 10px;
}

.thumbnail {
  width: 65px;

  height: 65px;

  object-fit: cover;

  border-radius: 8px;

  cursor: pointer;

  border:
    1px solid
    rgba(255,255,255,.12);
}

.details {
  padding:
    35px 25px 25px;
}

.details .category {
  color:
    #aeb7bf;

  font-size: 11px;

  letter-spacing:
    .15em;

  font-weight: 800;

  text-transform:
    uppercase;

  margin-bottom: 10px;
}

.details h2 {
  font-size:
    clamp(25px, 5vw, 38px);

  line-height: 1.15;

  margin-bottom: 15px;
}

.details .detail-price {
  font-size: 24px;

  font-weight: 900;

  margin-bottom: 14px;
}

.details-description {
  color:
    #a4adb6;

  line-height: 1.7;

  font-size: 14px;

  margin-bottom: 22px;
}

.big-wa {
  display: inline-flex;

  align-items: center;

  justify-content: center;

  width: 100%;

  padding:
    14px;

  border-radius: 12px;

  background:
    #20b95a;

  color: white;

  text-decoration: none;

  font-weight: 900;
}


/* ================================
   FOOTER
================================ */

footer {
  border-top:
    1px solid
    rgba(255,255,255,.08);

  padding:
    30px 20px;

  text-align: center;

  color:
    #69747e;

  font-size: 12px;

  letter-spacing:
    .05em;
}

footer strong {
  color:
    #c6cdd3;
}


/* ================================
   MOBILE
================================ */

@media (max-width: 720px) {

  header {
    padding:
      25px 14px 20px;
  }

  .main-logo {
    width:
      min(
        340px,
        88vw
      );

    max-height: 190px;
  }

  .brand-name {
    font-size: 24px;
  }

  main {
    width:
      calc(100% - 20px);

    margin-top: 20px;
  }

  .products-grid {
    grid-template-columns:
      repeat(2, minmax(0,1fr));

    gap: 10px;
  }

  .product-image {
    height: 155px;
  }

  .product-content {
    padding: 12px;
  }

  .product-title {
    font-size: 15px;
  }

  .product-description {
    font-size: 11px;

    min-height: 34px;
  }

  .price {
    font-size: 13px;
  }

  .stock {
    font-size: 8px;
  }

  .buttons {
    grid-template-columns:
      1fr;

    gap: 6px;
  }

  .btn {
    padding: 9px 6px;
    font-size: 10px;
  }

  .modal-content {
    grid-template-columns:
      1fr;
  }

  .main-gallery-image {
    height: 280px;
  }

  .details {
    padding:
      10px 18px 22px;
  }

}

@media (max-width: 390px) {

  .products-grid {
    grid-template-columns:
      1fr;
  }

  .product-image {
    height: 210px;
  }

}


/* ================================
   SCROLLBAR
================================ */

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background:
    #05070a;
}

::-webkit-scrollbar-thumb {
  background:
    #303942;

  border-radius:
    999px;
}

::-webkit-scrollbar-thumb:hover {
  background:
    #ff2525;
}

</style>

</head>

<body>


<header>

  <div class="logo-wrap">

    <!-- REAL GITHUB LOGO SERVED BY WORKER -->
    <img
      class="main-logo"
      src="/aop-logo.png?v=2"
      alt="ALANG ORIGINAL PRODUCTS AOP Logo"
      onerror="this.style.display='none';"
    >

  </div>


  <div class="brand-name">
    ALANG ORIGINAL PRODUCTS
    <span class="brand-short">AOP</span>
  </div>


  <div class="tagline-window">

    <div class="tagline">
      ALL ORIGINAL ALANG PRODUCTS WILL BE AVAILABLE HERE.
    </div>

  </div>

</header>


<main>

  <div class="topbar">

    <div class="search-box">

      <input
        id="searchInput"
        type="search"
        placeholder="Search products..."
        autocomplete="off"
      >

    </div>


    <select
      id="categorySelect"
      class="category-select"
    >

      <option value="all">
        All Categories
      </option>

    </select>

  </div>


  <div class="section-heading">

    <h2>
      ORIGINAL ALANG PRODUCTS
    </h2>

    <span id="productCount">
      0 Products
    </span>

  </div>


  <div
    id="productsGrid"
    class="products-grid"
  ></div>

</main>


<footer>

  <strong>
    ALANG ORIGINAL PRODUCTS (AOP)
  </strong>

  <br><br>

  Original industrial products from Alang, Gujarat.

</footer>


<!-- PRODUCT MODAL -->

<div
  id="productModal"
  class="modal"
  onclick="closeModal(event)"
>

  <div
    class="modal-box"
    onclick="event.stopPropagation()"
  >

    <button
      class="modal-close"
      onclick="hideModal()"
      aria-label="Close"
    >
      ×
    </button>

    <div
      id="modalContent"
      class="modal-content"
    ></div>

  </div>

</div>


<script>

const PRODUCTS_DATA = ${JSON.stringify(getProducts())};

const whatsappNumber =
  ${JSON.stringify(WHATSAPP_NUMBER)};


function escapeClient(value = "") {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* ================================
   CATEGORY LIST
================================ */

function setupCategories() {

  const select =
    document.getElementById(
      "categorySelect"
    );

  const categories =
    [
      ...new Set(
        PRODUCTS_DATA
          .map(p => p.category)
          .filter(Boolean)
      )
    ]
    .sort();

  categories.forEach(category => {

    const option =
      document.createElement(
        "option"
      );

    option.value = category;

    option.textContent = category;

    select.appendChild(option);

  });

}


/* ================================
   IMAGE
================================ */

function getFirstImage(product) {

  if (
    product.images &&
    product.images.length
  ) {

    return product.images[0];

  }

  return "";

}


/* ================================
   WHATSAPP
================================ */

function whatsappLink(product) {

  const currentUrl =
    window.location.origin +
    window.location.pathname +
    "?product=" +
    encodeURIComponent(product.id);

  const message =
    "Hello, I am interested in this product:%0A%0A" +
    encodeURIComponent(product.name) +
    "%0A%0AProduct Link:%0A" +
    encodeURIComponent(currentUrl);

  if (!whatsappNumber) {

    return "#";

  }

  return (
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    message
  );

}


/* ================================
   PRODUCT CARD
================================ */

function createCard(product) {

  const image =
    getFirstImage(product);

  const stockClass =
    String(product.stock)
      .toLowerCase()
      .includes("out")
      ? "out"
      : "in";

  return \`

    <article class="product-card">

      ${
        product.featured
          ? \`
            <div class="featured-badge">
              FEATURED
            </div>
          \`
          : ""
      }


      <div class="product-image">

        ${
          image
            ? \`
              <img
                src="\${escapeClient(image)}"
                alt="\${escapeClient(product.name)}"
                loading="lazy"
              >
            \`
            : \`
              <div class="image-placeholder">
                AOP PRODUCT<br>
                IMAGE
              </div>
            \`
        }

      </div>


      <div class="product-content">

        <div class="product-category">
          \${escapeClient(product.category)}
        </div>


        <div class="product-title">
          \${escapeClient(product.name)}
        </div>


        <div class="product-description">
          \${escapeClient(product.description)}
        </div>


        <div class="product-bottom">

          <div class="price">
            \${escapeClient(product.price)}
          </div>

          <div class="stock \${stockClass}">
            \${escapeClient(product.stock)}
          </div>

        </div>


        <div class="buttons">

          <button
            class="btn btn-view"
            onclick="showProduct(\${Number(product.id)})"
          >
            VIEW PRODUCT
          </button>


          ${
            whatsappNumber
              ? \`
                <a
                  class="btn btn-wa"
                  href="\${whatsappLink(product)}"
                  target="_blank"
                  rel="noopener"
                  style="text-decoration:none;text-align:center;"
                >
                  WHATSAPP
                </a>
              \`
              : \`
                <button
                  class="btn btn-wa"
                  onclick="showProduct(\${Number(product.id)})"
                >
                  INQUIRE
                </button>
              \`
          }

        </div>

      </div>

    </article>

  \`;

}


/* ================================
   RENDER PRODUCTS
================================ */

function renderProducts() {

  const search =
    document
      .getElementById("searchInput")
      .value
      .trim()
      .toLowerCase();

  const category =
    document
      .getElementById("categorySelect")
      .value;


  const filtered =
    PRODUCTS_DATA.filter(product => {

      const text =
        (
          product.name +
          " " +
          product.category +
          " " +
          product.description
        )
        .toLowerCase();

      const matchesSearch =
        !search ||
        text.includes(search);

      const matchesCategory =
        category === "all" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );

    });


  const grid =
    document.getElementById(
      "productsGrid"
    );


  document.getElementById(
    "productCount"
  ).textContent =
    filtered.length +
    (
      filtered.length === 1
        ? " Product"
        : " Products"
    );


  if (!filtered.length) {

    grid.innerHTML = \`

      <div class="empty">

        <h3>
          No products found
        </h3>

        <br>

        <p>
          Try another search or category.
        </p>

      </div>

    \`;

    return;

  }


  grid.innerHTML =
    filtered
      .map(createCard)
      .join("");

}


/* ================================
   SHOW PRODUCT
================================ */

function showProduct(id) {

  const product =
    PRODUCTS_DATA.find(
      p => Number(p.id) === Number(id)
    );

  if (!product) return;


  const modal =
    document.getElementById(
      "productModal"
    );

  const content =
    document.getElementById(
      "modalContent"
    );


  const images =
    Array.isArray(product.images)
      ? product.images.filter(Boolean)
      : [];


  const firstImage =
    images[0] || "";


  let galleryMain =
    firstImage
      ? \`
        <img
          id="modalMainImage"
          class="main-gallery-image"
          src="\${escapeClient(firstImage)}"
          alt="\${escapeClient(product.name)}"
        >
      \`
      : \`
        <div
          class="main-gallery-image"
          style="
            display:flex;
            align-items:center;
            justify-content:center;
            color:#69747e;
          "
        >
          PRODUCT IMAGE
        </div>
      \`;


  let thumbnails = "";


  if (images.length > 1) {

    thumbnails =
      \`
      <div class="thumbnails">

        \${images.map((img, index) => \`

          <img
            class="thumbnail"
            src="\${escapeClient(img)}"
            alt="Product image \${index + 1}"
            onclick="
              document.getElementById('modalMainImage').src =
              this.src
            "
          >

        \`).join("")}

      </div>
      \`;

  }


  const stockClass =
    String(product.stock)
      .toLowerCase()
      .includes("out")
      ? "out"
      : "in";


  content.innerHTML = \`

    <div class="gallery">

      \${galleryMain}

      \${thumbnails}

    </div>


    <div class="details">

      <div class="category">
        \${escapeClient(product.category)}
      </div>


      <h2>
        \${escapeClient(product.name)}
      </h2>


      <div class="detail-price">
        \${escapeClient(product.price)}
      </div>


      <div class="stock \${stockClass}"
        style="display:inline-block;margin-bottom:18px;"
      >
        \${escapeClient(product.stock)}
      </div>


      <div class="details-description">
        \${escapeClient(product.description)}
      </div>


      ${
        whatsappNumber
          ? \`
            <a
              class="big-wa"
              href="\${whatsappLink(product)}"
              target="_blank"
              rel="noopener"
            >
              INQUIRE ON WHATSAPP
            </a>
          \`
          : \`
            <button
              class="big-wa"
              style="border:0;cursor:pointer;"
              onclick="alert('WhatsApp contact will be available soon.')"
            >
              WHATSAPP INQUIRY
            </button>
          \`
      }


      <button
        class="big-wa"
        style="
          margin-top:10px;
          background:#202832;
          border:1px solid rgba(255,255,255,.10);
          cursor:pointer;
        "
        onclick="shareProduct(\${Number(product.id)})"
      >
        SHARE PRODUCT
      </button>


    </div>

  \`;


  modal.classList.add(
    "show"
  );


  history.replaceState(
    null,
    "",
    "?product=" +
    encodeURIComponent(product.id)
  );

}


/* ================================
   HIDE MODAL
================================ */

function hideModal() {

  const modal =
    document.getElementById(
      "productModal"
    );

  modal.classList.remove(
    "show"
  );


  history.replaceState(
    null,
    "",
    window.location.pathname
  );

}


function closeModal(event) {

  if (
    event.target.id ===
    "productModal"
  ) {

    hideModal();

  }

}


/* ================================
   SHARE PRODUCT
================================ */

async function shareProduct(id) {

  const url =
    window.location.origin +
    window.location.pathname +
    "?product=" +
    encodeURIComponent(id);


  if (
    navigator.share
  ) {

    try {

      await navigator.share({
        title:
          "ALANG ORIGINAL PRODUCTS",
        text:
          "Check this original Alang product.",
        url
      });

      return;

    } catch (e) {}

  }


  try {

    await navigator.clipboard.writeText(
      url
    );

    alert(
      "Product link copied successfully."
    );

  } catch (e) {

    prompt(
      "Copy this product link:",
      url
    );

  }

}


/* ================================
   EVENTS
================================ */

document
  .getElementById("searchInput")
  .addEventListener(
    "input",
    renderProducts
  );


document
  .getElementById("categorySelect")
  .addEventListener(
    "change",
    renderProducts
  );


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      hideModal();

    }

  }
);


/* ================================
   INITIALIZE
================================ */

setupCategories();

renderProducts();


/* ================================
   OPEN SHARED PRODUCT
================================ */

const params =
  new URLSearchParams(
    window.location.search
  );

const productId =
  params.get("product");


if (productId) {

  setTimeout(
    () => showProduct(productId),
    150
  );

}

</script>

</body>
</html>`;
}


/* ================================
   WORKER
================================ */

export default {

  async fetch(request) {

    const url =
      new URL(request.url);


    /*
      =========================================
      REAL LOGO ROUTE

      Browser requests:

      /aop-logo.png

      Worker fetches the actual logo from
      the GitHub repository and serves it
      from the same website.
      =========================================
    */

    if (
      url.pathname ===
      "/aop-logo.png"
    ) {

      try {

        const response =
          await fetch(
            LOGO_SOURCE,
            {
              cf: {
                cacheTtl: 300,
                cacheEverything: true
              }
            }
          );


        if (!response.ok) {

          return new Response(
            "Logo not found",
            {
              status: 404
            }
          );

        }


        return new Response(
          response.body,
          {
            status: 200,

            headers: {
              "Content-Type":
                response.headers.get(
                  "Content-Type"
                ) ||
                "image/png",

              "Cache-Control":
                "public, max-age=300"
            }

          }
        );

      } catch (error) {

        return new Response(
          "Unable to load logo",
          {
            status: 500
          }
        );

      }

    }


    /*
      =========================================
      WEBSITE
      =========================================
    */

    return new Response(
      renderPage(),
      {
        headers: {
          "Content-Type":
            "text/html; charset=UTF-8",

          "Cache-Control":
            "no-cache"
        }
      }
    );

  }

};
