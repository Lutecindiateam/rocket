import Components from "./Components";
import mainSaga from "./Redux/sagas";
import { store, persistor, sagaMiddleware } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
// import { Auth } from 'aws-amplify';
import awsExports from './aws-exports';

// Amplify.configure(awsExports);


sagaMiddleware.run(mainSaga);
function App() {

  const options = {
    // you can also just use 'bottom center'
    position: positions.MIDDLE,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider template={AlertTemplate} {...options}>
          <Components />
        </AlertProvider>
      </PersistGate>
    </Provider>
  );

 
}

export default App;
