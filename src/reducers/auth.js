const initialState = {
    token: '',
    fethching: false,
    fetched: false,
    errors: []
}

export default (state=initialState, action) => {
    switch (action.type) {
        case 'FETCHING_TOKEN_PENDING' :
            return {
                ... state, fetching: true
            }
        case 'FETCHING_TOKEN_REJECTED' :
            return {
                ... state, 
                errors: [...action.payload.data]
            }    
        case 'FETCHING_TOKEN_FULFILLED':
            return {
                ... state,
                fetched: true,
                token: action.payload.data
            }
    }
}