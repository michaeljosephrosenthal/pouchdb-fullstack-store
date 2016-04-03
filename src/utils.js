import React from 'react'
export defaultDataFlows from './dataFlows'

export function requireAuthWithPersister({path, persister}) {
    return function requireAuth(nextState, replace, callback) {
        let redirect = _ => {
            replace({ nextPathname: nextState.location.pathname }, path)
            callback()
        }
        (persister || this.db).getSession( (err, response) => {
            if (err) {
                console.log(err)
                redirect()
            } else if (!response.userCtx.name) {
                redirect()
            } else {
                callback()
            }
        });
    }
}

export function requireAuthFromRoute(path){
    return {
        requiresAuthentication: true,
        path 
    }
}

export function provideAuthFromRoute(component) {
    var placeholder = _=>_
    Object.assign(placeholder, {
        providesAuthentication: true,
        component
    })
    return placeholder
}

function authenticateRouteBasedOnOnEnter({route, persister}){
    return (route.props.onEnter && route.props.onEnter.requiresAuthentication) ? {
        onEnter: requireAuthWithPersister({path: route.props.onEnter.path, persister})
    } : {}
}

function authenticateFromRouteBasedOnComponent({route, persister}) {
    return (route.props.component && route.props.component.providesAuthentication) ?  {
        component: (props) => <route.props.component.component auth={persister} {...props}/>
    } : {}
}

export function authenticateRoutes(route, persister){
    persister = persister || this.db
    return React.cloneElement(
        route,
        {
            ...authenticateRouteBasedOnOnEnter({route, persister}),
            ...authenticateFromRouteBasedOnComponent({route, persister}),
            key: route.props.path
        },
        route.props.children ?
            route.props.children.map(route => authenticateRoutes(route, persister)) :
            undefined
    )
}
