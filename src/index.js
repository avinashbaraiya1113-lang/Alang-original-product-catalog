const WHATSAPP_NUMBER = "";

const LOGO_SOURCE =
  "https://raw.githubusercontent.com/avinashbaraiya1113-lang/Alang-original-product-catalog/main/src/aop-logo.png";

function pageHtml(PRODUCTS, dbError) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="ALANG ORIGINAL PRODUCTS - Original industrial products from Alang, Gujarat.">
<title>ALANG ORIGINAL PRODUCTS | AOP</title>

<style>
*{
  box-sizing:border-box;
  margin:0;
  padding:0
}

html{
  scroll-behavior:smooth
}

body{
  min-height:100vh;
  overflow-x:hidden;
  color:#f5f7f9;
  font-family:Arial,Helvetica,sans-serif;
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
    )
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
  z-index:-1
}

header{
  text-align:center;
  padding:28px 15px 24px;
  border-bottom:1px solid rgba(255,255,255,.1);
  background:
    linear-gradient(
      180deg,
      rgba(12,15,20,.98),
      rgba(4,6,9,.95)
    );
  box-shadow:0 15px 45px rgba(0,0,0,.45)
}

.logo{
  display:block;
  width:min(400px,88vw);
  max-height:220px;
  object-fit:contain;
  margin:0 auto 17px;
  filter:
    drop-shadow(
      0 0 22px rgba(255,20,20,.25)
    )
}

.brand{
  font-size:clamp(23px,5vw,45px);
  font-weight:900;
  letter-spacing:.08em
}

.red{
  color:#ff2020
}

.tagline-box{
  width:100%;
  overflow:hidden;
  margin-top:19px;
  padding:11px 0;
  border-top:1px solid rgba(255,30,30,.25);
  border-bottom:1px solid rgba(255,30,30,.25)
}

.tagline{
  display:inline-block;
  white-space:nowrap;
  color:#ff2424;
  font-size:clamp(12px,2.2vw,18px);
  font-weight:900;
  letter-spacing:.12em;
  animation:move 15s linear infinite;
  text-shadow:0 0 12px rgba(255,0,0,.45)
}

@keyframes move{
  from{
    transform:translateX(100%)
  }
  to{
    transform:translateX(-100%)
  }
}

main{
  width:min(1200px,calc(100% - 28px));
  margin:30px auto 60px
}

.intro{
  text-align:center;
  padding:18px 10px 32px
}

.label{
  color:#ff2020;
  font-size:12px;
  font-weight:900;
  letter-spacing:.25em;
  margin-bottom:14px
}

.intro h1{
  font-size:clamp(31px,7vw,58px);
  line-height:1.05;
  font-weight:900;
  margin-bottom:20px
}

.intro p{
  max-width:800px;
  margin:auto;
  color:#929da7;
  font-size:clamp(14px,2vw,18px);
  line-height:1.7
}

.features{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:10px;
  max-width:900px;
  margin:0 auto 42px
}

.feature{
  padding:13px 8px;
  text-align:center;
  color:#c9cfd4;
  font-size:11px;
  font-weight:800;
  border:1px solid rgba(255,255,255,.1);
  border-radius:9px;
  background:rgba(255,255,255,.025)
}

.feature:before{
  content:"◆";
  color:#ff2020;
  margin-right:6px
}

.catalogue{
  text-align:center;
  color:#ff2020;
  font-size:12px;
  font-weight:900;
  letter-spacing:.28em;
  margin-bottom:9px
}

h2{
  text-align:center;
  font-size:clamp(27px,6vw,45px);
  margin-bottom:24px
}

.controls{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-bottom:15px
}

.search,
.category{
  padding:15px 17px;
  border:1px solid rgba(255,255,255,.11);
  border-radius:11px;
  outline:none;
  color:white;
  background:#0d1218;
  font-size:15px
}

.search{
  flex:1 1 300px
}

.search:focus{
  border-color:rgba(255,30,30,.65)
}

.category{
  flex:0 1 220px
}

.count{
  color:#7f8a94;
  font-size:13px;
  margin-bottom:15px
}

.products{
  display:grid;
  grid-template-columns:
    repeat(auto-fit,minmax(250px,1fr));
  gap:18px
}

.card{
  position:relative;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.11);
  border-radius:17px;
  background:
    linear-gradient(
      145deg,
      #141a20,
      #080b0f
    );
  box-shadow:
    0 15px 40px rgba(0,0,0,.3);
  transition:.3s
}

