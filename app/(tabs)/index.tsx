import { useStore } from "@/store/useStore";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import usePedometer from "../../hooks/usePedomete";

export default function index() {
  usePedometer();

  const { steps, dailyGoal } = useStore();

  const calories = (steps * 0.04).toFixed(0);
  const distance = (steps * 0.0008).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FitTrack</Text>

      <Text style={styles.steps}>{steps}</Text>

      <Text style={styles.label}>Steps Today</Text>

      <View style={styles.statsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardValue}>
            {distance}
          </Text>
          <Text style={styles.cardLabel}>
            Distance (km)
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardValue}>
            {calories}
          </Text>
          <Text style={styles.cardLabel}>
            Calories
          </Text>
        </View>
      </View>

      <Text style={styles.goal}>
        Goal: {dailyGoal} steps
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/session")}
      >
        <Text style={styles.buttonText}>
          Start Session
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07131F",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },

  steps: {
    color: "#4FD1FF",
    fontSize: 64,
    fontWeight: "bold",
    marginTop: 20,
  },

  label: {
    color: "#ccc",
    marginBottom: 25,
    textAlign: "center",
  },

  statsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#0E2033",
    width: "48%",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },

  cardValue: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  cardLabel: {
    color: "#9CA3AF",
    marginTop: 5,
  },

  goal: {
    color: "#9CA3AF",
    marginBottom: 25,
  },

  button: {
    backgroundColor: "#00BFFF",
    padding: 16,
    borderRadius: 16,
    width: 300,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});