import React, { useEffect, Fragment } from 'react';
import SearchBar from './components/layout/SearchBar';
import Logs from './components/logs/Logs'
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js'
import './App.css'
import AddBtn from './components/layout/AddBtn';
import AddLogModal from './components/logs/AddLogModal'
import EditLogModal from './components/logs/EditLogModal';
import AddTechModal from './components/tech/AddTechModal';
import TechListModal from './components/tech/TechListModal';
import {Provider} from 'react-redux'
import store from './store'

const App=()=> {

useEffect(()=>{
  //init materialize JS
  M.AutoInit();
}, [])

  return (
    <div className="App">
      <Provider store={store} >
       <Fragment>
       <SearchBar />
       <div class="container">
         <AddBtn />
         <AddLogModal />
         <EditLogModal />
         <Logs />
         <AddTechModal />
         <TechListModal />
       </div>
       </Fragment>
       </Provider>
    </div>
  );
}

export default App;
