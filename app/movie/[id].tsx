import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    formatPosterUrl,
    getMovieDetail,
    type MovieDetail,
} from "@/services/api";

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (!id) return;

        const data = await getMovieDetail(Number(id));
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#208AEF" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "white" }}>Movie not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: formatPosterUrl(movie.backdrop_path) }}
        style={styles.backdrop}
        contentFit="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>

        <Text style={styles.info}>
          ⭐ {movie.vote_average.toFixed(1)} • {movie.release_date}
        </Text>

        <Text style={styles.runtime}>⏱ {movie.runtime} phút</Text>

        <Text style={styles.section}>Overview</Text>

        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },

  backdrop: {
    width: "100%",
    height: 250,
  },

  content: {
    padding: 20,
  },

  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  info: {
    color: "#FFD54F",
    fontSize: 16,
    marginBottom: 10,
  },

  runtime: {
    color: "#BBBBBB",
    marginBottom: 20,
  },

  section: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  overview: {
    color: "#DDD",
    fontSize: 16,
    lineHeight: 26,
  },
});