.card:hover{
  transform:translateY(-5px);
  border-color:rgba(255,30,30,.45)
}

.card-image{
  position:relative;
  width:100%;
  height:230px;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  background:#0a0e12
}

.card-image img{
  width:100%;
  height:100%;
  object-fit:cover
}

.placeholder{
  color:#5e6973;
  text-align:center;
  font-size:13px;
  font-weight:900
}

.featured,
.stock{
  position:absolute;
  top:12px;
  z-index:2;
  padding:7px 10px;
  border-radius:6px;
  font-size:10px;
  font-weight:900
}

.featured{
  left:12px;
  color:white;
  background:#ff2020
}

.stock{
  right:12px;
  background:rgba(0,0,0,.7);
  border:1px solid rgba(255,255,255,.15)
}

.in{
  color:#65ed8d
}

.out{
  color:#ff6868
}

.content{
  padding:17px
}

.cat{
  color:#8d98a3;
  font-size:10px;
  font-weight:900;
  letter-spacing:.14em;
  text-transform:uppercase;
  margin-bottom:8px
}

.title{
  font-size:20px;
  font-weight:900;
  margin-bottom:9px
}

.desc{
  color:#8d98a3;
  font-size:13px;
  line-height:1.55;
  min-height:40px;
  margin-bottom:13px
}

.price{
  font-size:17px;
  font-weight:900;
  margin-bottom:13px
}

.buttons{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:8px
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
  font-weight:900
}

.view{
  background:#222b34
}

.wa{
  background:#20b95a
}

.empty{
  grid-column:1/-1;
  padding:60px 20px;
  text-align:center;
  color:#7f8a94;
  border:1px dashed rgba(255,255,255,.15);
  border-radius:15px
}

.db-error{
  grid-column:1/-1;
  padding:35px 20px;
  text-align:center;
  color:#ff7777;
  border:1px solid rgba(255,60,60,.3);
  border-radius:15px;
  background:rgba(255,0,0,.04)
}

.modal{
  position:fixed;
  inset:0;
  z-index:9999;
  display:none;
  align-items:center;
  justify-content:center;
  padding:15px;
  background:rgba(0,0,0,.85);
  backdrop-filter:blur(9px)
}

.modal.show{
  display:flex
}

.modal-box{
  position:relative;
  width:min(900px,100%);
  max-height:92vh;
  overflow-y:auto;
  border:1px solid rgba(255,255,255,.14);
  border-radius:20px;
  background:#080c10
}

.close{
  position:absolute;
  top:12px;
  right:12px;
  z-index:5;
  width:42px;
  height:42px;
  border:1px solid rgba(255,255,255,.18);
  border-radius:50%;
  background:rgba(0,0,0,.7);
  color:white;
  font-size:22px;
  cursor:pointer
}

.modal-grid{
  display:grid;
  grid-template-columns:1.1fr .9fr
}

.gallery{
  padding:20px
}

.main-image{
  width:100%;
  height:420px;
  object-fit:cover;
  border-radius:14px;
  background:#090d11
}

.thumbs{
  display:flex;
  gap:8px;
  overflow-x:auto;
  margin-top:10px
}

.thumb{
  width:65px;
  height:65px;
  flex-shrink:0;
  object-fit:cover;
  border-radius:8px;
  cursor:pointer
}

.details{
  padding:35px 25px 25px
}

.details h3{
  font-size:clamp(25px,5vw,40px);
  line-height:1.15;
  margin:10px 0 15px
}

.detail-desc{
  color:#9ba5ae;
  line-height:1.7;
  margin:15px 0 25px
}

.modal-buttons{
  display:flex;
  flex-direction:column;
  gap:10px
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
  cursor:pointer
}

.modal-wa{
  background:#20b95a
}

.modal-share{
  background:#202832
}

footer{
  text-align:center;
  padding:30px 20px;
  border-top:1px solid rgba(255,255,255,.08);
  color:#68737d;
  font-size:12px;
  line-height:1.7
}

footer strong{
  color:#c9d0d5
}

@media(max-width:750px){

  .features{
    grid-template-columns:repeat(2,1fr)
  }

  .products{
    grid-template-columns:
      repeat(2,minmax(0,1fr));
    gap:10px
  }

  .card-image{
    height:160px
  }

  .content{
    padding:12px
  }

  .title{
    font-size:15px
  }

  .desc{
    font-size:11px
  }

  .price{
    font-size:13px
  }

  .buttons{
    grid-template-columns:1fr
  }

  .modal-grid{
    grid-template-columns:1fr
  }

  .main-image{
    height:280px
  }

  .details{
    padding:10px 18px 22px
  }
}

