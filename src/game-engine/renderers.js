import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const RADIUS = 20;

function Finger(props) {
  const [position, setPosition] = useState(props.position);

  const x = position[0] - RADIUS / 2;
  const y = position[1] - RADIUS / 2;

  return (
    <View style={[styles.finger, { left: x, top: y }]} />
  );
}

const styles = StyleSheet.create({
  finger: {
    borderColor: "#5CFFD0",
    borderWidth: 4,
    borderRadius: RADIUS * 2,
    width: RADIUS * 2,
    height: RADIUS * 2,
    backgroundColor: "blue",
    position: "absolute"
  }
});

export { Finger };
