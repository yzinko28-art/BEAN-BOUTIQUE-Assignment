
const PRODUCTS = {
  ethiopian:{
    name:"Ethiopian Yirgacheffe",
    price:16,
    type:"Single Origin",
    description:"A bright, clean coffee with jasmine aroma, citrus acidity and a honey-like sweetness.",brew:"Pour-over or AeroPress",details:["Light roast profile","Tasting notes: jasmine, citrus, honey","Recommended water: 90–94°C","Best for filter-style brewing"]},
  midnight:{name:"Midnight House",price:14,type:"House Blend",description:"A full-bodied dark roast built around cocoa, toasted almond and brown sugar.",brew:"Espresso or French press",details:["Dark roast profile","Tasting notes: cocoa, almond, brown sugar","Rich body with a long finish","Works well with milk"]},
  colombia:{name:"Colombia Huila",price:15,type:"Single Origin",description:"A balanced Colombian coffee with red apple sweetness, caramel and soft cocoa.",brew:"Filter or French press",details:["Medium roast profile","Tasting notes: red apple, caramel, cocoa","Balanced acidity","Suitable for everyday brewing"]},
  guatemala:{name:"Guatemala Huehuetenango",price:17,type:"Single Origin",description:"Silky and aromatic with plum, dark chocolate and hazelnut notes.",brew:"Pour-over",details:["Medium roast profile","Tasting notes: plum, dark chocolate, hazelnut","Silky mouthfeel","Pairs well with pastries"]},
  blue:{name:"Blue Mountain Blend",price:15.5,type:"House Blend",description:"A smooth everyday blend with vanilla, caramel and roasted nut flavours.",brew:"Espresso or moka pot",details:["Medium roast profile","Tasting notes: vanilla, caramel, roasted nuts","Smooth finish","Good all-rounder"]},
  coastal:{name:"Coastal Decaf",price:15,type:"Decaf Blend",description:"A caffeine-free blend with cocoa, orange peel and biscuit sweetness.",brew:"Filter or French press",details:["Medium roast profile","Decaffeinated","Tasting notes: cocoa, orange, biscuit","Comfortable evening cup"]},
  pourover:{name:"Glass Pour-over Set",price:28,type:"Brewing Equipment",description:"A simple glass dripper and server set designed for clean, bright filter coffee.",brew:"Pour-over",details:["Heat-resistant glass","Includes dripper and server","Use medium-fine grounds","Rinse filter before brewing"]},
  frenchpress:{name:"Classic French Press",price:24,type:"Brewing Equipment",description:"A four-cup press with stainless-steel mesh for straightforward immersion brewing.",brew:"French press",details:["Four-cup capacity","Stainless-steel mesh","Use coarse grounds","Typical steep time: 4 minutes"]},
  kettle:{name:"Gooseneck Kettle",price:42,type:"Brewing Equipment",description:"A controlled-pour kettle for consistent flow and repeatable pour-over recipes.",brew:"Pour-over",details:["Gooseneck spout","Precision pouring","Use with a thermometer or scale","Clean and dry after use"]},
  scale:{name:"Digital Coffee Scale",price:31,type:"Brewing Equipment",description:"A compact timer scale for repeatable coffee-to-water ratios.",brew:"All brew methods",details:["Built-in timer concept","Tare function","Helps repeat recipes","Compact countertop design"]},
  grinder:{name:"Hand Burr Grinder",price:55,type:"Brewing Equipment",description:"An adjustable burr grinder for fresh grinding at home or while travelling.",brew:"All brew methods",details:["Adjustable grind size","Manual operation","Fresh grinding before brewing","Brush loose grounds regularly"]},
  espresso:{name:"Compact Espresso Machine",price:189,type:"Brewing Equipment",description:"A beginner-friendly countertop espresso machine with a steam wand for milk drinks.",brew:"Espresso",details:["Compact countertop design","Steam wand","Fine espresso grind recommended","Clean group head after use"]},
  espresso: {
    name: "Espresso",
    price: 15.00,
    type: "Espresso Coffee",
    description: "A bold and concentrated coffee with a rich aroma, smooth crema and a strong, intense flavour.",
    
    details: [
        "Ingredients: Finely ground coffee beans and hot water",
        "Taste: Bold, rich and slightly bitter",
        "Roast Level: Medium to Dark",
        "Serving Size: 30ml single shot",
        "Allergen Information: No common allergens in the basic recipe",
        "Recommended Pairing: Biscotti or dark chocolate"
    ],
    brew: "Espresso Machine",
    tastingNotes: ["Rich", "Bold", "Intense"]
},
latte: {
    name: "Latte",
    price: 17.00,
    type: "Milk Coffee",
    description: "A smooth and creamy coffee made with espresso and steamed milk.",
    brew: "Espresso machine",
    details: [
        "Ingredients: Espresso, steamed milk and milk foam",
        "Taste: Creamy, smooth and mildly sweet",
        "Serving size: 250ml",
        "Contains milk",
        "Pairs well with croissants or butter cookies"
    ]
},

cappuccino: {
    name: "Cappuccino",
    price: 19.00,
    type: "Espresso Coffee",
    description: "A balanced coffee with espresso, steamed milk and milk foam.",
    brew: "Espresso machine",
    details: [
        "Ingredients: Espresso, steamed milk and milk foam",
        "Taste: Rich, creamy and balanced",
        "Serving size: 180ml",
        "Contains milk",
        "Pairs well with chocolate cake or biscotti"
    ]
},

mocha: {
    name: "Mocha",
    price: 5.50,
    type: "Chocolate Coffee",
    description: "A delicious coffee combining espresso, chocolate and steamed milk.",
    brew: "Espresso machine",
    details: [
        "Ingredients: Espresso, chocolate sauce and steamed milk",
        "Taste: Rich chocolate flavour with coffee bitterness",
        "Serving size: 250ml",
        "Contains milk; chocolate ingredients may contain other allergens",
        "Pairs well with brownies or chocolate cookies"
    ]
}
};



