import { DomListener } from '@core/DomListener'

export class ExcelComponont extends DomListener {
  constructor( $root, options = {} ) {
    super( $root, options.listeners )
    this.name = options.name || ''
  }

  // returns component template
  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}
