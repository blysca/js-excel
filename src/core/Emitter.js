export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch, fire, trigger
  // уведомляем слушателей если есть
  emit( event, ...args ) {
    if ( !Array.isArray( this.listeners[ event ] ) ) {
      return false
    }

    this.listeners[ event ].forEach( listener => {
      listener( ...args )
    } )
    return true
  }

  //  on, listen
  //  подписываемся на уведомления
  // добавляем нового слушателя
  subscribe( event, fn ) {
    this.listeners[ event ] = this.listeners[ event ] || []
    this.listeners[ event ].push( fn )
    return () => {
      this.listeners[ event ] = this.listeners[ event ]
          .filter( listener => listener !== fn )
    }
  }
}

/*
const emitter = new Emitter()

emitter.subscribe( 'b9', data => console.log( 'sub: ', data ) )

emitter.emit( 'b9', 44 )
*/
