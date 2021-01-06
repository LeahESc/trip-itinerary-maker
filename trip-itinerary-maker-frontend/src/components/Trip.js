class Trip {
    constructor(data){
        this.id = data.id
        this.destination = data.destination
        this.categories = data.categories
    }

    renderTrip(){
        main.innerHTML += `
        <h2>${this.destination}</h2>
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

    renderViewButton(){
        let view = document.createElement("button")
        view.setAttribute("id", "viewBtn")
        view.setAttribute("data-id", `${this.id}`)
        view.innerHTML = `
        View full Itinerary
        `
        main.appendChild(view)
    }
}