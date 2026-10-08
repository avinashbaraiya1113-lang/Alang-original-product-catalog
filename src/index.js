const WHATSAPP_NUMBER = "";

const LOGO_SOURCE =
  "https://raw.githubusercontent.com/avinashbaraiya1113-lang/Alang-original-product-catalog/main/src/aop-logo.png";

const COOKIE = "AOP_ADMIN_SESSION";
const MAX_AGE = 86400000;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Cache-Control": "no-store"
    }
  });
}

function html(body, status = 200, headers = {}) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": "no-store",
      ...headers
    }
  });
}

function redirect(to, headers = {}) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: to,
      "Cache-Control": "no-store",
      ...headers
    }
  });
}

function safeJson(value) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

function b64(bytes) {
  let s = "";

  for (let i = 0; i < bytes.length; i += 32768) {
    s += String.fromCharCode(
      ...bytes.subarray(i, i + 32768)
    );
  }

  return btoa(s)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function unb64(s) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");

  s += "=".repeat(
    (4 - (s.length % 4)) % 4
  );

  const x = atob(s);
  const b = new Uint8Array(x.length);

  for (let i = 0; i < x.length; i++) {
    b[i] = x.charCodeAt(i);
  }

  return new TextDecoder().decode(b);
}

async function sign(secret, text) {
  const key =
    await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      {
        name: "HMAC",
        hash: "SHA-256"
      },
      false,
      ["sign"]
    );

  return b64(
    new Uint8Array(
      await crypto.subtle.sign(
        "HMAC",
        key,
        new TextEncoder().encode(text)
      )
    )
  );
}

async function makeSession(secret) {
  const random =
    new Uint8Array(24);

  crypto.getRandomValues(random);

  const payload =
    Date.now() + "." + b64(random);

  return b64(
    new TextEncoder().encode(
      payload +
      "." +
      await sign(secret, payload)
    )
  );
}

async function auth(request, env) {
  if (!env.ADMIN_PASSWORD) {
    return false;
  }

  const match =
    (
      request.headers.get("Cookie") || ""
    ).match(
      /(?:^|;\s*)AOP_ADMIN_SESSION=([^;]+)/
    );

  if (!match) {
    return false;
  }

  try {
    const decoded =
      unb64(match[1]);

    const lastDot =
      decoded.lastIndexOf(".");

    const payload =
      decoded.slice(0, lastDot);

    const timestamp =
      Number(
        payload.split(".")[0]
      );

    const signature =
      decoded.slice(
        lastDot + 1
      );

    return (
      Number.isFinite(timestamp) &&
      Date.now() - timestamp >= 0 &&
      Date.now() - timestamp <= MAX_AGE &&
      signature ===
        await sign(
          env.ADMIN_PASSWORD,
          payload
        )
    );
  } catch (error) {
    return false;
  }
}

function setCookie(value) {
  return (
    COOKIE +
    "=" +
    value +
    "; Path=/admin; Max-Age=86400; HttpOnly; Secure; SameSite=Strict"
  );
}

function clearCookie() {
  return (
    COOKIE +
    "=; Path=/admin; Max-Age=0; HttpOnly; Secure; SameSite=Strict"
  );
}

function sameOrigin(request) {
  const origin =
    request.headers.get("Origin");

  return (
    !origin ||
    origin ===
      new URL(request.url).origin
  );
}

async function getProducts(env) {
  const result =
    await env.DB.prepare(`
      SELECT
        id,
        name,
        category,
        description,
        price,
        stock,
        featured,
        image1,
        image2,
        image3,
        image4,
        image5,
        created_at
      FROM products
      ORDER BY
        featured DESC,
        id DESC
    `).run();

  return (
    result.results || []
  ).map(function (row) {
    return {
      id: row.id,

      name:
        row.name ||
        "AOP Product",

      category:
        row.category ||
        "Industrial",

      description:
        row.description ||
        "",

      price:
        row.price ||
        "Price on Request",

      stock:
        row.stock ||
        "In Stock",

      featured:
        Number(row.featured) === 1,

      images: [
        row.image1,
        row.image2,
        row.image3,
        row.image4,
        row.image5
      ].filter(Boolean),

      created_at:
        row.created_at || ""
    };
  });
}


/* =========================================================
   PUBLIC CATALOGUE
========================================================= */

