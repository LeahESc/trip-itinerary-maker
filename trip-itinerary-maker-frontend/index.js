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
    }
    )}

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
    let id = e.target.dataset.id
    fetch(BASE_URL + `/trips/${id}`)
    .then(resp => resp.json())
    .then(trip => {
        main = ""
        let categoryUl = document.createElement(ul)
        let itemLi = document.createElement(li)
        main.innerHTML += `
        <h1>${trip.destination}</h1>
        `
        main.appendChild(categoryUl)
        categoryUl.appendChil(itemLi)
        trip.categories.forEach(category => {
            categoryUl.innerHTML += `
            ${category.name}
            `
            category.items.forEach(item => { 
                itemLi.innerHTML += `
                ${item.name}
                `
            })
        })
    })
}




