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
  vote_average: number;
  release_date: string;
}
export interface MovieDetail extends Movie {
  overview: string;
  backdrop_path: string;
  runtime: number;
  genres: {
    id: number;
    name: string;
  }[];
}
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}
export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
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
export const getTopRatedMovies = async (): Promise<Movie[]> => {
  try {
    const response = await apiClient.get("/movie/top_rated");

    return response.data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return [];
  }
};
export const getTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await apiClient.get("/trending/movie/day");

    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

export const getMovieDetail = async (id: number): Promise<MovieDetail> => {
  const response = await apiClient.get(`/movie/${id}`);
  return response.data;
};
export const formatPosterUrl = (posterPath: string) => {
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
};
export const getMovieVideos = async (id: number): Promise<MovieVideo[]> => {
  const response = await apiClient.get(`/movie/${id}/videos`);
  return response.data.results;
};
export const getMovieCredits = async (id: number): Promise<CastMember[]> => {
  const response = await apiClient.get(`/movie/${id}/credits`);
  return response.data.cast;
};
