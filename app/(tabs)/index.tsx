import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { formatPosterUrl, getPopularMovies } from "../../services/api";

// Đảm bảo import không có dấu ngoặc nhọn {}
import SectionHeader from "@/components/SectionHeader";
import Header from "../../components/Header";
import MovieCard from "../../components/MovieCard";
import SearchBar from "../../components/SearchBar";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function HomeScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies();
        setMovies(data);
      } catch (err) {
        setError("Lỗi tải phim");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#208AEF" />
      </View>
    );
  }

  return (
    <FlatList
      data={movies}
      style={styles.mainContainer}
      contentContainerStyle={styles.listContent}
      // ĐƯA TẤT CẢ VÀO ĐÂY ĐỂ CHÚNG CUỘN CÙNG NHAU
      ListHeaderComponent={
        <>
          <Header />
          <SearchBar />
          <SectionHeader title="Popular Movies" />
        </>
      }
      renderItem={({ item }) => (
        <MovieCard
          title={item.title}
          posterUrl={formatPosterUrl(item.poster_path)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
    />
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#121212",
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
});
