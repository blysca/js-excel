import { $ } from '@core/dom';

export function resizeHandler( $root, event ) {
  return new Promise( resolve => {
    const direction = event.target.dataset.resize

    const $resizeEl = $( event.target )
    const $parent = $resizeEl.closest( '[data-type="resizeble" ]' )
    const coordinate = $parent.getCoords()
    const columnIndex = $parent.data.col

    const sideProp = ( direction === 'col' ? 'bottom' : 'right' )
    const sidePropValue = ( direction === 'col' ? '-100vh' : '-100vw' )

    let value
    $resizeEl.css( {
      opacity: 1,
      [ sideProp ]: sidePropValue
    } )

    document.onmousemove = ev => {
      if ( direction === 'col' ) {
        const difference = Math.floor( ev.pageX - coordinate.right )
        value = coordinate.width + difference
        $resizeEl.css( { right: -difference + 'px' } )
      } else {
        const difference = Math.floor( ev.pageY - coordinate.bottom )
        $resizeEl.css( { bottom: -difference + 'px' } )
        value = coordinate.height + difference
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      console.log( 'onmoues down' )

      if ( direction === 'col' ) {
        $parent.css( { width: `${ value }px` } )
        $root
            .findAll( `[data-col="${ columnIndex }"]` )
            .forEach( element => element.style.width = `${ value }px` )
      } else if ( direction === 'row' ) {
        $parent.css( { height: `${ value }px` } )
      }

      resolve( {
        value,
        type: direction,
        id: $parent.data[ direction ]
      } )

      $resizeEl.$el.classList.remove( 'active' )
      $resizeEl.$el.removeAttribute( 'style' )
    }
  } )
}
