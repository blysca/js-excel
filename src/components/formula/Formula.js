import { ExcelComponont } from '@core/ExcelComponont'

export class Formula extends ExcelComponont {
  static className = 'excel__formula'

  constructor( $root ) {
    super( $root, {
      name: 'Formula',
      listeners: [ 'input', 'click' ]
    } )
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput( event ) {
    console.log( 'Formula: onInput:', ' => ', event.target.innerText.trim() )
  }

  onClick( event ) {
    console.log( 'Formula: onClick:', ' => ', event )
  }
}
