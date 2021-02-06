class Item {
    constructor(){
        this.data = 2
    }
}

let item = new Item()
console.log(item.data)
delete [item]
console.log(item)