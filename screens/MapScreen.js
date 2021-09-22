import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import MapView from "react-native-maps";

const MapScreen = (props) => {
  const region = {
    latitude: 37.78,
    longitude: -122.44,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return <MapView region={region} style={styles.map} />;
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapScreen;
