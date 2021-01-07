class Trip {
    constructor(data){
        this.id = data.id
        this.destination = data.destination
        this.categories = data.categories
    }

    renderTrip(){
        main.innerHTML += `
        <h2>${this.destination}</h2>
        </div>
        `
        this.categories.forEach(category => {
            main.innerHTML += `
            <li>${category.name}</li>
            `
        })
    }

    renderNewTrip(){
        return `<h2>${this.destination}</h2>`
    }

    displayTrip(){
        main.innerHTML = `<h1>${this.destination}</h1>`

        let categoryDiv = document.createElement('div')
        categoryDiv.setAttribute("id", "category-div")
        categoryDiv.setAttribute("data-tripid",`${this.id}`)
        main.appendChild(categoryDiv)

        let addCategory = document.createElement("button")
        addCategory.setAttribute("id", "categoryBtn")
        addCategory.setAttribute("class", "btn btn-secondary")
        categoryDiv.appendChild(addCategory)
        addCategory.innerHTML = `Add Category`
    }

    renderButtons(){
        let view = document.createElement("button")
        view.setAttribute("id", "viewBtn")
        view.setAttribute("data-id", `${this.id}`)
        view.setAttribute("class", "btn btn-secondary")
        view.innerHTML = `
        View full Itinerary
        `
        main.appendChild(view)
        
        let remove = document.createElement("button")
        remove.setAttribute("id", "deleteBtn")
        remove.setAttribute("data-id", `${this.id}`)
        remove.setAttribute("class", "btn btn-secondary")
        remove.innerHTML = `
        Remove This Trip
        `
        main.appendChild(remove)
    }
}