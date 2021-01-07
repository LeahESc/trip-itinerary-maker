class TripCategory{
    constructor(data){
        this.id = data.id
        this.trip_id = data.trip_id
        this.category_id = data.category_id
        this.name = data.name
    }

    renderTripCategory(){
        let categoryList = document.createElement('div')
        categoryList.setAttribute("id", `${this.id}`)
        main.appendChild(categoryList)
        

        categoryList.innerHTML += `
        <h3>${this.name}<h3>
        `
        let addItem = document.createElement("button")
        addItem.setAttribute("id", "itemBtn")
        addItem.setAttribute("data-categoryId", `${this.id}`)
        addItem.setAttribute("class", "btn btn-outline-secondary btn-sm")
        addItem.innerHTML = `Add Item`
        categoryList.appendChild(addItem) 
    }
}
