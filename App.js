import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, Text, Animated } from 'react-native';
import Svg, { Path, G, Circle as SvgCircle } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');

const WindingRoad = ({ currentPosition }) => {
  const controlPoint1X = width / 1.6 - 160;
  const controlPoint2X = width / 1.6 + 160;
  const roadWidth = 82;
  const heightStroke = height * 2;

  const circlePositions = [];
  for (let i = 0; i < 10; i++) {
    const x = width / 6 + (i * (width / 1.6 - width / 6) / 9);
    const y = ((x - width / 6) * ((height / 2 - height / 4) / (width / 1.6 - width / 6)) + height / 24) * 4;
    circlePositions.push({ x, y });
  }

  return (
    <Svg height={heightStroke} width={width}>
      <Path
        fill="none"
        stroke="#D9D9D9"
        strokeWidth={roadWidth}
        strokeOpacity={0.9}
        d={`
          M${width / 6} 0 
          Q ${controlPoint1X} ${height / 4} ${width / 1.6} ${height / 2} 
          Q ${controlPoint2X} ${height * 0.75} ${width / 1.6} ${height}
          Q ${controlPoint1X} ${height * 1.25} ${width / 1.6} ${height * 1.5}
          Q ${controlPoint2X} ${height * 1.75} ${width / 1.6} ${height * 2}
        `}
      />
      {/* Render circles based on currentPosition */}
      {circlePositions.map((circle, index) => (
        <Circle key={index} position={circle} currentPosition={currentPosition} index={index} />
      ))}
    </Svg>
  );
};

const Circle = ({ position, currentPosition, index }) => {
  const isSelected = currentPosition === index + 1;
  const scaleValue = 1;

  return (
    <SvgCircle
      cx={position.x}
      cy={position.y}
      r={30}
      fill={isSelected ? '#3796FF' : '#fff'}
      scale={scaleValue}
    />
  );
};

const Panda = ({ currentPosition }) => {
  const circlePositions = [];
  for (let i = 0; i < 10; i++) {
    const x = width / 6 + (i * (width / 1.6 - width / 6) / 9);
    const y = ((x - width / 6) * ((height / 2 - height / 4) / (width / 1.6 - width / 6)) + height / 24) * 4;
    circlePositions.push({ x, y });
  }

  const positionX = circlePositions[currentPosition - 1].x;
  const positionY = circlePositions[currentPosition - 1].y;

  return (
    <Image
      source={require('./src/images/panda.png')}
      style={[
        styles.panda,
        { left: positionX - 20, top: positionY + 12 },
      ]}
    />
  );
};

const App = () => {
  const [selectedStep, setSelectedStep] = useState(1);

  const moveToNextCircle = () => {
    let nextStep = selectedStep + 1;
    if (nextStep > 10) {
      nextStep = 1;
    }
    setSelectedStep(nextStep);
  };

  return (
    <LinearGradient
      colors={['#3796FF', '#a7d1ff']}
      style={styles.container}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      <ScrollView>
        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={moveToNextCircle}>
            <Text style={styles.buttonText}>Next Circle</Text>
          </TouchableOpacity>
          <WindingRoad currentPosition={selectedStep} />
          <Panda currentPosition={selectedStep} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    minHeight: height * 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  panda: {
    position: 'absolute',
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#3796FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
