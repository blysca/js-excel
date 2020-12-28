import { toInlineStyles } from '@core/utils';
import { defaultStyles } from '@/constants';
import { parse } from '@core/parse';

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth( state, index ) {
  return ( state[ index ] || DEFAULT_WIDTH ) + 'px'
}

function getHeight( state, index ) {
  return ( state[ index ] || DEFAULT_HEIGHT ) + 'px'
}

function addCell( state, rowIndex ) {
  return function( _, colIndex ) {
    const id = `${ rowIndex }:${ colIndex }`
    const width = getWidth( state.colState, colIndex )
    const data = state.dataState[ id ]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })

    return `<div
    class="cell"
    data-type="cell"
    data-col="${ colIndex }"
    data-id="${ id }"
    data-value="${data || ''}"  
    contenteditable
    style="${ styles };width:${ width }"
  >${ parse(data) || '' }</div>`
  }
}

function addCol( { col, index, width } ) {
  const colIndex = `data-col="${ index }"`
  return `
    <div
      class="column"
      data-type="resizeble"
      ${ colIndex }
      style="width: ${ width }"
    >${ col }
      <div class="col-resize" data-resize="col"></div>
    </div>`
}

function createRow( index, content, state ) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight( state, index )
  return `
    <div
    style="height: ${ height }"
      class="row"
      ${ index ? `data-type="resizeble" data-row="${ index }"` : '' }
    >
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

function withWidthFrom( state ) {
  return function( col, index ) {
    return {
      col, index, width: getWidth( state.colState, index )
    }
  }
}

export function createTable( rowsCounts = 20, state = {} ) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array( colsCount )
      .fill( '' )
      .map( addChar )
      .map( withWidthFrom( state ) )
      .map( addCol )
      .join( '' )

  rows.push( createRow( null, cols, {} ) )

  for ( let rowI = 0; rowI < rowsCounts; rowI++ ) {
    const cells = new Array( colsCount )
        .fill( '' )
        .map( addCell( state, rowI ) )
        .join( '' )

    rows.push( createRow( rowI + 1, cells, state.rowState ) )
  }
  return rows.join( '' )
}
