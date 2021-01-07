class ApiService {
    constructor(){
        this.baseURL = 'http://localhost:3000'
    }

    async fetchTrips(){ 
        let resp = await fetch(this.baseURL + '/trips')
        let data = resp.json()
        return data
    }

    async createNewTrip(trip){
        let configObj = {
            method: 'POST',
            body: JSON.stringify(trip),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }
        let resp = await fetch(this.baseURL + '/trips', configObj)
        let data = resp.json()
        return data
    }

    async fetchTrip(id){
        let resp = await fetch(this.baseURL + `/trips/${id}`)
        let data = resp.json()
        return data
    }

    async fetchCategories(){
        let resp = await fetch(this.baseURL + `/categories`)
        let data = resp.json()
        return data
    }

    async createCategory(newCategory){
        let configObj = {
            method: 'POST',
            body: JSON.stringify(newCategory),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }
        let resp = await fetch(this.baseURL + '/categories', configObj)
        let data = resp.json()
        return data
    }

    async createTripCategory(newTripCategory){
        let configObj = {
            method: 'POST',
            body: JSON.stringify(newTripCategory),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }
        let resp = await fetch(this.baseURL + '/trip_categories', configObj)
        let data = resp.json()
        return data
    }

    async createItem(item){
        let configObj = {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }
        let resp = await fetch(this.baseURL + '/items', configObj)
        let data = resp.json()
        return data
    }

    async deleteItem(id){
        let configObj = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }
        let resp = await fetch(this.baseURL + `/items/${id}`, configObj)
    }

    async deleteTrip(id){
        let configObj = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }
        let resp = await fetch(this.baseURL + `/trips/${id}`, configObj)
    }

}