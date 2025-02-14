import { ExcelComponont } from '@core/ExcelComponont'
import { createTable } from '@/components/table/table.template'
import { resizeHandler } from '@/components/table/table.resize'
import {
  isCell,
  matrix,
  shouldResize,
  nextSelector
} from '@/components/table/table.functions'
import { TableSelection } from '@/components/table/TableSelection'
import { $ } from '@core/dom'
import * as actions from '@/redux/actions'
import { defaultStyles } from '@/constants';
import { parse } from '@core/parse';

export class Table extends ExcelComponont {
  static className = 'excel__table'

  resizing = false
  prevX = 0
  prevY = 0

  constructor( $root, options ) {
    super( $root, {
      name: 'Table',
      listeners: [ 'mousedown', 'keydown', 'input' ],
      ...options
    } )
  }

  toHTML() {
    return createTable( 25, this.store.getState() )
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init();

    const $cell = this.$root.find( '[data-id="0:0"]' )
    this.selectCell( $cell )

    this.$on( 'formula:input', value => {
      this.selection.current
          .attr( 'data-value', value )
          .text( parse( value ) )
      this.updateTextInStore( value )
    } )

    this.$on( 'formula:enter', () => {
      this.selection.current.focus()
    } )

    this.$on( 'toolbar:applyStyle', value => {
      this.selection.applyStyle( value )
      this.$dispatch( actions.applyStyle( {
        value,
        ids: this.selection.selectedIds
      } ) )
    } )
  }

  selectCell( $cell ) {
    this.selection.select( $cell )
    this.$emit( 'table:input', $cell )
    const styles = $cell.getStyles( Object.keys( defaultStyles ) )
    this.$dispatch( actions.changeStyles( styles ) )
  }

  async resizeTable( event ) {
    try {
      const data = await resizeHandler( this.$root, event )
      this.$dispatch( actions.tableResize( data ) )
    } catch ( error ) {
      console.warn( 'Error(resizeTable):', ' => ', error.message )
    }
  }

  onMousedown( event ) {
    if ( shouldResize( event ) ) {
      this.resizeTable( event )
    } else if ( isCell( event ) ) {
      const $target = $( event.target )

      if ( event.shiftKey ) {
        const $cells = matrix( $target, this.selection.current )
            .map( ( id ) => this.$root.find( `[data-id="${ id }"]` ) )
        this.selection.selectGroup( $cells )
      } else {
        this.selectCell( $target )
      }
    }
  }

  onKeydown( event ) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown'
    ]

    const { key } = event
    if ( keys.includes( key ) && !event.shiftKey ) {
      event.preventDefault()
      const id = this.selection.current.id( true )
      const $next = this.$root.find( nextSelector( key, id ) )
      this.selectCell( $next )
    }
  }

  updateTextInStore( value ) {
    this.$dispatch( actions.changeText( {
      id: this.selection.current.id(),
      value
    } ) )
  }

  onInput( event ) {
    // this.$emit( 'table:input', $( event.target ) )
    this.updateTextInStore( $( event.target ).text() )
  }
}
