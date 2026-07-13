import { Image } from "expo-image";
import { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface MovieCardProps {
  title: string;
  posterUrl: string;
}

export default function MovieCard({ title, posterUrl }: MovieCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <TouchableOpacity onPress={() => console.log("Click:", title)}>
      <View style={styles.card}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#999" />
          </View>
        )}
        <Image
          source={{ uri: posterUrl }}
          style={styles.poster}
          contentFit="cover"
          transition={500}
          onLoadEnd={() => setIsLoading(false)}
          onError={(error) => console.log("Image error:", error)}
        />
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    width: 160,
  },
  poster: {
    width: "100%",
    height: 240,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "#f0f0f0",
  },
  loadingContainer: {
    width: "100%",
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    padding: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
});
