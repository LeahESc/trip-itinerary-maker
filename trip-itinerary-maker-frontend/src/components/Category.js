class Category {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.items = data.items
        this.trips = data.trips
    }

    renderCategoryName(){
        return `
            <h3>${this.name}</h3>
            `
    }

    renderCategory(tripId){
        let categoryList = document.createElement('div')
        categoryList.setAttribute("id", `${this.id}`)
        main.appendChild(categoryList)
        

        categoryList.innerHTML += `
        <h3>${this.name}<h3>
        `
        if (this.items){ 
            this.items.filter(item => item.trip_id === tripId).forEach(item => { 
                let itemLi = document.createElement("li")
                categoryList.appendChild(itemLi)
                itemLi.innerHTML += `
                ${item.name}  <button class="btn btn-outline-secondary btn-sm" id="removeItem" data-id="${item.id}"> Remove Item </button>
                `
            
            })
        }
        let addItem = document.createElement("button")
        addItem.setAttribute("id", "itemBtn")
        addItem.setAttribute("data-categoryId", `${this.id}`)
        addItem.innerHTML = `Add Item`
        categoryList.appendChild(addItem) 
    }
}