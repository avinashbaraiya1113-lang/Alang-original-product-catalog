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
      "Original Alang industrial product. Detailed specifications, availability and multiple product photographs will be available here."
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
      "Original industrial product sourced from Alang, Gujarat. Contact us for product details and availability."
  }
];

/*
  ============================================================
  AOP SETTINGS
  ============================================================
*/

/*
  Add your WhatsApp number later.

  IMPORTANT:
  Enter country code + number WITHOUT + or spaces.

  Example:
  919825328625

  For now keep it empty.
*/
const WHATSAPP_NUMBER = "";


/*
  Your logo is stored in the GitHub repository as:

  src/aop-logo.png

  This temporary URL lets the Cloudflare Worker display it.
*/
const LOGO_URL =
  "https://raw.githubusercontent.com/avinashbaraiya1113-lang/Alang-original-product-catalog/main/src/aop-logo.png";


/*
  ============================================================
  PRODUCT HELPERS
  ============================================================
*/

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function productImage(product) {

  if (product.images && product.images.length > 0) {

    return `
      <img
        src="${escapeHTML(product.images[0])}"
        alt="${escapeHTML(product.name)}"
        loading="lazy"
      >
    `;

  }

  return `
    <div class="product-placeholder">

      <div class="placeholder-grid"></div>

      <div class="placeholder-aop">
        AOP
      </div>

      <div class="placeholder-label">
        PRODUCT IMAGE
      </div>

      <div class="placeholder-line"></div>

    </div>
  `;
}


function productCard(product) {

  const searchData = (
    product.name +
    " " +
    product.category +
    " " +
    product.description
  ).toLowerCase();

  return `
    <article
      class="product-card"
      data-id="${product.id}"
      data-search="${escapeHTML(searchData)}"
      data-category="${escapeHTML(product.category.toLowerCase())}"
    >

      <div class="product-image">

        ${productImage(product)}

        <div class="image-corner top-left"></div>
        <div class="image-corner top-right"></div>
        <div class="image-corner bottom-left"></div>
        <div class="image-corner bottom-right"></div>

        ${
          product.featured
            ? `<div class="featured">★ FEATURED</div>`
            : ""
        }

        <div
          class="stock ${
            product.stock === "In Stock"
              ? "available"
              : "sold"
          }"
        >
          <span></span>
          ${escapeHTML(product.stock)}
        </div>

        <div class="product-number">
          AOP-${String(product.id).padStart(3, "0")}
        </div>

      </div>


      <div class="product-content">

        <div class="category">
          ${escapeHTML(product.category)}
        </div>

        <h3>
          ${escapeHTML(product.name)}
        </h3>

        <p>
          ${escapeHTML(product.description)}
        </p>


        <div class="product-meta">

          <div class="price">
            ${escapeHTML(product.price)}
          </div>

          <div class="photo-count">
            <span>▧</span>
            ${product.images ? product.images.length : 0} Photos
          </div>

        </div>


        <div class="product-actions">

          <button
            class="btn-primary"
            onclick="openProduct(${product.id})"
          >
            VIEW PRODUCT
          </button>

          <button
            class="btn-share"
            onclick="shareProduct(${product.id})"
            aria-label="Share product"
          >
            ↗
          </button>

        </div>


        <button
          class="whatsapp-btn"
          onclick="inquire(${product.id})"
        >
          <span class="wa-icon">◉</span>
          WHATSAPP INQUIRY
        </button>

      </div>

    </article>
  `;
}


function renderProducts(products) {

  if (!products.length) {

    return `
      <div class="no-results">

        <div class="no-results-icon">
          AOP
        </div>

        <h3>
          NO PRODUCTS FOUND
        </h3>

        <p>
          Try another product name or category.
        </p>

      </div>
    `;
  }

  return products.map(productCard).join("");
}


/*
  ============================================================
  HTML
  ============================================================
*/

