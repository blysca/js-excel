const CODES = {
  A: 65,
  Z: 90
}

function addCell( _, colIndex ) {
  return `<div
    class="cell" 
    data-col="${ colIndex }"
    contenteditable
  ></div>`
}

function addCol( colName, index ) {
  const colIndex = `data-col="${ index }"`
  return `
    <div
      class="column"
      data-type="resizeble"
      ${ colIndex }
    >
      ${ colName }
      <div class="col-resize" data-resize="col"></div>
    </div>`
}

function createRow( index, content ) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `<div class="row" ${ index ? 'data-type="resizeble"' : '' }>
    <div class="row-info">
      ${ index ? index : '' }
      ${ resize }
    </div>
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
