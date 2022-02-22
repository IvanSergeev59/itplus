import update from "./update"

const reducer = (state, action) => {
    return {
        mainState: update(state, action)
    }
}

export default reducer