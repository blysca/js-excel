export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  get selectedIds() {
    return this.group.map( $el => $el.id() )
  }

  select( $el ) {
    this.clear()
    $el.focus().addClass( TableSelection.className )
    this.group.push( $el )
    this.current = $el
  }

  clear() {
    if ( this.group.length ) {
      this.group.forEach( $el => $el.removeClass( TableSelection.className ) )
    }
    this.group = []
  }

  selectGroup( $group = [] ) {
    this.clear()

    this.group = $group
    this.group.forEach( $el => $el.addClass( TableSelection.className ) )
  }

  applyStyle( style ) {
    this.group.forEach( el => el.css( style ) )
  }
}
