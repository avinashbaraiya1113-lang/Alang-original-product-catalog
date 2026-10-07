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
   SETTINGS
================================ */

const WHATSAPP_NUMBER = "";

const LOGO_SOURCE =
  "https://raw.githubusercontent.com/avinashbaraiya1113-lang/Alang-original-product-catalog/main/src/aop-logo.png";


/* ================================
   HELPERS
================================ */

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* ================================
   WEBSITE HTML
================================ */

function renderPage() {
  return `
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
>

<meta
  name="description"
  content="ALANG ORIGINAL PRODUCTS - Original industrial products from Alang, Gujarat."
>

<title>ALANG ORIGINAL PRODUCTS | AOP</title>

<style>

/* ================================
   RESET
================================ */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg: #05070a;
  --panel: #0d1218;
  --panel2: #111820;
  --white: #f5f7f9;
  --muted: #909aa4;
  --red: #ff2020;
  --red2: #b40000;
  --green: #20c767;
  --border: rgba(255,255,255,.11);
}

html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  overflow-x: hidden;

  color: var(--white);

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  background:
    radial-gradient(
      circle at 50% -10%,
      rgba(255,20,20,.15),
      transparent 38%
    ),
    linear-gradient(
      180deg,
      #030507,
      #080b0f 45%,
      #030507
    );
}

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

  z-index: -1;
}


/* ================================
   HEADER
================================ */

header {
  position: relative;

  text-align: center;

  padding:
    28px
    16px
    25px;

  border-bottom:
    1px solid
    rgba(255,255,255,.10);

  background:
    linear-gradient(
      180deg,
      rgba(12,15,20,.98),
      rgba(5,7,10,.94)
    );

  box-shadow:
    0 15px 45px
    rgba(0,0,0,.45);
}


/* ================================
   REAL AOP LOGO
================================ */

.logo-wrap {
  display: flex;

  justify-content: center;
  align-items: center;

  margin-bottom: 18px;
}

.main-logo {
  display: block;

  width:
    min(430px, 86vw);

  max-height: 230px;

  object-fit: contain;

  filter:
    drop-shadow(
      0 0 20px
      rgba(255,20,20,.25)
    );

  transition:
    transform .3s ease,
    filter .3s ease;
}

.main-logo:hover {
  transform: scale(1.03);

  filter:
    drop-shadow(
      0 0 32px
      rgba(255,20,20,.40)
    );
}


/* ================================
   BRAND
================================ */

.brand-name {
  font-size:
    clamp(24px, 5vw, 45px);

  font-weight: 900;

  letter-spacing: .08em;

  line-height: 1.15;
}

.brand-short {
  color: var(--red);

  margin-left: 8px;
}


/* ================================
   ANIMATED TAGLINE
================================ */

.tagline-window {
  width: 100%;

  overflow: hidden;

  margin-top: 20px;

  padding: 11px 0;

  border-top:
    1px solid
    rgba(255,30,30,.25);

  border-bottom:
    1px solid
    rgba(255,30,30,.25);

  background:
    rgba(255,0,0,.025);
}

.tagline {
  display: inline-block;

  white-space: nowrap;

  color: var(--red);

  font-size:
    clamp(12px, 2.2vw, 18px);

  font-weight: 900;

  letter-spacing: .12em;

  text-shadow:
    0 0 12px
    rgba(255,0,0,.45);

  animation:
    moveTagline
    14s
    linear
    infinite;
}

@keyframes moveTagline {

  from {
    transform:
      translateX(100%);
  }

  to {
    transform:
      translateX(-100%);
  }

}


/* ================================
   MAIN
================================ */

main {
  width:
    min(1250px, calc(100% - 28px));

  margin:
    30px auto
    60px;
}


/* ================================
   INTRO
================================ */

.intro {
  text-align: center;

  padding:
    20px 10px
    35px;
}

.intro-label {
  color: var(--red);

  font-size: 12px;

  font-weight: 900;

  letter-spacing: .25em;

  margin-bottom: 15px;
}

.intro h1 {
  font-size:
    clamp(30px, 7vw, 58px);

  line-height: 1.05;

  font-weight: 900;

  margin-bottom: 20px;
}

.intro h1 span {
  color: var(--red);
}

.intro p {
  max-width: 800px;

  margin: auto;

  color: var(--muted);

  font-size:
    clamp(14px, 2vw, 18px);

  line-height: 1.7;
}


/* ================================
   FEATURE BOXES
================================ */

.feature-row {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 10px;

  margin:
    0 auto
    40px;

  max-width: 900px;
}

.feature-box {
  padding: 13px 10px;

  text-align: center;

  border:
    1px solid
    rgba(255,255,255,.10);

  border-radius: 9px;

  background:
    rgba(255,255,255,.025);

  color: #c7cdd2;

  font-size: 11px;

  font-weight: 800;

  letter-spacing: .07em;
}

.feature-box::before {
  content: "◆";

  color: var(--red);

  margin-right: 7px;
}


/* ================================
   CATALOGUE TITLE
================================ */

.catalogue-label {
  text-align: center;

  color: var(--red);

  font-size: 12px;

  font-weight: 900;

  letter-spacing: .28em;

  margin-bottom: 10px;
}

.catalogue-title {
  text-align: center;

  font-size:
    clamp(28px, 6vw, 45px);

  margin-bottom: 25px;
}


/* ================================
   SEARCH
================================ */

.controls {
  display: flex;

  flex-wrap: wrap;

  gap: 10px;

  margin-bottom: 25px;
}

.search-input {
  flex: 1 1 300px;

  min-width: 0;

  padding:
    15px 17px;

  border:
    1px solid
    var(--border);

  border-radius: 11px;

  outline: none;

  background:
    rgba(255,255,255,.035);

  color: white;

  font-size: 15px;
}

.search-input:focus {
  border-color:
    rgba(255,30,30,.65);

  box-shadow:
    0 0 0 3px
    rgba(255,20,20,.08);
}

.category-select {
  flex:
    0 1 220px;

  padding:
    15px 17px;

  border:
    1px solid
    var(--border);

  border-radius: 11px;

  outline: none;

  background:
    #0d1218;

  color: white;

  font-size: 15px;
}


/* ================================
   COUNT
================================ */

.product-count {
  color: var(--muted);

  font-size: 13px;

  margin-bottom: 15px;
}


/* ================================
   GRID
================================ */

.products-grid {
  display: grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(250px, 1fr)
    );

  gap: 18px;
}


/* ================================
   CARD
================================ */

.product-card {
  position: relative;

  overflow: hidden;

  border:
    1px solid
    rgba(255,255,255,.11);

  border-radius: 17px;

  background:
    linear-gradient(
      145deg,
      #131920,
      #080b0f
    );

  box-shadow:
    0 15px 40px
    rgba(0,0,0,.30);

  transition:
    transform .3s ease,
    border-color .3s ease,
    box-shadow .3s ease;
}

.product-card:hover {
  transform:
    translateY(-5px);

  border-color:
    rgba(255,30,30,.45);

  box-shadow:
    0 20px 50px
    rgba(0,0,0,.50);
}


/* ================================
   CARD IMAGE
================================ */

.product-image {
  position: relative;

  width: 100%;

  height: 230px;

  display: flex;

  align-items: center;
  justify-content: center;

  overflow: hidden;

  background:
    radial-gradient(
      circle,
      #1b2229,
      #080b0f
    );
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
    scale(1.05);
}

.image-placeholder {
  text-align: center;

  color: #5e6973;

  font-size: 13px;

  font-weight: 900;

  letter-spacing: .12em;
}


/* ================================
   BADGES
================================ */

.featured-badge {
  position: absolute;

  top: 12px;
  left: 12px;

  z-index: 5;

  padding:
    7px 10px;

  border-radius: 6px;

  background:
    var(--red);

  color: white;

  font-size: 10px;

  font-weight: 900;

  letter-spacing: .07em;
}

.stock-badge {
  position: absolute;

  top: 12px;
  right: 12px;

  z-index: 5;

  padding:
    7px 10px;

  border-radius: 6px;

  font-size: 10px;

  font-weight: 900;

  background:
    rgba(0,0,0,.65);

  border:
    1px solid
    rgba(255,255,255,.15);
}

.stock-in {
  color: #62ef8b;
}

.stock-out {
  color: #ff6868;
}


/* ================================
   CARD CONTENT
================================ */

.product-content {
  padding: 17px;
}

.product-category {
  color:
    #8d98a3;

  font-size: 10px;

  font-weight: 900;

  letter-spacing: .14em;

  text-transform: uppercase;

  margin-bottom: 8px;
}

.product-title {
  font-size: 20px;

  font-weight: 900;

  line-height: 1.25;

  margin-bottom: 9px;
}

.product-description {
  color:
    #8d98a3;

  font-size: 13px;

  line-height: 1.55;

  min-height: 40px;

  margin-bottom: 14px;
}

.product-price {
  font-size: 17px;

  font-weight: 900;

  margin-bottom: 13px;
}


/* ================================
   BUTTONS
================================ */

.button-row {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 8px;
}

.button {
  display: flex;

  align-items: center;
  justify-content: center;

  min-height: 42px;

  padding:
    9px 8px;

  border-radius: 9px;

  border: none;

  cursor: pointer;

  font-size: 11px;

  font-weight: 900;

  text-decoration: none;

  transition:
    transform .2s ease,
    opacity .2s ease;
}

.button:hover {
  transform:
    translateY(-2px);

  opacity: .92;
}

.view-button {
  color: white;

  background:
    #222b34;

  border:
    1px solid
    rgba(255,255,255,.10);
}

.whatsapp-button {
  color: white;

  background:
    #20b95a;
}


/* ================================
   EMPTY
================================ */

.empty {
  grid-column: 1 / -1;

  padding: 60px 20px;

  text-align: center;

  border:
    1px dashed
    rgba(255,255,255,.15);

  border-radius: 15px;

  color: var(--muted);
}


/* ================================
   MODAL
================================ */

.modal {
  position: fixed;

  inset: 0;

  z-index: 9999;

  display: none;

  align-items: center;
  justify-content: center;

  padding: 15px;

  background:
    rgba(0,0,0,.84);

  backdrop-filter:
    blur(9px);
}

.modal.show {
  display: flex;
}

.modal-box {
  position: relative;

  width:
    min(950px, 100%);

  max-height:
    92vh;

  overflow-y: auto;

  border:
    1px solid
    rgba(255,255,255,.14);

  border-radius: 20px;

  background:
    linear-gradient(
      145deg,
      #11171e,
      #05080b
    );

  box-shadow:
    0 30px 100px
    rgba(0,0,0,.7);
}

.close-button {
  position: absolute;

  top: 12px;
  right: 12px;

  z-index: 10;

  width: 42px;
  height: 42px;

  border-radius: 50%;

  border:
    1px solid
    rgba(255,255,255,.18);

  background:
    rgba(0,0,0,.65);

  color: white;

  font-size: 22px;

  cursor: pointer;
}

.modal-grid {
  display: grid;

  grid-template-columns:
    1.1fr .9fr;
}

.gallery {
  padding: 20px;
}

.main-image {
  width: 100%;

  height: 440px;

  object-fit: cover;

  border-radius: 14px;

  background:
    #090d11;
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

  flex-shrink: 0;

  object-fit: cover;

  border-radius: 8px;

  border:
    1px solid
    rgba(255,255,255,.12);

  cursor: pointer;
}

.modal-details {
  padding:
    35px 25px 25px;
}

.modal-category {
  color:
    #9ba5ae;

  font-size: 11px;

  font-weight: 900;

  letter-spacing: .15em;

  margin-bottom: 10px;
}

.modal-details h2 {
  font-size:
    clamp(25px, 5vw, 40px);

  line-height: 1.15;

  margin-bottom: 15px;
}

.modal-price {
  font-size: 24px;

  font-weight: 900;

  margin-bottom: 15px;
}

.modal-description {
  color:
    #9ba5ae;

  line-height: 1.7;

  font-size: 14px;

  margin-bottom: 25px;
}

.modal-action {
  display: flex;

  flex-direction: column;

  gap: 10px;
}

.modal-action a,
.modal-action button {
  width: 100%;

  min-height: 48px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 10px;

  border: none;

  cursor: pointer;

  color: white;

  font-weight: 900;

  text-decoration: none;
}

.modal-whatsapp {
  background:
    #20b95a;
}

.modal-share {
  background:
    #202832;

  border:
    1px solid
    rgba(255,255,255,.10) !important;
}


/* ================================
   FOOTER
================================ */

footer {
  text-align: center;

  padding:
    30px 20px;

  border-top:
    1px solid
    rgba(255,255,255,.08);

  color:
    #68737d;

  font-size: 12px;

  line-height: 1.7;
}

footer strong {
  color:
    #c9d0d5;
}


/* ================================
   MOBILE
================================ */

@media (max-width: 750px) {

  header {
    padding:
      22px 12px;
  }

  .main-logo {
    width:
      min(350px, 90vw);

    max-height: 190px;
  }

  .brand-name {
    font-size: 23px;
  }

  main {
    width:
      calc(100% - 20px);

    margin-top: 20px;
  }

  .feature-row {
    grid-template-columns:
      repeat(2, 1fr);
  }

  .products-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: 10px;
  }

  .product-image {
    height: 160px;
  }

  .product-content {
    padding: 12px;
  }

  .product-title {
    font-size: 15px;
  }

  .product-description {
    font-size: 11px;
  }

  .product-price {
    font-size: 13px;
  }

  .button-row {
    grid-template-columns:
      1fr;
  }

  .button {
    min-height: 37px;

    font-size: 10px;
  }

  .modal-grid {
    grid-template-columns:
      1fr;
  }

  .main-image {
    height: 280px;
  }

  .modal-details {
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

</style>

</head>


<body>


<header>

  <div class="logo-wrap">

    <img
      class="main-logo"
      src="/aop-logo.png?v=3"
      alt="ALANG ORIGINAL PRODUCTS AOP Logo"
    >

  </div>


  <div class="brand-name">

    ALANG ORIGINAL PRODUCTS

    <span class="brand-short">
      AOP
    </span>

  </div>


  <div class="tagline-window">

    <div class="tagline">

      ALL ORIGINAL ALANG PRODUCTS WILL BE AVAILABLE HERE.

    </div>

  </div>

</header>


<main>


<section class="intro">

  <div class="intro-label">
    ALANG INDUSTRIAL MARKET
  </div>

  <h1>
    ORIGINAL <span>ALANG</span><br>
    PRODUCTS
  </h1>

  <p>
    Discover original industrial products from Alang, Gujarat.
    Explore products, check availability and contact us directly
    for product inquiries.
  </p>

</section>


<div class="feature-row">

  <div class="feature-box">
    ORIGINAL PRODUCTS
  </div>

  <div class="feature-box">
    ALANG INDUSTRIAL MARKET
  </div>

  <div class="feature-box">
    DIRECT INQUIRY
  </div>

  <div class="feature-box">
    QUALITY FOCUSED
  </div>

</div>


<div class="catalogue-label">
  AOP CATALOGUE
</div>

<h2 class="catalogue-title">
  FEATURED PRODUCTS
</h2>


<div class="controls">

  <input
    id="searchInput"
    class="search-input"
    type="search"
    placeholder="Search products..."
  >

  <select
    id="categorySelect"
    class="category-select"
  >

    <option value="all">
      All Categories
    </option>

  </select>

</div>


<div
  id="productCount"
  class="product-count"
>
  0 Products
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

  <br>

  Original industrial products from Alang, Gujarat.

</footer>


<!-- PRODUCT MODAL -->

<div
  id="productModal"
  class="modal"
>

  <div class="modal-box">

    <button
      id="closeModal"
      class="close-button"
    >
      ×
    </button>

    <div
      id="modalContent"
      class="modal-grid"
    ></div>

  </div>

</div>


<script>

const PRODUCTS_DATA =
  ${JSON.stringify(PRODUCTS)};

const WHATSAPP =
  ${JSON.stringify(WHATSAPP_NUMBER)};


/* ================================
   DOM
================================ */

const grid =
  document.getElementById(
    "productsGrid"
  );

const searchInput =
  document.getElementById(
    "searchInput"
  );

const categorySelect =
  document.getElementById(
    "categorySelect"
  );

const productCount =
  document.getElementById(
    "productCount"
  );

const modal =
  document.getElementById(
    "productModal"
  );

const modalContent =
  document.getElementById(
    "modalContent"
  );

const closeModal =
  document.getElementById(
    "closeModal"
  );


/* ================================
   CATEGORIES
================================ */

function loadCategories() {

  const categories =
    [];

  PRODUCTS_DATA.forEach(
    function(product) {

      if (
        product.category &&
        !categories.includes(
          product.category
        )
      ) {

        categories.push(
          product.category
        );

      }

    }
  );

  categories.sort();

  categories.forEach(
    function(category) {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        category;

      option.textContent =
        category;

      categorySelect.appendChild(
        option
      );

    }
  );

}


/* ================================
   WHATSAPP LINK
================================ */

function getWhatsAppLink(product) {

  if (!WHATSAPP) {
    return "#";
  }

  const productUrl =
    window.location.origin +
    window.location.pathname +
    "?product=" +
    encodeURIComponent(
      product.id
    );

  const message =
    "Hello, I am interested in this product: " +
    product.name +
    " | Product Link: " +
    productUrl;

  return (
    "https://wa.me/" +
    WHATSAPP +
    "?text=" +
    encodeURIComponent(
      message
    )
  );

}


/* ================================
   PRODUCT IMAGE
================================ */

function getImage(product) {

  if (
    Array.isArray(
      product.images
    ) &&
    product.images.length > 0
  ) {

    return product.images[0];

  }

  return "";

}


/* ================================
   CREATE CARD
================================ */

function createProductCard(product) {

  const card =
    document.createElement(
      "article"
    );

  card.className =
    "product-card";


  /* Featured */

  if (product.featured) {

    const featured =
      document.createElement(
        "div"
      );

    featured.className =
      "featured-badge";

    featured.textContent =
      "★ FEATURED";

    card.appendChild(
      featured
    );

  }


  /* Image area */

  const imageBox =
    document.createElement(
      "div"
    );

  imageBox.className =
    "product-image";


  const image =
    getImage(product);


  if (image) {

    const img =
      document.createElement(
      
