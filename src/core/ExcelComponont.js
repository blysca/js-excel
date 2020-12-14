import { DomListener } from '@core/DomListener'

export class ExcelComponont extends DomListener {
  constructor( $root, options = {} ) {
    super( $root, options.listeners )
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

    this.prepare()
  }

  // prepare component before init
  prepare() {
  }

  // returns component template
  toHTML() {
    return ''
  }

  // уведомляем слушателя про событие event
  $emit( event, ...args ) {
    this.emitter.emit( event, ...args )
  }

  // подписываемя на  событие event
  $on( event, fn ) {
    const unsub = this.emitter.subscribe( event, fn )
    this.unsubscribers.push(unsub)
  }

  // ini component
  // add dom listeners
  init() {
    this.initDOMListeners()
  }

  // remove component
  // remove/clean all listeners
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
