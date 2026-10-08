const WHATSAPP_NUMBER="";
const LOGO_SOURCE="https://raw.githubusercontent.com/avinashbaraiya1113-lang/Alang-original-product-catalog/main/src/aop-logo.png";
const COOKIE="AOP_ADMIN_SESSION",MAX_AGE=86400000;

function html(s,status=200,h={}){return new Response(s,{status,headers:{"Content-Type":"text/html;charset=UTF-8","Cache-Control":"no-store",...h}})}
function text(s,type="text/plain",status=200){return new Response(s,{status,headers:{"Content-Type":type,"Cache-Control":"no-store"}})}
function json(x,status=200){return new Response(JSON.stringify(x),{status,headers:{"Content-Type":"application/json","Cache-Control":"no-store"}})}
function redir(x,h={}){return new Response(null,{status:302,headers:{Location:x,...h}})}

function enc(b){
 let s="";
 for(let i=0;i<b.length;i+=32768)s+=String.fromCharCode(...b.subarray(i,i+32768));
 return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")
}

function dec(s){
 s=s.replace(/-/g,"+").replace(/_/g,"/");
 s+="=".repeat((4-s.length%4)%4);
 return new TextDecoder().decode(Uint8Array.from(atob(s),c=>c.charCodeAt(0)))
}

async function sig(secret,p){
 let k=await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(secret),
  {name:"HMAC",hash:"SHA-256"},
  false,
  ["sign"]
 );
 return enc(new Uint8Array(await crypto.subtle.sign(
  "HMAC",
  k,
  new TextEncoder().encode(p)
 )))
}

async function session(secret){
 let n=new Uint8Array(18);
 crypto.getRandomValues(n);
 let p=Date.now()+"."+enc(n);
 return enc(new TextEncoder().encode(
  p+"."+await sig(secret,p)
 ))
}

async function auth(r,e){
 if(!e.ADMIN_PASSWORD)return false;
 let m=(r.headers.get("Cookie")||"").match(/AOP_ADMIN_SESSION=([^;]+)/);
 if(!m)return false;
 try{
  let d=dec(m[1]),
      i=d.lastIndexOf("."),
      p=d.slice(0,i),
      t=+p.split(".")[0];
  return Date.now()-t>=0&&
         Date.now()-t<=MAX_AGE&&
         d.slice(i+1)===await sig(e.ADMIN_PASSWORD,p)
 }catch{
  return false
 }
}

function ck(v){
 return COOKIE+"="+v+"; Path=/admin; Max-Age=86400; HttpOnly; Secure; SameSite=Strict"
}

async function getProducts(e){
 let r=await e.DB.prepare(
  "SELECT id,name,category,description,price,stock,featured,image1,image2,image3,image4,image5 FROM products ORDER BY featured DESC,id DESC"
 ).run();

 return(r.results||[]).map(x=>({
  id:x.id,
  name:x.name||"",
  category:x.category||"Industrial",
  description:x.description||"",
  price:x.price||"Price on Request",
  stock:x.stock||"In Stock",
  featured:Number(x.featured)===1,
  images:[x.image1,x.image2,x.image3,x.image4,x.image5].filter(Boolean)
 }))
}