function publicPage(data, error) {
  return `<!doctype html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width,initial-scale=1"
>

<meta
  name="description"
  content="ALANG ORIGINAL PRODUCTS - Original industrial products from Alang, Gujarat."
>

<title>
  ALANG ORIGINAL PRODUCTS | AOP
</title>

<style>

*{
  box-sizing:border-box;
  margin:0;
  padding:0;
}

html{
  scroll-behavior:smooth;
}

body{
  min-height:100vh;
  overflow-x:hidden;
  color:#f5f7f9;
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
      #030507,
      #090d12 50%,
      #030507
    );
}

body:before{
  content:"";
  position:fixed;
  inset:0;
  pointer-events:none;

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

  background-size:42px 42px;
  z-index:-1;
}

header{
  text-align:center;
  padding:28px 15px 24px;

  border-bottom:
    1px solid
    rgba(255,255,255,.1);

  background:#070a0e;

  box-shadow:
    0 15px 45px
    rgba(0,0,0,.45);
}

.logo{
  display:block;
  width:min(400px,88vw);
  max-height:220px;
  object-fit:contain;

  margin:
    0 auto 17px;

  filter:
    drop-shadow(
      0 0 22px
      rgba(255,20,20,.25)
    );
}

.brand{
  font-size:
    clamp(23px,5vw,45px);

  font-weight:900;
  letter-spacing:.08em;
}

.red{
  color:#ff2020;
}

.tagline-box{
  overflow:hidden;
  margin-top:19px;
  padding:11px 0;

  border-top:
    1px solid
    rgba(255,30,30,.25);

  border-bottom:
    1px solid
    rgba(255,30,30,.25);
}

.tagline{
  display:inline-block;
  white-space:nowrap;

  color:#ff2424;

  font-size:
    clamp(12px,2.2vw,18px);

  font-weight:900;
  letter-spacing:.12em;

  animation:
    move 15s linear infinite;

  text-shadow:
    0 0 12px
    rgba(255,0,0,.45);
}

@keyframes move{

  from{
    transform:
      translateX(100%);
  }

  to{
    transform:
      translateX(-100%);
  }

}

main{
  width:
    min(
      1200px,
      calc(100% - 28px)
    );

  margin:
    30px auto 60px;
}

.intro{
  text-align:center;
  padding:18px 10px 32px;
}

.label,
.catalogue{
  color:#ff2020;
  font-size:12px;
  font-weight:900;
  letter-spacing:.25em;
  margin-bottom:14px;
}

.intro h1{
  font-size:
    clamp(31px,7vw,58px);

  line-height:1.05;
  font-weight:900;
  margin-bottom:20px;
}

.intro p{
  max-width:800px;
  margin:auto;

  color:#929da7;

  font-size:
    clamp(14px,2vw,18px);

  line-height:1.7;
}

.features{
  display:grid;

  grid-template-columns:
    repeat(4,1fr);

  gap:10px;

  max-width:900px;

  margin:
    0 auto 42px;
}

.feature{
  padding:13px 8px;
  text-align:center;

  color:#c9cfd4;

  font-size:11px;
  font-weight:800;

  border:
    1px solid
    rgba(255,255,255,.1);

  border-radius:9px;

  background:
    rgba(255,255,255,.025);
}

.feature:before{
  content:"◆";
  color:#ff2020;
  margin-right:6px;
}

.catalogue{
  text-align:center;
  margin-bottom:9px;
}

.controls{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-bottom:15px;
}

.search,
.category{
  padding:15px 17px;

  border:
    1px solid
    rgba(255,255,255,.11);

  border-radius:11px;

  outline:none;

  color:white;
  background:#0d1218;

  font-size:15px;
}

.search{
  flex:1 1 300px;
}

.category{
  flex:0 1 220px;
}

.count{
  color:#7f8a94;
  font-size:13px;
  margin-bottom:15px;
}

.products{
  display:grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(250px,1fr)
    );

  gap:18px;
}

.card{
  position:relative;
  overflow:hidden;

  border:
    1px solid
    rgba(255,255,255,.11);

  border-radius:17px;

  background:
    linear-gradient(
      145deg,
      #141a20,
      #080b0f
    );

  box-shadow:
    0 15px 40px
    rgba(0,0,0,.3);
}

.card-image{
  position:relative;

  height:230px;

  display:flex;
  align-items:center;
  justify-content:center;

  overflow:hidden;

  background:#0a0e12;
}

.card-image img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.placeholder{
  color:#5e6973;
  text-align:center;
  font-size:13px;
  font-weight:900;
}

.featured,
.stock{
  position:absolute;
  top:12px;

  z-index:2;

  padding:7px 10px;

  border-radius:6px;

  font-size:10px;
  font-weight:900;
}

.featured{
  left:12px;
  color:white;
  background:#ff2020;
}

.stock{
  right:12px;

  background:
    rgba(0,0,0,.7);

  border:
    1px solid
    rgba(255,255,255,.15);
}

.in{
  color:#65ed8d;
}

.out{
  color:#ff6868;
}

.content{
  padding:17px;
}

.cat{
  color:#8d98a3;
  font-size:10px;
  font-weight:900;
  letter-spacing:.14em;

  text-transform:uppercase;

  margin-bottom:8px;
}

.title{
  font-size:20px;
  font-weight:900;
  margin-bottom:9px;
}

.desc{
  color:#8d98a3;
  font-size:13px;
  line-height:1.55;

  min-height:40px;

  margin-bottom:13px;
}

.price{
  font-size:17px;
  font-weight:900;
  margin-bottom:13px;
}

.buttons{
  display:grid;

  grid-template-columns:
    1fr 1fr;

  gap:8px;
}

.btn{
  min-height:42px;

  display:flex;
  align-items:center;
  justify-content:center;

  border:0;
  border-radius:9px;

  cursor:pointer;

  color:white;
  text-decoration:none;

  font-size:11px;
  font-weight:900;
}

.view{
  background:#222b34;
}

.wa{
  background:#20b95a;
}

.empty,
.db-error{
  grid-column:1/-1;

  padding:60px 20px;

  text-align:center;

  color:#7f8a94;

  border:
    1px dashed
    rgba(255,255,255,.15);

  border-radius:15px;
}

.db-error{
  color:#ff7777;

  border-color:
    rgba(255,60,60,.3);

  background:
    rgba(255,0,0,.04);
}

.modal{
  position:fixed;
  inset:0;

  z-index:9999;

  display:none;

  align-items:center;
  justify-content:center;

  padding:15px;

  background:
    rgba(0,0,0,.85);

  backdrop-filter:blur(9px);
}

.modal.show{
  display:flex;
}

.modal-box{
  position:relative;

  width:
    min(900px,100%);

  max-height:92vh;

  overflow-y:auto;

  border:
    1px solid
    rgba(255,255,255,.14);

  border-radius:20px;

  background:#080c10;
}

.close{
  position:absolute;

  top:12px;
  right:12px;

  z-index:5;

  width:42px;
  height:42px;

  border:
    1px solid
    rgba(255,255,255,.18);

  border-radius:50%;

  background:
    rgba(0,0,0,.7);

  color:white;

  font-size:22px;
}

.modal-grid{
  display:grid;

  grid-template-columns:
    1.1fr .9fr;
}

.gallery{
  padding:20px;
}

.main-image{
  width:100%;
  height:420px;

  object-fit:cover;

  border-radius:14px;

  background:#090d11;
}

.thumbs{
  display:flex;
  gap:8px;

  overflow-x:auto;

  margin-top:10px;
}

.thumb{
  width:65px;
  height:65px;

  flex-shrink:0;

  object-fit:cover;

  border-radius:8px;
}

.details{
  padding:35px 25px 25px;
}

.details h3{
  font-size:
    clamp(25px,5vw,40px);

  margin:10px 0 15px;
}

.detail-desc{
  color:#9ba5ae;
  line-height:1.7;

  margin:
    15px 0 25px;
}

.modal-buttons{
  display:flex;
  flex-direction:column;
  gap:10px;
}

.modal-buttons a,
.modal-buttons button{
  width:100%;
  min-height:48px;

  display:flex;
  align-items:center;
  justify-content:center;

  border:0;
  border-radius:10px;

  color:white;
  text-decoration:none;

  font-weight:900;
}

.modal-wa{
  background:#20b95a;
}

.modal-share{
  background:#202832;
}

footer{
  text-align:center;

  padding:30px 20px;

  border-top:
    1px solid
    rgba(255,255,255,.08);

  color:#68737d;

  font-size:12px;
  line-height:1.7;
}

@media(max-width:750px){

  .features{
    grid-template-columns:
      repeat(2,1fr);
  }

  .products{
    grid-template-columns:
      repeat(
        2,
        minmax(0,1fr)
      );

    gap:10px;
  }

  .card-image{
    height:160px;
  }

  .content{
    padding:12px;
  }

  .title{
    font-size:15px;
  }

  .desc{
    font-size:11px;
  }

  .price{
    font-size:13px;
  }

  .buttons{
    grid-template-columns:1fr;
  }

  .modal-grid{
    grid-template-columns:1fr;
  }

  .main-image{
    height:280px;
  }

}

@media(max-width:390px){

  .products{
    grid-template-columns:1fr;
  }

  .card-image{
    height:210px;
  }

}

</style>

</head>

<body>

<header>

<img
  class="logo"
  src="/aop-logo.png?v=8"
  alt="ALANG ORIGINAL PRODUCTS AOP Logo"
>

<div class="brand">
  ALANG ORIGINAL PRODUCTS
  <span class="red">AOP</span>
</div>

<div class="tagline-box">

<div class="tagline">
ALL ORIGINAL ALANG PRODUCTS WILL BE AVAILABLE HERE.
</div>

</div>

</header>

<main>

<section class="intro">

<div class="label">
ALANG INDUSTRIAL MARKET
</div>

<h1>
ORIGINAL
<span class="red">ALANG</span>
<br>
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

<div class="catalogue">
AOP CATALOGUE
</div>

<h2>
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
>

${
  error
    ? `
      <div class="db-error">

        <h3>
          Catalogue temporarily unavailable
        </h3>

        <br>

        <p>
          The product database could not be loaded.
          Please try again shortly.
        </p>

      </div>
    `
    : ""
}

</div>

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
>
</div>

</div>

</div>

<script>

const DATA =
${safeJson(data)};

const WA =
${JSON.stringify(WHATSAPP_NUMBER)};

const products =
document.getElementById("products");

const search =
document.getElementById("search");

const category =
document.getElementById("category");

const count =
document.getElementById("count");

const modal =
document.getElementById("modal");

const modalContent =
document.getElementById("modalContent");

const close =
document.getElementById("close");


function loadCategories(){

  const list = [];

  DATA.forEach(function(p){

    if(
      p.category &&
      !list.includes(p.category)
    ){

      list.push(p.category);

    }

  });

  list.sort();

  list.forEach(function(c){

    const option =
      document.createElement("option");

    option.value = c;
    option.textContent = c;

    category.appendChild(option);

  });

}


function productImage(p){

  if(
    Array.isArray(p.images) &&
    p.images.length
  ){

    return p.images[0];

  }

  return "";

}


function waLink(p){

  if(!WA){
    return "#";
  }

  const link =
    location.origin +
    location.pathname +
    "?product=" +
    encodeURIComponent(p.id);

  const message =
    "Hello, I am interested in this product: " +
    p.name +
    " | Product Link: " +
    link;

  return (
    "https://wa.me/" +
    WA +
    "?text=" +
    encodeURIComponent(message)
  );

}


function makeCard(p){

  const card =
    document.createElement("article");

  card.className = "card";


  if(p.featured){

    const featured =
      document.createElement("div");

    featured.className =
      "featured";

    featured.textContent =
      "★ FEATURED";

    card.appendChild(featured);

  }


  const imageBox =
    document.createElement("div");

  imageBox.className =
    "card-image";


  const image =
    productImage(p);


  if(image){

    const img =
      document.createElement("img");

    img.src = image;

    img.alt =
      p.name;

    img.loading =
      "lazy";

    imageBox.appendChild(img);

  }else{

    const placeholder =
      document.createElement("div");

    placeholder.className =
      "placeholder";

    placeholder.innerHTML =
      "AOP PRODUCT<br>IMAGE";

    imageBox.appendChild(
      placeholder
    );

  }


  const stock =
    document.createElement("div");

  stock.className =
    "stock " +
    (
      String(p.stock)
        .toLowerCase()
        .includes("out")
        ? "out"
        : "in"
    );

  stock.textContent =
    p.stock ||
    "In Stock";

  imageBox.appendChild(stock);

  card.appendChild(imageBox);


  const content =
    document.createElement("div");

  content.className =
    "content";


  const cat =
    document.createElement("div");

  cat.className =
    "cat";

  cat.textContent =
    p.category ||
    "Industrial";


  const title =
    document.createElement("div");

  title.className =
    "title";

  title.textContent =
    p.name ||
    "AOP Product";


  const desc =
    document.createElement("div");

  desc.className =
    "desc";

  desc.textContent =
    p.description ||
    "";


  const price =
    document.createElement("div");

  price.className =
    "price";

  price.textContent =
    p.price ||
    "Price on Request";


  const buttons =
    document.createElement("div");

  buttons.className =
    "buttons";


  const view =
    document.createElement("button");

  view.className =
    "btn view";

  view.textContent =
    "VIEW PRODUCT";

  view.onclick =
    function(){

      openProduct(p.id);

    };


  const wa =
    document.createElement("a");

  wa.className =
    "btn wa";

  wa.textContent =
    "WHATSAPP";


  if(WA){

    wa.href =
      waLink(p);

    wa.target =
      "_blank";

    wa.rel =
      "noopener";

  }else{

    wa.href = "#";

    wa.onclick =
      function(event){

        event.preventDefault();

        openProduct(p.id);

      };

  }


  buttons.appendChild(view);

  buttons.appendChild(wa);

  content.appendChild(cat);

  content.appendChild(title);

  content.appendChild(desc);

  content.appendChild(price);

  content.appendChild(buttons);

  card.appendChild(content);

  return card;

}


function render(){

  const query =
    search.value
      .trim()
      .toLowerCase();

  const selected =
    category.value;


  const list =
    DATA.filter(function(p){

      const text =
        (
          (p.name || "") +
          " " +
          (p.category || "") +
          " " +
          (p.description || "")
        ).toLowerCase();

      return (
        (!query ||
          text.includes(query)) &&
        (
          selected === "all" ||
          p.category === selected
        )
      );

    });


  products.innerHTML = "";

  count.textContent =
    list.length +
    (
      list.length === 1
        ? " Product"
        : " Products"
    );


  if(!list.length){

    const empty =
      document.createElement("div");

    empty.className =
      "empty";

    empty.innerHTML =
      "<h3>No products found</h3>" +
      "<br>" +
      "<p>Try another search or category.</p>";

    products.appendChild(empty);

    return;

  }


  list.forEach(function(p){

    products.appendChild(
      makeCard(p)
    );

  });

}


function openProduct(id){

  const p =
    DATA.find(function(x){

      return (
        Number(x.id) ===
        Number(id)
      );

    });


  if(!p){
    return;
  }


  modalContent.innerHTML = "";


  const gallery =
    document.createElement("div");

  gallery.className =
    "gallery";


  const images =
    Array.isArray(p.images)
      ? p.images.filter(Boolean)
      : [];


  if(images.length){

    const main =
      document.createElement("img");

    main.className =
      "main-image";

    main.src =
      images[0];

    main.alt =
      p.name;

    gallery.appendChild(main);


    if(images.length > 1){

      const thumbs =
        document.createElement("div");

      thumbs.className =
        "thumbs";


      images.forEach(function(url){

        const thumb =
          document.createElement("img");

        thumb.className =
          "thumb";

        thumb.src =
          url;

        thumb.alt =
          p.name;

        thumb.onclick =
          function(){

            main.src =
              url;

          };

        thumbs.appendChild(thumb);

      });


      gallery.appendChild(
        thumbs
      );

    }

  }else{

    const noImage =
      document.createElement("div");

    noImage.className =
      "main-image";

    noImage.style.display =
      "flex";

    noImage.style.alignItems =
      "center";

    noImage.style.justifyContent =
      "center";

    noImage.style.color =
      "#66717c";

    noImage.textContent =
      "PRODUCT IMAGE";

    gallery.appendChild(
      noImage
    );

  }


  const details =
    document.createElement("div");

  details.className =
    "details";


  const cat =
    document.createElement("div");

  cat.className =
    "cat";

  cat.textContent =
    p.category ||
    "Industrial";


  const title =
    document.createElement("h3");

  title.textContent =
    p.name ||
    "AOP Product";


  const price =
    document.createElement("div");

  price.className =
    "price";

  price.textContent =
    p.price ||
    "Price on Request";


  const description =
    document.createElement("div");

  description.className =
    "detail-desc";

  description.textContent =
    p.description ||
    "";


  const buttons =
    document.createElement("div");

  buttons.className =
    "modal-buttons";


  if(WA){

    const whatsapp =
      document.createElement("a");

    whatsapp.className =
      "modal-wa";

    whatsapp.textContent =
      "INQUIRE ON WHATSAPP";

    whatsapp.href =
      waLink(p);

    whatsapp.target =
      "_blank";

    whatsapp.rel =
      "noopener";

    buttons.appendChild(
      whatsapp
    );

  }else{

    const whatsapp =
      document.createElement("button");

    whatsapp.className =
      "modal-wa";

    whatsapp.textContent =
      "WHATSAPP INQUIRY";

    whatsapp.onclick =
      function(){

        alert(
          "WhatsApp contact will be available soon."
        );

      };

    buttons.appendChild(
      whatsapp
    );

  }


  const share =
    document.createElement("button");

  share.className =
    "modal-share";

  share.textContent =
    "SHARE PRODUCT";

  share.onclick =
    function(){

      shareProduct(p.id);

    };


  buttons.appendChild(share);


  details.appendChild(cat);

  details.appendChild(title);

  details.appendChild(price);

  details.appendChild(description);

  details.appendChild(buttons);


  modalContent.appendChild(
    gallery
  );

  modalContent.appendChild(
    details
  );


  modal.classList.add("show");


  history.replaceState(
    null,
    "",
    "?product=" +
    encodeURIComponent(p.id)
  );

}


function closeProduct(){

  modal.classList.remove(
    "show"
  );

  history.replaceState(
    null,
    "",
    location.pathname
  );

}


async function shareProduct(id){

  const url =
    location.origin +
    location.pathname +
    "?product=" +
    encodeURIComponent(id);


  if(navigator.share){

    try{

      await navigator.share({

        title:
          "ALANG ORIGINAL PRODUCTS",

        text:
          "Check this original Alang product.",

        url:
          url

      });

      return;

    }catch(error){}

  }


  try{

    await navigator.clipboard.writeText(
      url
    );

    alert(
      "Product link copied successfully."
    );

  }catch(error){

    window.prompt(
      "Copy this product link:",
      url
    );

  }

}


search.addEventListener(
  "input",
  render
);

category.addEventListener(
  "change",
  render
);

close.addEventListener(
  "click",
  closeProduct
);


modal.addEventListener(
  "click",
  function(event){

    if(event.target === modal){

      closeProduct();

    }

  }
);


document.addEventListener(
  "keydown",
  function(event){

    if(event.key === "Escape"){

      closeProduct();

    }

  }
);


loadCategories();

render();


const params =
  new URLSearchParams(
    location.search
  );

const shared =
  params.get("product");


if(shared){

  setTimeout(
    function(){

      openProduct(shared);

    },
    200
  );

}

</script>

</body>
</html>`;
}


