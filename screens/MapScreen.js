import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import colors from "../constants/colors";

const isAndroid = Platform.OS === "android";

const MapScreen = (props) => {
  const [selectedCoords, setSelectedCoords] = useState();

  const handlePickedLocationSave = useCallback(() => {
    if (!selectedCoords) {
      return;
    }

    props.navigation.navigate("NewPlace", { pickedLocation: selectedCoords });
  }, [selectedCoords]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: handlePickedLocationSave });
  }, [handlePickedLocationSave]);

  const region = {
    latitude: 37.775,
    longitude: -122.44,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  let markerCoordinate;
  if (selectedCoords) {
    markerCoordinate = {
      latitude: selectedCoords.lat,
      longitude: selectedCoords.lng,
    };
  }

  const handleLocationSelect = (event) => {
    setSelectedCoords({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <MapView region={region} onPress={handleLocationSelect} style={styles.map}>
      {markerCoordinate && (
        <Marker title="Picked Location" coordinate={markerCoordinate} />
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  let TouchableComponent = TouchableOpacity;
  if (isAndroid && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  const saveLocation = navData.navigation.getParam("saveLocation");

  return {
    headerRight: () => (
      <View style={styles.headerRightBlock}>
        <TouchableComponent onPress={saveLocation}>
          <Text style={styles.headerRightText}>Save</Text>
        </TouchableComponent>
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerRightBlock: {
    marginRight: 16,
  },
  headerRightText: {
    color: isAndroid ? "#fff" : colors.primary,
    fontWeight: "bold",
  },
});

export default MapScreen;
