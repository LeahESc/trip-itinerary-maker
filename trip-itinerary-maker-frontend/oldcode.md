// function getTrips(){
//     main.innerHTML = ''
//     fetch(BASE_URL + "/trips")
//     .then(resp => resp.json())
//     .then(trips => {
//         showTrips(trips)
//     })
// }

// function showTrips(trips) { 
//     trips.map(trip => {
//         const newTrip = new Trip(trip)

//         main.innerHTML += newTrip.renderTrip()
//         newTrip.categories.forEach(category => {
//             main.innerHTML += `
//             <li>${category.name}</li>
//             `
//         })
//         let view = document.createElement("button")
//         view.setAttribute("id", "viewBtn")
//         view.setAttribute("data-id", `${newTrip.id}`)
//         view.innerHTML = `
//         View full Itinerary
//         `
//         main.appendChild(view)
//         attachClicksToButtons()
//     })
    
// }


 --- old show trip 
     // const trip = await apiService.fetchTrip()
    // console.log(e.target)

--- old adding view itinerary button

         // let view = document.createElement("button")
        // view.setAttribute("id", "viewBtn")
        // view.setAttribute("data-id", `${this.id}`)
        // view.innerHTML = `
        // View full Itinerary
        // `
        // main.appendChild(view)