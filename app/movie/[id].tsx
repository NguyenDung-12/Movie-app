import CastList from "@/components/CastList";
import SimilarMovies from "@/components/SimilarMovies";
import {
  formatPosterUrl,
  getMovieCredits,
  getMovieDetail,
  getMovieVideos,
  getSimilarMovies,
  type CastMember,
  type MovieDetail,
  type MovieVideo,
  type SimilarMovie,
} from "@/services/api";

import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      const movieId = Number(id);

      try {
        try {
          const movieData = await getMovieDetail(movieId);
          setMovie(movieData);
        } catch (error) {
          console.log("Movie Detail Error:", error);
        }

        try {
          const castData = await getMovieCredits(movieId);
          setCast(castData.slice(0, 10));
        } catch (error) {
          console.log("Cast Error:", error);
        }

        try {
          const similarData = await getSimilarMovies(movieId);
          setSimilarMovies(similarData.slice(0, 10));
        } catch (error) {
          console.log("Similar Error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleWatchTrailer = async () => {
    try {
      const videos = await getMovieVideos(Number(id));

      const trailer = videos.find(
        (video: MovieVideo) =>
          video.site === "YouTube" && video.type === "Trailer",
      );

      if (!trailer) {
        Alert.alert("Thông báo", "Không tìm thấy trailer.");
        return;
      }

      await Linking.openURL(`https://www.youtube.com/watch?v=${trailer.key}`);
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể mở trailer.");
    }
  };

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
        <Text style={{ color: "#FFF" }}>Movie not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      <Image
        source={{ uri: formatPosterUrl(movie.backdrop_path) }}
        style={styles.backdrop}
        contentFit="cover"
      />

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{movie.title}</Text>

          <TouchableOpacity onPress={() => setFavorite(!favorite)}>
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={30}
              color="#ff0400"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.info}>
          ⭐ {movie.vote_average.toFixed(1)} •{" "}
          {movie.release_date.substring(0, 4)}
        </Text>

        <Text style={styles.runtime}>⏱ {movie.runtime} phút</Text>

        <Text style={styles.genres}>
          {movie.genres.map((g) => g.name).join(" • ")}
        </Text>

        <TouchableOpacity
          style={styles.trailerButton}
          onPress={handleWatchTrailer}
        >
          <Ionicons name="play-circle" size={24} color="white" />

          <Text style={styles.trailerText}>Watch Trailer</Text>
        </TouchableOpacity>

        <Text style={styles.section}>Overview</Text>

        <Text style={styles.overview}>{movie.overview}</Text>

        <Text style={styles.section}>Cast</Text>

        <CastList cast={cast} />

        {similarMovies.length > 0 && (
          <>
            <Text style={styles.section}>Similar Movies</Text>

            <SimilarMovies movies={similarMovies} />
          </>
        )}
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

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    flex: 1,
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  info: {
    color: "#FFD54F",
    fontSize: 16,
    marginBottom: 10,
  },

  runtime: {
    color: "#BBB",
    marginBottom: 10,
  },

  genres: {
    color: "#208AEF",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 20,
  },

  trailerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#208AEF",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 25,
  },

  trailerText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
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
    marginBottom: 30,
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
});
