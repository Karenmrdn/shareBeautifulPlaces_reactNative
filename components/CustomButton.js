import React from "react";
import { Button, View, StyleSheet } from "react-native";

const CustomButton = (props) => {
  return (
    <View style={[styles.btnContainer, props.style]}>
      <Button {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default CustomButton;