const CSS=`*{box-sizing:border-box}body{margin:0;background:#030507;color:#f5f7f9;font-family:Arial,sans-serif}button,input,select,textarea{font:inherit}header{text-align:center;padding:25px 15px;border-bottom:1px solid #20252a;background:#070a0e}.logo{width:min(380px,88vw);max-height:210px;object-fit:contain}.brand{font-size:clamp(22px,5vw,44px);font-weight:900}.red{color:#f22}.tag{margin:15px auto 0;padding:10px;border-block:1px solid #522;overflow:hidden;color:#f22;font-weight:900;white-space:nowrap}.tag b{display:inline-block;animation:m 14s linear infinite}@keyframes m{from{transform:translateX(100%)}to{transform:translateX(-100%)}}main{width:min(1200px,calc(100% - 28px));margin:30px auto 60px}.intro{text-align:center}.intro p{color:#929da7;line-height:1.7}.controls{display:flex;gap:10px;margin:25px 0}.controls>*{flex:1;padding:14px;border:1px solid #293039;border-radius:9px;background:#0d1218;color:white}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px}.card{overflow:hidden;border:1px solid #293039;border-radius:15px;background:#0b1015}.pic{height:220px;background:#080b0f;display:flex;align-items:center;justify-content:center}.pic img{width:100%;height:100%;object-fit:cover}.content{padding:15px}.muted{color:#89949e;font-size:13px;line-height:1.5}.price{font-weight:900;margin:12px 0}.btn{display:block;width:100%;padding:12px;border:0;border-radius:8px;background:#252d35;color:white;text-align:center;text-decoration:none;font-weight:900;cursor:pointer}.wa{background:#18b957;margin-top:8px}.featured{color:#f22;font-size:11px;font-weight:900}.modal{display:none;position:fixed;inset:0;background:#000d;z-index:9;padding:15px;overflow:auto}.modal.on{display:flex;align-items:center;justify-content:center}.box{width:min(850px,100%);padding:20px;border:1px solid #333;border-radius:15px;background:#090d11}.form{display:grid;gap:10px}.form input,.form textarea,.form select{width:100%;padding:12px;border:1px solid #303840;border-radius:8px;background:#06090c;color:white}.two{display:grid;grid-template-columns:1fr 1fr;gap:10px}.redbtn{background:#f22}.list{display:grid;gap:10px}.item{padding:15px;border:1px solid #293039;border-radius:10px;background:#0b1015}.top{display:flex;justify-content:space-between;gap:10px}footer{text-align:center;color:#69737d;padding:30px;border-top:1px solid #20252a}@media(max-width:650px){.controls,.two{grid-template-columns:1fr;display:grid}.grid{grid-template-columns:1fr 1fr}.pic{height:160px}}@media(max-width:400px){.grid{grid-template-columns:1fr}}`;

const APP=`const D=await fetch("/api/products").then(r=>r.json()),WA="${WHATSAPP_NUMBER}",g=document.getElementById("g"),q=document.getElementById("q"),c=document.getElementById("c"),count=document.getElementById("count"),mo=document.getElementById("mo"),mb=document.getElementById("mb");[...new Set(D.map(x=>x.category).filter(Boolean))].sort().forEach(x=>c.insertAdjacentHTML("beforeend","<option>"+x+"</option>"));function link(p){return location.origin+location.pathname+"?product="+p.id}function show(id){let p=D.find(x=>+x.id===+id);if(!p)return;mb.innerHTML="<button class='btn redbtn' onclick='document.getElementById(\"mo\").classList.remove(\"on\")'>CLOSE</button>"+(p.images[0]?"<img style='width:100%;max-height:430px;object-fit:contain' src='"+p.images[0]+"'>":"")+"<h2>"+p.name+"</h2><div class='muted'>"+p.category+"</div><p>"+p.description+"</p><div class='price'>"+p.price+"</div>"+(WA?"<a class='btn wa' target='_blank' href='https://wa.me/"+WA+"?text="+encodeURIComponent("Hello, I am interested in this product: "+p.name+" | Product Link: "+link(p))+"'>WHATSAPP INQUIRY</a>":"");mo.classList.add("on");history.replaceState(null,"","?product="+p.id)}window.show=show;function render(){let s=q.value.toLowerCase(),cat=c.value,L=D.filter(p=>(!s||(p.name+" "+p.category+" "+p.description).toLowerCase().includes(s))&&(!cat||p.category===cat));count.textContent=L.length+" Products";g.innerHTML=L.length?L.map(p=>"<article class='card'><div class='pic'>"+(p.images[0]?"<img src='"+p.images[0]+"'>":"AOP PRODUCT")+"</div><div class='content'>"+(p.featured?"<div class='featured'>★ FEATURED</div>":"")+"<h3>"+p.name+"</h3><div class='muted'>"+p.category+"</div><p class='muted'>"+p.description+"</p><div class='price'>"+p.price+"</div><button class='btn' onclick='show("+p.id+")'>VIEW PRODUCT</button></div></article>").join(""):"<div class='muted'>No products found.</div>"}q.oninput=render;c.onchange=render;render();let id=new URLSearchParams(location.search).get("product");if(id)show(id);`;

