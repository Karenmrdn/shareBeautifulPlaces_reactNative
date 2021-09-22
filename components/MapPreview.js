import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import ENV from "../env";

const MapPreview = (props) => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=300&center=lonlat:${props.location.lng},${props.location.lat}&zoom=16&marker=lonlat:${props.location.lng},${props.location.lat};color:%23ff0000;size:small&apiKey=${ENV.mapApiKey}`;
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.mapPreview, props.style]}
    >
      {props.location ? (
        <Image source={{ uri: imagePreviewUrl }} style={styles.mapImage} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
