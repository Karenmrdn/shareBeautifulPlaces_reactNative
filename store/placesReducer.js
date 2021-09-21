import Place from "../models/place";
import { ADD_PLACE } from "./placesActions";

const initialState = {
  places: [{ id: "u1", title: "Test Place" }],
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        Math.random().toString(),
        action.placeData.title
      );

      return {
        places: [...state.places, newPlace],
      };

    default:
      return state;
  }
};

export default placesReducer;
