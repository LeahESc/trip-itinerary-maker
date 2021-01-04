const BASE_URL = "http://localhost:3000"
let main = document.querySelector("#main")


document.addEventListener("DOMContentLoaded", () => {
    fetchTrips()

})

function fetchTrips(){
    fetch(BASE_URL + "/trips")
    .then(resp => resp.json())
    .then(trips => {
        showTrips(trips)
    })
}

function showTrips(trips) { 
    trips.map(trip => {
        main.innerHTML += `
        <h2>${trip.destination}</h2>
        `
        trip.categories.forEach(category => {
            main.innerHTML += `
            <li>${category.name}</li>
            `
        })
        let view = document.createElement("button")
        view.setAttribute("id", "viewBtn")
        view.setAttribute("data-id", `${trip.id}`)
        view.innerHTML = `
        View full Itinerary
        `
        main.appendChild(view)
        attachClicksToButtons()
    })
    
}

function attachClicksToButtons() {
    const viewButtons = document.querySelectorAll("#viewBtn")
    viewButtons.forEach(button => { 
        button.addEventListener('click', showTrip)
    })
}

function showTrip(e) { 
    console.log(e.target)
    let id = e.target.dataset.id
    // let categoryUl = document.createElement("ul")
    let itemLi = document.createElement("li")
    let main = document.querySelector("#main")
    main.innerHTML = ""
    // main.appendChild(categoryUl)
    // categoryUl.appendChild(itemLi)
    fetch(BASE_URL + `/trips/${id}`)
    .then(resp => resp.json())
    .then(trip => {
        console.log(trip)
        main.innerHTML = `<h1>${trip.destination}</h1>`
        trip.categories.forEach(category => {
        main.innerHTML += `
        <h3>${category.name}<h3>
        `
        if (category.items){ 
            category.items.forEach(item => { 
            itemLi.innerHTML += `
            ${item.name}
            `
            })
        }
        let addItem = document.createElement("button")
        main.appendChild(addItem)
        addItem.innerHTML = `Add Item`
        })
    })
}




