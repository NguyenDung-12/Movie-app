import { StyleSheet, Text, View } from "react-native";

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 22,
    marginBottom: 12,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
