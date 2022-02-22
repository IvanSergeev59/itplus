
const update = (state, action) => {  

    // do lists of names
    function fetchNames(items) {
        let names =[]
        items.map(item => names.push(item.name))
       return names
    }
    // user change data in table
    function changeData(item) {
        //get current data      
        let {data} = state.mainState;

        data.forEach((arr) => {
            arr.forEach((ar, jnd) => {
                //find item with event id
                if(ar.id === item.id) {             
                    for (let key in ar) {       
                        if(key === item.field) {
                            //filter houses or plants
                            data.map(a => a[jnd][key] !== null ? a[jnd][key] = item.value: null)
                        }  
                    }
                }
            })
        })
        return data
    }

    const makeCloneArr = (arr, name) => {
        let newArr =[];
        arr.forEach((value,ind) => {newArr[ind] = [...value]; newArr[ind].name=value.name});
        let handleArr = newArr.filter(value => value.name.includes(name))
        return handleArr
    }

    //prepare data for house chart  - sorting by temperature & filter by houses
    function makeHousesData(arr) {    
        let newArr = []
        //sort arr by weather and make data for recharts
        makeCloneArr(arr, "Жилой").map(ar => {
          ar.sort((a,b) => a.weather - b.weather);
          for (let j=0; j<ar.length;j++) {     
            newArr[j] = {...newArr[j], [`${ar[j].name}`]:ar[j].consumption, temp:ar[j].weather}
          }
        }) 
        return newArr
    }

    //prepare data for plant chart  - sorting by price & filter by plants
    function makePlantsData(arr) {
        let newArr = []
        //sort arr by price and make data for recharts
        makeCloneArr(arr, "Кирпичный").map(ar => {
          ar.sort((a,b) => a.price - b.price);
          for (let j=0; j<ar.length;j++) {     
            newArr[j] = {...newArr[j], [`${ar[j].name}`]:ar[j].consumption, price: ar[j].price}
          }
        }) 
        return newArr
    }
    //prepare data for main chart 
    function makeMainChart(arr) {        
        let newArr = []; 
        arr.map(ar => {           
            ar.forEach((value,ind) => {
                let i = 0;
                newArr[ind] ? i = (newArr[ind].x+value.consumption) : null
                  
                newArr[ind] = {...newArr[ind], x: i, date: value.date, [`${value.name}`]:value.consumption}
            })
        }) 
        return newArr      
    }
    


    if (state ===undefined) {
        return {
            data:[],
            housesArr: [],
            plantsArr:[],
            mainChartArr: [],
            names:[]
        } 
    }

    switch (action.type) {    
           
        case "FETCH_DATA":
            return {
                ...state.mainState,
                data: action.payload,
                names: fetchNames(action.payload),
                housesArr: makeHousesData(action.payload),
                plantsArr: makePlantsData(action.payload),
                mainChartArr: makeMainChart(action.payload)
            }
        case 'CHANGE_DATA': 
            return {
                ...state.mainState,
                data: changeData(action.payload),
                housesArr: makeHousesData(changeData(action.payload)),
                plantsArr: makePlantsData(changeData(action.payload)),
                mainChartArr: makeMainChart(changeData(action.payload))
            }
        default: return state.mainState
        
    }
}
export default update