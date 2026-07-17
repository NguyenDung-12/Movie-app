import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
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
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const fetchMovies = async (showLoading: boolean = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }

      const [popular, trending, topRated] = await Promise.all([
        getPopularMovies(),
        getTrendingMovies(),
        getTopRatedMovies(),
      ]);

      setMovies(popular);
      setTrendingMovies(trending);
      setTopRatedMovies(topRated);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error("Fetch movies error:", err);
      setError("Lỗi tải phim");
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  const handleRefresh = async () => {
    setRefreshing(true);

    await fetchMovies(false);

    setRefreshing(false);
  };
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#208AEF"
            colors={["#208AEF"]}
            progressBackgroundColor="#1E1E1E"
          />
        }
        ListHeaderComponent={
          <View>
            {lastUpdated && (
              <Text style={styles.updatedText}>
                Cập nhật lúc{" "}
                {lastUpdated.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </Text>
            )}
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
  updatedText: {
    color: "#888888",
    fontSize: 12,
    textAlign: "right",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
});
