export function parse( value = '' ) {
  if ( value.startsWith( '=' ) ) {
    try {
      return eval( value.slice( 1 ) )
    } catch ( e ) {
      console.log( 'skipping parse error', ' => ', e.message )
      return value
    }
  }
  return value
}
