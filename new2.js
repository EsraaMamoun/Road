import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const VerticalWavyPath = ({ width, height }) => {
  const path = `M${width / 8} 0 Q${width * 1.2} ${height * 0.30}, ${width / 1.7} ${height / 2} T${width / 1.5} ${height} T${width / 1.5} ${height}` ;
  return (
    <Svg width={width} height={height}>
      <Path
        d={path}
        fill="none"
        stroke="black"
        strokeWidth="100" // Increased stroke width for more visibility
      />
    </Svg>
  );
};

const S = () => {
  const screenWidth = Dimensions.get('window').width;
  const waveWidth = screenWidth;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
      <VerticalWavyPath width={waveWidth} height={Dimensions.get('window').height} />

      </ScrollView>
    </View>
  );
};

// export default App;
