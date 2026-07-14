import { formatPosterUrl, type Movie } from "@/services/api";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeroBannerProps {
  movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: formatPosterUrl(movie.poster_path) }}
        style={styles.image}
        contentFit="cover"
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>{movie.title}</Text>

        <Text style={styles.info}>
          ⭐ {movie.vote_average.toFixed(1)} •{" "}
          {movie.release_date.substring(0, 4)}
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Watch Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 260,
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  info: {
    color: "#ddd",
    marginTop: 8,
    marginBottom: 15,
  },

  button: {
    alignSelf: "flex-start",
    backgroundColor: "#FFD54F",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});
