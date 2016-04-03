export default from './domainDrivenPouchPersistencePlugin'

export const utils = ($ES.CONTEXT == 'NODE' ? require('./configureServer') : {})

export * from './utils'
