import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SectionHeaderProps {
  title: string;
}

console.log("--- ĐANG LOAD SECTIONHEADER ---");
export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.more}>See All</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  more: { color: "#F5C518", fontSize: 15 },
});
