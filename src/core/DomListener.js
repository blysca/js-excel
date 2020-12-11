import { capitalize } from '@core/utils';

export class DomListener {
  constructor( $root, listeners = [] ) {
    if ( !$root ) {
      throw new Error( 'No $root provided for DomListener!' )
    }

    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach( listener => {
      const method = getMethodName( listener )
      if ( !this[ method ] ) {
        throw new Error( `
        Method ${ method } isn't implement in ${ this.name } Component` )
      }
      this[ method ] = this[ method ].bind( this )
      this.$root.on( listener, this[ method ] )
    } )
  }

  removeDOMListeners() {
    console.log( 'removeDOMListeners', ' => ', this.listeners )
    this.listeners.forEach( listener => {
      const method = getMethodName( listener )
      this.$root.off( listener, this[ method ] )
    } )
  }
}

// click => onClick
function getMethodName( eventName ) {
  return 'on' + capitalize( eventName )
}
