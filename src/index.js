const WHATSAPP_NUMBER = "";

const LOGO_SOURCE =
  "https://raw.githubusercontent.com/avinashbaraiya1113-lang/Alang-original-product-catalog/main/src/aop-logo.png";

const COOKIE = "AOP_ADMIN_SESSION";
const MAX_AGE = 86400000;

function html(s) {
  return new Response(s, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
      "cache-control": "no-store"
    }
  });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "cache-control": "no-store"
    }
  });
}

function redir(url) {
  return new Response(null, {
    status: 302,
    headers: { Location: url }
  });
}

function enc(v) {
  return encodeURIComponent(v == null ? "" : String(v));
}

function dec(v) {
  try {
    return decodeURIComponent(v || "");
  } catch {
    return v || "";
  }
}

async function sig(value) {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);

  return [...new Uint8Array(hash)]
    .map(function (b) {
      return b.toString(16).padStart(2, "0");
    })
    .join("");
}

async function session(password) {
  const token = await sig(password + "|" + COOKIE);
  return token;
}

async function auth(request, env) {
  const cookie = request.headers.get("Cookie") || "";

  const match = cookie.match(
    new RegExp(
      COOKIE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]+)"
    )
  );

  if (!match) return false;

  const expected = await session(env.ADMIN_PASSWORD || "");

  return match[1] === expected;
}

function ck(value) {
  return (
    COOKIE +
    "=" +
    value +
    "; Path=/; HttpOnly; SameSite=Lax; Max-Age=" +
    Math.floor(MAX_AGE / 1000)
  );
}

