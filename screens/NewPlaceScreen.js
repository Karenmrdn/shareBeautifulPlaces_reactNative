import React, { useState, useCallback } from "react";
import { StyleSheet, ScrollView, TextInput, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import colors from "../constants/colors";
import { useDispatch } from "react-redux";
import { addPlace } from "../store/placesActions";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = (props) => {
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState("");
  const [selectedImageUri, setSelectedImageUri] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const handlePlaceSave = () => {
    if (titleValue.trim().length === 0) {
      return;
    }
    dispatch(addPlace(titleValue, selectedImageUri, selectedLocation));
    props.navigation.goBack();
  };

  const locationPickHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Place name</Text>
        <TextInput
          style={styles.input}
          value={titleValue}
          onChangeText={setTitleValue}
        />
        <ImagePicker
          onImageSelect={setSelectedImageUri}
          style={styles.imagePicker}
        />
        <LocationPicker
          onLocationPick={locationPickHandler}
          navigation={props.navigation}
        />
        <CustomButton
          title="Save Place"
          color={colors.primary}
          style={styles.btn}
          onPress={handlePlaceSave}
          disabled={!titleValue || !selectedImageUri}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add New Place",
};

const styles = StyleSheet.create({
  form: {
    margin: 24,
    alignItems: "center",
  },
  label: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 6,
    width: "100%",
  },
  imagePicker: {
    marginVertical: 16,
  },
  btn: {
    marginTop: 16,
    width: "50%",
  },
});

export default NewPlaceScreen;
