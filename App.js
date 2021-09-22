import React from "react";
import PlacesNavigator from "./navigation/PlacesNavigator";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import placesReducer from "./store/placesReducer";
import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("Initializing database");
  })
  .catch((error) => {
    console.log("Initializing database failed");
    console.log(error);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

export default App;
