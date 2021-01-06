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

-- rendering a new tripcategory (created category, new trip) onto page: 

 // let categoryList = document.createElement('div')
            // categoryList.setAttribute("id", `${category.id}`)
            
            // main.appendChild(categoryList)
            
            // categoryList.innerHTML += `
            // <h3>${category.name}<h3>
            // `
            // let addItemBtn = document.createElement("button")
            // addItemBtn.setAttribute("id", "itemBtn")
            // addItemBtn.innerHTML = `Add Item`
            // categoryList.appendChild(addItemBtn)
            // addItemBtn.setAttribute("data-categoryId", `${addItemBtn.parentElement.id}`)

-- rendering a newly created category: 
    // let categoryList = document.createElement('div')
            // categoryList.setAttribute("id", `${newCategory.id}`)
            
            // main.appendChild(categoryList)
            // categoryList.innerHTML += newCategory.renderCategory()

            // let addItemBtn = document.createElement("button")
            // addItemBtn.setAttribute("data-categoryId", `${category.id}`)
            // addItemBtn.innerHTML = `Add Item`
            // addItem.setAttribute("id", "itemBtn")
            // categoryList.appendChild(button)

-- top of index.js
    // document.addEventListener("DOMContentLoaded", () => {
//     document.getElementById("new-trip").addEventListener('click', displayTripForm)
//     document.getElementById("trips").addEventListener('click', getTrips)
//     getTrips()
// })

// const apiService = new ApiService()

--- old show Trip code after fetch 

        // main.innerHTML = `<h1>${trip.destination}</h1>`

        // let categoryDiv = document.createElement('div')
        // categoryDiv.setAttribute("id", "category-div")
        // categoryDiv.setAttribute("data-tripid",`${trip.id}`)
        // categoryDiv.setAttribute("data-destination", `${trip.destination}`)
        // main.appendChild(categoryDiv)

        // let addCategory = document.createElement("button")
        // addCategory.setAttribute("id", "categoryBtn")
        // categoryDiv.appendChild(addCategory)
        // addCategory.innerHTML = `Add Category`
        
