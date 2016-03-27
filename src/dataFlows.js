export default {
    INSERT(state, payload){
        return [payload, ...state]
    },
    UPDATE(state, payload){
        return state.map(doc => doc._id == payload._id ? payload : doc)
    },
    REMOVE(state, {_id}){
        return state.filter(doc => doc._id != _id)
    }
}
