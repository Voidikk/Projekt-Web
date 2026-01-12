let cart = JSON.parse(localStorage.getItem('cart')) || [];
let discountActive = false;

function addToCart(name, price, img) {
    cart.push({ name, price, img });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Zboží bylo přidáno do košíku');
}

function updateCartCount() {
    const el = document.getElementById('cart-count');
    if (el) el.innerText = cart.length;
}

function applyDiscount() {
    const code = document.getElementById('coupon-code').value;
    if (code === 'ISIC2026') {
        discountActive = true;
        alert('Sleva 15 % byla aktivována!');
        renderCart();
    } else {
        alert('Neplatný slevový kód');
    }
}

function renderCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    container.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p>Košík je prázdný.</p>';
    }

    cart.forEach((item, index) => {
        subtotal += item.price;
        container.innerHTML += `
            <div class="card" style="flex-direction:row; align-items:center; gap:20px; margin-bottom:15px; height:auto; padding:15px;">
                <img src="${item.img}" style="width:60px;">
                <div style="flex:1;"><h4>${item.name}</h4><p>${item.price.toLocaleString()} Kč</p></div>
                <button onclick="removeItem(${index})" style="color:red; background:none; border:none; cursor:pointer;">Odstranit</button>
            </div>`;
    });

    const discount = discountActive ? subtotal * 0.15 : 0;
    const total = subtotal - discount;

    document.getElementById('cart-subtotal').innerText = subtotal.toLocaleString() + ' Kč';
    document.getElementById('cart-discount').innerText = '-' + discount.toLocaleString() + ' Kč';
    document.getElementById('summary-total').innerText = total.toLocaleString() + ' Kč';
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function checkout() {
    if (cart.length === 0) return alert('Košík je prázdný');
    alert('Objednávka byla úspěšně odeslána!');
    localStorage.removeItem('cart');
    cart = [];
    window.location.href = 'index.html';
}
updateCartCount();