const PRODUCTS = [
  {
    id: 1,
    name: "Sample Industrial Product",
    category: "Industrial",
    price: "₹0",
    stock: "In Stock",
    featured: true,
    image: "",
    description:
      "Original Alang industrial product. Product details, specifications and multiple photos will be managed from the admin panel."
  },
  {
    id: 2,
    name: "Original Alang Product",
    category: "Metal",
    price: "₹0",
    stock: "In Stock",
    featured: false,
    image: "",
    description:
      "Premium original product sourced from Alang. More product information will be added through the admin panel."
  }
];

const WHATSAPP_NUMBER = "YOUR_WHATSAPP_NUMBER";

function productCard(product) {
  const image = product.image
    ? `<img src="${product.image}" alt="${product.name}">`
    : `<div class="product-placeholder"><span>AOP</span><small>PRODUCT IMAGE</small></div>`;

  return `
    <article class="product-card" data-name="${product.name.toLowerCase()}" data-category="${product.category.toLowerCase()}">
      <div class="product-image">
        ${image}
        ${product.featured ? `<div class="featured">★ FEATURED</div>` : ""}
        <div class="stock ${product.stock === "In Stock" ? "available" : "sold"}">
          ${product.stock}
        </div>
      </div>

      <div class="product-content">
        <div class="category">${product.category}</div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>

        <div class="product-bottom">
          <strong>${product.price}</strong>
          <button onclick="inquire('${product.name.replace(/'/g, "\\'")}')">
            WhatsApp Inquiry
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderProducts(products) {
  return products.map(productCard).join("");
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>ALANG ORIGINAL PRODUCTS | AOP</title>

  <meta
    name="description"
    content="ALANG ORIGINAL PRODUCTS — Original industrial products from Alang, Gujarat."
  >

  <style>

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --red: #e50914;
      --red-dark: #8b0000;
      --black: #050505;
      --dark: #0b0d0f;
      --panel: #111417;
      --steel: #bfc5c9;
      --white: #f5f5f5;
      --muted: #8c9398;
      --border: rgba(255,255,255,.12);
    }

    body {
      font-family: Arial, Helvetica, sans-serif;
      background:
        radial-gradient(circle at 50% -10%, rgba(229,9,20,.15), transparent 35%),
        linear-gradient(180deg, #050505 0%, #090b0d 45%, #050505 100%);
      color: var(--white);
      min-height: 100vh;
      overflow-x: hidden;
    }

    body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      opacity: .08;
      background-image:
        linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px);
      background-size: 45px 45px;
      mask-image: linear-gradient(to bottom, black, transparent 80%);
    }

    header {
      position: relative;
      padding: 28px 18px 0;
      text-align: center;
      overflow: hidden;
    }

    .top-line {
      width: 100%;
      height: 2px;
      background: linear-gradient(
        90deg,
        transparent,
        var(--red),
        white,
        var(--red),
        transparent
      );
      margin-bottom: 25px;
      box-shadow: 0 0 15px rgba(229,9,20,.8);
    }

    .logo-area {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .aop-mark {
      width: 105px;
      height: 105px;
      border: 3px solid #c7c7c7;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background:
        radial-gradient(circle, #25292d, #080909 70%);
      box-shadow:
        0 0 0 5px #111,
        0 0 25px rgba(229,9,20,.35);
    }

    .aop-mark::before,
    .aop-mark::after {
      content: "";
      position: absolute;
      background: var(--red);
    }

    .aop-mark::before {
      width: 130%;
      height: 3px;
      transform: rotate(-28deg);
      box-shadow: 0 0 10px var(--red);
    }

    .aop-mark::after {
      width: 3px;
      height: 130%;
      transform: rotate(28deg);
      opacity: .25;
    }

    .aop-text {
      font-size: 32px;
      font-weight: 900;
      letter-spacing: 5px;
      position: relative;
      z-index: 2;
    }

    .brand-name {
      font-size: clamp(24px, 6vw, 48px);
      font-weight: 900;
      letter-spacing: 3px;
      text-transform: uppercase;
      background: linear-gradient(180deg, #ffffff, #888d91);
      -webkit-background-clip: text;
      color: transparent;
      text-shadow: 0 0 25px rgba(255,255,255,.08);
    }

    .brand-name span {
      color: var(--red);
      -webkit-text-fill-color: var(--red);
    }

    .tagline-window {
      margin: 28px auto 0;
      max-width: 1000px;
      overflow: hidden;
      border-top: 1px solid rgba(229,9,20,.45);
      border-bottom: 1px solid rgba(229,9,20,.45);
      background: rgba(255,255,255,.025);
      box-shadow:
        inset 0 0 20px rgba(229,9,20,.05),
        0 0 20px rgba(0,0,0,.5);
    }

    .tagline {
      white-space: nowrap;
      padding: 13px 0;
      font-size: 13px;
      font-weight: 900;
      letter-spacing: 3px;
      color: #ff3038;
      animation: moveText 14s linear infinite;
      text-shadow: 0 0 12px rgba(229,9,20,.6);
    }

    @keyframes moveText {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(-100%);
      }
    }

    .hero {
      max-width: 1100px;
      margin: 45px auto 0;
      padding: 25px 20px 50px;
      text-align: center;
    }

    .hero h1 {
      font-size: clamp(32px, 8vw, 68px);
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 18px;
    }

    .hero h1 span {
      color: var(--red);
      text-shadow: 0 0 25px rgba(229,9,20,.35);
    }

    .hero p {
      max-width: 700px;
      margin: auto;
      color: var(--muted);
      line-height: 1.7;
      font-size: 15px;
    }

    .hero-badges {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-top: 25px;
    }

    .badge {
      border: 1px solid var(--border);
      padding: 9px 14px;
      border-radius: 4px;
      background: rgba(255,255,255,.035);
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 1px;
      color: #c8c8c8;
    }

    .badge::before {
      content: "◆";
      color: var(--red);
      margin-right: 7px;
    }

    .catalogue {
      max-width: 1200px;
      margin: auto;
      padding: 10px 18px 70px;
    }

    .section-title {
      text-align: center;
      margin-bottom: 25px;
    }

    .section-title small {
      color: var(--red);
      letter-spacing: 3px;
      font-weight: bold;
    }

    .section-title h2 {
      margin-top: 7px;
      font-size: 30px;
      text-transform: uppercase;
    }

    .tools {
      display: flex;
      gap: 10px;
      max-width: 900px;
      margin: 0 auto 28px;
      flex-wrap: wrap;
    }

    .search {
      flex: 1;
      min-width: 220px;
      padding: 14px 16px;
      background: #0d0f11;
      color: white;
      border: 1px solid var(--border);
      outline: none;
      border-radius: 5px;
    }

    .search:focus {
      border-color: var(--red);
      box-shadow: 0 0 15px rgba(229,9,20,.15);
    }

    .category-btn {
      padding: 12px 15px;
      background: #101214;
      color: #bbb;
      border: 1px solid var(--border);
      cursor: pointer;
      border-radius: 5px;
    }

    .category-btn.active,
    .category-btn:hover {
      background: var(--red);
      color: white;
      border-color: var(--red);
    }

    .products {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
      gap: 20px;
    }

    .product-card {
      position: relative;
      background:
        linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.012));
      border: 1px solid var(--border);
      overflow: hidden;
      transition: .35s ease;
    }

    .product-card::before {
      content: "";
      position: absolute;
      inset: 0;
      border: 1px solid transparent;
      transition: .35s;
      pointer-events: none;
    }

    .product-card:hover {
      transform: translateY(-6px);
      border-color: rgba(229,9,20,.5);
      box-shadow: 0 18px 40px rgba(0,0,0,.45);
    }

    .product-card:hover::before {
      border-color: rgba(229,9,20,.25);
    }

    .product-image {
      height: 230px;
      background: #080909;
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
    }

    .product-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background:
        linear-gradient(135deg, #181b1e, #070808);
      color: #777;
    }

    .product-placeholder span {
      font-size: 55px;
      font-weight: 900;
      color: #292d30;
      letter-spacing: 5px;
    }

    .product-placeholder small {
      color: #555;
      letter-spacing: 2px;
    }

    .featured,
    .stock {
      position: absolute;
      top: 12px;
      padding: 6px 9px;
      font-size: 9px;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .featured {
      left: 12px;
      background: var(--red);
      color: white;
    }

    .stock {
      right: 12px;
      background: rgba(0,0,0,.75);
      border: 1px solid rgba(255,255,255,.15);
    }

    .stock.available {
      color: #62e58a;
    }

    .stock.sold {
      color: #ff5454;
    }

    .product-content {
      padding: 20px;
    }

    .category {
      color: var(--red);
      font-size: 10px;
      letter-spacing: 2px;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .product-content h3 {
      font-size: 20px;
      margin-bottom: 10px;
    }

    .product-content p {
      color: #858b8f;
      font-size: 13px;
      line-height: 1.6;
      min-height: 65px;
    }

    .product-bottom {
      border-top: 1px solid var(--border);
      margin-top: 18px;
      padding-top: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .product-bottom strong {
      font-size: 18px;
      color: #eee;
    }

    .product-bottom button {
      border: 0;
      background: var(--red);
      color: white;
      padding: 10px 12px;
      font-size: 10px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 3px;
    }

    .product-bottom button:hover {
      background: #ff1824;
    }

    footer {
      border-top: 1px solid var(--border);
      text-align: center;
      padding: 35px 20px;
      color: #666;
      font-size: 12px;
    }

    footer strong {
      color: #aaa;
    }

    .footer-red {
      color: var(--red);
    }

    @media (max-width: 600px) {

      header {
        padding-top: 20px;
      }

      .aop-mark {
        width: 85px;
        height: 85px;
      }

      .aop-text {
        font-size: 25px;
      }

      .brand-name {
        font-size: 22px;
        letter-spacing: 2px;
      }

      .hero {
        margin-top: 25px;
        padding-bottom: 30px;
      }

      .hero h1 {
        font-size: 38px;
      }

      .products {
        grid-template-columns: 1fr;
      }

      .product-image {
        height: 250px;
      }

      .product-bottom button {
        padding: 10px 9px;
      }
    }

  </style>
</head>

<body>

<header>

  <div class="top-line"></div>

  <div class="logo-area">

    <div class="aop-mark">
      <div class="aop-text">AOP</div>
    </div>

    <div class="brand-name">
      ALANG <span>ORIGINAL PRODUCTS</span>
    </div>

  </div>

  <div class="tagline-window">
    <div class="tagline">
      ALL ORIGINAL ALANG PRODUCTS WILL BE AVAILABLE HERE.
      &nbsp;&nbsp;&nbsp; ◆ &nbsp;&nbsp;&nbsp;
      ALL ORIGINAL ALANG PRODUCTS WILL BE AVAILABLE HERE.
    </div>
  </div>

</header>


<section class="hero">

  <h1>
    ORIGINAL <span>ALANG</span><br>
    PRODUCTS
  </h1>

  <p>
    Discover original industrial products from Alang, Gujarat.
    Explore products, check availability and contact us directly
    for product inquiries.
  </p>

  <div class="hero-badges">
    <div class="badge">ORIGINAL PRODUCTS</div>
    <div class="badge">ALANG INDUSTRIAL MARKET</div>
    <div class="badge">DIRECT INQUIRY</div>
    <div class="badge">QUALITY FOCUSED</div>
  </div>

</section>


<section class="catalogue">

  <div class="section-title">
    <small>AOP CATALOGUE</small>
    <h2>Featured Products</h2>
  </div>

  <div class="tools">

    <input
      id="search"
      class="search"
      type="search"
      placeholder="Search products..."
      oninput="filterProducts()"
    >

    <button class="category-btn active" onclick="setCategory('all', this)">
      All
    </button>

    <button class="category-btn" onclick="setCategory('industrial', this)">
      Industrial
    </button>

    <button class="category-btn" onclick="setCategory('metal', this)">
      Metal
    </button>

  </div>

  <div id="products" class="products">
    ${renderProducts(PRODUCTS)}
  </div>

</section>


<footer>

  <strong>ALANG ORIGINAL PRODUCTS</strong>
  <br><br>
  <span class="footer-red">AOP</span> — Original Industrial Products from Alang, Gujarat
  <br><br>
  © ${new Date().getFullYear()} AOP. All Rights Reserved.

</footer>


<script>

  let currentCategory = "all";

  function filterProducts() {

    const search =
      document.getElementById("search").value.toLowerCase();

    const cards =
      document.querySelectorAll(".product-card");

    cards.forEach(card => {

      const name = card.dataset.name;
      const category = card.dataset.category;

      const matchesSearch =
        name.includes(search);

      const matchesCategory =
        currentCategory === "all" ||
        category === currentCategory;

      card.style.display =
        matchesSearch && matchesCategory
          ? ""
          : "none";

    });

  }


  function setCategory(category, button) {

    currentCategory = category;

    document
      .querySelectorAll(".category-btn")
      .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    filterProducts();

  }


  function inquire(productName) {

    if (WHATSAPP_NUMBER === "YOUR_WHATSAPP_NUMBER") {

      alert(
        "WhatsApp number will be added soon.\\n\\nProduct: " +
        productName
      );

      return;

    }

    const message =
      "Hello ALANG ORIGINAL PRODUCTS, I am interested in: " +
      productName +
      ". Please share more details.";

    const url =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank");

  }

</script>

</body>
</html>`;

export default {
  async fetch(request) {
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=UTF-8"
      }
    });
  }
};
