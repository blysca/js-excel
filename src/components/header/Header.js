import { ExcelComponont } from '@core/ExcelComponont';

export class Header extends ExcelComponont {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options
    });
  }

  toHTML() {
    return `
      <input type="text" class="input" value="new table">
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
}
