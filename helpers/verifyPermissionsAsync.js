import * as Permissions from "expo-permissions";
import { Alert } from "react-native";

const verifyPermissionsAsync = async (permissionsArr, errorMessage) => {
  const result = await Permissions.askAsync(...permissionsArr);

  if (result.status !== "granted") {
    Alert.alert("Permissions denied!", errorMessage, [{ text: "OK" }]);
    return false;
  }

  return true;
};

export default verifyPermissionsAsync;
