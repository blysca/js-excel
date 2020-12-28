class Dom {
  constructor( selector ) {
    this.$el = typeof selector === 'string' ?
      document.querySelector( selector ) : selector
  }

  get data() {
    return this.$el.dataset
  }

  html( html ) {
    if ( typeof html === 'string' ) {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text( text ) {
    if ( typeof text !== 'undefined' ) {
      this.$el.textContent = text
      return this
    }

    if ( this.$el.tagName.toLocaleLowerCase() === 'input' ) {
      return this.$el.value.trim()
    }

    return this.$el.textContent.trim()
  }

  clear() {
    this.html( '' )
    return this
  }

  on( eventType, callback ) {
    this.$el.addEventListener( eventType, callback )
  }

  off( eventType, callback ) {
    this.$el.removeEventListener( eventType, callback )
  }

  append( node ) {
    if ( node instanceof Dom ) {
      node = node.$el
    }

    if ( Element.prototype.append ) {
      this.$el.append( node )
    } else {
      this.$el.appendChild( node )
    }

    return this
  }

  closest( selector ) {
    return $( this.$el.closest( selector ) )
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  find( selctor ) {
    return $( this.$el.querySelector( selctor ) )
  }

  findAll( selctor ) {
    return this.$el.querySelectorAll( selctor )
  }

  css( styles = {} ) {
    Object.keys( styles ).forEach( property => {
      this.$el.style[ property ] = styles[ property ]
    } )

    return this
  }

  getStyles( styles = [] ) {
    return styles.reduce( ( res, s ) => {
      res[ s ] = this.$el.style[ s ]
      return res
    }, {} )
  }

  id( parse ) {
    if ( parse ) {
      const parsed = this.id().split( ':' )
      return {
        row: +parsed[ 0 ],
        col: +parsed[ 1 ]
      }
    }
    return this.data.id
  }

  focus() {
    this.$el.focus()
    return this
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }

  addClass( className ) {
    this.$el.classList.add( className )
    return this
  }

  removeClass( className ) {
    this.$el.classList.remove( className )
    return this
  }
}

export function $( selector ) {
  return new Dom( selector )
}

$.create = ( tagName, classes = '' ) => {
  const element = document.createElement( tagName )

  if ( classes ) {
    element.classList.add( classes )
  }

  return $( element )
}
