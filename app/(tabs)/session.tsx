import React from "react";
import * as Haptics from "expo-haptics";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Session() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Active</Text>

      <Text style={styles.timer}>00:00:00</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Distance</Text>
        <Text style={styles.value}>0.0 km</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Speed</Text>
        <Text style={styles.value}>0 km/h</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        }
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        }
      >
        <Text style={styles.buttonText}>Pause</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#EF4444" }]}
        onPress={() =>
          Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success          )
        }
      >
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07131F",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  timer: {
    color: "#00BFFF",
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 30,
  },
  card: {
    width: "100%",
    backgroundColor: "#0E2033",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  label: {
    color: "#9CA3AF",
  },
  value: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },
  button: {
    width: "100%",
    backgroundColor: "#00BFFF",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});