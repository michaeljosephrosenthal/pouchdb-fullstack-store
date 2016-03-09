import t from 'tcomb'

function typedDataFlow({Type, serialize, payloadWrapper, reducerCondition}){
    let payload = payloadWrapper == "function" ?
        payloadWrapper(Type) :
        Type
    return ({action, handler}) => {
        return {
            action: { type: action, payload },
            reducer: (state, {payload}) => {
                return Type instanceof payload ?
                    handler(state, serialize(payload)) :
                    state
            }
        }
    }
}

export function typedDataFlows(args){
    const dataFlow = typedDataFlow(args)
    return [{
        action: 'update',
        handler: (state, payload) => state.map(doc => doc._id == payload._id ? payload : doc)
    }, {
        action: 'insert',
        handler: (state, payload) => [payload, ...state]
    }, {
        action: 'remove',
        handler: (state, {_id}) => state.filter(doc => doc._id != _id)
    }].forEach(dataFlow)
}

