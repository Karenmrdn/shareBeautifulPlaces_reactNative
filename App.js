import React from "react";
import { Alert } from "react-native";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { init } from "./helpers/db";
import PlacesNavigator from "./navigation/PlacesNavigator";
import placesReducer from "./store/placesReducer";

init().catch((error) => {
  Alert.alert(
    "Database error!",
    "Error occurred while initializing database.",
    [{ text: "OK" }]
  );
  console.error(error.message);
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
