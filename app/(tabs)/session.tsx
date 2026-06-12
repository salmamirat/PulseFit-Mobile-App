import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useLocationTracker from "../../hooks/useLocationTracker";
import { useStore } from "../../store/useStore";

export default function Session() {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const timerRef = useRef<number | null>(null);

  const addSession = useStore((state) => state.addSession);
  const tracker = useLocationTracker();
  const { distance, speed } = tracker;
  const resetTracker = (tracker as { resetTracker?: () => void }).resetTracker ?? (() => {});

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (totalSeconds % 60).toString().padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  };

  const handleStart = async () => {
  await tracker.startTracking();

  Haptics.impactAsync(
    Haptics.ImpactFeedbackStyle.Medium
  );

  setIsActive(true);
};

const handlePause = () => {
  tracker.stopTracking();

  Haptics.impactAsync(
    Haptics.ImpactFeedbackStyle.Light
  );

  setIsActive(false);
};

const handleStop = () => {
  tracker.stopTracking();

  Haptics.notificationAsync(
    Haptics.NotificationFeedbackType.Success
  );

  setIsActive(false);

  if (distance > 0 || seconds > 2) {
    addSession({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      duration: seconds,
      distance,
      speed,
    });
  }

  setSeconds(0);

  tracker.resetTracker();
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Active</Text>

      <Text style={styles.timer}>{formatTime(seconds)}</Text>

  
      <View style={styles.card}>
        <Text style={styles.label}>Distance</Text>
        <Text style={styles.value}>{distance.toFixed(2)} km</Text>
      </View>


      <View style={styles.card}>
        <Text style={styles.label}>Speed</Text>
        <Text style={styles.value}>{speed.toFixed(1)} km/h</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePause}>
        <Text style={styles.buttonText}>Pause</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#EF4444" }]}
        onPress={handleStop}
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