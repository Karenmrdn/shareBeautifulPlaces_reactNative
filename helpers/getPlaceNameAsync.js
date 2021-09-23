import ENV from "../env";
import { Alert } from "react-native";

const getPlaceNameAsync = async (location) => {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${location.lat}&lon=${location.lng}&lang=en&limit=10&apiKey=${ENV.mapApiKey}`
    );

    if (!response.ok) {
      throw new Error(
        "Error occurred while converting coordinates to place name"
      );
    }

    const resData = await response.json();

    return resData.features[0].properties.formatted;
  } catch (error) {
    Alert.alert("Image saving error!", error.message, [{ text: "OK" }]);
  }
};

export default getPlaceNameAsync;
