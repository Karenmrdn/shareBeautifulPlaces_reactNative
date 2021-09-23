import Place from "../models/place";
import { ADD_PLACE, SET_PLACES } from "./placesActions";

const initialState = {
  places: [],
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        ...state,
        places: action.places.map(
          (place) =>
            new Place(
              place.id.toString(),
              place.title,
              place.imageUri,
              place.address,
              place.lat,
              place.lng
            )
        ),
      };

    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.imageUri,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      );

      return {
        ...state,
        places: [...state.places, newPlace],
      };

    default:
      return state;
  }
};

export default placesReducer;
