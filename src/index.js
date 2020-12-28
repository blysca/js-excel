import { Excel } from '@/components/excel/Excel';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Header } from '@/components/header/Header';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';

import { createStore } from '@core/createStore';
import { storage } from '@core/utils';
import { rootReducer } from '@/redux/rootReducer';
import { initialState } from '@/redux/initialState';

import './scss/index.scss'

const store = createStore( rootReducer, initialState )

store.subscribe( ( state ) => {
  console.log( 'index. App STATE', ' => ', state )
  storage( 'ex-tab', state )
} )

const excel = new Excel( '#app', {
  components: [ Header, Toolbar, Formula, Table ],
  store
} )

excel.render()
