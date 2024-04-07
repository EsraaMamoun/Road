import React from "react";
import { View, StyleSheet, ScrollView, ImageBackground, Text, Dimensions } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import path from './src/images/path.png'

const { width, height } = Dimensions.get('window');

const App = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#3796FF', '#a7d1ff']}
        style={styles.container}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <ScrollView>
          <ImageBackground source={path} style={styles.imageBackground} resizeMode='contain'>
          </ImageBackground>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
  },
  imageBackground: {
    width: width,
    minHeight: height,
    flex: 1,
  }
});

export default App;
