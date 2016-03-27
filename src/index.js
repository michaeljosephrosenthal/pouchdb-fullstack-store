export default from './domainDrivenPouchPersistencePlugin'
export defaultDataFlows from './dataFlows'

export const utils = ($ES.CONTEXT == 'NODE' ? require('./configureServer') : {})
