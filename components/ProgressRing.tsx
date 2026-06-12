import React from "react";
import Svg, {
  Circle,
} from "react-native-svg";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

interface Props {
  progress: number;
  goal: number;
}

export default function ProgressRing({
  progress,
  goal,
}: Props) {
  const radius = 80;
  const strokeWidth = 12;

  const circumference =
    2 * Math.PI * radius;

  const percentage =
    progress / goal;

  const strokeDashoffset =
    circumference -
    circumference *
      Math.min(percentage, 1);

  return (
    <View style={styles.container}>
      <Svg
        width={200}
        height={200}
      >
        <Circle
          stroke="#1E293B"
          fill="none"
          cx="100"
          cy="100"
          r={radius}
          strokeWidth={
            strokeWidth
          }
        />

        <Circle
          stroke="#00BFFF"
          fill="none"
          cx="100"
          cy="100"
          r={radius}
          strokeWidth={
            strokeWidth
          }
          strokeDasharray={`${circumference}`}
          strokeDashoffset={
            strokeDashoffset
          }
          strokeLinecap="round"
          rotation="-90"
          origin="100,100"
        />
      </Svg>

      <View
        style={
          styles.textContainer
        }
      >
        <Text style={styles.steps}>
          {progress}
        </Text>

        <Text style={styles.label}>
          Steps
        </Text>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      justifyContent:
        "center",
      alignItems: "center",
    },

    textContainer: {
      position: "absolute",
      alignItems: "center",
    },

    steps: {
      color: "#fff",
      fontSize: 26,
      fontWeight: "bold",
    },

    label: {
      color: "#9CA3AF",
    },
  });