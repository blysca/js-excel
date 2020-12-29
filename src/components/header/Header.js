import { ExcelComponont } from '@core/ExcelComponont';
import { $ } from '@core/dom';
import { changeTitle } from '@/redux/actions';
import { defaultTitle } from '@/constants';
import { ActiveRoute } from '@core/routes/ActiveRoute';

export class Header extends ExcelComponont {
  static className = 'excel__header'

  constructor( $root, options ) {
    super( $root, {
      name: 'Header',
      listeners: [ 'input', 'click' ],
      subscribe: [ 'title' ],
      ...options
    } );
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input type="text" class="input" value="${ title }">
      <div>
        <div class="button" data-btn="remove">
          <span class="material-icons" data-btn="remove">delete_outline </span>
        </div>
        <div class="button" data-btn="exit">
          <span class="material-icons" data-btn="exit">exit_to_app</span>
        </div>
      </div>
`
  }

  onInput( event ) {
    const $target = $( event.target )
    this.$dispatch( changeTitle( $target.text() ) )
  }

  onClick( event ) {
    const $target = $( event.target )
    if ( $target.data.btn === 'remove' ) {
      const dicision = confirm( 'Delete table?' )
      if ( dicision ) {
        localStorage.removeItem( 'extab:' + ActiveRoute.param )
        ActiveRoute.navigate( '' )
      }
    } else if ( $target.data.btn === 'exit' ) {
      ActiveRoute.navigate( '' )
    }
  }
}
