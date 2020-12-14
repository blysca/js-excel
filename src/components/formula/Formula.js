import { ExcelComponont } from '@core/ExcelComponont'
import { $ } from '@core/dom';

export class Formula extends ExcelComponont {
  static className = 'excel__formula'

  constructor( $root, options ) {
    super( $root, {
      name: 'Formula',
      listeners: [ 'input', 'keydown' ],
      ...options
    } )
  }

  init() {
    super.init()

    this.$formula = this.$root.find( '#formula' )
    this.$on( 'table:select', $cell => {
      this.$formula.text( $cell.text() )
    } )

    this.$on( 'table:input', $cell => {
      this.$formula.text( $cell.text() )
    } )
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput( event ) {
    const text = $( event.target ).text()
    this.$emit( 'formula:input', text )
  }

  onKeydown( event ) {
    const keys = [ 'Enter', 'Tab' ]
    if ( keys.includes( event.key ) ) {
      event.preventDefault()
      console.log( 'enter' )
      this.$emit( 'formula:enter' )
    }
  }
}
