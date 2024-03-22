// src/AnimatedRoad.js

// Import necessary modules
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

// Constants
const { width } = Dimensions.get('window');
const ROAD_WIDTH = width * 0.8;

// Create Animated Circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// Animated Road Component
const AnimatedRoad = () => {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  React.useEffect(() => {
    offset.value = withTiming(-ROAD_WIDTH, {
      duration: 4000,
      easing: Easing.linear,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Svg style={styles.svg} width={width} height={100}>
        <AnimatedCircle cx={width / 2} cy={50} r={25} fill="yellow" />
      </Svg>
      <Animated.View style={[styles.road, animatedStyles]}>
        <View style={styles.stripes} />
      </Animated.View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
    zIndex: 1,
  },
  road: {
    width: ROAD_WIDTH,
    height: 200,
    backgroundColor: 'gray',
    overflow: 'hidden',
    zIndex: 0,
  },
  stripes: {
    width: 10,
    height: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    transform: [{ translateY: -50 }],
    zIndex: 1,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
  },
});

// Export AnimatedRoad component
export default AnimatedRoad;
