import React from 'react';
import './Assets/Css/Table.css'
import Routing from './Components/Routing';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider className="App" store={store}>
      <Routing />
    </Provider>
  );
}

export default App;