const ADMINJS=`const D=await fetch("/api/products").then(r=>r.json());function e(x){return document.getElementById(x)}function newP(){e("editor").style.display="block";e("et").textContent="ADD PRODUCT";["id","name","cat","desc","price","i1","i2","i3","i4","i5"].forEach(x=>e(x).value="");e("stock").value="In Stock";e("feat").checked=false}function editP(p){newP();e("et").textContent="EDIT PRODUCT";e("id").value=p.id;e("name").value=p.name;e("cat").value=p.category;e("desc").value=p.description;e("price").value=p.price;e("stock").value=p.stock;e("feat").checked=p.featured;p.images.forEach((x,i)=>e("i"+(i+1)).value=x)}function cancelP(){e("editor").style.display="none"}async function saveP(){let p={id:e("id").value,name:e("name").value,category:e("cat").value,description:e("desc").value,price:e("price").value,stock:e("stock").value,featured:e("feat").checked,images:[1,2,3,4,5].map(i=>e("i"+i).value).filter(Boolean)};if(!p.name)return alert("Product Name is required");let r=await fetch("/admin/api/save",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)});if(r.ok)location.reload();else alert("Save failed")}async function delP(id){if(!confirm("Delete this product?"))return;let r=await fetch("/admin/api/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})});if(r.ok)location.reload();else alert("Delete failed")}window.newP=newP;window.editP=editP;window.cancelP=cancelP;window.saveP=saveP;window.delP=delP;e("list").innerHTML=D.length?D.map(p=>"<div class='item'><div class='top'><b>"+p.name+"</b><span>"+p.price+"</span></div><div class='muted'>"+p.category+" • "+p.stock+"</div><div class='two'><button onclick='editP("+JSON.stringify(p)+")'>EDIT</button><button class='redbtn' onclick='delP("+p.id+")'>DELETE</button></div></div>").join(""):"<div class='muted'>No products yet. Click + ADD PRODUCT.</div>";`;

function shell(body,title){
 return`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>${CSS}</style></head><body>${body}</body></html>`
}

function publicPage(){
 return shell(`<header><img class="logo" src="${LOGO_SOURCE}" alt="AOP Logo"><div class="brand">ALANG ORIGINAL PRODUCTS <span class="red">AOP</span></div><div class="tag"><b>ALL ORIGINAL ALANG PRODUCTS WILL BE AVAILABLE HERE.</b></div></header><main><section class="intro"><div class="red">ALANG INDUSTRIAL MARKET</div><h1>ORIGINAL <span class="red">ALANG</span> PRODUCTS</h1><p>Discover original industrial products from Alang, Gujarat. Explore products, availability and direct inquiries.</p></section><div class="controls"><input id="q" placeholder="Search products..."><select id="c"><option value="">All Categories</option></select></div><div id="count" class="muted"></div><div id="g" class="grid"></div></main><footer>ALANG ORIGINAL PRODUCTS (AOP)<br>Original industrial products from Alang, Gujarat.</footer><div id="mo" class="modal"><div class="box" id="mb"></div></div><script type="module" src="/app.js"></script></body></html>`,"ALANG ORIGINAL PRODUCTS | AOP")
}

function login(invalid=false){
 return shell(`<main style="max-width:430px;margin:60px auto"><div class="box"><img class="logo" src="${LOGO_SOURCE}"><h2>ALANG ORIGINAL PRODUCTS <span class="red">AOP</span></h2>${invalid?"<p class='red'>Invalid admin password.</p>":""}<form method="post" action="/admin/login" class="form"><label>ADMIN PASSWORD</label><input name="password" type="password" required><button class="btn redbtn">LOGIN TO ADMIN PANEL</button></form></div></main>`,"AOP Admin Login")
}

