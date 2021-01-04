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
        let viewItinerary = document.createElement("button")
        viewItinerary.innerHTML = `
        View full Itinerary
        `
        main.appendChild(viewItinerary)
    })
    viewItinerary.addEventListener(showTrip())
}




