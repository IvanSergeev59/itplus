const fetchData = (data) => {
    return {
        type:'FETCH_DATA',
        payload: data
    }
}

const getData = (itplusService) => () => (dispatch) => {
    itplusService.getDataHandler()
    .then((data) => dispatch(fetchData(data)))
    .catch((err) => console.log(err))
}

const changeData = (data) => {
    return {
        type: 'CHANGE_DATA',
        payload: data
    }
}

export { getData, changeData }
