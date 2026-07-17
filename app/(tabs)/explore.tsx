import MovieCard from "@/components/MovieCard";
import { formatPosterUrl, searchMovies, type Movie } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const params = useLocalSearchParams<{
    query?: string | string[];
  }>();

  const routeQuery = Array.isArray(params.query)
    ? params.query[0]
    : (params.query ?? "");
  const lastRouteQuery = useRef("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    if (loading || loadingMore || !hasSearched || currentPage >= totalPages) {
      return;
    }

    try {
      setLoadingMore(true);

      const nextPage = currentPage + 1;

      const response = await searchMovies(searchQuery, nextPage);

      setMovies((previousMovies) => {
        const existingIds = new Set(previousMovies.map((movie) => movie.id));

        const uniqueNewMovies = response.results.filter(
          (movie) => !existingIds.has(movie.id),
        );

        return [...previousMovies, ...uniqueNewMovies];
      });

      setCurrentPage(response.page);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.log("Load more search results error:", error);
    } finally {
      setLoadingMore(false);
    }
  };
  const performSearch = useCallback(async (keywordValue: string) => {
    const keyword = keywordValue.trim();

    Keyboard.dismiss();

    if (!keyword) {
      setMovies([]);
      setHasSearched(false);
      setCurrentPage(1);
      setTotalPages(0);
      return;
    }

    try {
      setLoading(true);
      setHasSearched(true);
      setSearchQuery(keyword);

      const response = await searchMovies(keyword, 1);

      setMovies(response.results);
      setCurrentPage(response.page);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.log("Explore search error:", error);

      setMovies([]);
      setCurrentPage(1);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = () => {
    performSearch(searchQuery);
  };
  useFocusEffect(
    useCallback(() => {
      if (!routeQuery) {
        return;
      }

      if (lastRouteQuery.current === routeQuery) {
        return;
      }

      lastRouteQuery.current = routeQuery;
      performSearch(routeQuery);
    }, [routeQuery, performSearch]),
  );

  const handleClearSearch = () => {
    setSearchQuery("");
    setMovies([]);
    setHasSearched(false);
    setCurrentPage(1);
    setTotalPages(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>

        <Text style={styles.subtitle}>Search for movies by title</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={21} color="#929292" />

        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Enter movie title..."
          placeholderTextColor="#777777"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={handleSearch}
        />

        {(searchQuery ?? "").length > 0 && (
          <TouchableOpacity onPress={handleClearSearch}>
            <Ionicons name="close-circle" size={20} color="#929292" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.searchButton}
          activeOpacity={0.8}
          onPress={handleSearch}
        >
          <Ionicons name="search" size={19} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#e50914" />

          <Text style={styles.message}>Searching movies...</Text>
        </View>
      ) : !hasSearched ? (
        <View style={styles.center}>
          <Ionicons name="film-outline" size={70} color="#e50914" />

          <Text style={styles.emptyTitle}>Explore Movies</Text>

          <Text style={styles.message}>
            Enter a movie title to start searching.
          </Text>
        </View>
      ) : (movies ?? []).length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="search-outline" size={70} color="#e50914" />

          <Text style={styles.emptyTitle}>No movies found</Text>

          <Text style={styles.message}>
            Try searching with another movie title.
          </Text>
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultText}>
              {movies.length} results for “{searchQuery}”
            </Text>

            <Text style={styles.pageText}>
              Page {currentPage}/{totalPages}
            </Text>
          </View>

          <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.columnWrapper}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.4}
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
                  <ActivityIndicator size="small" color="#e50914" />
                  <Text style={styles.footerText}>Loading more movies...</Text>
                </View>
              ) : currentPage >= totalPages &&
                movies.length > 0 &&
                totalPages > 0 ? (
                <Text style={styles.endText}>No more search results</Text>
              ) : null
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0b",
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#929292",
    fontSize: 14,
    marginTop: 4,
  },

  searchContainer: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1d1d1d",
    borderRadius: 14,
    paddingLeft: 14,
    marginHorizontal: 16,
    marginVertical: 16,
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

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingBottom: 80,
  },

  emptyTitle: {
    color: "#ffffff",
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 14,
  },

  message: {
    color: "#999999",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 10,
  },

  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },

  columnWrapper: {
    justifyContent: "space-between",
  },

  footerLoading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },

  footerText: {
    color: "#999999",
    fontSize: 14,
    marginLeft: 10,
  },

  endText: {
    color: "#777777",
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 24,
  },
  resultsContainer: {
    flex: 1,
  },

  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  resultText: {
    flex: 1,
    color: "#b5b5b5",
    fontSize: 14,
    marginRight: 10,
  },

  pageText: {
    color: "#e50914",
    fontSize: 14,
    fontWeight: "bold",
  },
});