function adminPage(){
 return shell(`<header><div class="brand">AOP <span class="red">ADMIN PANEL</span></div><form method="post" action="/admin/logout"><button>LOGOUT</button></form></header><main><div class="two"><button class="btn redbtn" onclick="newP()">+ ADD PRODUCT</button><a class="btn" href="/">OPEN CATALOGUE</a></div><section id="editor" class="box" style="margin:15px 0;display:none"><h2 id="et">ADD PRODUCT</h2><div class="form"><input id="id" type="hidden"><input id="name" placeholder="Product Name"><input id="cat" placeholder="Category"><textarea id="desc" rows="4" placeholder="Description"></textarea><div class="two"><input id="price" placeholder="Price"><select id="stock"><option>In Stock</option><option>Out of Stock</option></select></div><input id="i1" placeholder="Image URL 1"><input id="i2" placeholder="Image URL 2"><input id="i3" placeholder="Image URL 3"><input id="i4" placeholder="Image URL 4"><input id="i5" placeholder="Image URL 5"><label><input id="feat" type="checkbox"> Featured Product</label><div class="two"><button class="btn redbtn" onclick="saveP()">SAVE PRODUCT</button><button class="btn" onclick="cancelP()">CANCEL</button></div></div></section><h2>PRODUCTS</h2><div id="list" class="list"></div></main><script type="module" src="/admin.js"></script></body></html>`,"AOP Admin Panel")
}

async function admin(r,e,u){
 if(u.pathname==="/admin"||u.pathname==="/admin/"){
  if(!(await auth(r,e)))return html(login());
  return html(adminPage())
 }

 if(u.pathname==="/admin/login"){
  if(r.method!=="POST")return redir("/admin");
  if(!e.ADMIN_PASSWORD)return html("Admin password is not configured",503);
  let f=await r.formData();
  if(String(f.get("password")||"")!==e.ADMIN_PASSWORD)return html(login(true),401);
  return redir("/admin",{"Set-Cookie":ck(await session(e.ADMIN_PASSWORD))})
 }

 if(u.pathname==="/admin/logout"){
  return redir("/admin",{"Set-Cookie":ck("")})
 }

 if(!await auth(r,e))return json({error:"Unauthorized"},401);

 if(!["/admin/api/save","/admin/api/delete"].includes(u.pathname)||r.method!=="POST"){
  return text("Not Found","text/plain",404)
 }

 let x=await r.json();

 if(u.pathname.endsWith("/delete")){
  await e.DB.prepare("DELETE FROM products WHERE id=?").bind(x.id).run();
  return json({ok:true})
 }

 if(!x.name)return json({error:"name required"},400);

 let im=[...(x.images||[]),null,null,null,null,null].slice(0,5);

 if(x.id){
  await e.DB.prepare(
   "UPDATE products SET name=?,category=?,description=?,price=?,stock=?,featured=?,image1=?,image2=?,image3=?,image4=?,image5=? WHERE id=?"
  ).bind(
   x.name,
   x.category||"Industrial",
   x.description||"",
   x.price||"Price on Request",
   x.stock||"In Stock",
   x.featured?1:0,
   ...im,
   x.id
  ).run()
 }else{
  await e.DB.prepare(
   "INSERT INTO products(name,category,description,price,stock,featured,image1,image2,image3,image4,image5) VALUES(?,?,?,?,?,?,?,?,?,?,?)"
  ).bind(
   x.name,
   x.category||"Industrial",
   x.description||"",
   x.price||"Price on Request",
   x.stock||"In Stock",
   x.featured?1:0,
   ...im
  ).run()
 }

 return json({ok:true})
}

export default{
 async fetch(r,e){
  let u=new URL(r.url);

  if(u.pathname==="/aop-logo.png")return fetch(LOGO_SOURCE);

  if(u.pathname==="/app.js")return text(APP,"application/javascript");

  if(u.pathname==="/admin.js")return text(ADMINJS,"application/javascript");

  if(u.pathname==="/api/products"){
   try{
    return json(await getProducts(e))
   }catch{
    return json([])
   }
  }

  if(u.pathname.startsWith("/admin"))return admin(r,e,u);

  return html(publicPage())
 }
};