/* SERVER-SIDE HTML ESCAPE HELPER */
function textSafe(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function getProducts(env) {
  const result = await env.DB.prepare(
    "SELECT * FROM products ORDER BY featured DESC, id DESC"
  ).all();

  return (result.results || []).map(function (p) {
    return {
      id: p.id,
      name: p.name || "",
      category: p.category || "",
      description: p.description || "",
      price: p.price || "",
      stock: p.stock || "In Stock",
      featured: Number(p.featured || 0),
      images: [
        p.image1 || "",
        p.image2 || "",
        p.image3 || "",
        p.image4 || "",
        p.image5 || ""
      ].filter(Boolean)
    };
  });
}

function shell(body, title) {
  return (
    "<!DOCTYPE html>" +
    '<html lang="en">' +
    "<head>" +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1.0">' +
    "<title>" +
    title +
    "</title>" +
    "<style>" +

    "*{box-sizing:border-box}" +
    "html{scroll-behavior:smooth}" +
    "body{margin:0;background:#08090b;color:#f4f4f4;font-family:Arial,Helvetica,sans-serif}" +
    "a{text-decoration:none;color:inherit}" +

    ".header{position:sticky;top:0;z-index:50;background:rgba(7,8,10,.96);border-bottom:1px solid #292d32;backdrop-filter:blur(12px)}" +
    ".head{max-width:1250px;margin:auto;padding:14px 18px;display:flex;align-items:center;gap:14px}" +
    ".logo{width:55px;height:55px;object-fit:contain;border-radius:10px}" +
    ".brand{font-weight:900;font-size:21px;letter-spacing:1px}" +
    ".brand span{color:#e21d2e}" +
    ".tag{font-size:10px;color:#aaa;margin-top:4px;letter-spacing:1.1px;animation:tag 2.5s infinite}" +

    "@keyframes tag{0%,100%{opacity:.45}50%{opacity:1}}" +

    ".main{max-width:1250px;margin:auto;padding:28px 18px 60px}" +

    ".hero{border:1px solid #353a40;border-radius:18px;padding:25px;margin-bottom:22px;background:linear-gradient(135deg,#101216,#08090b);box-shadow:0 0 30px rgba(220,20,40,.08)}" +
    ".hero h1{margin:0 0 8px;font-size:32px}" +
    ".hero p{color:#aaa;margin:0;line-height:1.6}" +

    ".controls{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:25px}" +
    ".search{flex:1;min-width:220px;background:#111316;border:1px solid #343940;color:#fff;padding:13px 15px;border-radius:10px;outline:none}" +
    ".select{background:#111316;border:1px solid #343940;color:#fff;padding:13px;border-radius:10px;outline:none}" +

    ".section-title{font-size:22px;font-weight:900;margin:28px 0 14px;display:flex;align-items:center;gap:8px}" +
    ".section-title span{color:#e21d2e}" +

    ".grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}" +

    ".card{background:#101215;border:1px solid #30343a;border-radius:15px;overflow:hidden;position:relative;transition:.25s;box-shadow:0 8px 25px rgba(0,0,0,.25)}" +
    ".card:hover{transform:translateY(-3px);border-color:#8b1825;box-shadow:0 10px 35px rgba(220,20,40,.12)}" +

    ".card-gallery{position:relative;background:#050607;overflow:hidden}" +
    ".gallery-track{display:flex;width:100%;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;scrollbar-width:none;-ms-overflow-style:none;touch-action:pan-x}" +
    ".gallery-track::-webkit-scrollbar{display:none}" +
    ".gallery-slide{flex:0 0 100%;width:100%;aspect-ratio:1/1;scroll-snap-align:start;display:flex;align-items:center;justify-content:center;background:#090a0c}" +
    ".gallery-slide img{width:100%;height:100%;object-fit:cover;display:block}" +

    ".gallery-dots{position:absolute;bottom:9px;left:0;right:0;display:flex;justify-content:center;gap:5px;pointer-events:none}" +
    ".dot{width:6px;height:6px;border-radius:50%;background:#777;border:1px solid #aaa;box-shadow:0 1px 4px #000}" +
    ".dot.active{background:#fff;transform:scale(1.2)}" +

    ".featured-badge{position:absolute;top:10px;left:10px;background:#e21d2e;color:#fff;padding:6px 9px;border-radius:7px;font-size:10px;font-weight:900;z-index:3}" +

    ".content{padding:14px}" +
    ".category{font-size:11px;color:#999;text-transform:uppercase;letter-spacing:1px}" +
    ".name{font-size:18px;font-weight:800;margin:6px 0;line-height:1.25}" +
    ".desc{font-size:13px;color:#aaa;line-height:1.45;min-height:38px}" +
    ".price{font-size:20px;font-weight:900;color:#fff;margin:10px 0}" +
    ".stock{font-size:12px;color:#67d98c;margin-bottom:11px}" +

    ".actions{display:flex;gap:7px;flex-wrap:wrap}" +
    ".btn{border:1px solid #454a51;background:#181b20;color:#fff;padding:10px 11px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer;flex:1;min-width:100px}" +
    ".btn:hover{border-color:#e21d2e}" +
    ".redbtn{background:#e21d2e;border-color:#e21d2e}" +
    ".redbtn:hover{background:#b91524}" +
    ".wa{border-color:#278b4e;color:#72e69a}" +

    ".empty{border:1px dashed #383d44;border-radius:15px;padding:35px;text-align:center;color:#999}" +

    ".modal{position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:100;display:none;align-items:center;justify-content:center;padding:15px}" +
    ".modal.show{display:flex}" +
    ".modalbox{background:#101215;border:1px solid #41464d;border-radius:17px;max-width:850px;width:100%;max-height:92vh;overflow:auto;padding:18px;box-shadow:0 20px 70px #000}" +
    ".close{float:right;background:#25282d;border:0;color:#fff;border-radius:8px;padding:8px 12px;cursor:pointer}" +
    ".modal-gallery{margin-top:10px}" +
    ".modal-gallery .gallery-slide{aspect-ratio:16/10}" +
    ".modal-info{padding:15px 0}" +
    ".modal-info h2{font-size:27px;margin:5px 0}" +
    ".modal-info p{color:#bbb;line-height:1.6}" +
    ".sharebox{display:flex;gap:8px;flex-wrap:wrap;margin-top:15px}" +

    ".footer{text-align:center;border-top:1px solid #292d32;padding:25px;color:#777;font-size:12px;margin-top:35px}" +

    ".admin-wrap{max-width:1000px;margin:auto}" +
    ".formbox{background:#101215;border:1px solid #30343a;border-radius:15px;padding:20px;margin-bottom:20px}" +
    ".formbox h2{margin-top:0}" +
    ".label{font-size:12px;color:#aaa;margin:12px 0 6px;display:block}" +
    ".input,.textarea{width:100%;background:#08090b;border:1px solid #363b42;color:#fff;border-radius:8px;padding:12px;outline:none}" +
    ".textarea{min-height:100px;resize:vertical}" +
    ".two{display:grid;grid-template-columns:1fr 1fr;gap:12px}" +
    ".checkrow{display:flex;gap:9px;align-items:center;margin:15px 0;color:#ddd}" +

    ".list{display:grid;gap:10px}" +
    ".item{background:#101215;border:1px solid #30343a;border-radius:12px;padding:13px;display:flex;justify-content:space-between;gap:12px;align-items:center}" +
    ".item strong{display:block}.item small{color:#888}" +
    ".item-actions{display:flex;gap:7px;flex-wrap:wrap}" +

    ".topbar{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:20px}" +

    ".login{max-width:430px;margin:80px auto;padding:25px;background:#101215;border:1px solid #363b42;border-radius:17px}" +
    ".error{background:#3a1117;border:1px solid #8f2431;color:#ff9ba5;padding:10px;border-radius:8px;margin-bottom:12px}" +

    "@media(max-width:1000px){.grid{grid-template-columns:repeat(3,1fr)}}" +

    "@media(max-width:720px){" +
    ".grid{grid-template-columns:repeat(2,1fr);gap:11px}" +
    ".main{padding:20px 11px 45px}" +
    ".hero h1{font-size:25px}" +
    ".brand{font-size:17px}" +
    ".tag{font-size:8px}" +
    ".two{grid-template-columns:1fr}" +
    ".content{padding:11px}" +
    ".name{font-size:16px}" +
    ".price{font-size:18px}" +
    ".btn{font-size:10px;padding:9px 7px;min-width:0}" +
    ".desc{font-size:12px}" +
    "}" +

    "@media(max-width:430px){" +
    ".grid{grid-template-columns:1fr 1fr}" +
    ".actions .btn{flex:1 1 45%}" +
    "}" +

    "</style>" +
    "</head>" +
    "<body>" +

    '<header class="header">' +
    '<div class="head">' +
    '<img class="logo" src="' +
    LOGO_SOURCE +
    '">' +
    '<div>' +
    '<div class="brand">ALANG <span>ORIGINAL PRODUCTS</span></div>' +
    '<div class="tag">ALL ORIGINAL ALANG PRODUCTS WILL BE AVAILABLE HERE.</div>' +
    "</div>" +
    "</div>" +
    "</header>" +

    body +

    "</body></html>"
  );
}

async function publicPage(env) {
  const products = await getProducts(env);

  const categories = [
    ...new Set(
      products
        .map(function (p) {
          return p.category;
        })
        .filter(Boolean)
    )
  ].sort();

  const productJson = JSON.stringify(products)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  const body =
    '<main class="main">' +

    '<section class="hero">' +
    "<h1>ALANG ORIGINAL PRODUCTS</h1>" +
    "<p>Original industrial products from Alang, Gujarat. Explore products, view complete details, share product links and send WhatsApp inquiries.</p>" +
    "</section>" +

    '<div class="controls">' +
    '<input id="search" class="search" placeholder="Search products...">' +

    '<select id="category" class="select">' +
    '<option value="">All Categories</option>' +

    categories
      .map(function (c) {
        return (
          '<option value="' +
          enc(c) +
          '">' +
          textSafe(c) +
          "</option>"
        );
      })
      .join("") +

    "</select>" +
    "</div>" +

    '<section id="featuredSection">' +
    '<div class="section-title">⭐ <span>FEATURED PRODUCTS</span></div>' +
    '<div id="featuredGrid" class="grid"></div>' +
    "</section>" +

    "<section>" +
    '<div class="section-title">ALL PRODUCTS</div>' +
    '<div id="grid" class="grid"></div>' +
    "</section>" +

    '<div id="empty" class="empty" style="display:none">No products found.</div>' +

    '<div id="productModal" class="modal">' +
    '<div class="modalbox">' +
    '<button class="close" onclick="closeProduct()">CLOSE</button>' +
    '<div id="modalContent"></div>' +
    "</div>" +
    "</div>" +

    '<footer class="footer">© 2026 ALANG ORIGINAL PRODUCTS (AOP) · Alang, Gujarat, India</footer>' +

    "</main>" +

    "<script>" +

    "var PRODUCTS=" +
    productJson +
    ";" +

    "var WHATSAPP_NUMBER=" +
    JSON.stringify(WHATSAPP_NUMBER) +
    ";" +

    "function textSafe(v){" +
    "return String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\\\"/g,'&quot;');" +
    "}" +

    "function productLink(id){" +
    "return location.origin+location.pathname+'?product='+encodeURIComponent(id);" +
    "}" +

    "function copyText(value){" +
    "if(navigator.clipboard){" +
    "navigator.clipboard.writeText(value).then(function(){" +
    "alert('Product link copied.');" +
    "}).catch(function(){prompt('Copy this link:',value);});" +
    "}else{prompt('Copy this link:',value);}" +
    "}" +

    "function copyProductLink(id){" +
    "copyText(productLink(id));" +
    "}" +

    "function shareProduct(id){" +
    "var p=PRODUCTS.find(function(x){return String(x.id)===String(id);});" +
    "var link=productLink(id);" +

    "if(navigator.share){" +
    "navigator.share({" +
    "title:p?p.name:'AOP Product'," +
    "text:'Check this product from ALANG ORIGINAL PRODUCTS'," +
    "url:link" +
    "}).catch(function(){});" +
    "}else{" +
    "copyText(link);" +
    "}" +
    "}" +

    "function whatsappProduct(id){" +
    "var p=PRODUCTS.find(function(x){return String(x.id)===String(id);});" +

    "if(!WHATSAPP_NUMBER){" +
    "alert('WhatsApp inquiry will be available soon.');" +
    "return;" +
    "}" +

    "var message=" +
    "'Hello, I am interested in this product from ALANG ORIGINAL PRODUCTS.\\n\\nProduct: '+" +
    "(p?p.name:'')+" +
    "'\\nProduct Link: '+" +
    "productLink(id);" +

    "location.href='https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(message);" +
    "}" +

    "function makeGallery(images,modal){" +

    "var wrap=document.createElement('div');" +
    "wrap.className=modal?'card-gallery modal-gallery':'card-gallery';" +

    "var track=document.createElement('div');" +
    "track.className='gallery-track';" +

    "var dots=document.createElement('div');" +
    "dots.className='gallery-dots';" +

    "var list=(images&&images.length)?images:[];" +

    "list.forEach(function(src,index){" +

    "var slide=document.createElement('div');" +
    "slide.className='gallery-slide';" +

    "var img=document.createElement('img');" +
    "img.src=src;" +
    "img.alt='Product image '+(index+1);" +
    "img.loading=index===0?'eager':'lazy';" +

    "slide.appendChild(img);" +
    "track.appendChild(slide);" +

    "if(list.length>1){" +
    "var dot=document.createElement('span');" +
    "dot.className='dot'+(index===0?' active':'');" +
    "dots.appendChild(dot);" +
    "}" +

    "});" +

    "if(list.length>1){" +

    "track.addEventListener('scroll',function(){" +

    "var width=track.clientWidth||1;" +
    "var index=Math.round(track.scrollLeft/width);" +

    "var all=dots.querySelectorAll('.dot');" +

    "all.forEach(function(d,i){" +
    "d.classList.toggle('active',i===index);" +
    "});" +

    "});" +
    "}" +

    "wrap.appendChild(track);" +

    "if(list.length>1)wrap.appendChild(dots);" +

    "return wrap;" +
    "}" +

    "function createCard(p){" +

    "var card=document.createElement('article');" +
    "card.className='card';" +

    "if(Number(p.featured)===1){" +

    "var badge=document.createElement('div');" +
    "badge.className='featured-badge';" +
    "badge.textContent='⭐ FEATURED';" +
    "card.appendChild(badge);" +

    "}" +

    "card.appendChild(makeGallery(p.images,false));" +

    "var content=document.createElement('div');" +
    "content.className='content';" +

    "var cat=document.createElement('div');" +
    "cat.className='category';" +
    "cat.textContent=p.category||'Industrial Product';" +
    "content.appendChild(cat);" +

    "var name=document.createElement('div');" +
    "name.className='name';" +
    "name.textContent=p.name||'Product';" +
    "content.appendChild(name);" +

    "var desc=document.createElement('div');" +
    "desc.className='desc';" +
    "desc.textContent=p.description||'';" +
    "content.appendChild(desc);" +

    "var price=document.createElement('div');" +
    "price.className='price';" +
    "price.textContent=p.price||'';" +
    "content.appendChild(price);" +

    "var stock=document.createElement('div');" +
    "stock.className='stock';" +
    "stock.textContent=p.stock||'In Stock';" +
    "content.appendChild(stock);" +

    "var actions=document.createElement('div');" +
    "actions.className='actions';" +

    "var view=document.createElement('button');" +
    "view.className='btn redbtn';" +
    "view.textContent='VIEW PRODUCT';" +
    "view.onclick=function(){showProduct(p.id);};" +

    "var share=document.createElement('button');" +
    "share.className='btn';" +
    "share.textContent='SHARE';" +
    "share.onclick=function(){shareProduct(p.id);};" +

    "var wa=document.createElement('button');" +
    "wa.className='btn wa';" +
    "wa.textContent='WHATSAPP INQUIRY';" +
    "wa.onclick=function(){whatsappProduct(p.id);};" +

    "actions.appendChild(view);" +
    "actions.appendChild(share);" +
    "actions.appendChild(wa);" +

    "content.appendChild(actions);" +
    "card.appendChild(content);" +

    "return card;" +
    "}" +

    "function renderProducts(){" +

    "var q=(document.getElementById('search').value||'').toLowerCase().trim();" +
    "var cat=document.getElementById('category').value||'';" +

    "var filtered=PRODUCTS.filter(function(p){" +

    "var matchText=!q||[p.name,p.category,p.description,p.price].join(' ').toLowerCase().indexOf(q)!==-1;" +

    "var matchCat=!cat||p.category===cat;" +

    "return matchText&&matchCat;" +

    "});" +

    "var featured=filtered.filter(function(p){return Number(p.featured)===1;});" +
    "var normal=filtered;" +

    "var fg=document.getElementById('featuredGrid');" +
    "var g=document.getElementById('grid');" +
    "var fs=document.getElementById('featuredSection');" +
    "var empty=document.getElementById('empty');" +

    "fg.innerHTML='';" +
    "g.innerHTML='';" +

    "featured.forEach(function(p){fg.appendChild(createCard(p));});" +
    "normal.forEach(function(p){g.appendChild(createCard(p));});" +

    "fs.style.display=featured.length?'block':'none';" +
    "empty.style.display=filtered.length?'none':'block';" +
    "}" +

    "function showProduct(id){" +

    "var p=PRODUCTS.find(function(x){return String(x.id)===String(id);});" +

    "if(!p)return;" +

    "var box=document.getElementById('modalContent');" +
    "box.innerHTML='';" +

    "box.appendChild(makeGallery(p.images,true));" +

    "var info=document.createElement('div');" +
    "info.className='modal-info';" +

    "var category=document.createElement('div');" +
    "category.className='category';" +
    "category.textContent=p.category||'';" +
    "info.appendChild(category);" +

    "var h=document.createElement('h2');" +
    "h.textContent=p.name||'';" +
    "info.appendChild(h);" +

    "var price=document.createElement('div');" +
    "price.className='price';" +
    "price.textContent=p.price||'';" +
    "info.appendChild(price);" +

    "var stock=document.createElement('div');" +
    "stock.className='stock';" +
    "stock.textContent=p.stock||'';" +
    "info.appendChild(stock);" +

    "var description=document.createElement('p');" +
    "description.textContent=p.description||'';" +
    "info.appendChild(description);" +

    "var actions=document.createElement('div');" +
    "actions.className='sharebox';" +

    "var share=document.createElement('button');" +
    "share.className='btn redbtn';" +
    "share.textContent='SHARE PRODUCT';" +
    "share.onclick=function(){shareProduct(p.id);};" +

    "var copy=document.createElement('button');" +
    "copy.className='btn';" +
    "copy.textContent='COPY PRODUCT LINK';" +
    "copy.onclick=function(){copyProductLink(p.id);};" +

    "var wa=document.createElement('button');" +
    "wa.className='btn wa';" +
    "wa.textContent='WHATSAPP INQUIRY';" +
    "wa.onclick=function(){whatsappProduct(p.id);};" +

    "actions.appendChild(share);" +
    "actions.appendChild(copy);" +
    "actions.appendChild(wa);" +

    "info.appendChild(actions);" +
    "box.appendChild(info);" +

    "document.getElementById('productModal').classList.add('show');" +

    "history.replaceState(null,'',productLink(p.id));" +
    "}" +

    "function closeProduct(){" +
    "document.getElementById('productModal').classList.remove('show');" +
    "history.replaceState(null,'',location.pathname);" +
    "}" +

    "document.getElementById('search').addEventListener('input',renderProducts);" +
    "document.getElementById('category').addEventListener('change',renderProducts);" +

    "document.getElementById('productModal').addEventListener('click',function(e){" +
    "if(e.target===this)closeProduct();" +
    "});" +

    "renderProducts();" +

    "var params=new URLSearchParams(location.search);" +

    "if(params.get('product'))showProduct(params.get('product'));" +

    "</script>";

  return html(shell(body, "ALANG ORIGINAL PRODUCTS"));
}

function login(invalid) {
  const body =
    '<main class="main">' +
    '<div class="login">' +
    "<h1>Admin Login</h1>" +
    '<p style="color:#999">ALANG ORIGINAL PRODUCTS</p>' +

    (invalid
      ? '<div class="error">Invalid password.</div>'
      : "") +

    '<form method="POST" action="/admin/login">' +

    '<label class="label">Admin Password</label>' +

    '<input class="input" type="password" name="password" required autofocus>' +

    '<button class="btn redbtn" style="width:100%;margin-top:15px">LOGIN</button>' +

    "</form>" +

    "</div>" +
    "</main>";

  return html(shell(body, "AOP Admin Login"));
}

async function adminPage(env, editId) {
  const products = await getProducts(env);

  let edit = null;

  if (editId) {
    edit =
      products.find(function (p) {
        return String(p.id) === String(editId);
      }) || null;
  }

  const images = edit
    ? edit.images
    : ["", "", "", "", ""];

  const body =
    '<main class="main"><div class="admin-wrap">' +

    '<div class="topbar">' +

    '<div>' +
    '<h1 style="margin:0">AOP Admin Panel</h1>' +
    '<div style="color:#888">Manage catalogue products</div>' +
    "</div>" +

    '<div style="display:flex;gap:8px">' +

    '<a class="btn" href="/">VIEW CATALOGUE</a>' +

    '<form method="POST" action="/admin/logout">' +
    '<button class="btn">LOGOUT</button>' +
    "</form>" +

    "</div>" +
    "</div>" +

    '<div class="formbox">' +

    "<h2>" +
    (edit ? "Edit Product" : "Add Product") +
    "</h2>" +

    '<form id="productForm">' +

    '<input type="hidden" id="id" value="' +
    (edit ? enc(edit.id) : "") +
    '">' +

    '<label class="label">Product Name</label>' +
    '<input class="input" id="name" value="' +
    enc(edit ? edit.name : "") +
    '" required>' +

    '<label class="label">Category</label>' +
    '<input class="input" id="category" value="' +
    enc(edit ? edit.category : "") +
    '" placeholder="e.g. Steel Products">' +

    '<label class="label">Description</label>' +

    '<textarea class="textarea" id="description">' +
    textSafe(edit ? edit.description : "") +
    "</textarea>" +

    '<div class="two">' +

    '<div>' +
    '<label class="label">Price</label>' +
    '<input class="input" id="price" value="' +
    enc(edit ? edit.price : "") +
    '" placeholder="₹25,000">' +
    "</div>" +

    '<div>' +
    '<label class="label">Stock Status</label>' +
    '<input class="input" id="stock" value="' +
    enc(edit ? edit.stock : "In Stock") +
    '" placeholder="In Stock">' +
    "</div>" +

    "</div>" +

    '<label class="checkrow">' +
    '<input type="checkbox" id="featured" ' +
    (edit && Number(edit.featured) === 1 ? "checked" : "") +
    '> ⭐ Featured Product' +
    "</label>" +

    "<h3>Product Images</h3>" +

    '<label class="label">Image 1</label>' +
    '<input class="input imageInput" id="image1" value="' +
    enc(images[0] || "") +
    '">' +

    '<label class="label">Image 2</label>' +
    '<input class="input imageInput" id="image2" value="' +
    enc(images[1] || "") +
    '">' +

    '<label class="label">Image 3</label>' +
    '<input class="input imageInput" id="image3" value="' +
    enc(images[2] || "") +
    '">' +

    '<label class="label">Image 4</label>' +
    '<input class="input imageInput" id="image4" value="' +
    enc(images[3] || "") +
    '">' +

    '<label class="label">Image 5</label>' +
    '<input class="input imageInput" id="image5" value="' +
    enc(images[4] || "") +
    '">' +

    '<div style="margin-top:18px;display:flex;gap:8px;flex-wrap:wrap">' +

    '<button type="button" class="btn redbtn" onclick="saveP()">SAVE PRODUCT</button>' +

    '<button type="button" class="btn" onclick="newP()">CLEAR / NEW PRODUCT</button>' +

    (edit
      ? '<button type="button" class="btn" onclick="delP(' +
        edit.id +
        ')">DELETE PRODUCT</button>'
      : "") +

    "</div>" +

    '<div id="msg" style="margin-top:12px;color:#9adbaa"></div>' +

    "</form>" +
    "</div>" +

    '<div class="formbox">' +
    "<h2>Products</h2>" +
    '<div id="productList" class="list"></div>' +
    "</div>" +

    "</div></main>" +

    "<script>" +

    "var PRODUCTS=" +
    JSON.stringify(products).replace(/</g, "\\u003c") +
    ";" +

    "function esc(v){" +
    "return String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\\\"/g,'&quot;');" +
    "}" +

    "function newP(){" +

    "document.getElementById('id').value='';" +
    "document.getElementById('name').value='';" +
    "document.getElementById('category').value='';" +
    "document.getElementById('description').value='';" +
    "document.getElementById('price').value='';" +
    "document.getElementById('stock').value='In Stock';" +
    "document.getElementById('featured').checked=false;" +

    "for(var i=1;i<=5;i++)" +
    "document.getElementById('image'+i).value='';" +

    "document.getElementById('msg').textContent='New product ready.';" +

    "window.scrollTo({top:0,behavior:'smooth'});" +
    "}" +

    "function editP(id){" +
    "location.href='/admin?edit='+id;" +
    "}" +

    "async function saveP(){" +

    "var data={" +
    "id:document.getElementById('id').value," +
    "name:document.getElementById('name').value," +
    "category:document.getElementById('category').value," +
    "description:document.getElementById('description').value," +
    "price:document.getElementById('price').value," +
    "stock:document.getElementById('stock').value," +
    "featured:document.getElementById('featured').checked?1:0," +
    "images:[]" +
    "};" +

    "for(var i=1;i<=5;i++)" +
    "data.images.push(document.getElementById('image'+i).value);" +

    "if(!data.name.trim()){" +
    "alert('Product name is required.');" +
    "return;" +
    "}" +

    "var res=await fetch('/admin/api/save',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(data)});" +

    "var out=await res.json();" +

    "if(out.ok){" +

    "document.getElementById('msg').textContent='Product saved successfully.';" +

    "setTimeout(function(){location.href='/admin';},500);" +

    "}else{" +

    "document.getElementById('msg').textContent=out.error||'Save failed.';" +

    "}" +

    "}" +

    "async function delP(id){" +

    "if(!confirm('Delete this product?'))return;" +

    "var res=await fetch('/admin/api/delete',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({id:id})});" +

    "var out=await res.json();" +

    "if(out.ok)location.href='/admin';" +

    "else alert(out.error||'Delete failed.');" +

    "}" +

    "function renderList(){" +

    "var el=document.getElementById('productList');" +
    "el.innerHTML='';" +

    "if(!PRODUCTS.length){" +
    "el.innerHTML='<div style=\"color:#888\">No products yet.</div>';" +
    "return;" +
    "}" +

    "PRODUCTS.forEach(function(p){" +

    "var item=document.createElement('div');" +
    "item.className='item';" +

    "var left=document.createElement('div');" +

    "left.innerHTML='<strong>'+esc(p.name)+'</strong><small>'+esc(p.category||'')+' · '+esc(p.price||'')+(Number(p.featured)===1?' · ⭐ Featured':'')+'</small>';" +

    "var acts=document.createElement('div');" +
    "acts.className='item-actions';" +

    "var edit=document.createElement('button');" +
    "edit.className='btn';" +
    "edit.textContent='EDIT';" +
    "edit.onclick=function(){editP(p.id);};" +

    "var del=document.createElement('button');" +
    "del.className='btn';" +
    "del.textContent='DELETE';" +
    "del.onclick=function(){delP(p.id);};" +

    "acts.appendChild(edit);" +
    "acts.appendChild(del);" +

    "item.appendChild(left);" +
    "item.appendChild(acts);" +

    "el.appendChild(item);" +

    "});" +
    "}" +

    "window.newP=newP;" +
    "window.editP=editP;" +
    "window.saveP=saveP;" +
    "window.delP=delP;" +

    "renderList();" +

    "</script>";

  return html(shell(body, "AOP Admin Panel"));
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      const method = request.method;

      if (path === "/" && method === "GET") {
        return await publicPage(env);
      }

      if (path === "/api/products" && method === "GET") {
        return json(await getProducts(env));
      }

      if (path === "/admin" && method === "GET") {
        if (!(await auth(request, env))) {
          return login(false);
        }

        const editId = url.searchParams.get("edit");

        return await adminPage(env, editId);
      }

      if (path === "/admin/login" && method === "POST") {
        const form = await request.formData();
        const password = String(form.get("password") || "");

        if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
          return login(true);
        }

        const token = await session(env.ADMIN_PASSWORD);

        return new Response(null, {
          status: 302,
          headers: {
            Location: "/admin",
            "Set-Cookie": ck(token)
          }
        });
      }

      if (path === "/admin/logout" && method === "POST") {
        return new Response(null, {
          status: 302,
          headers: {
            Location: "/",
            "Set-Cookie":
              COOKIE +
              "=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"
          }
        });
      }

      if (path === "/admin/api/save" && method === "POST") {
        if (!(await auth(request, env))) {
          return json({ error: "Unauthorized" }, 401);
        }

        const data = await request.json();

        const id = data.id ? Number(data.id) : null;
        const name = String(data.name || "").trim();
        const category = String(data.category || "").trim();
        const description = String(data.description || "").trim();
        const price = String(data.price || "").trim();
        const stock = String(data.stock || "In Stock").trim();
        const featured = data.featured ? 1 : 0;

        const imgs = Array.isArray(data.images)
          ? data.images
          : [];

        const image1 = String(imgs[0] || "").trim();
        const image2 = String(imgs[1] || "").trim();
        const image3 = String(imgs[2] || "").trim();
        const image4 = String(imgs[3] || "").trim();
        const image5 = String(imgs[4] || "").trim();

        if (!name) {
          return json(
            { error: "Product name is required." },
            400
          );
        }

        if (id) {
          await env.DB.prepare(
            "UPDATE products SET name=?, category=?, description=?, price=?, stock=?, featured=?, image1=?, image2=?, image3=?, image4=?, image5=? WHERE id=?"
          )
            .bind(
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
              id
            )
            .run();
        } else {
          await env.DB.prepare(
            "INSERT INTO products (name,category,description,price,stock,featured,image1,image2,image3,image4,image5) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
          )
            .bind(
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
              image5
            )
            .run();
        }

        return json({ ok: true });
      }

      if (path === "/admin/api/delete" && method === "POST") {
        if (!(await auth(request, env))) {
          return json({ error: "Unauthorized" }, 401);
        }

        const data = await request.json();
        const id = Number(data.id);

        if (!id) {
          return json(
            { error: "Invalid product ID." },
            400
          );
        }

        await env.DB.prepare(
          "DELETE FROM products WHERE id=?"
        )
          .bind(id)
          .run();

        return json({ ok: true });
      }

      return new Response("Not Found", {
        status: 404
      });

    } catch (error) {
      return new Response(
        "Server Error: " +
          (error && error.message
            ? error.message
            : String(error)),
        {
          status: 500
        }
      );
    }
  }
};
