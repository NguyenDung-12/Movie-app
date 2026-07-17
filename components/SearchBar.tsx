import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  value?: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  onSubmitEditing,
  placeholder = "Search movies...",
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={21} color="#929292" />

      <TextInput
        style={styles.input}
        value={value ?? ""}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#777777"
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={onSubmitEditing}
      />

      {(value ?? "").length > 0 && (
        <TouchableOpacity onPress={() => onChangeText("")}>
          <Ionicons name="close-circle" size={20} color="#929292" />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.searchButton}
        activeOpacity={0.8}
        onPress={onSubmitEditing}
      >
        <Ionicons name="search" size={19} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1d1d1d",
    borderRadius: 14,
    paddingLeft: 14,
    marginHorizontal: 16,
    marginVertical: 14,
    borderWidth: 1,
    borderColor: "#2d2d2d",
  },

  input: {
    flex: 1,
    height: "100%",
    color: "#ffffff",
    fontSize: 15,
    paddingHorizontal: 10,
  },

  searchButton: {
    width: 46,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e50914",
    borderRadius: 12,
    marginLeft: 8,
    marginRight: 3,
  },
});
