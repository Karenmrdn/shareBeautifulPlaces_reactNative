import React, { useState } from "react";
import { View, Text, ActivityIndicator, Alert, StyleSheet } from "react-native";
import colors from "../constants/colors";
import CustomButton from "./CustomButton";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import verifyPermissionsAsync from "../helpers/verifyPermissionsAsync";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const handleLocationShare = async () => {
    const hasPermissions = await verifyPermissionsAsync(
      [Permissions.LOCATION_FOREGROUND],
      "You need to grant location permissions to use this app."
    );
    if (!hasPermissions) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });

      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map",
        [{ text: "OK" }]
      );
      console.error(error.message);
    }
    setIsFetching(false);
  };

  const handleLocationPick = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        onPress={handleLocationPick}
        location={pickedLocation}
        style={styles.mapPreview}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <Text>No location chosen yet</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <CustomButton
          title="Pick on Map"
          color={colors.secondary}
          onPress={handleLocationPick}
          style={styles.btn}
        />
        <CustomButton
          title="Share Location"
          color={colors.primary}
          onPress={handleLocationShare}
          style={styles.btn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    width: "100%",
    alignItems: "center",
  },
  mapPreview: {
    width: "100%",
    height: 200,
    marginBottom: 2,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: {
    width: "40%",
  },
});

export default LocationPicker;