/* =========================================================
   ADMIN LOGIN
========================================================= */

function loginPage(
  configured,
  error = false
) {

  return `<!doctype html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width,initial-scale=1"
>

<title>
AOP Admin Login
</title>

<style>

*{
  box-sizing:border-box;
}

body{
  margin:0;

  min-height:100vh;

  display:flex;

  align-items:center;
  justify-content:center;

  padding:20px;

  background:#05070a;

  color:#fff;

  font-family:Arial;
}

.box{
  width:
    min(430px,100%);

  padding:30px;

  border:
    1px solid
    #482126;

  border-radius:20px;

  background:#0b0f14;

  box-shadow:
    0 25px 70px
    #000;
}

.logo{
  display:block;

  width:
    min(280px,80%);

  margin:auto;
}

.brand{
  text-align:center;

  font-size:22px;

  font-weight:900;

  margin:
    18px 0 8px;
}

.red{
  color:#ff2020;
}

.sub{
  text-align:center;

  color:#89949e;

  font-size:12px;

  margin-bottom:24px;
}

label{
  display:block;

  color:#cbd2d8;

  font-size:11px;

  font-weight:900;

  margin-bottom:7px;
}

input{
  width:100%;

  padding:14px;

  border:
    1px solid
    #303942;

  border-radius:9px;

  background:#080c10;

  color:#fff;

  outline:0;
}

button{
  width:100%;

  margin-top:14px;

  padding:14px;

  border:0;

  border-radius:9px;

  background:#e51e25;

  color:#fff;

  font-weight:900;
}

.notice{
  margin-top:14px;

  padding:11px;

  border:
    1px solid
    #63252a;

  border-radius:9px;

  color:#ff9b9b;

  font-size:12px;
}

.back{
  text-align:center;

  margin-top:18px;
}

.back a{
  color:#aab3ba;

  font-size:12px;
}

</style>

</head>

<body>

<div class="box">

<img
  class="logo"
  src="/aop-logo.png?v=8"
  alt="AOP Logo"
>

<div class="brand">

AOP

<span class="red">
ADMIN PANEL
</span>

</div>

<div class="sub">
Secure catalogue management
</div>

${
  configured
    ? `

<form
  method="post"
  action="/admin/login"
>

<label>
ADMIN PASSWORD
</label>

<input
  name="password"
  type="password"
  autocomplete="current-password"
  required
>

<button>
LOGIN TO ADMIN PANEL
</button>

${
  error
    ? `
      <div class="notice">
        Incorrect admin password.
      </div>
    `
    : ""
}

</form>

`
    : `

<div class="notice">

Admin login is not configured.

Add the ADMIN_PASSWORD Worker secret.

</div>

`
}

<div class="back">

<a href="/">
← Open Public Catalogue
</a>

</div>

</div>

</body>

</html>`;
}


