import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Dashboard() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>FitTrack</Text>
            <Text style={styles.steps}>8432</Text>
            <Text style={styles.label}>Steps Today</Text>

            <TouchableOpacity style={styles.button} onPress={() => router.push("/session")}>
                <Text style={styles.buttonText}>Start Session </Text>

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
        alignItems: "center"
  
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
        marginBottom: 30,
         textAlign: "center",
    },
    button: {
        backgroundColor: "#00BFFF",
        padding: 16,
        borderRadius: 16,
        marginBottom: 10,
        width : 300,
    },
    buttonText: {

        color: "#fff",
        textAlign: "center",
        fontWeight: "700",
    },
});