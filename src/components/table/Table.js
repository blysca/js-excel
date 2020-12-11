import { ExcelComponont } from '@core/ExcelComponont';
import { createTable } from '@/components/table/table.template';

export class Table extends ExcelComponont {
  static className = 'excel__table'

  toHTML() {
    return createTable()
  }
}
