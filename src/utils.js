import t from 'tcomb'
import slug from 'slug'

export function Persistable(BaseType, name){
    let Identified = BaseType.extend([t.struct({ _id: t.String })])
    let Persisted = Identified.extend([t.struct({ _rev: t.String })])
    let Type = t.union([BaseType, Identified, Persisted], name)
    Type.dispatch = function dispatch(doc) {
        return doc._rev && doc._id ? Persisted :
            doc._id ? Identified :
            BaseType
    };
    return Type
}

export function serializer(Type, type, fields, sluggify){
    sluggify = sluggify || (doc => fields.map(f => slug(doc[f].toString().toLowerCase())).join('&'))
    return (doc) => Type(Object.assign({}, doc, {_id: `${type}/${sluggify(doc)}`}))
}

function typedDataFlow({Type, serialize}){
    return ({action, handler}) => {
        return {
            action: { type: action, payload: t.maybe(Type) },
            reducer: (state, {payload}) => {
                return (Type.is(payload)) ? handler(state, serialize(payload)) : state
            }
        }
    }
}

export function defaultDataFlows({Type, serialize, initialState = []}){
    const dataFlow = typedDataFlow({Type, serialize})
    return [
        dataFlow({
            action: 'update',
            handler: (state, payload) => state.map(doc => doc._id == payload._id ? payload : doc)
        }),
        dataFlow({
            action: 'insert',
            handler: (state, payload) => [payload, ...state]
        }),
        dataFlow({
            action: 'remove',
            handler: (state, {_id}) => state.filter(doc => doc._id != _id)
        })
    ]
}

