import { ExcelComponont } from '@core/ExcelComponont';
import { $ } from '@core/dom';
import { changeTitle } from '@/redux/actions';
import { defaultTitle } from '@/constants';

export class Header extends ExcelComponont {
  static className = 'excel__header'

  constructor( $root, options ) {
    super( $root, {
      name: 'Header',
      listeners: [ 'input' ],
      subscribe: [ 'title' ],
      ...options
    } );
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input type="text" class="input" value="${ title }">
      <div>
        <div class="button">
          <span class="material-icons">delete_outline </span>
        </div>
        <div class="button">
          <span class="material-icons">exit_to_app</span>
        </div>
      </div>
`
  }

  onInput( event ) {
    const $target = $( event.target )
    this.$dispatch( changeTitle( $target.text() ) )
  }
}
