let carts= document.querySelectorAll('.add-cart');
let products = [
    {
    name: 'Shahi Paneer',
    tag: 'shahipaneer',
    price:  250,
    inCart: 0
    },
    {
        name: 'Dal Makhani',
        tag: 'dalmakhani',
        price:  250,
        inCart: 0
        },
        {
            name: 'Dhokla',
            tag: 'dhokla',
            price:  250,
            inCart: 0
            },
            {
                name: 'Chole Bhature',
                tag: 'cholebhature',
                price:  150,
                inCart: 0
                },
                {
                    name: 'Aloo Parantha',
                    tag: 'alooparantha',
                    price:  160,
                    inCart: 0
                    },
                    {
                        name: 'Paneer Parantha',
                        tag: 'paneerparantha',
                        price:  190,
                        inCart: 0
                        },
                        {
                            name: 'Dahi Bhalla',
                            tag: 'dahibhalla',
                            price:  90,
                            inCart: 0
                            },
                            {
                                name: 'Pakoda',
                                tag: 'pakoda',
                                price:  80,
                                inCart: 0
                                },
                                {
                                    name: 'Paani Puri',
                                    tag: 'paanipuri',
                                    price:  110,
                                    inCart: 0
                                    },
                                    {
                                        name: 'Pav Bhaji',
                                        tag: 'pavbhaji',
                                        price:  150,
                                        inCart: 0
                                        },
                                        {
                                            name: 'Samosa',
                                            tag: 'samosa',
                                            price:  80,
                                            inCart: 0
                                            },
                                            {
                                                name: 'Idli Sambhar',
                                                tag: 'idlisambhar',
                                                price:  80,
                                                inCart: 0
                                                },
];
 for(let i=0; i< carts.length; i++){
     carts[i].addEventListener('click', () => {
         cartNumbers(products [i]);
         totalCost(products[i]);
     })
    
 }

 function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
 }

 function cartNumbers(product){
     let productNumbers = localStorage.getItem('cartNumbers');
     productNumbers = parseInt(productNumbers);
     if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
     }
     else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
     }
     setItems(product);
 }

 function setItems(product){
     let cartItems = localStorage.getItem('productsInCart');
     cartItems = JSON.parse(cartItems);

     if(cartItems != null){

        if(cartItems[product.tag] == undefined){
             cartItems={
                 ...cartItems,
                 [product.tag]: product
             }
        }
         cartItems[product.tag].inCart += 1;
     }
     else{
        product.inCart = 1;
        cartItems = {
            [product.tag]:  product
        }
     }
     
     
     localStorage.setItem("productsInCart", JSON.stringify(cartItems));
 }

 function totalCost(product){
     //console.log("the product price is ",product.price);
     let cartCost = localStorage.getItem('totalCost');
     if(cartCost != null){
        cartCost=parseInt(cartCost);
         localStorage.setItem("totalCost", cartCost + product.price);
     }
     else{
     localStorage.setItem("totalCost", product.price);
     }
 }

 function displayCart(){
    
     let cartItems = localStorage.getItem("productsInCart");
     cartItems = JSON.parse(cartItems);
     let productContainer = document.querySelector(".products");
     let cartCost = localStorage.getItem('totalCost');
     console.log(cartItems);
     if(cartItems && productContainer){
         productContainer.innerHTML = '';
         Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="products">
            <div class="product">
                <icon class="fa fa-close" id="close"></icon>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Dal_Makhni_%26_Shahi_Paneer.jpg/1280px-Dal_Makhni_%26_Shahi_Paneer.jpg
                
                ">
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity"><icon class="fas fa-angle-left" id="close"></icon><span>${item.inCart}</span>
            <icon class="fas fa-angle-right" id="close"></icon></div>
            <div class="total">&#8377;${item.inCart * item.price}</div>
            </div>
            `;
         });
         productContainer.innerHTML +=`
         <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">Cart Total</h4>
            <h4 class="basketTotal"> &#8377;${cartCost}</h4>
            </div>
            <div class="button1">
                
                <div>
         `;
         
     }
 }
 function decrease(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems= cartItems - 1;  
 }
 onLoadCartNumbers();
 displayCart();