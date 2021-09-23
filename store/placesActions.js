import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import { fetchPlaces, insertPlace } from "../helpers/db";
import getPlaceNameAsync from "../helpers/getPlaceNameAsync";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const loadPlaces = () => async (dispatch) => {
  try {
    const dbResult = await fetchPlaces();

    dispatch({ type: SET_PLACES, places: dbResult.rows._array });
  } catch (error) {
    Alert.alert("Loading places error!", error.message, [{ text: "OK" }]);
  }
};

export const addPlace = (title, imageUri, location) => async (dispatch) => {
  try {
    const address = await getPlaceNameAsync(location);

    const fileName = imageUri.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    await FileSystem.moveAsync({
      from: imageUri,
      to: newPath,
    });
    const dbResult = await insertPlace(
      title,
      newPath,
      address,
      location.lat,
      location.lng
    );

    dispatch({
      type: ADD_PLACE,
      placeData: {
        id: dbResult.insertId,
        title,
        imageUri: newPath,
        address,
        coords: {
          lat: location.lat,
          lng: location.lng,
        },
      },
    });
  } catch (error) {
    Alert.alert("Image saving error!", error.message, [{ text: "OK" }]);
  }
};
