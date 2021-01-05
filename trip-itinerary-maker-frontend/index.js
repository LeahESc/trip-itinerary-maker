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
    // main = ''
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
        
        main.innerHTML = `<h1>${trip.destination}</h1>`

        let categoryDiv = document.createElement('div')
        categoryDiv.setAttribute("id", "category-div")
        categoryDiv.setAttribute("data-tripid",`${trip.id}`)
        categoryDiv.setAttribute("data-destination", `${trip.destination}`)
        main.appendChild(categoryDiv)

        let addCategory = document.createElement("button")
        addCategory.setAttribute("id", "categoryBtn")
        categoryDiv.appendChild(addCategory)
        addCategory.innerHTML = `Add Category`
        

        trip.categories.forEach(category => {
            let categoryList = document.createElement('div')
        
            categoryList.setAttribute("id", `${category.id}`)
            
            main.appendChild(categoryList)
            
            
            categoryList.innerHTML += `
            <h3>${category.name}<h3>
            `
            let addItem = document.createElement("button")
            addItem.setAttribute("id", "itemBtn")
            addItem.setAttribute("data-categoryId", `${category.id}`)
            addItem.innerHTML = `Add Item`
            categoryList.appendChild(addItem)

            if (category.items){ 
                category.items.forEach(item => { 
                itemLi.innerHTML += `
                ${item.name}
                `
                })  
            }
            
        
        
        })
        addEventsToCategoryBtn()
        addEventsToItemBtn()
    })
}

function addEventsToCategoryBtn(){
    document.querySelector("#categoryBtn").addEventListener('click', displayCategoryForm)
}

function addEventsToItemBtn(){
    document.querySelector("#itemBtn").addEventListener('click', displayItemForm)
}

function displayCategoryForm(e){ 
    let button = document.querySelector("#categoryBtn")
    let categoryDiv = document.querySelector('#category-div')
    categoryDiv.removeChild(button)
    let tripId = categoryDiv.dataset.tripid
    let categoryFormDiv = document.createElement("div")
    categoryFormDiv.setAttribute("id","c-form-div")
    categoryDiv.appendChild(categoryFormDiv) 
    fetch(BASE_URL + '/categories')
    .then(resp => resp.json())
    .then(categories => {
        let categoryCheckboxes = categories.map(c => `<label for="${c.id}">${c.name}</label><input type="checkbox" id="${c.id}" value="${c.name}" name="category[name]">`).join('')
       
        categoryFormDiv.innerHTML =  `
        <form id="category-form" data-tripId="${tripId}">
            <label>Select from Existing:</label>
            ${categoryCheckboxes} <br>
            <label>Create a New Category:</label>
            <input type="text" id="name">
            <input type="submit">
        </form>
        `
        document.querySelector("#category-form").addEventListener('submit', createCategory)
    })
}

function clearCategoryForm(){ 
    let categoryDiv = document.querySelector('#category-div')
    let categoryFormDiv = document.querySelector('#c-form-div')
    categoryFormDiv.parentNode.removeChild(categoryFormDiv)
    
    let addCategory = document.createElement("button")
    addCategory.setAttribute("id", "categoryBtn")
    categoryDiv.appendChild(addCategory)
    addCategory.innerHTML = `Add Category`   
    addEventsToCategoryBtn()
}



function createCategory(e){
    e.preventDefault()
   let arr= Array.from(document.querySelectorAll("input")).filter(c => c.checked === true)
    if (arr.length === 0){
        let newCategory = {
            name: e.target.querySelector("#name").value,
            trip_ids: [e.target.dataset.tripid]
        }
        // console.log(newCategory)
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
            <h3>${category.name}</h3>
            `
            let addItemBtn = document.createElement("button")
            main.appendChild(addItemBtn)
            addItemBtn.setAttribute("id", "itemBtn")
            addItemBtn.innerHTML = `Add Item`
            addItemBtn.addEventListener('click', displayItemForm)
        }) 
         clearCategoryForm()
    
    } else { 
        let newTripCategory = {
            trip_id: e.target.dataset.tripid,
            category_id: arr[0].id
        }

        let configObj = {
            method: 'POST',
            body: JSON.stringify(updateCategory),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }
        fetch(BASE_URL + `/trip_categories`, configObj)
        .then(resp => resp.json())
        .then(tc => {
            let categoryList = document.createElement('div')
            categoryList.setAttribute("id", `${tc.category_id}`)
            
            main.appendChild(categoryList)
            
            categoryList.innerHTML += `
            <h3>${tc.category_id}<h3>
            `
            let addItem = document.createElement("button")
            addItem.setAttribute("id", "itemBtn")
            addItem.setAttribute("data-categoryId", `${category.id}`)
            addItem.innerHTML = `Add Item`
            categoryList.appendChild(addItem)
        }) 
    }
}


function displayItemForm(e){ 
    let categoryDiv = document.querySelector('#category-div')
    let tripId = categoryDiv.dataset.tripid
    let tripName = categoryDiv.dataset.destination
    let itemForm = document.createElement('div')
    itemForm.setAttribute("id", "item-form")
    categoryDiv.appendChild(itemForm)
    fetch(BASE_URL + '/categories')
    .then(resp => resp.json())
    .then(categories => {
        let categoryCheckboxes = categories.map(c => `<label for="${c.id}">${c.name}</label><input type="checkbox" id="${c.id}" value="${c.name}" name="category[name]">`).join('')
       
    itemForm.innerHTML =  `
     <form id="new-item-form" data-tripId="${tripId}" data-destination="${tripName}">
        <label>Item Name:</label>
        <input type="text" id="item-name"> <br>
        <label>Choose from an Existing Category:</label>
        ${categoryCheckboxes} <br>
        <label>Create a New Category:</label>
        <input type="text" id="category-name">
        <input type="submit">
     </form>
     `
    document.querySelector("#item-form").addEventListener('submit', createItem)
    })
}
