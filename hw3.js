class Good {
    constructor(id,name,description,sizes,price,available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = Boolean(available);
    }
    setAvailable(value) {
        if (value == true || value == false) {
            return this.available = Boolean(value);
        } else {
            console.log('Недоступное значение "available')
        }        
    }
}

var cap1 = new Good(12,"cap33","green","XL",1590,true)
var cap2 = new Good(22,"cap22","red-blue","M",1290, false)
var hat1 = new Good(1209,"hat11","warm","S",990, true)
var hat2 = new Good(1213,"hat13","winter","L",890, true)
var shirt = new Good(5503,"t-shirt","for men","XL",2490, true)

class GoodsList {
    #goods = [];
    constructor(filter, sortPrice, sortDir) {
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }
    get list() { 
        var regexp = new RegExp (this.filter, 'i')  
        const result = this.#goods.filter(good => good.available == true && regexp.test(good.name) == true);
        if (this.sortDir == true && this.sortPrice == true) {
            return result.sort((num1,num2) => num2.price - num1.price )
        } else if (this.sortDir == false && this.sortPrice == true) {
            return result.sort((num1,num2) => num1.price - num2.price )
        } else {
            return result
        }
        
    }
    add(good) {
        this.#goods.push(good);
    }
    remove(id) {   
        while (this.#goods.findIndex(el => el.id == id) != -1) {
            this.#goods.splice(this.#goods.findIndex(el => el.id == id),1);  
        }         
        }
    }

var list1 = new GoodsList("hat", true, true)
list1.add(cap1)
list1.add(cap2)
list1.add(hat1)
list1.add(hat2)
list1.add(shirt)
list1.add(hat1)

// console.log(list1.list)

class BasketGood extends Good {
    constructor(good, amount) {
        super(good.id,good.name,good.description,good.sizes,good.price,good.available);
        this.amount = amount;
    }
}

class Basket {
    goods = [];
    add(good,amount) {
        if ( this.goods.find(arg => arg.id == good.id) == undefined ) {
            var goodInBasket = new BasketGood(good,amount)
            this.goods.push(goodInBasket)
        } else {
            this.goods[this.goods.findIndex(arg => arg.id == good.id)].amount += amount
        }    
    }
    remove(good,amount) {
        this.goods[this.goods.findIndex(arg => good.id == arg.id)].amount -= amount
        if (this.goods[this.goods.findIndex(arg => good.id == arg.id)].amount < 0) {
            this.goods.splice(this.goods.findIndex(arg => good.id == arg.id),1)
        }
    }
    clear() {
        this.goods.splice(0)
    }
    removeUnavailable() {
        this.goods = this.goods.filter(good => good.available != false)
    }
    get totalAmount() {
        var sum = this.goods.reduce((accum, current) => accum + current.amount, 0 )
        return sum
    }
    get totalSum()  {
        var sum = this.goods.reduce((accum, current) => accum + (current.amount * current.price), 0 )
        return sum
    }
}

var basket1 = new Basket

basket1.add(hat1,3)
basket1.add(cap2,2)
basket1.add(hat1,1)
basket1.add(cap2,5)
// basket1.remove(cap2,213)
// basket1.clear()
// basket1.removeUnavailable()
console.log(basket1.goods)
console.log(basket1.totalSum)

