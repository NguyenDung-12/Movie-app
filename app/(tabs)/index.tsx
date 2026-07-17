import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { Ionicons } from "@expo/vector-icons";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const movieListRef = useRef<FlatList<Movie>>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const fetchMovies = async (showLoading: boolean = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }

      const [popular, trending, topRated] = await Promise.all([
        getPopularMovies(1),
        getTrendingMovies(),
        getTopRatedMovies(),
      ]);

      setMovies(popular);
      setTrendingMovies(trending);
      setTopRatedMovies(topRated);

      setCurrentPage(1);
      setHasMore(popular.length > 0);
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
    try {
      setRefreshing(true);
      setCurrentPage(1);
      setHasMore(true);

      await fetchMovies(false);
    } finally {
      setRefreshing(false);
    }
  };
  const handleLoadMore = async () => {
    if (loadingMore || loading || refreshing || !hasMore) {
      return;
    }

    try {
      setLoadingMore(true);

      const nextPage = currentPage + 1;
      const newMovies = await getPopularMovies(nextPage);

      if (newMovies.length === 0) {
        setHasMore(false);
        return;
      }

      setMovies((previousMovies) => {
        const existingIds = new Set(previousMovies.map((movie) => movie.id));

        const uniqueNewMovies = newMovies.filter(
          (movie) => !existingIds.has(movie.id),
        );

        return [...previousMovies, ...uniqueNewMovies];
      });

      setCurrentPage(nextPage);
    } catch (error) {
      console.log("Load more movies error:", error);
    } finally {
      setLoadingMore(false);
    }
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
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    setShowScrollTop(offsetY > 700);
  };

  const handleScrollToTop = () => {
    movieListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
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
        ref={movieListRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        data={movies}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        style={styles.movieList}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        keyboardShouldPersistTaps="handled"
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={7}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews
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
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footerLoading}>
              <ActivityIndicator size="small" color="#208AEF" />

              <Text style={styles.footerText}>Đang tải thêm phim...</Text>
            </View>
          ) : !hasMore && movies.length > 0 ? (
            <Text style={styles.endText}>Đã hiển thị toàn bộ phim</Text>
          ) : null
        }
      />
      {showScrollTop && (
        <TouchableOpacity
          style={styles.scrollTopButton}
          activeOpacity={0.8}
          onPress={handleScrollToTop}
        >
          <Ionicons name="arrow-up" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}
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
  footerLoading: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
  },

  footerText: {
    color: "#AAAAAA",
    fontSize: 14,
    marginLeft: 10,
  },

  endText: {
    color: "#777777",
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 24,
  },
  scrollTopButton: {
    position: "absolute",
    right: 18,
    bottom: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#208AEF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
