import { $ } from '@core/dom';

export class Excel {
  constructor( selector, options ) {
    this.$el = $( selector )
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create( 'div', 'excel' )

    this.components = this.components.map( Componont => {
      const $el = $.create( 'div', Componont.className )
      const component = new Componont( $el )
      $el.html( component.toHTML() )
      $root.append( $el )
      return component
    } )
    return $root
  }

  render() {
    this.$el.append( this.getRoot() )

    this.components.forEach( component => component.init() )
  }
}
