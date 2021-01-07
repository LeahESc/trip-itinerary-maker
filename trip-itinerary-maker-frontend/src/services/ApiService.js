class ApiService {
    constructor(){
        this.baseURL = 'http://localhost:3000'
    }

    async fetchTrips(){ 
        let resp = await fetch(this.baseURL + '/trips')
        let data = resp.json()
        return data
    }
}