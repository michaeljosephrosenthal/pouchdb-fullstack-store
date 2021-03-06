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

function applyToChildren({children, block}){
    if(children){
        return Array.isArray(children) ?
            children.map(block) :
            block(children)
    } else {
        return children
    }
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
        applyToChildren({
            children: route.props.children,
            block: route => authenticateRoutes(route, persister)
        })
    )
}

function provideInjection(dependentFunction, persister){
    return (...args) => dependentFunction(persister || this.db, ...args)
}

function provideInjectionToHandlers(route, persister){
    route.handlers = route.handlers.map(
        handler => handler.requiresPersister ?
           provideInjection(handler.dependentFunction, persister) :
           handler
    )
    return route
}


function expandPersisterBackedDomain(domain, persister){
    let routes = domain.get('routes')
    Object.keys(domain.get('routes'))
        .map(route => domain.register('routes', route, provideInjectionToHandlers(routes[route], persister)))
    return domain
}

export function provideInjectionForDomainRouteHandlers(domains, persister){
    persister = persister || this.db
    return Object.keys(domains)
        .reduce((newDomains, k) => {
            newDomains[k] = expandPersisterBackedDomain(domains[k], persister);
            return newDomains
        }, {})
}

export function requireInjection(dependentFunction){
    return {
        requiresPersister: true,
        dependentFunction
    }
}