/* =========================================================
   ADMIN PANEL
========================================================= */

function adminPage(data) {

  return `<!doctype html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width,initial-scale=1"
>

<title>
AOP Admin Panel
</title>

<style>

*{
  box-sizing:border-box;
}

body{
  margin:0;

  background:#05070a;

  color:#f4f6f8;

  font-family:Arial;
}

.top{
  position:sticky;

  top:0;

  z-index:5;

  padding:15px;

  background:#090c10;

  border-bottom:
    1px solid
    #222;

  display:flex;

  justify-content:space-between;

  gap:10px;

  align-items:center;
}

.brand{
  font-weight:900;
}

.red{
  color:#ff2020;
}

.top a,
.top button{
  padding:9px 11px;

  border:
    1px solid
    #303942;

  border-radius:8px;

  background:#151b21;

  color:#fff;

  text-decoration:none;

  font-size:10px;

  font-weight:900;
}

.top form{
  display:inline;
}

main{
  width:
    min(
      1150px,
      calc(100% - 24px)
    );

  margin:
    22px auto 60px;
}

.hero{
  display:flex;

  justify-content:space-between;

  align-items:end;

  gap:12px;

  margin-bottom:15px;
}

.hero h1{
  margin:0;

  font-size:
    clamp(26px,6vw,42px);
}

.hero p{
  color:#84909a;

  font-size:12px;
}

.add,
.save{
  background:#e51e25 !important;

  color:#fff;
}

.panel{
  background:#0b1015;

  border:
    1px solid
    #242d35;

  border-radius:15px;

  padding:16px;

  margin-bottom:16px;
}

.panel h2{
  margin:
    0 0 14px;

  font-size:17px;
}

.grid{
  display:grid;

  grid-template-columns:
    1fr 1fr;

  gap:11px;
}

.full{
  grid-column:1/-1;
}

label{
  display:block;

  color:#aeb7bf;

  font-size:10px;

  font-weight:900;

  margin-bottom:6px;
}

input,
textarea,
select{
  width:100%;

  padding:12px;

  border:
    1px solid
    #29323b;

  border-radius:8px;

  background:#080c10;

  color:#fff;

  outline:0;

  font:inherit;

  font-size:13px;
}

textarea{
  min-height:105px;

  resize:vertical;
}

.check{
  display:flex;

  align-items:center;

  gap:8px;

  padding-top:20px;
}

.check input{
  width:auto;
}

.check label{
  margin:0;
}

.actions{
  display:flex;

  gap:8px;

  margin-top:12px;
}

.actions button{
  padding:12px 16px;

  border:0;

  border-radius:8px;

  font-weight:900;

  cursor:pointer;
}

.cancel{
  background:#252d35;

  color:#fff;
}

.products{
  display:grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(250px,1fr)
    );

  gap:11px;
}

.card{
  overflow:hidden;

  border:
    1px solid
    #252e37;

  border-radius:12px;

  background:#0d1217;
}

.thumb{
  height:165px;

  background:#070a0d;

  display:flex;

  align-items:center;

  justify-content:center;
}

.thumb img{
  width:100%;
  height:100%;

  object-fit:cover;
}

.thumb span{
  color:#64717b;

  font-size:10px;
}

.body{
  padding:12px;
}

.name{
  font-size:15px;

  font-weight:900;
}

.meta{
  color:#7f8b95;

  font-size:10px;

  line-height:1.5;

  margin:5px 0;
}

.badges{
  display:flex;

  gap:5px;

  flex-wrap:wrap;

  margin:8px 0;
}

.badge{
  padding:5px 7px;

  border-radius:5px;

  background:#202830;

  color:#c5cdd3;

  font-size:9px;

  font-weight:900;
}

.featured{
  background:#ff2020;

  color:#fff;
}

.card-actions{
  display:grid;

  grid-template-columns:
    1fr 1fr;

  gap:6px;
}

.card-actions button{
  padding:9px;

  border:0;

  border-radius:7px;

  color:#fff;

  font-size:10px;

  font-weight:900;
}

.edit{
  background:#26323d;
}

.delete{
  background:#7c2024;
}

.note{
  color:#6f7b85;

  font-size:10px;

  margin-top:5px;

  line-height:1.4;
}

.status{
  display:none;

  padding:10px;

  border-radius:8px;

  margin-bottom:12px;

  font-size:11px;
}

.status.show{
  display:block;
}

.ok{
  color:#7be99c;

  background:#102218;

  border:
    1px solid
    #245a36;
}

.err{
  color:#ff9a9a;

  background:#281013;

  border:
    1px solid
    #65272d;
}

@media(max-width:650px){

  .grid{
    grid-template-columns:1fr;
  }

  .full{
    grid-column:auto;
  }

  .hero{
    flex-direction:column;

    align-items:stretch;
  }

  .actions{
    flex-direction:column;
  }

  .actions button{
    width:100%;
  }

  .top{
    align-items:flex-start;
  }

  .top .links{
    display:flex;

    gap:5px;
  }

}

</style>

</head>

<body>

<header class="top">

<div class="brand">

ALANG ORIGINAL PRODUCTS

<span class="red">
AOP ADMIN
</span>

</div>

<div class="links">

<a
  href="/"
  target="_blank"
>
PUBLIC CATALOGUE
</a>

<form
  method="post"
  action="/admin/logout"
>

<button>
LOGOUT
</button>

</form>

</div>

</header>

<main>

<div class="hero">

<div>

<h1>
Product Management
</h1>

<p>
Add, edit, delete and manage catalogue products.
</p>

</div>

<button
  class="add"
  id="new"
>
+ ADD PRODUCT
</button>

</div>

<div
  id="status"
  class="status"
></div>


<section
  id="editor"
  class="panel"
  style="display:none"
>

<h2 id="title">
Add Product
</h2>

<form id="form">

<input
  type="hidden"
  id="id"
>

<div class="grid">

<div>

<label>
PRODUCT NAME *
</label>

<input
  id="name"
  required
  maxlength="200"
>

</div>


<div>

<label>
CATEGORY *
</label>

<input
  id="category"
  required
  maxlength="100"
  value="Industrial"
>

</div>


<div class="full">

<label>
DESCRIPTION
</label>

<textarea
  id="description"
  maxlength="5000"
></textarea>

</div>


<div>

<label>
PRICE
</label>

<input
  id="price"
  placeholder="Price on Request"
  maxlength="100"
>

</div>


<div>

<label>
STOCK STATUS
</label>

<select id="stock">

<option>
In Stock
</option>

<option>
Out of Stock
</option>

</select>

</div>


<div class="full">

<label>
IMAGE URL 1
</label>

<input
  id="image1"
  type="url"
  placeholder="https://..."
>

<div class="note">

For now, paste a public image URL.

Direct photo upload can be added later
if R2 is activated.

</div>

</div>


<div>

<label>
IMAGE URL 2
</label>

<input
  id="image2"
  type="url"
  placeholder="https://..."
>

</div>


<div>

<label>
IMAGE URL 3
</label>

<input
  id="image3"
  type="url"
  placeholder="https://..."
>

</div>


<div>

<label>
IMAGE URL 4
</label>

<input
  id="image4"
  type="url"
  placeholder="https://..."
>

</div>


<div>

<label>
IMAGE URL 5
</label>

<input
  id="image5"
  type="url"
  placeholder="https://..."
>

</div>


<div class="full check">

<input
  id="featured"
  type="checkbox"
>

<label>
FEATURE THIS PRODUCT
</label>

</div>

</div>


<div class="actions">

<button
  class="save"
  type="submit"
>
SAVE PRODUCT
</button>

<button
  class="cancel"
  type="button"
  id="cancel"
>
CANCEL
</button>

</div>

</form>

</section>


<section class="panel">

<h2>

Catalogue Products
(
${data.length}
)

</h2>

<div
  id="products"
  class="products"
></div>

</section>

</main>


<script>

const DATA =
${safeJson(data)};

const editor =
document.getElementById(
  "editor"
);

const form =
document.getElementById(
  "form"
);

const status =
document.getElementById(
  "status"
);


function message(
  text,
  success
){

  status.textContent =
    text;

  status.className =
    "status show " +
    (
      success
        ? "ok"
        : "err"
    );

  setTimeout(
    function(){

      status.className =
        "status";

    },
    3500
  );

}


function resetForm(){

  form.reset();

  document.getElementById(
    "id"
  ).value = "";

  document.getElementById(
    "category"
  ).value =
    "Industrial";

  document.getElementById(
    "stock"
  ).value =
    "In Stock";

  document.getElementById(
    "title"
  ).textContent =
    "Add Product";

  editor.style.display =
    "block";

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

}


function editProduct(id){

  const product =
    DATA.find(function(item){

      return (
        Number(item.id) ===
        Number(id)
      );

    });


  if(!product){
    return;
  }


  document.getElementById(
    "title"
  ).textContent =
    "Edit Product #" +
    product.id;


  document.getElementById(
    "id"
  ).value =
    product.id;


  document.getElementById(
    "name"
  ).value =
    product.name || "";


  document.getElementById(
    "category"
  ).value =
    product.category ||
    "Industrial";


  document.getElementById(
    "description"
  ).value =
    product.description ||
    "";


  document.getElementById(
    "price"
  ).value =
    product.price || "";


  document.getElementById(
    "stock"
  ).value =
    product.stock ||
    "In Stock";


  for(
    let i = 1;
    i <= 5;
    i++
  ){

    document.getElementById(
      "image" + i
    ).value =
      (
        product.images &&
        product.images[i - 1]
      ) ||
      "";

  }


  document.getElementById(
    "featured"
  ).checked =
    !!product.featured;


  editor.style.display =
    "block";

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

}


function renderProducts(){

  const box =
    document.getElementById(
      "products"
    );

  box.innerHTML = "";


  if(!DATA.length){

    box.innerHTML =
      `
      <div
        style="color:#7f8b95"
      >
        No products yet.
        Click + ADD PRODUCT.
      </div>
      `;

    return;
  }


  DATA.forEach(function(product){

    const card =
      document.createElement(
        "article"
      );

    card.className =
      "card";


    const thumb =
      document.createElement(
        "div"
      );

    thumb.className =
      "thumb";


    if(
      product.images &&
      product.images[0]
    ){

      const image =
        document.createElement(
          "img"
        );

      image.src =
        product.images[0];

      image.alt =
        product.name;

      thumb.appendChild(image);

    }else{

      const span =
        document.createElement(
          "span"
        );

      span.textContent =
        "NO IMAGE";

      thumb.appendChild(span);

    }


    const body =
      document.createElement(
        "div"
      );

    body.className =
      "body";


    const name =
      document.createElement(
        "div"
      );

    name.className =
      "name";

    name.textContent =
      product.name;


    const meta =
      document.createElement(
        "div"
      );

    meta.className =
      "meta";

    meta.textContent =
      (
        product.category ||
        "Industrial"
      ) +
      " • " +
      (
        product.price ||
        "Price on Request"
      );


    const badges =
      document.createElement(
        "div"
      );

    badges.className =
      "badges";


    const stock =
      document.createElement(
        "span"
      );

    stock.className =
      "badge";

    stock.textContent =
      product.stock ||
      "In Stock";

    badges.appendChild(stock);


    if(product.featured){

      const featured =
        document.createElement(
          "span"
        );

      featured.className =
        "badge featured";

      featured.textContent =
        "FEATURED";

      badges.appendChild(
        featured
      );

    }


    const actions =
      document.createElement(
        "div"
      );

    actions.className =
      "card-actions";


    const edit =
      document.createElement(
        "button"
      );

    edit.className =
      "edit";

    edit.textContent =
      "EDIT";

    edit.onclick =
      function(){

        editProduct(
          product.id
        );

      };


    const remove =
      document.createElement(
        "button"
      );

    remove.className =
      "delete";

    remove.textContent =
      "DELETE";

    remove.onclick =
      function(){

        deleteProduct(
          product.id,
          product.name
        );

      };


    actions.append(
      edit,
      remove
    );


    body.append(
      name,
      meta,
      badges,
      actions
    );

    card.append(
      thumb,
      body
    );

    box.appendChild(
      card
    );

  });

}


async function saveProduct(event){

  event.preventDefault();


  const body = {

    id:
      document.getElementById(
        "id"
      ).value || null,

    name:
      document.getElementById(
        "name"
      ).value,

    category:
      document.getElementById(
        "category"
      ).value,

    description:
      document.getElementById(
        "description"
      ).value,

    price:
      document.getElementById(
        "price"
      ).value,

    stock:
      document.getElementById(
        "stock"
      ).value,

    featured:
      document.getElementById(
        "featured"
      ).checked

  };


  for(
    let i = 1;
    i <= 5;
    i++
  ){

    body[
      "image" + i
    ] =
      document.getElementById(
        "image" + i
      ).value;

  }


  try{

    const response =
      await fetch(
        "/admin/api/save",
        {
          method:"POST",

          headers:{
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify(body)
        }
      );


    const result =
      await response.json();


    if(!response.ok){

      throw new Error(
        result.error ||
        "Save failed."
      );

    }


    message(
      result.message,
      true
    );


    setTimeout(
      function(){

        location.reload();

      },
      450
    );


  }catch(error){

    message(
      error.message,
      false
    );

  }

}


async function deleteProduct(
  id,
  name
){

  if(
    !confirm(
      "Delete " +
      name +
      "? This cannot be undone."
    )
  ){

    return;

  }


  try{

    const response =
      await fetch(
        "/admin/api/delete",
        {
          method:"POST",

          headers:{
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify({
              id:id
            })
        }
      );


    const result =
      await response.json();


    if(!response.ok){

      throw new Error(
        result.error ||
        "Delete failed."
      );

    }


    message(
      result.message,
      true
    );


    setTimeout(
      function(){

        location.reload();

      },
      450
    );


  }catch(error){

    message(
      error.message,
      false
    );

  }

}


document.getElementById(
  "new"
).onclick =
  resetForm;


document.getElementById(
  "cancel"
).onclick =
  function(){

    editor.style.display =
      "none";

  };


form.addEventListener(
  "submit",
  saveProduct
);


renderProducts();

</script>

</body>

</html>`;
}


