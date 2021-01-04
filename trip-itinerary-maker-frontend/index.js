const BASE_URL = "http://localhost:3000"


document.addEventListener("DOMContentLoaded", () => {
    fetchTrips()

})

function fetchTrips(){
    let main = document.querySelector("#main")
    fetch(BASE_URL + "/trips")
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
    }
    )}