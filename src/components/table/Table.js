import { ExcelComponont } from '@core/ExcelComponont';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { shouldResize } from '@/components/table/table.functions';

export class Table extends ExcelComponont {
  static className = 'excel__table'

  resizing = false
  prevX = 0
  prevY = 0

  constructor( $root ) {
    super( $root, {
      listeners: [ 'mousedown' ]
    } )
  }

  toHTML() {
    return createTable()
  }

  onMousedown( event ) {
    if ( shouldResize( event ) ) {
      resizeHandler( this.$root, event )
    }
  }
}
