import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import circle from '../images/circle.png'
import panda from '../images/panda.png'

const levels = [
  { id: 1, position: 0, image: circle},
  { id: 2, position: 100, image: circle },
  { id: 3, position: 200, image: circle },
];

const PandaGame = () => {
  const [currentLevel, setCurrentLevel] = useState(0);

  const moveNextLevel = () => {
    console.log("currentLevel", currentLevel);
      setCurrentLevel(currentLevel + 1);
  };

  const renderLevels = () => {
    return levels.map((level) => (
      <TouchableOpacity
        key={level.id}
        style={[styles.circle, { left: level.position }]}
        onPress={() => moveNextLevel()}
      >
        <Image source={level.image} style={styles.levelImage} />
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Image source={panda} style={styles.panda} />
      {renderLevels()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  panda: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 50, // Adjust as needed
    zIndex: 1,
  },
  circle: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'blue', // Change color as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelImage: {
    width: 20,
    height: 20,
  },
});

export default PandaGame;
