import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MovieCardProps {
  id: number;
  title: string;
  posterUrl: string;
  rating: number;
  releaseDate: string;
}

export default function MovieCard({
  id,
  title,
  posterUrl,
  rating,
  releaseDate,
}: MovieCardProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/movie/[id]",
          params: {
            id: id.toString(),
          },
        });
      }}
    >
      <View style={styles.card}>
        <View style={styles.infoRow}>
          <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>

          <Text style={styles.year}>{releaseDate.substring(0, 4)}</Text>
        </View>
        <Image
          source={{ uri: posterUrl }}
          style={styles.poster}
          contentFit="cover"
          transition={500}
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
    width: 170,
    marginBottom: 18,
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    overflow: "hidden",
  },

  poster: {
    width: "100%",
    height: 260,
  },

  loadingContainer: {
    position: "absolute",

    width: "100%",

    height: 250,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#2A2A2A",

    zIndex: 1,
  },

  title: {
    color: "#FFF",

    fontSize: 15,

    fontWeight: "600",

    paddingHorizontal: 10,

    paddingTop: 10,
  },

  infoRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    paddingHorizontal: 10,

    paddingVertical: 10,
  },

  rating: {
    color: "#FFD54F",

    fontWeight: "bold",
  },

  year: {
    color: "#AAAAAA",
  },
});
