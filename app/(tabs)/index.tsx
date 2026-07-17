import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import HorizontalMovieList from "@/components/HorizontalMovieList";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import SectionHeader from "@/components/SectionHeader";
import {
  formatPosterUrl,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  type Movie,
} from "@/services/api";
import { router } from "expo-router";

export default function HomeScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const popular = await getPopularMovies();
        const trending = await getTrendingMovies();
        const topRated = await getTopRatedMovies();

        setMovies(popular);
        setTrendingMovies(trending);
        setTopRatedMovies(topRated);

        setError(null);
      } catch (err) {
        console.error("Fetch movies error:", err);
        setError("Lỗi tải phim");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);
  const handleHomeSearch = () => {
    const keyword = searchQuery.trim();

    if (!keyword) {
      return;
    }

    router.push({
      pathname: "/explore",
      params: {
        query: keyword,
      },
    });
  };
  // Loading
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#208AEF" />
      </View>
    );
  }

  // Error
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Header />

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleHomeSearch}
        placeholder="Search for a movie..."
      />

      <FlatList
        data={movies}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        style={styles.movieList}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            {movies.length > 0 && <HeroBanner movie={movies[0]} />}

            <SectionHeader title="Trending Movies" />

            <HorizontalMovieList movies={trendingMovies} />

            <SectionHeader title="Top Rated Movies" />

            <HorizontalMovieList movies={topRatedMovies} />

            <SectionHeader title="Popular Movies" />
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
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },

  movieList: {
    flex: 1,
  },

  listContent: {
    paddingBottom: 20,
  },

  row: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },

  errorText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
