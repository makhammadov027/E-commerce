const cartIcon = document.querySelector('#cart-icon')
    cart = document.querySelector('.cart')
    closeCart = document.querySelector('#cart-close')

function toggleCartIcon() {
    cart.classList.toggle('active')
}

// open cart
cartIcon.addEventListener('click', toggleCartIcon)
// close cart
closeCart.addEventListener('click', toggleCartIcon)

// start when the document is ready
if(document.readyState == 'loading...'){
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}

// =================START===============
function start(){
    addEvents();
}

// ===============UPDATE=================

function update(){
    addEvents();
    updateTotal();
}

// ==================ADD EVENTS================
function addEvents(){
    let cartRemoveBtn = document.querySelectorAll('#cart-remove');
    console.log(cartRemoveBtn);
    cartRemoveBtn.forEach(element => {
        element.addEventListener('click', handleRemoveCartItem)
    });

    // change item quantity
    let cartQuantityInput = document.querySelectorAll('.cart-quantity')
    cartQuantityInput.forEach(input => {
        input.addEventListener('change', handleChangeItemQuantity)
    })

    //add item to cart:
    let addCart_btns = document.querySelectorAll('.add-cart')
    addCart_btns.forEach(item => {
        item.addEventListener('click', handleaddCartItem)
    })

    // Buy Order
    const buyBtn = document.querySelector('.btn-buy')
    buyBtn.addEventListener('click', handleBuyOrder)

}

let itemsAdded = [];

function handleaddCartItem(){

    let product = this.parentElement;
    let title = product.querySelector('.product-title').innerHTML;
    let price = product.querySelector('.product-price').innerHTML;
    let imgSrc = product.querySelector('.product-img').src;
    console.log(title, price, imgSrc);

    const newToAdd = {
        title,
        price,
        imgSrc,
    }


    // warning alert
    if(itemsAdded.find((element) => element.title === newToAdd.title)){
        alert('This item is Already Exist!')
        return
    }else {
        itemsAdded.push(newToAdd);
    }


    // add product to cart
    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement('div');
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector('.cart-content');
    cartContent.appendChild(newNode); 

    update();
}

function handleBuyOrder(){
    if(itemsAdded.length <= 0){
        alert('There is No Order to Place Yet! \nPlease Make an Order first.')
        return;
    }
    
    const cartContent = cart.querySelector('.cart-content');
    cartContent.innerHTML = '';
    alert('You Order is Placed Successfully');
    itemsAdded = [];
    
    update();
    
}

function handleChangeItemQuantity(){
    if(isNaN(this.value) || this.value < 1){
        this.value = 1;
    }
    this.value = Math.floor(this.value)

    update();
}

function handleRemoveCartItem(){
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
      (element) => 
        element.title !=
        this.parentElement.querySelector('.cart-product-title').innerHTML);
    
    update();
}

function updateTotal(){
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;

    cartBoxes.forEach(cartBox => {
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace('$', ''));
        let quantity = cartBox.querySelector('.cart-quantity').value;
        total += price * quantity;
    })

    // o'nlik kasr sonni natijaning oxirgi raqamlari soni ikkita bo'ladi: 
    total = total.toFixed(2)

    totalElement.innerHTML = '$' + total;  
}

// ================ HTML COMPONENTS ================
function CartBoxComponent(title, price, imgSrc){
    return `
        <div class="cart-box">
            <img src="${imgSrc}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>

            <!-- REMOVE_CART -->
            <i id="cart-remove" class='bx bxs-trash-alt'></i>
        </div>
    `
}