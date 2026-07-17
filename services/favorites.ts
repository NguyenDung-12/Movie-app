import type { Movie } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@movie_app_favorites";

export const getFavoriteMovies = async (): Promise<Movie[]> => {
  try {
    const storedMovies = await AsyncStorage.getItem(FAVORITES_KEY);

    if (!storedMovies) {
      return [];
    }

    return JSON.parse(storedMovies) as Movie[];
  } catch (error) {
    console.log("Get favorite movies error:", error);
    return [];
  }
};

export const isMovieFavorite = async (movieId: number): Promise<boolean> => {
  const favoriteMovies = await getFavoriteMovies();

  return favoriteMovies.some((movie) => movie.id === movieId);
};

export const toggleFavoriteMovie = async (movie: Movie): Promise<boolean> => {
  try {
    const favoriteMovies = await getFavoriteMovies();

    const alreadyFavorite = favoriteMovies.some(
      (favoriteMovie) => favoriteMovie.id === movie.id,
    );

    const updatedMovies = alreadyFavorite
      ? favoriteMovies.filter((favoriteMovie) => favoriteMovie.id !== movie.id)
      : [...favoriteMovies, movie];

    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedMovies));

    return !alreadyFavorite;
  } catch (error) {
    console.log("Toggle favorite movie error:", error);
    return false;
  }
};