/* =========================================================
   ADMIN ROUTES
========================================================= */

async function handleAdmin(
  request,
  env,
  url
){

  if(
    url.pathname === "/admin" ||
    url.pathname === "/admin/"
  ){

    if(
      !(await auth(
        request,
        env
      ))
    ){

      return html(
        loginPage(
          !!env.ADMIN_PASSWORD
        )
      );

    }


    try{

      return html(
        adminPage(
          await getProducts(env)
        )
      );

    }catch(error){

      console.error(
        "ADMIN LOAD ERROR",
        error
      );

      return html(
        adminPage([]),
        500
      );

    }

  }


  if(
    url.pathname ===
    "/admin/login"
  ){

    if(
      request.method !== "POST"
    ){

      return redirect(
        "/admin"
      );

    }


    if(
      !env.ADMIN_PASSWORD
    ){

      return html(
        loginPage(false),
        503
      );

    }


    try{

      const form =
        await request.formData();

      const password =
        String(
          form.get("password") ||
          ""
        );


      if(
        password !==
        env.ADMIN_PASSWORD
      ){

        return html(
          loginPage(true,true),
          401
        );

      }


      const token =
        await makeSession(
          env.ADMIN_PASSWORD
        );


      return redirect(
        "/admin",
        {
          "Set-Cookie":
            setCookie(token)
        }
      );

    }catch(error){

      return html(
        loginPage(true,true),
        400
      );

    }

  }


  if(
    url.pathname ===
    "/admin/logout"
  ){

    if(
      request.method !== "POST"
    ){

      return redirect(
        "/admin"
      );

    }


    return redirect(
      "/admin",
      {
        "Set-Cookie":
          clearCookie()
      }
    );

  }


  if(
    url.pathname !==
      "/admin/api/save" &&
    url.pathname !==
      "/admin/api/delete"
  ){

    return new Response(
      "Not Found",
      {
        status:404
      }
    );

  }


  if(
    request.method !==
    "POST"
  ){

    return json(
      {
        error:
          "Method not allowed."
      },
      405
    );

  }


  if(
    !sameOrigin(request)
  ){

    return json(
      {
        error:
          "Invalid request origin."
      },
      403
    );

  }


  if(
    !(await auth(
      request,
      env
    ))
  ){

    return json(
      {
        error:
          "Admin session expired. Please log in again."
      },
      401
    );

  }


  try{

    const body =
      await request.json();


    /* DELETE */

    if(
      url.pathname ===
      "/admin/api/delete"
    ){

      const id =
        Number(body.id);


      if(
        !Number.isInteger(id) ||
        id < 1
      ){

        return json(
          {
            error:
              "Invalid product ID."
          },
          400
        );

      }


      const result =
        await env.DB
          .prepare(
            "DELETE FROM products WHERE id=?"
          )
          .bind(id)
          .run();


      if(
        Number(
          result.meta?.changes || 0
        ) < 1
      ){

        return json(
          {
            error:
              "Product not found."
          },
          404
        );

      }


      return json({
        ok:true,

        message:
          "Product deleted successfully."
      });

    }


    /* SAVE */

    const product = {

      id:
        body.id
          ? Number(body.id)
          : null,

      name:
        String(
          body.name || ""
        )
        .trim()
        .slice(0,200),

      category:
        String(
          body.category ||
          "Industrial"
        )
        .trim()
        .slice(0,100),

      description:
        String(
          body.description ||
          ""
        )
        .trim()
        .slice(0,5000),

      price:
        String(
          body.price ||
          "Price on Request"
        )
        .trim()
        .slice(0,100),

      stock:
        String(
          body.stock ||
          "In Stock"
        )
        .trim(),

      featured:
        !!body.featured,

      images:
        [1,2,3,4,5].map(
          function(i){

            return String(
              body[
                "image" + i
              ] || ""
            )
            .trim()
            .slice(0,2000);

          }
        )

    };


    if(
      !product.name
    ){

      return json(
        {
          error:
            "Product name is required."
        },
        400
      );

    }


    if(
      !product.category
    ){

      return json(
        {
          error:
            "Category is required."
        },
        400
      );

    }


    if(
      product.stock !==
        "In Stock" &&
      product.stock !==
        "Out of Stock"
    ){

      return json(
        {
          error:
            "Invalid stock status."
        },
        400
      );

    }


    if(
      product.images.some(
        function(url){

          return (
            url &&
            !/^https?:\/\//i.test(
              url
            )
          );

        }
      )
    ){

      return json(
        {
          error:
            "Each image must be a valid http:// or https:// URL."
        },
        400
      );

    }


    if(
      product.id &&
      (
        !Number.isInteger(
          product.id
        ) ||
        product.id < 1
      )
    ){

      return json(
        {
          error:
            "Invalid product ID."
        },
        400
      );

    }


    /* UPDATE */

    if(product.id){

      const result =
        await env.DB
          .prepare(`
            UPDATE products
            SET
              name=?,
              category=?,
              description=?,
              price=?,
              stock=?,
              featured=?,
              image1=?,
              image2=?,
              image3=?,
              image4=?,
              image5=?
            WHERE id=?
          `)
          .bind(
            product.name,
            product.category,
            product.description,
            product.price,
            product.stock,
            product.featured
              ? 1
              : 0,
            ...product.images,
            product.id
          )
          .run();


      if(
        Number(
          result.meta?.changes || 0
        ) < 1
      ){

        return json(
          {
            error:
              "Product not found."
          },
          404
        );

      }


      return json({

        ok:true,

        message:
          "Product updated successfully."

      });

    }


    /* INSERT */

    await env.DB
      .prepare(`
        INSERT INTO products(
          name,
          category,
          description,
          price,
          stock,
          featured,
          image1,
          image2,
          image3,
          image4,
          image5,
          created_at
        )
        VALUES(
          ?,?,?,?,?,?,?,?,?,?,?,datetime('now')
        )
      `)
      .bind(
        product.name,
        product.category,
        product.description,
        product.price,
        product.stock,
        product.featured
          ? 1
          : 0,
        ...product.images
      )
      .run();


    return json({

      ok:true,

      message:
        "Product added successfully."

    });


  }catch(error){

    console.error(
      "ADMIN ERROR",
      error
    );

    return json(
      {
        error:
          "Unable to complete the product operation."
      },
      500
    );

  }

}