const toast = (message, type="info") => {
  if (typeof Toastify !== "undefined") {
    Toastify({text:message,duration:2600,gravity:"bottom",position:"right",close:true,style:{background:type==="success"?"#0b7a53":"#0b5ed7"}}).showToast();
  } else alert(message);
};

function getCart(){ try{return JSON.parse(localStorage.getItem("beanBoutiqueCart")) || []}catch(e){return []} }
function saveCart(cart){localStorage.setItem("beanBoutiqueCart",JSON.stringify(cart));updateCartCount()}
function updateCartCount(){
  const count=getCart().reduce((sum,item)=>sum+item.qty,0);
  document.querySelectorAll(".cart-count").forEach(el=>el.textContent=count);
}
function addToCart(id){
  const p=PRODUCTS[id]; if(!p)return;
  const cart=getCart(); const existing=cart.find(i=>i.id===id);
  if(existing) existing.qty++; else cart.push({id,qty:1});
  saveCart(cart); toast(`${p.name} added to cart.`,"success");
}
function renderCart(){
  const box=document.getElementById("cartItems");
   if(!box)return;

  const cart=getCart();
  if(!cart.length){box.innerHTML=`<div class="empty-cart"><i class="fa-solid fa-cart-shopping"></i>
    <h2>Your cart is empty.</h2>
    <p>Add coffee or equipment to start your basket.</p>
    <a class="btn btn-primary" href="coffee.html">Browse Coffee</a>
    </div>`;
    updateSummary();return;
  }
  box.innerHTML=cart.map(item=>{
    const p=PRODUCTS[item.id];
    return `<article class="cart-row">
    <div class="cart-thumb">
    <i class="fa-solid fa-mug-hot"></i>
    </div>
    <div>
    <h3>
    ${p.name}</h3><p>${p.type} · $${p.price.toFixed(2)

    } each</p>
    <div class="qty">
    <button class="qty-minus" data-id="${item.id}" aria-label="Decrease quantity">−</button>
    <strong>
    ${item.qty
    }
    </strong>
    <button class="qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
    </div>
    </div>
    <div class="row-total">
    <strong>$${(p.price*item.qty).toFixed(2)}</strong>
    <button class="remove-item" data-id="${item.id}" aria-label="Remove ${p.name}">
    <i class="fa-solid fa-trash"></i>
    </button>
    </div></article>`;
  }).join("");
  box.querySelectorAll(".qty-plus").forEach(b=>b.onclick=()=>changeQty(b.dataset.id,1));
  box.querySelectorAll(".qty-minus").forEach(b=>b.onclick=()=>changeQty(b.dataset.id,-1));
  box.querySelectorAll(".remove-item").forEach(b=>b.onclick=()=>removeItem(b.dataset.id));
  updateSummary();
}
function changeQty(id,amount){const cart=getCart();const item=cart.find(i=>i.id===id);if(item){item.qty+=amount;if(item.qty<1)return removeItem(id);saveCart(cart);renderCart();}}
function removeItem(id){saveCart(getCart().filter(i=>i.id!==id));renderCart();toast("Item removed from cart.");}
function updateSummary(){
  const subtotal=getCart().reduce((sum,i)=>sum+PRODUCTS[i.id].price*i.qty,0);
  const discount=localStorage.getItem("beanCoupon")==="BEAN10"?subtotal*.1:0;
  const s=document.getElementById("cartSubtotal"),d=document.getElementById("cartDiscount"),t=document.getElementById("cartTotal");
  if(s)s.textContent=`$${subtotal.toFixed(2)}`;if(d)d.textContent=`-$${discount.toFixed(2)}`;if(t)t.textContent=`$${(subtotal-discount).toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded",()=>{
  updateCartCount();

  const menu=document.querySelector(".menu-toggle"), nav=document.querySelector(".main-nav");
  if(menu&&nav)menu.addEventListener("click",()=>nav.classList.toggle("open"));

  document.querySelectorAll(".add-to-cart").forEach(btn=>btn.addEventListener("click",()=>addToCart(btn.dataset.id)));

  if(typeof Swiper!=="undefined" && document.querySelector(".hero-swiper")){
    new Swiper(".hero-swiper",{loop:true,autoplay:{delay:4500,disableOnInteraction:false},pagination:{el:".swiper-pagination",clickable:true},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});
  }

  document.querySelectorAll("[data-open-welcome]").forEach(btn=>btn.addEventListener("click",()=>openModal("welcomeModal")));
  document.querySelectorAll("[data-close-modal]").forEach(btn=>btn.addEventListener("click",()=>closeModal(btn.closest(".modal"))));

const welcomeModal = document.getElementById("welcomeModal");

if (welcomeModal) {
    const hasSeenPopup = localStorage.getItem("beanWelcomeSeen");

    if (!hasSeenPopup) {
        setTimeout(() => {
            openModal("welcomeModal");
            localStorage.setItem("beanWelcomeSeen", "true");
        }, 1000);
    }
}

// localStorage.removeItem("beanWelcomeSeen");
// location.reload();


  const welcomeForm=document.getElementById("welcomeForm");
  if(welcomeForm)welcomeForm.addEventListener("submit",e=>{
    e.preventDefault();
    document.getElementById("welcomeSuccess").hidden=false;
    welcomeForm.reset();
    toast("Welcome! Your 10% discount code is BEAN10.","success");
  });

  const search=document.getElementById("productSearch"), filter=document.getElementById("coffeeFilter");
  if(search&&filter){
    const runFilter=()=>{
      const q=search.value.toLowerCase().trim(), f=filter.value;
      let visible=0;
      document.querySelectorAll("#coffeeGrid .catalog-card").forEach(card=>{
        const matchesQ=!q || (card.dataset.name+" "+card.dataset.search).toLowerCase().includes(q);
        const matchesF=f==="all" || card.dataset.category.split(" ").includes(f);
        card.style.display=matchesQ&&matchesF?"":"none"; if(matchesQ&&matchesF)visible++;
      });
      document.getElementById("coffeeEmpty").hidden=visible!==0;
    };
    search.addEventListener("input",runFilter);filter.addEventListener("change",runFilter);
  }

document.querySelectorAll(".detail-btn").forEach(function(btn)  {
    btn.addEventListener("click", function () {
        const id = btn.getAttribute("data-detail");
        const p = PRODUCTS[id];

        if (!p) {
            toast("Product details are unavailable.");
            return;
        }

        const detailContent = document.getElementById("detailContent");
        const detailModal = document.getElementById("detailModal");

        if (!detailContent || !detailModal) {
            toast("Detail modal  is missing from this page.");
            return;
        }

        detailContent.innerHTML = `
            <span class="eyebrow">${p.type}</span>
            <h2>${p.name}</h2>
            <p>${p.description}</p>

            <div class="detail-highlight">
                <strong>Recommended brewing method:</strong>
                <br></p>${p.brew}<p>
            </div>

            <h3>Product details</h3>
            <ul class="detail-list">
                ${p.details.map(function (item){
                  return `<li>${item}</li>`;
                } ).join("")}
            </ul>

            <div class="product-bottom">
                <strong>$${p.price.toFixed(2)}</strong>
                <button class="btn btn-primary add-detail-cart">
                    Add to Cart
                </button>
            </div>
        `;

        const addButton = detailContent.querySelector(".add-detail-cart");

       addButton.onclick = function (){
        addToCart(id);
        closeModal(detailModal);
       };

        openModal("detailModal");
    });
});

  if(typeof flatpickr!=="undefined")document.querySelectorAll(".date-picker").forEach(input=>flatpickr(input,{dateFormat:"Y-m-d",minDate:"today"}));

  document.querySelectorAll(".event-card [data-event]").forEach(btn=>btn.addEventListener("click",()=>{const select=document.getElementById("eventSelect");if(select)select.value=btn.dataset.event;}));

  const eventForm=document.getElementById("eventForm");
  if(eventForm)eventForm.addEventListener("submit",async e=>{
    e.preventDefault();
    const formData=new FormData(eventForm);
    // EmailJS setup: replace these placeholders with your own EmailJS values after creating a free EmailJS project.
    const EMAILJS_PUBLIC_KEY="YOUR_PUBLIC_KEY";
    const EMAILJS_SERVICE_ID="YOUR_SERVICE_ID";
    const EMAILJS_TEMPLATE_ID="YOUR_TEMPLATE_ID";
    if(typeof emailjs!=="undefined" && EMAILJS_PUBLIC_KEY!=="YOUR_PUBLIC_KEY"){
      emailjs.init({publicKey:EMAILJS_PUBLIC_KEY});
      try{await emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,Object.fromEntries(formData));toast("Registration sent successfully.","success");eventForm.reset();return;}catch(err){toast("Email service failed. Demo registration saved locally.");}
    }
    localStorage.setItem("lastEventRegistration",JSON.stringify(Object.fromEntries(formData)));
    toast("Registration submitted in done mode.","success");eventForm.reset();
  });

  document.querySelectorAll(".subscribe-btn").forEach(btn=>btn.addEventListener("click",()=>toast(`${btn.dataset.plan} selected. ("Your plan has been selected successfully!")`,"success")));

  const coupon=document.getElementById("applyCoupon");
  if(coupon)coupon.addEventListener("click",()=>{
    const code=document.getElementById("couponInput").value.trim().toUpperCase();
    if(code==="BEAN10"){localStorage.setItem("beanCoupon","BEAN10");toast("10% discount applied.","success");updateSummary();}
    else toast("That code is not recognised.");
  });
  const checkout=document.getElementById("checkoutBtn");
  if(checkout)checkout.addEventListener("click",()=>toast(getCart().length?"Demo checkout: no payment is processed.":"Your cart is empty."));

  renderCart();
});

function openModal(id){const m=document.getElementById(id);if(m){m.classList.add("open");m.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}}
function closeModal(modal){if(!modal)return;modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";}
