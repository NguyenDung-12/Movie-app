import axios from "axios";

const API_KEY = "78e857e11ae07aec63cdf5f7b7592c37";
const BASE_URL = "https://api.themoviedb.org/3";

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export const getPopularMovies = async (page: number = 1): Promise<Movie[]> => {
  try {
    const response = await apiClient.get("/movie/popular", {
      params: { page },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const formatPosterUrl = (posterPath: string) => {
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
};
