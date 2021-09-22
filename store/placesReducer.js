import Place from "../models/place";
import { ADD_PLACE, SET_PLACES } from "./placesActions";

const initialState = {
  places: [],
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        places: action.places.map(
          (place) => new Place(place.id.toString(), place.title, place.imageUri)
        ),
      };

    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.imageUri
      );

      return {
        places: [...state.places, newPlace],
      };

    default:
      return state;
  }
};

export default placesReducer;
