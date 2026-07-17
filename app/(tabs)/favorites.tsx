import MovieCard from "@/components/MovieCard";
import { formatPosterUrl, type Movie } from "@/services/api";
import { getFavoriteMovies } from "@/services/favorites";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavoritesScreen() {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadFavoriteMovies = async () => {
        setLoading(true);

        const movies = await getFavoriteMovies();

        if (isActive) {
          setFavoriteMovies(movies);
          setLoading(false);
        }
      };

      loadFavoriteMovies();

      return () => {
        isActive = false;
      };
    }, []),
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#e50914" />

          <Text style={styles.loadingText}>Loading favorites...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favoriteMovies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          favoriteMovies.length === 0 && styles.emptyList,
        ]}
        columnWrapperStyle={
          favoriteMovies.length > 0 ? styles.columnWrapper : undefined
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Favorite Movies</Text>

            <Text style={styles.subtitle}>
              {favoriteMovies.length} saved movies
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>♡</Text>

            <Text style={styles.emptyTitle}>No favorite movies</Text>

            <Text style={styles.emptyDescription}>
              Open a movie and press the heart icon to save it.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <MovieCard
            id={item.id}
            title={item.title}
            posterUrl={formatPosterUrl(item.poster_path)}
            rating={item.vote_average}
            releaseDate={item.release_date}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0b",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#999999",
    fontSize: 14,
    marginTop: 12,
  },

  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },

  emptyList: {
    flexGrow: 1,
  },

  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 18,
  },

  header: {
    paddingHorizontal: 6,
    paddingTop: 10,
    paddingBottom: 22,
  },

  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#929292",
    fontSize: 14,
    marginTop: 6,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
    paddingBottom: 100,
  },

  emptyIcon: {
    color: "#e50914",
    fontSize: 80,
  },

  emptyTitle: {
    color: "#ffffff",
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 10,
  },

  emptyDescription: {
    color: "#999999",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 10,
  },
});
