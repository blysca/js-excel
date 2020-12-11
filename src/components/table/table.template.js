const CODES = {
  A: 65,
  Z: 90
}

function addCell() {
  return `<div class="cell" contenteditable></div>`
}

function addCol( colName ) {
  return `<div class="column">${ colName }</div>`
}

function createRow( index, content ) {
  return `<div class="row">
    <div class="row-info">${ index ? index : '' }</div>
    <div class="row-data">${ content }</div>
</div>`
}

function addChar( _, index ) {
  return String.fromCharCode( CODES.A + index )
}

export function createTable( rowsCounts = 20 ) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array( colsCount )
      .fill( '' )
      .map( addChar )
      .map( addCol )
      .join( '' )

  rows.push( createRow( null, cols ) )

  for ( let i = 0; i < rowsCounts; i++ ) {
    const cells = new Array( colsCount )
        .fill( '' )
        .map( addCell )
        .join( '' )
    rows.push( createRow( i + 1, cells ) )
  }

  return rows.join( '' )
}
