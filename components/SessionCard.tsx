import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface Props {
  id: string;
  distance: number;
  duration: number;
  date: string;
  onDelete: () => void;
}

export default function SessionCard({
  distance,
  duration,
  date,
  onDelete,
}: Props) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.distance}>
          {distance.toFixed(2)} km
        </Text>

        <Text style={styles.date}>
          {new Date(
            date
          ).toLocaleDateString()}
        </Text>

        <Text style={styles.time}>
          {duration} sec
        </Text>
      </View>

      <TouchableOpacity
        onPress={onDelete}
      >
        <Text style={styles.delete}>
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    card: {
      backgroundColor:
        "#0E2033",
      padding: 15,
      borderRadius: 16,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
    },

    distance: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },

    date: {
      color: "#9CA3AF",
      marginTop: 4,
    },

    time: {
      color: "#9CA3AF",
      marginTop: 2,
    },

    delete: {
      color: "#EF4444",
      fontWeight: "bold",
    },
  });