/* =========================================================
   WORKER
========================================================= */

export default {

  async fetch(
    request,
    env
  ){

    const url =
      new URL(
        request.url
      );


    /* ADMIN ROUTES */

    if(
      [
        "/admin",
        "/admin/",
        "/admin/login",
        "/admin/logout",
        "/admin/api/save",
        "/admin/api/delete"
      ].includes(
        url.pathname
      )
    ){

      return handleAdmin(
        request,
        env,
        url
      );

    }


    /* LOGO */

    if(
      url.pathname ===
      "/aop-logo.png"
    ){

      try{

        const response =
          await fetch(
            LOGO_SOURCE
          );


        if(
          response.ok
        ){

          return new Response(
            response.body,
            {
              headers:{
                "Content-Type":
                  response.headers.get(
                    "Content-Type"
                  ) ||
                  "image/png",

                "Cache-Control":
                  "public,max-age=300"
              }
            }
          );

        }


        return new Response(
          "Logo not found",
          {
            status:404
          }
        );

      }catch(error){

        return new Response(
          "Unable to load logo",
          {
            status:500
          }
        );

      }

    }


    /* D1 PRODUCTS */

    let data = [];
    let error = false;


    try{

      data =
        await getProducts(
          env
        );

    }catch(errorObject){

      error = true;

      console.error(
        "D1 ERROR",
        errorObject
      );

    }


    /* PUBLIC CATALOGUE */

    return new Response(
      publicPage(
        data,
        error
      ),
      {
        headers:{
          "Content-Type":
            "text/html;charset=UTF-8",

          "Cache-Control":
            "no-cache"
        }
      }
    );

  }

};
