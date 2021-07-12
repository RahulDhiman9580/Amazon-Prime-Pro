import * as React from 'react'
import {persistor,store} from './src/store/store'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { RootSiblingParent } from 'react-native-root-siblings';

//custom import
import {Router} from './src/router/Router'

const App = () =>{
  return(
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
      <RootSiblingParent>
      <Router />
      </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};

export default App;