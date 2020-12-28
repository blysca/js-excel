import { ExcelComponont } from '@core/ExcelComponont'
import { $ } from '@core/dom';

export class Formula extends ExcelComponont {
  static className = 'excel__formula'

  constructor( $root, options ) {
    super( $root, {
      name: 'Formula',
      listeners: [ 'input', 'keydown' ],
      subscribe: [ 'currentText' ],
      ...options
    } )
  }

  init() {
    super.init()

    this.$formula = this.$root.find( '#formula' )

    this.$on( 'table:select', $cell => {
      this.$formula.text( $cell.data.value )
    } )
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  storeChanged( { currentText } ) {
    console.log( 'changes: ', currentText )
    this.$formula.text( currentText )
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
