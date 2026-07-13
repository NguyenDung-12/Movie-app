import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 Movie App</Text>
      <Text style={styles.subtitle}>Find your favorite movies</Text>
    </View>
  );
}

// Bắt buộc phải nằm ở cuối file
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    marginTop: 5,
    fontSize: 16,
    color: "#aaa",
  },
});
