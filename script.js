
const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        amount: 0,
        img: 'images/burger_1.png',
        get Summ(){
            return this.price*this.amount
        }
        

    },

    light:{
        name: 'Light',
        price: 26000,
        amount: 0, 
        img: 'images/burger_2.png',
        get Summ(){
            return this.price * this.amount
        }
    }, 

    cheeseburger: {
        name: 'CheeseBurger', 
        price: 29000, 
        amount: 0, 
        img: "images/burger_3.png", 
        get Summ(){
            return this.price * this.amount
        }
    }, 

    dburger: {
        name: 'dBurger', 
        price: 24000,
        amount: 0, 
        img: 'images/burger_4.png',
        get Summ(){
            return this.price * this.amount
        }
    }
}

const btns = document.querySelectorAll('.card__shop');
// console.log(btns);
const shopImg = document.querySelector('.shop__img');
const basket = document.querySelector('.basket');
const basketClose = document.querySelector('.basket__close');
const shopItem = document.querySelector('.shop__item');

const cardImages = document.querySelectorAll('.card__img');
const headerImg = document.querySelector('.header__img');
const basketBox = document.querySelector('.basket__box');
const basketTotal = document.querySelector('.basket__total');


cardImages.forEach((cardImg)=>{
    cardImg.addEventListener('click', ()=>{
        // console.log(cardImg);
        const cardImgName = cardImg.getAttribute('src')
        // console.log(cardImgName);
        headerImg.setAttribute('src', cardImgName)
        
    })
})

btns.forEach(btn => {
    // console.log(btn);
    btn.addEventListener('click', function () {
        // console.log(btn);
        const parent = btn.closest('.card');
        // console.log(parent);
        const cardId = parent.getAttribute('id');
        // console.log(cardId);
        // console.log(product);
        product[cardId].amount++
        // console.log(product);

        basketInfo()

      } )
});

function basketInfo() {
    const productArr = [];
    // console.log(productArr);

    for (const key in product) {
        // console.log(product[key]);
        const pk = product[key]; 
        const productCard = document.querySelector(`#${key}`);
        // console.log(productCard);
        const span = productCard.querySelector('.card__item');
        if(pk.amount){
            span.classList.add('active')
            span.innerHTML = pk.amount
            productArr.unshift(pk);
        } else{
            span.classList.remove('active')
        }
        
    }
    // console.log(productArr);
    if (totalAmount()) {
        shopItem.classList.add('active');
        shopItem.innerHTML = totalAmount()

    } else{
        shopItem.classList.remove('active')
    }

    basketBox.innerHTML = ''
    for (let i = 0; i < productArr.length; i++) {
        basketBox.innerHTML += basketCard(productArr[i])
        
    } 
    // console.log(totalSumm());
    basketTotal.innerHTML = totalSumm()
}

function basketCard(card) {
    const {img, name, price, amount, Summ} = card
    return `<div class="basket__card">
    <img src="${img}" alt="" class="basket__img">
<div class="basket__info">
    <h2 class="basket__title">${name}</h2>
    <p class="basket__price"> ${Summ} сум </p>
</div>
<div class="basket__btns" id ="${name.toLowerCase()}_card">
    <span class="basket__sym">-</span>
    <p class="basket__amount">${amount}</p>
    <span class="basket__sym">+</span>
</div>
</div>`
}

window.addEventListener('click', (e)=>{
    // console.log(e.target);
    const btn = e.target
    if (btn.classList.contains('basket__sym')) {
        // console.log(btn);
        const parent = btn.closest('.basket__btns'),
        // console.log(parent);
        parentId = parent.getAttribute('id').split('_')[0]
        // console.log(parentId);
    btn.innerHTML == '+'? product[parentId].amount++ : product[parentId].amount--
basketInfo()
    }
})


function totalAmount() {

    let amount = 0;
    for (const key in product) {
        amount+= product[key].amount
    }
    return amount
}

function totalSumm(params) {
    let total = 0
    for (const key in product) {
        total += product[key].Summ
        
        }
        return total
    }



// console.log(totalAmount());

shopImg.addEventListener('click', ()=>{
    basket.classList.add('active')
})

basketClose.addEventListener('click', ()=>{
    basket.classList.remove('active')
})

const basketBtn = document.querySelector('.basket__bottom');
const printMain = document.querySelector('.print__main');
const printTotal = document.querySelector('.print__total');


basketBtn.addEventListener('click', ()=>{
    for (const key in product) {
        const {name, amount, Summ} = product[key];
            if (amount) {
                printMain.innerHTML += ` <div class="print__main-item">
                <p class="print__main-name">
                    <span>${name}</span>
                    <span>${amount}</span>
                </p>
                <p>${Summ}</p>
            </div>`
            }
            
        }

printTotal.innerHTML = `Umumiy summa: ${totalSumm()}`
    window.print()
    })