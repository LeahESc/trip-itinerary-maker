const BASE_URL = 'http://localhost:3000'
let formDiv = document.getElementById("trip-form")
let  main = document.querySelector("#main")

const init = () => {
    bindEventListeners()
    renderTrips()
}

function bindEventListeners(){
    document.getElementById("new-trip").addEventListener('click', displayTripForm)
    document.getElementById("trips").addEventListener('click', renderTrips)
}

function renderTrips() { 
    main.innerHTML = ''
        fetch(BASE_URL + "/trips")
        .then(resp => resp.json())
        .then(trips => {
            trips.map(trip => {
            const newTrip = new Trip(trip)
            newTrip.renderTrip()
            newTrip.renderViewButton()

            attachClicksToButtons()
        })
    }) 
}
  
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
    formDiv.innerHTML = ""
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
        const createdTrip = new Trip(trip)
        main.innerHTML += createdTrip.renderNewTrip()
        createdTrip.renderViewButton()
   
        attachClicksToButtons()
        clearForm()
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
    main.innerHTML = ""
    fetch(BASE_URL + `/trips/${id}`)
    .then(resp => resp.json())
    .then(trip => {
        let showTrip = new Trip(trip)
        showTrip.displayTrip()
        showTrip.categories.forEach(category => {
            let newCategory = new Category(category)
            newCategory.renderCategory(showTrip.id)
        })
        addEventsToCategoryBtn()
        addEventsToItemBtn()
        addEventsToRemoveItemBtn()
    })
}

function addEventsToCategoryBtn(){
    document.querySelector("#categoryBtn").addEventListener('click', displayCategoryForm)
}

function addEventsToItemBtn(){
    const itemButtons = document.querySelectorAll("#itemBtn")
    itemButtons.forEach(button => button.addEventListener('click', displayItemForm))
}

function addEventsToRemoveItemBtn(){
    document.querySelectorAll("#removeItem").forEach(button => button.addEventListener('click', removeItem))
}

function displayCategoryForm(e){ 
    let categoryButton = document.querySelector("#categoryBtn")
    let categoryDiv = document.querySelector('#category-div')
    categoryDiv.removeChild(categoryButton)
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
            const newCategory = new Category(category)
            newCategory.renderCategory()
            addEventsToItemBtn()
        }) 
         clearCategoryForm()    
    } else { 
        let newTripCategory = {
            trip_id: e.target.dataset.tripid,
            category_id: arr[0].id
        }

        let configObj = {
            method: 'POST',
            body: JSON.stringify(newTripCategory),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }
        fetch(BASE_URL + `/trip_categories`, configObj)
        .then(resp => resp.json())
        .then(category => {
            let newTripCategory = new TripCategory(category)
            newTripCategory.renderTripCategory()
            addEventsToItemBtn()    
        }) 
        clearCategoryForm()   
    }
}

function displayItemForm(e){ 
    let itemBtn = e.target
    let parent = itemBtn.parentNode
    let categoryId = parent.id
    parent.removeChild(itemBtn)
    let itemForm = document.createElement('div')
    itemForm.setAttribute("id", "item-form")
    parent.appendChild(itemForm)

    itemForm.innerHTML =  `
     <form id="new-item-form" data-categoryId="${categoryId}">
        <label>Add your new activity:</label>
        <input type="text" id="name"> <br>
        <input type="submit">
     </form>
     `
    document.querySelector("#item-form").addEventListener('submit', createItem) 
}

function createItem(e){
    let tripId = document.querySelector("#category-div").dataset.tripid
    
    let newItem = {
        name: e.target.querySelector("#name").value,
        category_id: e.target.dataset.categoryid,
        trip_id: tripId
    }

    let configObj = {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    }

    fetch(BASE_URL + '/items', configObj)
    .then(resp => resp.json())
    .then(item => {
        let newItem = new Item(item)
        newItem.renderItem(e) 
        // let itemLi = document.createElement("li")
        // let categoryList = e.path[2]
        // categoryList.appendChild(itemLi)

        // itemLi.innerHTML += `
        //     ${item.name}
        //     <button id ="removeItem" data-id="${item.id}"> Remove Item </button>
        // `
        // let addItem = document.createElement("button")
        // addItem.setAttribute("id", "itemBtn")
        // addItem.setAttribute("data-categoryId", `${item.category.id}`)
        // addItem.innerHTML = `Add Item`
        // categoryList.appendChild(addItem)
        addEventsToItemBtn()
        addEventsToRemoveItemBtn()
        clearItemForm()
    })  
}

function removeItem(e){
    let configObj = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    }
    fetch(BASE_URL + `/items/${e.target.dataset.id}`, configObj)
    .then(() => {
        renderTrips()
    })
}

function clearItemForm() {
    const itemForm = document.querySelector("#item-form")
    itemForm.parentElement.removeChild(itemForm)
}

init()