const html = `<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <meta
    name="theme-color"
    content="#050607"
  >

  <meta
    name="description"
    content="ALANG ORIGINAL PRODUCTS — Original industrial products from Alang, Gujarat."
  >

  <meta
    property="og:title"
    content="ALANG ORIGINAL PRODUCTS | AOP"
  >

  <meta
    property="og:description"
    content="Original industrial products from Alang, Gujarat."
  >

  <title>
    ALANG ORIGINAL PRODUCTS | AOP
  </title>


  <style>

    /* ========================================================
       RESET
       ======================================================== */

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }


    :root {

      --red: #e50914;
      --red-bright: #ff1b26;
      --red-dark: #720008;

      --black: #030405;
      --dark: #080a0c;
      --panel: #0d1013;
      --panel-2: #111519;

      --steel: #c9ced2;
      --steel-dark: #737a80;

      --white: #f5f5f5;
      --muted: #8d9499;

      --border: rgba(255,255,255,.12);

      --shadow:
        0 20px 60px rgba(0,0,0,.55);
    }


    html {
      scroll-behavior: smooth;
    }


    body {

      font-family:
        Arial,
        Helvetica,
        sans-serif;

      background:

        radial-gradient(
          circle at 50% -15%,
          rgba(229,9,20,.20),
          transparent 32%
        ),

        radial-gradient(
          circle at 100% 50%,
          rgba(229,9,20,.06),
          transparent 30%
        ),

        linear-gradient(
          180deg,
          #030405 0%,
          #080a0c 40%,
          #050607 100%
        );

      color: var(--white);

      min-height: 100vh;

      overflow-x: hidden;
    }


    /* ========================================================
       INDUSTRIAL GRID
       ======================================================== */

    body::before {

      content: "";

      position: fixed;

      inset: 0;

      pointer-events: none;

      opacity: .07;

      background-image:

        linear-gradient(
          rgba(255,255,255,.25) 1px,
          transparent 1px
        ),

        linear-gradient(
          90deg,
          rgba(255,255,255,.25) 1px,
          transparent 1px
        );

      background-size: 48px 48px;

      mask-image:
        linear-gradient(
          to bottom,
          black,
          transparent 85%
        );

      z-index: 0;
    }


    /* ========================================================
       HEADER
       ======================================================== */

    header {

      position: relative;

      text-align: center;

      padding:
        24px
        18px
        0;

      overflow: hidden;

      z-index: 2;
    }


    .top-line {

      height: 2px;

      width: 100%;

      background:

        linear-gradient(
          90deg,
          transparent,
          var(--red),
          #ffffff,
          var(--red),
          transparent
        );

      box-shadow:
        0 0 8px var(--red),
        0 0 22px rgba(229,9,20,.6);

      margin-bottom: 28px;

      position: relative;
    }


    .top-line::after {

      content: "";

      position: absolute;

      left: -20%;

      top: -2px;

      width: 20%;

      height: 6px;

      background: white;

      filter: blur(4px);

      animation:
        scanLine 4s linear infinite;
    }


    @keyframes scanLine {

      0% {
        left: -20%;
      }

      100% {
        left: 120%;
      }
    }


    /* ========================================================
       LOGO
       ======================================================== */

    .logo-area {

      display: flex;

      flex-direction: column;

      align-items: center;

      gap: 13px;
    }


    .main-logo {

      width: min(
        420px,
        88vw
      );

      max-height: 190px;

      object-fit: contain;

      filter:
        drop-shadow(
          0 0 18px
          rgba(229,9,20,.22)
        );

      animation:
        logoAppear .9s ease both;
    }


    @keyframes logoAppear {

      from {

        opacity: 0;

        transform:
          scale(.92)
          translateY(-10px);
      }

      to {

        opacity: 1;

        transform:
          scale(1)
          translateY(0);
      }
    }


    /* ========================================================
       BRAND NAME
       ======================================================== */

    .brand-name {

      font-size:
        clamp(
          23px,
          6vw,
          48px
        );

      font-weight: 900;

      letter-spacing:
        clamp(
          1px,
          .7vw,
          5px
        );

      text-transform: uppercase;

      color: #ffffff;

      text-shadow:
        0 0 20px
        rgba(255,255,255,.08);
    }


    .brand-name span {

      color: var(--red);

      text-shadow:
        0 0 18px
        rgba(229,9,20,.35);
    }


    /* ========================================================
       MOVING TAGLINE
       ======================================================== */

    .tagline-window {

      margin:
        28px auto
        0;

      max-width: 1100px;

      overflow: hidden;

      position: relative;

      border-top:
        1px solid
        rgba(229,9,20,.65);

      border-bottom:
        1px solid
        rgba(229,9,20,.65);

      background:
        linear-gradient(
          90deg,
          rgba(229,9,20,.03),
          rgba(255,255,255,.035),
          rgba(229,9,20,.03)
        );

      box-shadow:

        inset
        0 0 25px
        rgba(229,9,20,.06),

        0 0 25px
        rgba(0,0,0,.6);
    }


    .tagline-window::before,
    .tagline-window::after {

      content: "";

      position: absolute;

      top: 0;

      width: 80px;

      height: 100%;

      z-index: 2;

      pointer-events: none;
    }


    .tagline-window::before {

      left: 0;

      background:
        linear-gradient(
          90deg,
          #050607,
          transparent
        );
    }


    .tagline-window::after {

      right: 0;

      background:
        linear-gradient(
          270deg,
          #050607,
          transparent
        );
    }


    .tagline {

      display: inline-block;

      white-space: nowrap;

      padding:
        14px
        0;

      font-size: 13px;

      font-weight: 900;

      letter-spacing: 3px;

      color:
        var(--red-bright);

      text-shadow:
        0 0 12px
        rgba(229,9,20,.7);

      animation:
        marquee 16s linear infinite;
    }


    @keyframes marquee {

      from {
        transform: translateX(100%);
      }

      to {
        transform: translateX(-100%);
      }
    }


    /* ========================================================
       HERO
       ======================================================== */

    .hero {

      position: relative;

      max-width: 1100px;

      margin:
        35px auto
        0;

      padding:
        40px 20px
        45px;

      text-align: center;

      z-index: 1;
    }


    .hero::before {

      content: "";

      position: absolute;

      width: 280px;

      height: 280px;

      left: 50%;

      top: 20px;

      transform:
        translateX(-50%);

      background:
        radial-gradient(
          circle,
          rgba(229,9,20,.09),
          transparent 70%
        );

      filter: blur(20px);

      pointer-events: none;
    }


    .hero-kicker {

      color: var(--red);

      font-size: 11px;

      font-weight: 900;

      letter-spacing: 5px;

      margin-bottom: 15px;

      position: relative;
    }


    .hero h1 {

      position: relative;

      font-size:
        clamp(
          38px,
          8vw,
          76px
        );

      line-height: .95;

      text-transform: uppercase;

      letter-spacing:
        clamp(
          1px,
          .5vw,
          4px
        );

      margin-bottom: 23px;
    }


    .hero h1 .red {

      color: var(--red);

      text-shadow:
        0 0 30px
        rgba(229,9,20,.3);
    }


    .hero p {

      position: relative;

      max-width: 730px;

      margin: auto;

      color: var(--muted);

      line-height: 1.8;

      font-size: 15px;
    }


    /* ========================================================
       BADGES
       ======================================================== */

    .hero-badges {

      display: flex;

      flex-wrap: wrap;

      justify-content: center;

      gap: 10px;

      margin-top: 28px;

      position: relative;
    }


    .badge {

      border:
        1px solid
        rgba(255,255,255,.12);

      padding:
        10px 15px;

      background:
        rgba(255,255,255,.025);

      font-size: 10px;

      font-weight: 900;

      letter-spacing: 1.5px;

      color: #c7c9ca;

      position: relative;

      overflow: hidden;
    }


    .badge::before {

      content: "◆";

      color: var(--red);

      margin-right: 7px;
    }


    .badge::after {

      content: "";

      position: absolute;

      left: -100%;

      top: 0;

      width: 50%;

      height: 100%;

      background:
        linear-gradient(
          90deg,
          transparent,
          rgba(255,255,255,.08),
          transparent
        );

      animation:
        badgeShine 5s linear infinite;
    }


    @keyframes badgeShine {

      0% {
        left: -100%;
      }

      30%,
      100% {
        left: 150%;
      }
    }


    /* ========================================================
       CATALOGUE
       ======================================================== */

    .catalogue {

      position: relative;

      max-width: 1250px;

      margin: auto;

      padding:
        15px 18px
        80px;

      z-index: 2;
    }


    .section-title {

      text-align: center;

      margin-bottom: 28px;
    }


    .section-title small {

      color: var(--red);

      font-size: 11px;

      letter-spacing: 5px;

      font-weight: 900;
    }


    .section-title h2 {

      margin-top: 8px;

      font-size:
        clamp(
          28px,
          5vw,
          42px
        );

      text-transform: uppercase;

      letter-spacing: 1px;
    }


    .section-line {

      width: 80px;

      height: 2px;

      background: var(--red);

      margin:
        15px auto
        0;

      box-shadow:
        0 0 12px
        rgba(229,9,20,.8);
    }


    /* ========================================================
       SEARCH
       ======================================================== */

    .tools {

      display: flex;

      gap: 10px;

      max-width: 1000px;

      margin:
        0 auto
        30px;

      flex-wrap: wrap;
    }


    .search-wrap {

      flex: 1;

      min-width: 220px;

      position: relative;
    }


    .search {

      width: 100%;

      padding:
        15px
        45px
        15px
        16px;

      background:
        rgba(10,12,14,.9);

      color: white;

      border:
        1px solid
        rgba(255,255,255,.13);

      outline: none;

      border-radius: 4px;

      font-size: 14px;
    }


    .search:focus {

      border-color:
        var(--red);

      box-shadow:
        0 0 18px
        rgba(229,9,20,.13);
    }


    .search-icon {

      position: absolute;

      right: 15px;

      top: 50%;

      transform:
        translateY(-50%);

      color: #777;

      pointer-events: none;
    }


    .category-btn {

      padding:
        12px 16px;

      min-height: 48px;

      background:
        #0e1113;

      color: #aaa;

      border:
        1px solid
        rgba(255,255,255,.12);

      cursor: pointer;

      border-radius: 4px;

      font-weight: 800;

      font-size: 11px;

      letter-spacing: 1px;

      transition: .25s;
    }


    .category-btn:hover,
    .category-btn.active {

      background:
        var(--red);

      color: white;

      border-color:
        var(--red);

      box-shadow:
        0 0 18px
        rgba(229,9,20,.25);
    }


    /* ========================================================
       PRODUCTS GRID
       ======================================================== */

    .products {

      display: grid;

      grid-template-columns:
        repeat(
          auto-fit,
          minmax(
            280px,
            1fr
          )
        );

      gap: 22px;
    }


    /* ========================================================
       PRODUCT CARD
       ======================================================== */

    .product-card {

      position: relative;

      background:
        linear-gradient(
          145deg,
          rgba(255,255,255,.055),
          rgba(255,255,255,.012)
        );

      border:
        1px solid
        rgba(255,255,255,.11);

      overflow: hidden;

      transition:
        transform .35s ease,
        border-color .35s ease,
        box-shadow .35s ease;

      box-shadow:
        0 12px 35px
        rgba(0,0,0,.35);
    }


    .product-card:hover {

      transform:
        translateY(-7px);

      border-color:
        rgba(229,9,20,.55);

      box-shadow:
        0 25px 60px
        rgba(0,0,0,.55),
        0 0 25px
        rgba(229,9,20,.08);
    }


    .product-card::after {

      content: "";

      position: absolute;

      top: 0;

      left: -100%;

      width: 60%;

      height: 1px;

      background:
        linear-gradient(
          90deg,
          transparent,
          var(--red),
          transparent
        );

      transition:
        left .7s ease;
    }


    .product-card:hover::after {

      left: 140%;
    }


    /* ========================================================
       PRODUCT IMAGE
       ======================================================== */

    .product-image {

      height: 255px;

      background:
        #080a0c;

      position: relative;

      overflow: hidden;

      display: flex;

      align-items: center;

      justify-content: center;
    }


    .product-image img {

      width: 100%;

      height: 100%;

      object-fit: cover;

      transition:
        transform .5s ease;
    }


    .product-card:hover
    .product-image img {

      transform:
        scale(1.04);
    }


    /* ========================================================
       PRODUCT PLACEHOLDER
       ======================================================== */

    .product-placeholder {

      width: 100%;

      height: 100%;

      display: flex;

      flex-direction: column;

      align-items: center;

      justify-content: center;

      position: relative;

      background:

        radial-gradient(
          circle at center,
          #20252a,
          #070809 65%
        );

      overflow: hidden;
    }


    .placeholder-grid {

      position: absolute;

      inset: 0;

      opacity: .12;

      background-image:

        linear-gradient(
          rgba(255,255,255,.25) 1px,
          transparent 1px
        ),

        linear-gradient(
          90deg,
          rgba(255,255,255,.25) 1px,
          transparent 1px
        );

      background-size:
        28px 28px;
    }


    .placeholder-aop {

      position: relative;

      font-size: 58px;

      font-weight: 900;

      letter-spacing: 8px;

      color: #30363b;

      text-shadow:
        0 2px 0 #080909;
    }


    .placeholder-label {

      position: relative;

      color: #646b70;

      font-size: 9px;

      letter-spacing: 4px;

      margin-top: 5px;
    }


    .placeholder-line {

      position: relative;

      width: 90px;

      height: 1px;

      margin-top: 13px;

      background:
        var(--red);

      box-shadow:
        0 0 10px
        var(--red);
    }


    /* ========================================================
       CORNERS
       ======================================================== */

    .image-corner {

      position: absolute;

      width: 18px;

      height: 18px;

      z-index: 3;

      opacity: .8;
    }


    .top-left {

      top: 10px;

      left: 10px;

      border-top:
        1px solid var(--red);

      border-left:
        1px solid var(--red);
    }


    .top-right {

      top: 10px;

      right: 10px;

      border-top:
        1px solid var(--red);

      border-right:
        1px solid var(--red);
    }


    .bottom-left {

      bottom: 10px;

      left: 10px;

      border-bottom:
        1px solid var(--red);

      border-left:
        1px solid var(--red);
    }


    .bottom-right {

      bottom: 10px;

      right: 10px;

      border-bottom:
        1px solid var(--red);

      border-right:
        1px solid var(--red);
    }


    /* ========================================================
       BADGES
       ======================================================== */

    .featured {

      position: absolute;

      top: 14px;

      left: 14px;

      background:
        var(--red);

      color: white;

      padding:
        7px 10px;

      font-size: 9px;

      font-weight: 900;

      letter-spacing: 1px;

      box-shadow:
        0 0 18px
        rgba(229,9,20,.25);
    }


    .stock {

      position: absolute;

      top: 14px;

      right: 14px;

      background:
        rgba(0,0,0,.78);

      border:
        1px solid
        rgba(255,255,255,.16);

      padding:
        7px 10px;

      font-size: 9px;

      font-weight: 900;

      letter-spacing: 1px;

      backdrop-filter:
        blur(6px);
    }


    .stock span {

      display: inline-block;

      width: 6px;

      height: 6px;

      border-radius: 50%;

      margin-right: 6px;

      background: currentColor;
    }


    .stock.available {

      color:
        #63e68a;
    }


    .stock.sold {

      color:
        #ff5252;
    }


    .product-number {

      position: absolute;

      bottom: 12px;

      right: 14px;

      color:
        rgba(255,255,255,.45);

      font-size: 9px;

      font-weight: 900;

      letter-spacing: 2px;
    }


    /* ========================================================
       PRODUCT CONTENT
       ======================================================== */

    .product-content {

      padding: 21px;
    }


    .category {

      color:
        var(--red);

      font-size: 9px;

      letter-spacing: 3px;

      font-weight: 900;

      text-transform: uppercase;

      margin-bottom: 9px;
    }


    .product-content h3 {

      font-size: 20px;

      line-height: 1.2;

      margin-bottom: 10px;
    }


    .product-content p {

      color:
        #858c91;

      font-size: 13px;

      line-height: 1.65;

      min-height: 65px;
    }


    .product-meta {

      display: flex;

      justify-content:
        space-between;

      align-items: center;

      gap: 10px;

      border-top:
        1px solid
        rgba(255,255,255,.08);

      margin-top: 17px;

      padding-top: 15px;
    }


    .price {

      color: #eeeeee;

      font-size: 17px;

      font-weight: 900;
    }


    .photo-count {

      color: #666d72;

      font-size: 10px;

      font-weight: 700;

      letter-spacing: .5px;
    }


    .photo-count span {

      color:
        var(--red);

      margin-right: 4px;
    }


    /* ========================================================
       ACTIONS
       ======================================================== */

    .product-actions {

      display: flex;

      gap: 8px;

      margin-top: 15px;
    }


    .btn-primary {

      flex: 1;

      border: 0;

      background:
        var(--red);

      color: white;

      padding:
        12px;

      cursor: pointer;

      font-size: 10px;

      font-weight: 900;

      letter-spacing: 1px;

      transition: .25s;
    }


    .btn-primary:hover {

      background:
        var(--red-bright);

      box-shadow:
        0 0 18px
        rgba(229,9,20,.3);
    }


    .btn-share {

      width: 45px;

      border:
        1px solid
        rgba(255,255,255,.13);

      background:
        #101316;

      color: #ddd;

      cursor: pointer;

      font-size: 18px;

      transition: .25s;
    }


    .btn-share:hover {

      color:
        white;

      border-color:
        var(--red);

      background:
        #171a1d;
    }


    .whatsapp-btn {

      width: 100%;

      margin-top: 8px;

      border:
        1px solid
        rgba(80,220,120,.22);

      background:
        rgba(50,180,90,.06);

      color:
        #72df91;

      padding:
        11px;

      cursor: pointer;

      font-size: 9px;

      font-weight: 900;

      letter-spacing: 1.2px;

      transition: .25s;
    }


    .whatsapp-btn:hover {

      background:
        rgba(50,180,90,.13);

      border-color:
        rgba(80,220,120,.5);
    }


    .wa-icon {

      margin-right: 5px;
    }


    /* ========================================================
       NO RESULTS
       ======================================================== */

    .no-results {

      grid-column:
        1 / -1;

      text-align: center;

      padding:
        70px 20px;

      border:
        1px solid
        rgba(255,255,255,.08);

      background:
        rgba(255,255,255,.02);
    }


    .no-results-icon {

      font-size: 42px;

      font-weight: 900;

      color:
        #2c3034;

      letter-spacing: 5px;

      margin-bottom: 15px;
    }


    .no-results h3 {

      font-size: 18px;

      margin-bottom: 8px;
    }


    .no-results p {

      color:
        #6d7478;

      font-size: 13px;
    }


    /* ========================================================
       PRODUCT MODAL
       ======================================================== */

    .modal {

      position: fixed;

      inset: 0;

      background:
        rgba(0,0,0,.88);

      backdrop-filter:
        blur(10px);

      z-index: 1000;

      display: none;

      align-items: center;

      justify-content: center;

      padding: 18px;
    }


    .modal.show {

      display: flex;
    }


    .modal-box {

      width:
        min(
          760px,
          100%
        );

      max-height:
        90vh;

      overflow-y:
        auto;

      background:
        linear-gradient(
          145deg,
          #15191c,
          #080a0c
        );

      border:
        1px solid
        rgba(229,9,20,.45);

      box-shadow:
        0 30px 100px
        rgba(0,0,0,.75);

      position: relative;
    }


    .modal-close {

      position: absolute;

      right: 12px;

      top: 12px;

      width: 38px;

      height: 38px;

      border:
        1px solid
        rgba(255,255,255,.15);

      background:
        rgba(0,0,0,.65);

      color: white;

      cursor: pointer;

      font-size: 20px;

      z-index: 5;
    }


    .modal-image {

      height:
        min(
          420px,
          55vh
        );

      background:
        #070809;

      display: flex;

      align-items: center;

      justify-content: center;
    }


    .modal-image img {

      width: 100%;

      height: 100%;

      object-fit: contain;
    }


    .modal-content {

      padding: 25px;
    }


    .modal-content .category {

      margin-bottom: 7px;
    }


    .modal-content h2 {

      font-size:
        clamp(
          25px,
          6vw,
          38px
        );

      margin-bottom: 12px;
    }


    .modal-content p {

      color:
        #92999d;

      line-height: 1.8;

      font-size: 14px;
    }


    .modal-actions {

      display: flex;

      gap: 10px;

      margin-top: 20px;
    }


    .modal-actions button {

      flex: 1;

      padding: 13px;

      border: 0;

      cursor: pointer;

      font-weight: 900;

      font-size: 10px;

      letter-spacing: 1px;
    }


    .modal-wa {

      background:
        #20a85a;

      color: white;
    }


    .modal-share {

      background:
        #191d20;

      color: white;

      border:
        1px solid
        rgba(255,255,255,.1) !important;
    }


    /* ========================================================
       FOOTER
       ======================================================== */

    footer {

      position: relative;

      border-top:
        1px solid
        rgba(255,255,255,.1);

      text-align: center;

      padding:
        40px 20px;

      color:
        #626a6f;

      font-size: 11px;

      z-index: 2;
    }


    footer strong {

      color:
        #c9c9c9;

      letter-spacing: 2px;
    }


    .footer-red {

      color:
        var(--red);
    }


    .footer-line {

      width: 70px;

      height: 1px;

      background:
        var(--red);

      margin:
        15px auto;
    }


    /* ========================================================
       MOBILE
       ======================================================== */

    @media (max-width: 600px) {

      header {

        padding-top: 18px;
      }


      .main-logo {

        width:
          min(
            370px,
            94vw
          );

        max-height: 155px;
      }


      .brand-name {

        font-size: 21px;

        letter-spacing: 1.5px;
      }


      .tagline {

        font-size: 11px;

        letter-spacing: 2px;
      }


      .hero {

        margin-top: 10px;

        padding:
          35px 15px
          35px;
      }


      .hero h1 {

        font-size: 39px;
      }


      .hero p {

        font-size: 13px;
      }


      .catalogue {

        padding:
          10px 14px
          55px;
      }


      .products {

        grid-template-columns:
          1fr;
      }


      .product-image {

        height: 270px;
      }


      .tools {

        gap: 7px;
      }


      .category-btn {

        flex: 1;

        min-width: 70px;
      }


      .modal {

        padding: 10px;
      }


      .modal-image {

        height: 300px;
      }


      .modal-content {

        padding: 20px;
      }

    }


  </style>

</head>


<body>


<!-- ========================================================
     HEADER
     ======================================================== -->

<header>

  <div class="top-line"></div>


  <div class="logo-area">

    <img
      class="main-logo"
      src="${LOGO_URL}"
      alt="ALANG ORIGINAL PRODUCTS AOP Logo"
    >


    <div class="brand-name">

      ALANG
      <span>ORIGINAL PRODUCTS</span>

    </div>

  </div>


  <div class="tagline-window">

    <div class="tagline">

      ALL ORIGINAL ALANG PRODUCTS WILL BE AVAILABLE HERE.
      &nbsp;&nbsp; ◆ &nbsp;&nbsp;
      ALL ORIGINAL ALANG PRODUCTS WILL BE AVAILABLE HERE.
      &nbsp;&nbsp; ◆ &nbsp;&nbsp;

    </div>

  </div>

</header>



<!-- ========================================================
     HERO
     ======================================================== -->

<section class="hero">

  <div class="hero-kicker">
    AOP • ALANG • GUJARAT
  </div>


  <h1>

    ORIGINAL
    <span class="red">ALANG</span>
    <br>
    PRODUCTS

  </h1>


  <p>

    Discover original industrial products from Alang, Gujarat.
    Explore available products, view product information,
    check stock status and contact us directly for inquiries.

  </p>


  <div class="hero-badges">

    <div class="badge">
      ORIGINAL PRODUCTS
    </div>

    <div class="badge">
      ALANG INDUSTRIAL MARKET
    </div>

    <div class="badge">
      DIRECT INQUIRY
    </div>

    <div class="badge">
      QUALITY FOCUSED
    </div>

  </div>

</section>



<!-- ========================================================
     CATALOGUE
     ======================================================== -->

<section
  class="catalogue"
  id="catalogue"
>


  <div class="section-title">

    <small>
      AOP CATALOGUE
    </small>

    <h2>
      Featured Products
    </h2>

    <div class="section-line"></div>

  </div>



  <!-- SEARCH + CATEGORY -->

  <div class="tools">


    <div class="search-wrap">

      <input
        id="search"
        class="search"
        type="search"
        placeholder="Search products..."
        autocomplete="off"
        oninput="filterProducts()"
      >

      <span class="search-icon">
        ⌕
      </span>

    </div>


    <button
      class="category-btn active"
      onclick="setCategory('all', this)"
    >
      ALL
    </button>


    <button
      class="category-btn"
      onclick="setCategory('industrial', this)"
    >
      INDUSTRIAL
    </button>


    <button
      class="category-btn"
      onclick="setCategory('metal', this)"
    >
      METAL
    </button>


  </div>



  <!-- PRODUCTS -->

  <div
    id="products"
    class="products"
  >

    ${renderProducts(PRODUCTS)}

  </div>


</section>



<!-- ========================================================
     PRODUCT MODAL
     ======================================================== -->

<div
  id="productModal"
  class="modal"
  onclick="closeModalOutside(event)"
>

  <div class="modal-box">


    <button
      class="modal-close"
      onclick="closeModal()"
    >
      ×
    </button>


    <div
      id="modalImage"
      class="modal-image"
    >
    </div>


    <div
      id="modalContent"
      class="modal-content"
    >
    </div>


  </div>

</div>



<!-- ========================================================
     FOOTER
     ======================================================== -->

<footer>

  <strong>
    ALANG ORIGINAL PRODUCTS
  </strong>


  <div class="footer-line"></div>


  <span class="footer-red">
    AOP
  </span>

  — Original Industrial Products from Alang, Gujarat


  <br><br>


  © ${new Date().getFullYear()}
  AOP.
  All Rights Reserved.


</footer>



<script>

  /* ========================================================
     STATE
     ======================================================== */

  let currentCategory = "all";


  /* ========================================================
     FILTER PRODUCTS
     ======================================================== */

  function filterProducts() {

    const searchInput =
      document.getElementById("search");

    const search =
      searchInput.value
        .trim()
        .toLowerCase();


    const filtered =
      PRODUCTS.filter(product => {

        const categoryMatch =
          currentCategory === "all" ||
          product.category.toLowerCase() ===
            currentCategory;


        const searchText = (

          product.name +
          " " +
          product.category +
          " " +
          product.description

        ).toLowerCase();


        const searchMatch =
          searchText.includes(search);


        return (
          categoryMatch &&
          searchMatch
        );

      });


    document.getElementById("products")
      .innerHTML =
        renderProducts(filtered);

  }


  /* ========================================================
     CATEGORY
     ======================================================== */

  function setCategory(category, button) {

    currentCategory =
      category;


    document
      .querySelectorAll(".category-btn")
      .forEach(btn => {

        btn.classList.remove("active");

      });


    button.classList.add("active");


    filterProducts();

  }


  /* ========================================================
     OPEN PRODUCT
     ======================================================== */

  function openProduct(id) {

    const product =
      PRODUCTS.find(
        item => item.id === id
      );


    if (!product) {
      return;
    }


    const modal =
      document.getElementById(
        "productModal"
      );


    const imageBox =
      document.getElementById(
        "modalImage"
      );


    const contentBox =
      document.getElementById(
        "modalContent"
      );


    if (
      product.images &&
      product.images.length > 0
    ) {

      imageBox.innerHTML = `
        <img
          src="${product.images[0]}"
          alt="${product.name}"
        >
      `;

    } else {

      imageBox.innerHTML = `
        <div class="product-placeholder">

          <div class="placeholder-grid"></div>

          <div class="placeholder-aop">
            AOP
          </div>

          <div class="placeholder-label">
            PRODUCT IMAGE
          </div>

          <div class="placeholder-line"></div>

        </div>
      `;

    }


    contentBox.innerHTML = `

      <div class="category">
        ${product.category}
      </div>

      <h2>
        ${product.name}
      </h2>

      <p>
        ${product.description}
      </p>

      <div class="product-meta">

        <div class="price">
          ${product.price}
        </div>

        <div class="stock ${
          product.stock === "In Stock"
            ? "available"
            : "sold"
        }">

          <span></span>

          ${product.stock}

        </div>

      </div>


      <div class="modal-actions">

        <button
          class="modal-wa"
          onclick="inquire(${product.id})"
        >
          WHATSAPP INQUIRY
        </button>

        <button
          class="modal-share"
          onclick="shareProduct(${product.id})"
        >
          SHARE PRODUCT
        </button>

      </div>

    `;


    modal.classList.add("show");


    document.body.style.overflow =
      "hidden";


    /*
      Update browser URL.

      Example:
      ?product=1
    */

    const newUrl =
      window.location.pathname +
      "?product=" +
      product.id;

    history.replaceState(
      {},
      "",
      newUrl
    );

  }


  /* ========================================================
     CLOSE MODAL
     ======================================================== */

  function closeModal() {

    const modal =
      document.getElementById(
        "productModal"
      );


    modal.classList.remove("show");


    document.body.style.overflow =
      "";


    history.replaceState(
      {},
      "",
      window.location.pathname
    );

  }


  function closeModalOutside(event) {

    if (
      event.target.id ===
      "productModal"
    ) {

      closeModal();

    }

  }


  /* ========================================================
     WHATSAPP
     ======================================================== */

  function inquire(id) {

    const product =
      PRODUCTS.find(
        item => item.id === id
      );


    if (!product) {
      return;
    }


    if (!WHATSAPP_NUMBER) {

      alert(
        "WhatsApp contact will be added soon.\\n\\nProduct: " +
        product.name
      );

      return;

    }


    const productUrl =
      window.location.origin +
      window.location.pathname +
      "?product=" +
      product.id;


    const message =

      "Hello ALANG ORIGINAL PRODUCTS,\\n\\n" +

      "I am interested in: " +
      product.name +
      "\\n\\n" +

      "Product Link: " +
      productUrl +
      "\\n\\n" +

      "Please share more details.";

    
    const url =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);


    window.open(
      url,
      "_blank"
    );

  }


  /* ========================================================
     SHARE PRODUCT
     ======================================================== */

  async function shareProduct(id) {

    const product =
      PRODUCTS.find(
        item => item.id === id
      );


    if (!product) {
      return;
    }


    const productUrl =
      window.location.origin +
      window.location.pathname +
      "?product=" +
      product.id;


    const shareData = {

      title:
        product.name +
        " | ALANG ORIGINAL PRODUCTS",

      text:
        "Check this original Alang product: " +
        product.name,

      url:
        productUrl

    };


    try {

      if (
        navigator.share
      ) {

        await navigator.share(
          shareData
        );

      } else {

        await navigator.clipboard.writeText(
          productUrl
        );

        alert(
          "Product link copied."
        );

      }

    } catch (error) {

      /*
        User cancelled sharing.
        No action required.
      */

    }

  }


  /* ========================================================
     OPEN PRODUCT FROM URL
     ======================================================== */

  function openProductFromURL() {

    const params =
      new URLSearchParams(
        window.location.search
      );


    const productId =
      Number(
        params.get("product")
      );


    if (!productId) {
      return;
    }


    const product =
      PRODUCTS.find(
        item => item.id === productId
      );


    if (product) {

      setTimeout(
        () => openProduct(productId),
        300
      );

    }

  }


  /* ========================================================
     ESC KEY
     ======================================================== */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeModal();

      }

    }
  );


  /* ========================================================
     START
     ======================================================== */

  openProductFromURL();

</script>


</body>

</html>`;


/*
  ============================================================
  CLOUDFLARE WORKER
  ============================================================
*/

export default {

  async fetch(request) {

    return new Response(
      html,
      {
        headers: {
          "content-type":
            "text/html; charset=UTF-8",

          "cache-control":
            "public, max-age=60"
        }
      }
    );

  }

};
