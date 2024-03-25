import React, { useState, useMemo } from "react";
import { Canvas, Line, Path, Skia } from "@shopify/react-native-skia";
import { curveBasis, line, scaleLinear } from "d3";
import { View, StyleSheet, ScrollView } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

const originalData = [
  { level: 0, value: 0 },
  { level: 1, value: 300 },
  { level: 2, value: 1500.35 },
  { level: 3, value: 150.84 },
  { level: 4, value: 800.92 },
  { level: 5, value: 200.8 },
  { level: 6, value: 150.47 },
  { level: 7, value: 1000.47 },
  { level: 8, value: 200.47 },
  { level: 9, value: 1500.47 },
  { level: 10, value: 83.8 },
  { level: 11, value: 100.47 },
  { level: 12, value: 1000.47 },
  { level: 13, value: 200.47 },
  { level: 14, value: 1500.47 },
  { level: 15, value: 20.47 },
  { level: 16, value: 500 },
  { level: 17, value: 1200 },
  { level: 18, value: 200 },
  { level: 19, value: 300 },
];

const App = () => {
  const [transition, setTransition] = useState(1);
  const [state, setState] = useState({
    current: 0,
    next: 1,
  });

  const GRAPH_HEIGHT = 2500;
  const GRAPH_WIDTH = 500;

  const makeGraph = (data) => {
    const max = Math.max(...data.map((val) => val.value));
    const min = Math.min(...data.map((val) => val.value));

    const x = scaleLinear().domain([0, max]).range([10, GRAPH_WIDTH - 10]);

    const y = scaleLinear()
      .domain([1, 18])
      .range([GRAPH_HEIGHT, 80]);

    const curvedLine = line()
      .x((d) => x(d.value))
      .y((d) => y(d.level))
      .curve(curveBasis)(data);

    const skPath = curvedLine ? Skia.Path.MakeFromSVGString(curvedLine) : null;

    return {
      max,
      min,
      curve: skPath || null,
    };
  };

  const graphData = [makeGraph(originalData), makeGraph(originalData)];

  const path = useMemo(() => {
    const start = graphData[state.current].curve;
    const end = graphData[state.next].curve;
    const result = start.interpolate(end, transition);
    return result?.toSVGString() ?? "0";
  }, [state, transition, graphData]);

  // Define outer path with a smaller strokeWidth and a different color
  const outerPath = useMemo(() => {
    const start = graphData[state.current].curve;
    const end = graphData[state.next].curve;
    const result = start.interpolate(end, transition);
    return result?.toSVGString() ?? "0";
  }, [state, transition, graphData]);

  // Create shadow effect by drawing multiple paths with slight offsets and decreasing opacity
  // const shadowPaths = useMemo(() => {
  //   const NUM_SHADOWS = 5;
  //   const offset = 5;
  //   const opacityStep = 1 / NUM_SHADOWS;
  //   const paths = [];

  //   for (let i = 1; i <= NUM_SHADOWS; i++) {
  //     const shadowOpacity = 1 - opacityStep * i;
  //     const shadowOffset = offset * i;
  //     const shadowPath = path.replace(/d="([^"]*)"/, `d="$1" stroke-opacity="${shadowOpacity}"`);
  //     paths.push(<Path key={i} style="stroke" path={shadowPath} strokeWidth={90} color="#000" />);
  //   }

  //   return paths;
  // }, [path]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#3796FF', '#a7d1ff']}
        style={styles.container}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <ScrollView>
          <Canvas
            style={{
              width: GRAPH_WIDTH,
              height: GRAPH_HEIGHT,
            }}
          >
            {/* Outer path with a smaller strokeWidth and different color */}
            {/* <Path style="stroke" path={outerPath} strokeWidth={100} color="#FFFF00" /> */}

            {/* Render shadow paths */}
            {/* {shadowPaths} */}

            {/* Inner path */}
            <Path style="stroke" path={path} strokeWidth={84} color="#D9D9D9" />
          </Canvas>
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
});

export default App;