@media(max-width:390px){

  .products{
    grid-template-columns:1fr
  }

  .card-image{
    height:210px
  }
}
</style>
</head>

<body>

<header>

<img
  class="logo"
  src="/aop-logo.png?v=7"
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

<select id="category" class="category">

<option value="all">
  All Categories
</option>

</select>

</div>

<div id="count" class="count">
  0 Products
</div>

<div id="products" class="products">

${
  dbError
    ? `
      <div class="db-error">
        <h3>Catalogue temporarily unavailable</h3>
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

<div id="modal" class="modal">

<div class="modal-box">

<button id="close" class="close">
  ×
</button>

<div id="modalContent" class="modal-grid">
</div>

</div>

</div>

<script>

var DATA = ${JSON.stringify(PRODUCTS)};
var WA = ${JSON.stringify(WHATSAPP_NUMBER)};

var products =
  document.getElementById("products");

var search =
  document.getElementById("search");

var category =
  document.getElementById("category");

var count =
  document.getElementById("count");

var modal =
  document.getElementById("modal");

var modalContent =
  document.getElementById("modalContent");

var close =
  document.getElementById("close");


function loadCategories(){

  var list = [];

  DATA.forEach(function(p){

    if(
      p.category &&
      list.indexOf(p.category) === -1
    ){
      list.push(p.category);
    }

  });

  list.sort();

  list.forEach(function(c){

    var o =
      document.createElement("option");

    o.value = c;
    o.textContent = c;

    category.appendChild(o);

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

  var link =
    location.origin +
    location.pathname +
    "?product=" +
    encodeURIComponent(p.id);

  var message =
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

  var card =
    document.createElement("article");

  card.className = "card";


  if(p.featured){

    var f =
      document.createElement("div");

    f.className = "featured";

    f.textContent =
      "★ FEATURED";

    card.appendChild(f);

  }


  var imageBox =
    document.createElement("div");

  imageBox.className =
    "card-image";


  var image =
    productImage(p);


  if(image){

    var img =
      document.createElement("img");

    img.src = image;

    img.alt = p.name;

    img.loading = "lazy";

    imageBox.appendChild(img);

  }else{

    var ph =
      document.createElement("div");

    ph.className =
      "placeholder";

    ph.innerHTML =
      "AOP PRODUCT<br>IMAGE";

    imageBox.appendChild(ph);

  }


  var stock =
    document.createElement("div");

  stock.className =
    "stock " +
    (
      String(p.stock)
        .toLowerCase()
        .indexOf("out") >= 0
        ? "out"
        : "in"
    );

  stock.textContent =
    p.stock || "In Stock";

  imageBox.appendChild(stock);

  card.appendChild(imageBox);


  var content =
    document.createElement("div");

  content.className =
    "content";


  var cat =
    document.createElement("div");

  cat.className =
    "cat";

  cat.textContent =
    p.category || "Industrial";


  var title =
    document.createElement("div");

  title.className =
    "title";

  title.textContent =
    p.name || "AOP Product";


  var desc =
    document.createElement("div");

  desc.className =
    "desc";

  desc.textContent =
    p.description || "";


  var price =
    document.createElement("div");

  price.className =
    "price";

  price.textContent =
    p.price || "Price on Request";


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
    function(){

      openProduct(p.id);

    };


  var wa =
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
      function(e){

        e.preventDefault();

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

  var q =
    search.value
      .trim()
      .toLowerCase();

  var c =
    category.value;


  var list =
    DATA.filter(function(p){

      var text =
        (
          (p.name || "") +
          " " +
          (p.category || "") +
          " " +
          (p.description || "")
        ).toLowerCase();

      return (
        (!q || text.indexOf(q) >= 0) &&
        (c === "all" || p.category === c)
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

    var empty =
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

  var p =
    DATA.find(function(x){

      return (
        Number(x.id) ===
        Number(id)
      );

    });


  if(!p){
    return;
  }


  modalContent.innerHTML =
    "";


  var gallery =
    document.createElement("div");

  gallery.className =
    "gallery";


  var images =
    Array.isArray(p.images)
      ? p.images.filter(Boolean)
      : [];


  if(images.length){

    var main =
      document.createElement("img");

    main.className =
      "main-image";

    main.src =
      images[0];

    main.alt =
      p.name;

    gallery.appendChild(main);


    if(images.length > 1){

      var thumbs =
        document.createElement("div");

      thumbs.className =
        "thumbs";


      images.forEach(function(url){

        var t =
          document.createElement("img");

        t.className =
          "thumb";

        t.src =
          url;

        t.alt =
          p.name;

        t.onclick =
          function(){

            main.src =
              url;

          };

        thumbs.appendChild(t);

      });


      gallery.appendChild(thumbs);

    }

  }else{

    var noImage =
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

    gallery.appendChild(noImage);

  }


  var details =
    document.createElement("div");

  details.className =
    "details";


  var cat =
    document.createElement("div");

  cat.className =
    "cat";

  cat.textContent =
    p.category || "Industrial";


  var title =
    document.createElement("h3");

  title.textContent =
    p.name || "AOP Product";


  var price =
    document.createElement("div");

  price.className =
    "price";

  price.textContent =
    p.price || "Price on Request";


  var description =
    document.createElement("div");

  description.className =
    "detail-desc";

  description.textContent =
    p.description || "";


  var buttons =
    document.createElement("div");

  buttons.className =
    "modal-buttons";


  if(WA){

    var w =
      document.createElement("a");

    w.className =
      "modal-wa";

    w.textContent =
      "INQUIRE ON WHATSAPP";

    w.href =
      waLink(p);

    w.target =
      "_blank";

    w.rel =
      "noopener";

    buttons.appendChild(w);

  }else{

    var w2 =
      document.createElement("button");

    w2.className =
      "modal-wa";

    w2.textContent =
      "WHATSAPP INQUIRY";

    w2.onclick =
      function(){

        alert(
          "WhatsApp contact will be available soon."
        );

      };

    buttons.appendChild(w2);

  }


  var share =
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


  modalContent.appendChild(gallery);

  modalContent.appendChild(details);


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

  var url =
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

        url:url

      });

      return;

    }catch(e){}

  }


  try{

    await navigator.clipboard.writeText(
      url
    );

    alert(
      "Product link copied successfully."
    );

  }catch(e){

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
  function(e){

    if(e.target === modal){
      closeProduct();
    }

  }
);


document.addEventListener(
  "keydown",
  function(e){

    if(e.key === "Escape"){
      closeProduct();
    }

  }
);


loadCategories();

render();


var params =
  new URLSearchParams(
    location.search
  );

var shared =
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


export default {

  async fetch(request, env){

    var url =
      new URL(request.url);


    /*
     * LOGO ROUTE
     */

    if(
      url.pathname ===
      "/aop-logo.png"
    ){

      try{

        var logo =
          await fetch(
            LOGO_SOURCE
          );


        if(!logo.ok){

          return new Response(
            "Logo not found",
            {
              status:404
            }
          );

        }


        return new Response(
          logo.body,
          {
            status:200,

            headers:{
              "Content-Type":
                logo.headers.get(
                  "Content-Type"
                ) ||
                "image/png",

              "Cache-Control":
                "public, max-age=300"
            }

          }
        );

      }catch(e){

        return new Response(
          "Unable to load logo",
          {
            status:500
          }
        );

      }

    }


    /*
     * LOAD PRODUCTS FROM D1
     */

    var PRODUCTS = [];

    var dbError = false;


    try{

      var result =
        await env.DB
          .prepare(
            `
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
            `
          )
          .run();


      var rows =
        result.results || [];


      PRODUCTS =
        rows.map(function(row){

          var images = [];


          if(row.image1){
            images.push(row.image1);
          }

          if(row.image2){
            images.push(row.image2);
          }

          if(row.image3){
            images.push(row.image3);
          }

          if(row.image4){
            images.push(row.image4);
          }

          if(row.image5){
            images.push(row.image5);
          }


          return {

            id:
              row.id,

            name:
              row.name || "AOP Product",

            category:
              row.category || "Industrial",

            description:
              row.description || "",

            price:
              row.price || "Price on Request",

            stock:
              row.stock || "In Stock",

            featured:
              Number(row.featured) === 1,

            images:
              images,

            created_at:
              row.created_at || ""

          };

        });


    }catch(e){

      dbError = true;

      PRODUCTS = [];

      console.error(
        "D1 ERROR:",
        e
      );

    }


    /*
     * RETURN WEBSITE
     */

    return new Response(
      pageHtml(
        PRODUCTS,
        dbError
      ),
      {
        status:200,

        headers:{
          "Content-Type":
            "text/html; charset=UTF-8",

          "Cache-Control":
            "no-cache"
        }
      }
    );

  }

};
