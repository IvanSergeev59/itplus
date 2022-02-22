export default class ItplusService {
    apiBase = "http://localhost:5000/api/Data";

    async getData () {
        let res = await fetch(this.apiBase);              
        if (!res.ok) {          
            throw new Error (`Could not fetch ${this.apiBase}` + ` , received ${res.status}`)
        };
        return res.json()
        
     
    }

    async getDataHandler() {
        return this.getData()
            .then((data) => {                           
                let i = 1;
                let newArr = []
                data.houses.map(obj => {
                    let houses = [];                    
                    obj.consumptions.map(item =>{      
                        let ololo = item.Date.substr(0,10)
                        let ar = {
                            id: i,
                            name:obj.Name,
                            consumerId: obj.ConsumerId,
                            date: ololo,
                            consumption: item.Consumption,
                            weather: item.Weather ? item.Weather : null,
                            price: item.Price ? item.Price : null
                        }
                        i++;
                        houses.push(ar);
                    })
                    newArr.push(houses);   
                    newArr[obj.ConsumerId-1].name =obj.Name;   
                })
                data.plants.map(obj => {
                    let plants = [];
                    obj.consumptions.map(it =>{      
                        let ololo = it.Date.substr(0,10)
                        let ar = {
                            id: i,
                            name:obj.Name,
                            consumerId: obj.ConsumerId,
                            date: ololo,
                            consumption: it.Consumption,
                            weather: it.Weather ? it.Weather : null,
                            price: it.Price ? it.Price : null
                        }
                        i++;
                        plants.push(ar);
                    })
                    newArr.push(plants);
                    newArr[obj.ConsumerId-1].name = obj.Name          
                })
            
                return newArr
                })  
      
    }
}