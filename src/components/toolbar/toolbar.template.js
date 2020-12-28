function toButton( btn ) {
  const meta = `
    data-type="button" 
    data-value='${ JSON.stringify( btn.value ) }' 
  `
  return `<div
        class="button ${ btn.active ? 'active' : '' }"
        ${ meta }
      >
        <span
          ${ meta }
          class="material-icons">${ btn.icon }</span>
      </div>`
}

export function createToolbar( state = {} ) {
  const btns = [
    {
      active: state[ 'textAlign' ] === 'left',
      icon: 'format_align_left',
      value: { textAlign: 'left' },
    },
    {
      value: { textAlign: 'center' },
      active: state[ 'textAlign' ] === 'center',
      icon: 'format_align_center'
    },
    {
      value: { textAlign: 'right' },
      active: state[ 'textAlign' ] === 'right',
      icon: 'format_align_right'
    },
    {
      icon: 'format_bold',
      active: state[ 'fontWeight' ] === 'bold',
      value: {
        fontWeight: state[ 'fontWeight' ] === 'bold' ? 'normal' : 'bold'
      }
    },
    {
      value: {
        fontStyle: state[ 'fontStyle' ] === 'italic' ? 'normal' : 'italic'
      },
      active: state[ 'fontStyle' ] === 'italic',
      icon: 'format_italic'
    },
    {
      value: {
        textDecoration: state[ 'textDecoration' ] === 'underline' ?
          'none' : 'underline'
      },
      active: state[ 'textDecoration' ] === 'underline',
      icon: 'format_underlined'
    },
  ]
  return btns.map( toButton ).join( '' )
}
