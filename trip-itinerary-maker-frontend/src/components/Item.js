class Item {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.category_id = data.category.id
        this.trip_id = data.trip_id
    }

    renderItem(e) {
        let itemLi = document.createElement("li")
        let categoryList = e.path[2]
        categoryList.appendChild(itemLi)

        itemLi.innerHTML += `
             ${this.name}
             <button class="btn btn-outline-secondary btn-sm" id="removeItem" data-id="${this.id}"> Remove Item </button>
         `
         let addItem = document.createElement("button")
         addItem.setAttribute("id", "itemBtn")
         addItem.setAttribute("data-categoryId", `${this.category_id}`)

         addItem.innerHTML = `Add Item`
         categoryList.appendChild(addItem)
    }
}