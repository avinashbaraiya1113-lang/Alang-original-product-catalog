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
      "Original Alang industrial product. Product specifications and details will be available here."
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

const WHATSAPP_NUMBER = "";

const LOGO_SOURCE =
  "https://raw.githubusercontent.com/avinashbaraiya1113-lang/Alang-original-product-catalog/main/src/aop-logo.png";


function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function pageHtml() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width, initial-scale=1.0">

<meta name="description"
      content="ALANG ORIGINAL PRODUCTS - Original industrial products from Alang, Gujarat.">

<title>ALANG ORIGINAL PRODUCTS | AOP</title>

<style>

/* ===== BASIC ===== */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  overflow-x: hidden;

  color: #f5f7f9;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  background:
    radial-gradient(
      circle at 50% -10%,
      rgba(255,20,20,.16),
      transparent 38%
    ),
    linear-gradient(
      180deg,
      #030507 0%,
      #090d12 50%,
      #030507 100%
    );
}

body:before {
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


/* ===== HEADER ===== */

header {
  text-align: center;

  padding:
    28px 15px 24px;

  border-bottom:
    1px solid
    rgba(255,255,255,.10);

  background:
    linear-gradient(
      180deg,
      rgba(12,15,20,.98),
      rgba(4,6,9,.95)
    );

  box-shadow:
    0 15px 45px
    rgba(0,0,0,.45);
}


/* ===== REAL LOGO ===== */

.logo-area {
  display: flex;

  justify-content: center;
  align-items: center;

  margin-bottom: 18px;
}

.aop-logo {
  display: block;

  width:
    min(430px, 88vw);

  max-height: 230px;

  object-fit: contain;

  filter:
    drop-shadow(
      0 0 22px
      rgba(255,20,20,.25)
    );
}


/* ===== BRAND ===== */

.brand {
  font-size:
    clamp(23px, 5vw, 46px);

  font-weight: 900;

  letter-spacing: .08em;

  line-height: 1.15;
}

.brand-red {
  color: #ff2020;
}


/* ===== MOVING TAGLINE ===== */

.tagline-box {
  width: 100%;

  overflow: hidden;

  margin-top: 19px;

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

  color: #ff2424;

  font-size:
    clamp(12px, 2.2vw, 18px);

  font-weight: 900;

  letter-spacing: .12em;

  text-shadow:
    0 0 12px
    rgba(255,0,0,.45);

  animation:
    moveTagline
    15s
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


/* ===== MAIN ===== */

main {
  width:
    min(1200px, calc(100% - 28px));

  margin:
    30px auto 60px;
}


/* ===== INTRO ===== */

.intro {
  text-align: center;

  padding:
    18px 10px 32px;
}

.intro-label {
  color: #ff2020;

  font-size: 12px;

  font-weight: 900;

  letter-spacing: .25em;

  margin-bottom: 14px;
}

.intro h1 {
  font-size:
    clamp(31px, 7vw, 58px);

  line-height: 1.05;

  font-weight: 900;

  margin-bottom: 20px;
}

.intro h1 span {
  color: #ff2020;
}

.intro p {
  max-width: 800px;

  margin: auto;

  color: #929da7;

  font-size:
    clamp(14px, 2vw, 18px);

  line-height: 1.7;
}


/* ===== FEATURES ===== */

.features {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 10px;

  max-width: 900px;

  margin:
    0 auto 42px;
}

.feature {
  padding: 13px 9px;

  text-align: center;

  color: #c9cfd4;

  font-size: 11px;

  font-weight: 800;

  letter-spacing: .06em;

  border:
    1px solid
    rgba(255,255,255,.10);

  border-radius: 9px;

  background:
    rgba(255,255,255,.025);
}

.feature:before {
  content: "◆";

  color: #ff2020;

  margin-right: 6px;
}


/* ===== CATALOGUE ===== */

.catalogue-label {
  text-align: center;

  color: #ff2020;

  font-size: 12px;

  font-weight: 900;

  letter-spacing: .28em;

  margin-bottom: 9px;
}

.catalogue-title {
  text-align: center;

  font-size:
    clamp(27px, 6vw, 45px);

  margin-bottom: 24px;
}


/* ===== CONTROLS ===== */

.controls {
  display: flex;

  flex-wrap: wrap;

  gap: 10px;

  margin-bottom: 15px;
}

.search {
  flex: 1 1 300px;

  min-width: 0;

  padding:
    15px 17px;

  border:
    1px solid
    rgba(255,255,255,.11);

  border-radius: 11px;

  outline: none;

  color: white;

  background:
    rgba(255,255,255,.035);

  font-size: 15px;
}

.search:focus {
  border-color:
    rgba(255,30,30,.65);

  box-shadow:
    0 0 0 3px
    rgba(255,20,20,.08);
}

.category {
  flex:
    0 1 220px;

  padding:
    15px 17px;

  border:
    1px solid
    rgba(255,255,255,.11);

  border-radius: 11px;

  outline: none;

  color: white;

  background: #0d1218;

  font-size: 15px;
}

.count {
  color: #7f8a94;

  font-size: 13px;

  margin-bottom: 15px;
}


/* ===== PRODUCTS ===== */

.products {
  display: grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(250px, 1fr)
    );

  gap: 18px;
}


/* ===== PRODUCT CARD ===== */

.card {
  position: relative;

  overflow: hidden;

  border:
    1px solid
    rgba(255,255,255,.11);

  border-radius: 17px;

  background:
    linear-gradient(
      145deg,
      #141a20,
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

.card:hover {
  transform:
    translateY(-5px);

  border-color:
    rgba(255,30,30,.45);

  box-shadow:
    0 20px 50px
    rgba(0,0,0,.50);
}


/* ===== IMAGE ===== */

.card-image {
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

.card-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  transition:
    transform .4s ease;
}

.card:hover .card-image img {
  transform:
    scale(1.05);
}

.placeholder {
  color: #5e6973;

  text-align: center;

  font-size: 13px;

  font-weight: 900;

  letter-spacing: .12em;
}


/* ===== BADGES ===== */

.featured {
  position: absolute;

  top: 12px;
  left: 12px;

  z-index: 4;

  padding:
    7px 10px;

  border-radius: 6px;

  color: white;

  background: #ff2020;

  font-size: 10px;

  font-weight: 900;
}

.stock {
  position: absolute;

  top: 12px;
  right: 12px;

  z-index: 4;

  padding:
    7px 10px;

  border-radius: 6px;

  background:
    rgba(0,0,0,.70);

  border:
    1px solid
    rgba(255,255,255,.15);

  font-size: 10px;

  font-weight: 900;
}

.in-stock {
  color: #65ed8d;
}

.out-stock {
  color: #ff6868;
}


/* ===== CARD CONTENT ===== */

.card-content {
  padding: 17px;
}

.card-category {
  color: #8d98a3;

  font-size: 10px;

  font-weight: 900;

  letter-spacing: .14em;

  text-transform: uppercase;

  margin-bottom: 8px;
}

.card-title {
  font-size: 20px;

  font-weight: 900;

  line-height: 1.25;

  margin-bottom: 9px;
}

.card-description {
  color: #8d98a3;

  font-size: 13px;

  line-height: 1.55;

  min-height: 40px;

  margin-bottom: 13px;
}

.card-price {
  font-size: 17px;

  font-weight: 900;

  margin-bottom: 13px;
}


/* ===== BUTTONS ===== */

.buttons {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 8px;
}

.btn {
  min-height: 42px;

  border-radius: 9px;

  border: none;

  cursor: pointer;

  display: flex;

  align-items: center;
  justify-content: center;

  text-decoration: none;

  font-size: 11px;

  font-weight: 900;
}

.view {
  color: white;

  background: #222b34;

  border:
    1px solid
    rgba(255,255,255,.10);
}

.whatsapp {
  color: white;

  background: #20b95a;
}


/* ===== EMPTY ===== */

.empty {
  grid-column: 1 / -1;

  padding: 60px 20px;

  text-align: center;

  color: #7f8a94;

  border:
    1px dashed
    rgba(255,255,255,.15);

  border-radius: 15px;
}


/* ===== MODAL ===== */

.modal {
  position: fixed;

  inset: 0;

  z-index: 9999;

  display: none;

  align-items: center;
  justify-content: center;

  padding: 15px;

  background:
    rgba(0,0,0,.85);

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

  max-height: 92vh;

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

.close {
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
    rgba(0,0,0,.70);

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
  height: 430px;

  object-fit: cover;

  border-radius: 14px;

  background: #090d11;
}

.thumbs {
  display: flex;

  gap: 8px;

  overflow-x: auto;

  margin-top: 10px;
}

.thumb {
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

.details {
  padding:
    35px 25px 25px;
}

.details-category {
  color: #9ba5ae;

  font-size: 11px;

  font-weight: 900;

  letter-spacing: .15em;

  margin-bottom: 10px;
}

.details h2 {
  font-size:
    clamp(25px, 5vw, 40px);

  line-height: 1.15;

  margin-bottom: 15px;
}

.details-price {
  font-size: 24px;

  font-weight: 900;

  margin-bottom: 15px;
}

.details-description {
  color: #9ba5ae;

  line-height: 1.7;

  font-size: 14px;

  margin-bottom: 25px;
}

.modal-buttons {
  display: flex;

  flex-direction: column;

  gap: 10px;
}

.modal-buttons a,
.modal-buttons button {
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

.modal-wa {
  background: #20b95a;
}

.modal-share {
  background: #202832;

  border:
    1px solid
    rgba(255,255,255,.10) !important;
}


/* ===== FOOTER ===== */

footer {
  text-align: center;

  padding: 30px 20px;

  border-top:
    1px solid
    rgba(255,255,255,.08);

  color: #68737d;

  font-size: 12px;

  line-height: 1.7;
}

footer strong {
  color: #c9d0d5;
}


/* ===== MOBILE ===== */

@media (max-width: 750px) {

  header {
    padding:
      22px 12px;
  }

  .aop-logo {
    width:
      min(350px, 90vw);

    max-height: 190px;
  }

  .brand {
    font-size: 23px;
  }

  main {
    width:
      calc(100% - 20px);

    margin-top: 20px;
  }

  .features {
    grid-template-columns:
      repeat(2, 1fr);
  }

  .products {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: 10px;
  }

  .card-image {
    height: 160px;
  }

  .card-content {
    padding: 12px;
  }

  .card-title {
    font-size: 15px;
  }

  .card-description {
    font-size: 11px;
  }

  .card-price {
    font-size: 13px;
  }

  .buttons {
    grid-template-columns:
      1fr;
  }

  .btn {
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

  .details {
    padding:
      10px 18px 22px;
  }

}

@media (max-width: 390px) {

  .products {
    grid-template-columns:
      1fr;
  }

  .card-image {
    height: 210px;
  }

}

</style>

</head>


<body>


<header>

  <div class="logo-area">

    <img
      class="aop-logo"
      src="/aop-logo.png?v=4"
      alt="ALANG ORIGINAL PRODUCTS AOP Logo"
    >

  </div>


  <div class="brand">

    ALANG ORIGINAL PRODUCTS

    <span class="brand-red">
      AOP
    </span>

  </div>


  <div class="tagline-box">

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


<div class="features">

  <div class="feature">
    ORIGINAL PRODUCTS
  </div>

  <div class="feature">
    ALANG INDUSTRIAL MARKET
  </div>

  <div class="feature">
    DIRECT INQUIRY
  </div>

  <div class="feature">
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
    id="search"
    class="search"
    type="search"
    placeholder="Search products..."
  >

  <select
    id="category"
    class="category"
  >

    <option value="all">
      All Categories
    </option>

  </select>

</div>


<div
  id="count"
  class="count"
>
  0 Products
</div>


<div
  id="products"
  class="products"
></div>


</main>


<footer>

  <strong>
    ALANG ORIGINAL PRODUCTS (AOP)
  </strong>

  <br>

  Original industrial products from Alang, Gujarat.

</footer>


<div
  id="modal"
  class="modal"
>

  <div class="modal-box">

    <button
      id="close"
      class="close"
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

var PRODUCTS_DATA =
  ${JSON.stringify(PRODUCTS)};

var WHATSAPP =
  ${JSON.stringify(WHATSAPP_NUMBER)};


var productsElement =
  document.getElementById("products");

var searchElement =
  document.getElementById("search");

var categoryElement =
  document.getElementById("category");

var countElement =
  document.getElementById("count");

var modalElement =
  document.getElementById("modal");

var modalContentElement =
  document.getElementById("modalContent");

var closeElement =
  document.getElementById("close");


/* ===== CATEGORIES ===== */

function loadCategories() {

  var categories = [];

  PRODUCTS_DATA.forEach(function(product) {

    if (
      product.category &&
      categories.indexOf(product.category) === -1
    ) {

      categories.push(
        product.category
      );

    }

  });

  categories.sort();

  categories.forEach(function(category) {

    var option =
      document.createElement("option");

    option.value =
      category;

    option.textContent =
      category;

    categoryElement.appendChild(
      option
    );

  });

}


/* ===== PRODUCT IMAGE ===== */

function firstImage(product) {

  if (
    Array.isArray(product.images) &&
    product.images.length > 0
  ) {

    return product.images[0];

  }

  return "";

}


/* ===== WHATSAPP ===== */

function whatsappLink(product) {

  if (!WHATSAPP) {
    return "#";
  }

  var productUrl =
    window.location.origin +
    window.location.pathname +
    "?product=" +
    encodeURIComponent(product.id);

  var message =
    "Hello, I am interested in this product: " +
    product.name +
    " | Product Link: " +
    productUrl;

  return (
    "https://wa.me/" +
    WHATSAPP +
    "?text=" +
    encodeURIComponent(message)
  );

}


/* ===== PRODUCT CARD ===== */

function makeCard(product) {

  var card =
    document.createElement("article");

  card.className =
    "card";


  if (product.featured) {

    var featured =
      document.createElement("div");

    featured.className =
      "featured";

    featured.textContent =
      "★ FEATURED";

    card.appendChild(
      featured
    );

  }


  var imageBox =
    document.createElement("div");

  imageBox.className =
    "card-image";


  var image =
    firstImage(product);


  if (image) {

    var img =
      document.createElement("img");

    img.src =
      image;

    img.alt =
      product.name;

    img.loading =
      "lazy";

    imageBox.appendChild(
      img
    );

  } else {

    var placeholder =
      document.createElement("div");

    placeholder.className =
      "placeholder";

    placeholder.innerHTML =
      "AOP PRODUCT<br>IMAGE";

    imageBox.appendChild(
      placeholder
    );

  }


  var stock =
    document.createElement("div");

  stock.className =
    "stock " +
    (
      String(product.stock)
        .toLowerCase()
        .indexOf("out") !== -1
        ? "out-stock"
        : "in-stock"
    );

  stock.textContent =
    product.stock;

  imageBox.appendChild(
    stock
  );


  card.appendChild(
    imageBox
  );


  var content =
    document.createElement("div");

  content.className =
    "card-content";


  var category =
    document.createElement("div");

  category.className =
    "card-category";

  category.textContent =
    product.category;


  var title =
    document.createElement("div");

  title.className =
    "card-title";

  title.textContent =
    product.name;


  var description =
    document.createElement("div");

  description.className =
    "card-description";

  description.textContent =
    product.description;


  var price =
    document.createElement("div");

  price.className =
    "card-price";

  price.textContent =
    product.price;


  var buttons =
    document.createElement("div");

  buttons.className =
    "buttons";


  var view =
    document.createElement("button");

  view.className =
    "btn view";

  view.textContent =
    "VIEW PRODUCT";

  view.onclick =
    function() {
      openProduct(product.id);
    };


  var wa =
    document.createElement("a");

  wa.className =
    "btn whatsapp";

  wa.textContent =
    "WHATSAPP";


  if (WHATSAPP) {

    wa.href =
      whatsappLink(product);

    wa.target =
      "_blank";

    wa.rel =
      "noopener";

  } else {

    wa.href =
      "#";

    wa.onclick =
      function(event) {

        event.preventDefault();

        openProduct(
          product.id
        );

      };

  }


  buttons.appendChild(view);
  buttons.appendChild(wa);


  content.appendChild(category);
  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(price);
  content.appendChild(buttons);


  card.appendChild(
    content
  );


  return card;

}


/* ===== RENDER ===== */

function renderProducts() {

  var search =
    searchElement.value
      .trim()
      .toLowerCase();

  var selected =
    categoryElement.value;


  var filtered =
    PRODUCTS_DATA.filter(
      function(product) {

        var text =
          (
            product.name +
            " " +
            product.category +
            " " +
            product.description
          ).toLowerCase();


        var matchesSearch =
          !search ||
          text.indexOf(search) !== -1;


        var matchesCategory =
          selected === "all" ||
          product.category === selected;


        return (
          matchesSearch &&
          matchesCategory
        );

      }
    );


  productsElement.innerHTML =
    "";


  countElement.te
