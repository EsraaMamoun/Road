import React from "react";
import { AppRegistry, StyleSheet, StatusBar, View, Text } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Finger } from "./renderers";

const RADIUS = 20;

// Define Finger as a React component
const FingerEntity = ({ id, position }) => (
  <View style={[styles.finger, { left: position[0], top: position[1] }]}>
    <Text style={styles.fingerText}>{id}</Text>
  </View>
);

// Function to create a finger entity
const createFingerEntity = (id, position) => ({
  id,
  position,
  renderer: <FingerEntity key={id} id={id} position={position} />,
});

const createPathEntity = (id, pathPoints) => ({
    id,
    pathPoints,
    renderer: <Path key={id} id={id} pathPoints={pathPoints} />,
  });

const updatePath = (entities) => {
    const fingerPositions = entities.Finger.map((entity) => entity.position);
    const pathPoints = fingerPositions.reduce(
      (acc, [x, y]) => `${acc} ${x + RADIUS},${y + RADIUS}`,
      ""
    );
    entities.Path[0].pathPoints = pathPoints;
    return entities;
  };

  const Path = ({ pathPoints }) => (
    <View style={[styles.path, { left: pathPoints[0],
        top: pathPoints[1], height: pathPoints[1]}]}>
    </View>
  );

const BestGameEver = () => {
  // Array of positions for fingers
  const fingerPositions = [
    [-180, 0],
    [-150, 50],
    [-100, 120],
    [-90, 170],
  ];

    const fingerEntitiesP = fingerPositions.map((position, index) =>
    createFingerEntity(index + 1, position)
  );

  // Initial entities
  const initialEntitiesP = {
    Finger: fingerEntitiesP,
    Path: [{ id: 0, pathPoints: fingerPositions[0] }],
  };

//   const entitiesP = updatePath(initialEntitiesP);

    const pathPoints = fingerPositions.map((position) =>
        [position[0] + RADIUS,position[1] + RADIUS]
    );

  const entitiespp = pathPoints.map((position, index) =>
    createPathEntity(index + 1, position)
  );

  // Map fingerPositions to entities
//   const entities = fingerPositions.map((position, index) =>
//     createFingerEntity(index + 1, position)
//   );

const en = {
    Path: entitiespp,
    Finger: fingerEntitiesP
}

  return (
    <GameEngine
      style={styles.container}
      entities={entitiespp}
      systems={[]}      // Add systems as needed
    >
      <StatusBar hidden={true} />
      {/* <Path pathPoints={entitiesP.Path[0].pathPoints} /> */}

    </GameEngine>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  finger: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  fingerText: {
    color: "white",
    fontSize: 20,
  },
  path: {
    position: "absolute",
    width: 84, // Adjust for longer path
    backgroundColor: "lightgray",
    borderRadius: 50
  },
});

export default BestGameEver;

