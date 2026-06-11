import { useStore } from "@/store/useStore";
import * as ImagePicker from "expo-image-picker";
import {Image, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const { profileImage, setProfileImage } =
    useStore();

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) return;

    const result =
      await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#07131F",
        alignItems: "center",
        paddingTop: 50,
      }}
    >
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{
            uri:
              profileImage ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
          }}
        />
      </TouchableOpacity>

      <Text
        style={{
          color: "#fff",
          marginTop: 20,
        }}
      >
        Change Photo
      </Text>
    </View>
  );
}