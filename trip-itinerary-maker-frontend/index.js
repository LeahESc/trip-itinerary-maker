const BASE_URL = "http://localhost:3000"
let formDiv = document.getElementById("trip-form")
let main = document.querySelector("#main")


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("new-trip").addEventListener('click', displayTripForm)
    document.getElementById("trips").addEventListener('click', fetchTrips)
    fetchTrips()

})

function displayTripForm(){
    let html = `
    <form>
        <label>Name Your Destination:</label>
        <input type="text" id="destination">
        <input type="submit">
    </form>
    `
    formDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit', createTrip)
}

function clearForm() {
    formDiv = ""
}

function createTrip(e){
    e.preventDefault()
    let trip = {
        destination: e.target.querySelector("#destination").value
    }
    let configObj = {
        method: 'POST',
        body: JSON.stringify(trip),
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    }
    fetch(BASE_URL + '/trips', configObj)
    .then(resp => resp.json())
    .then(trip => {
        main.innerHTML += `
        <h2>${trip.destination}</h2>
        `
        let view = document.createElement("button")
        view.setAttribute("id", "viewBtn")
        view.setAttribute("data-id", `${trip.id}`)
        view.innerHTML = `
        View full Itinerary
        `
        main.appendChild(view)
        attachClicksToButtons()
        clearForm()
    })
   
}

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
    // console.log(e.target)
    let id = e.target.dataset.id
    let itemLi = document.createElement("li")
    let main = document.querySelector("#main")
    main.innerHTML = ""
    fetch(BASE_URL + `/trips/${id}`)
    .then(resp => resp.json())
    .then(trip => {
        console.log(trip)
        main.innerHTML = `<h1>${trip.destination}</h1>`
        let categoryDiv = document.createElement('div')
        categoryDiv.setAttribute("id", "category-div")
        categoryDiv.setAttribute("data-tripid",`${trip.id}`)
        main.appendChild(categoryDiv)
        let addCategory = document.createElement("button")
        addCategory.setAttribute("id", "categoryBtn")
        categoryDiv.appendChild(addCategory)
        addCategory.innerHTML = `Add Category`
        // addCategory.addEventListener('click', displayCategoryForm)
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
        addItem.setAttribute("id", "itemBtn")
        addItem.innerHTML = `Add Item`
        addItem.addEventListener('click', displayItemForm)
        })
        document.querySelector("#categoryBtn").addEventListener('click', displayCategoryForm)
        // document.querySelector("itemBtn").addEventListener('click', displayItemForm)
    })
}

function displayCategoryForm(e){ 
    let categoryDiv = document.querySelector('#category-div')
    let tripId = categoryDiv.dataset.tripid
    fetch(BASE_URL + '/categories')
    .then(resp => resp.json())
    .then(categories => {
        let categoryCheckboxes = categories.map(c => `<label for="${c.id}">${c.name}</label><input type="checkbox" id="${c.id}" value="${c.name}" name="category[name]">`).join('')
       
        categoryDiv.innerHTML =  `
        <form id="category-form" data-tripId="${tripId}">
            <label>Select from Existing:</label>
            ${categoryCheckboxes} <br>
            <label>Create a New Category:</label>
            <input type="text" id="destination">
            <input type="submit">
        </form>
        `
        document.querySelector("#category-form").addEventListener('submit', createCategory)
    })
}

function createCategory(e){
    e.preventDefault()
   let arr= Array.from(document.querySelectorAll("input")).filter(c => c.checked === true)
    if (arr.length === 0){
        let newCategory = {
            name: e.target.querySelector("#destination").value,
            trip_ids: [e.target.dataset.tripid]
        }
        console.log(newCategory)
        let configObj = {
            method: 'POST',
            body: JSON.stringify(newCategory),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }
        fetch(BASE_URL + '/categories', configObj)
        .then(resp => resp.json())
        .then(category => {
            main.innerHTML += `
            <h2>${category.name}</h2>
            `
            console.log(category)
            // let addItem = document.createElement("button")
            // main.appendChild(addItem)
            // addItem.setAttribute("id", "itemBtn")
            // addItem.innerHTML = `Add Item`
            // addItem.addEventListener('click', displayItemForm)
        }) 
         // fetch create new category -- let the destination know it has it
    
        } 
        
    // }else { 
    //     let categoryName = arr[0].value
        
        // fetch update destination to include this category in trip
    // }
    
}

function displayItemForm(){ 
    console.log("woohoo")
    let itemForm = document.createElement('div')
    itemForm.innerHTML =  `
        <label>Create a New Item:</label>
        <input type="text" id="name">
        <input type="submit">
    `
    itemForm.addEventListener('submit', createItem)
}

function createItem(e){
    console.log(e.target)
    // e.preventDefault()
    // let category
}


