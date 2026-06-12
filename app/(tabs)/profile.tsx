import { useStore } from "@/store/useStore";
import * as ImagePicker from "expo-image-picker";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const {
    profileImage, setProfileImage, sessions, deleteSession, steps} = useStore();

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission denied");
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const totalDistance = sessions
    .reduce(
      (sum, session) => sum + session.distance,
      0
    )
    .toFixed(2);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{
            uri:
              profileImage ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <Text style={styles.changePhoto}>
        Change Photo
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.card}>
          <Text style={styles.value}>
            {steps}
          </Text>
          <Text style={styles.label}>
            Steps
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.value}>
            {totalDistance}
          </Text>
          <Text style={styles.label}>
            Km
          </Text>
        </View>
      </View>

      <View style={styles.cardLarge}>
        <Text style={styles.value}>
          {sessions.length}
        </Text>
        <Text style={styles.label}>
          Sessions
        </Text>
      </View>

      <Text style={styles.historyTitle}>
        Session History
      </Text>

      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No sessions yet
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.sessionCard}>
            <View>
              <Text style={styles.sessionText}>
                {item.distance.toFixed(2)} km
              </Text>

              <Text style={styles.sessionDate}>
                {new Date(
                  item.date
                ).toLocaleDateString()}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                deleteSession(item.id)
              }
            >
              <Text style={styles.delete}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07131F",
    padding: 20,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginTop: 20,
  },

  changePhoto: {
    color: "#fff",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 25,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    backgroundColor: "#0E2033",
    width: "48%",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },

  cardLarge: {
    backgroundColor: "#0E2033",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 15,
  },

  value: {
    color: "#4FD1FF",
    fontSize: 24,
    fontWeight: "bold",
  },

  label: {
    color: "#9CA3AF",
    marginTop: 5,
  },

  historyTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
  },

  sessionCard: {
    backgroundColor: "#0E2033",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sessionText: {
    color: "#fff",
    fontWeight: "bold",
  },

  sessionDate: {
    color: "#9CA3AF",
    marginTop: 4,
  },

  delete: {
    color: "#EF4444",
    fontWeight: "bold",
  },

  empty: {
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 20,
  },
});