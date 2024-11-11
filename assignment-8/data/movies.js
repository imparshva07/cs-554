//import axios, md5
import axios from "axios";

export const searchMoviesByName = async (title, page = 1) => {
  /*Function to make an axios call to search the api and return up to 20 movies matching the title param
  API endpoint: http://www.omdbapi.com/?apikey=CS546&s={title}
  */
  if (typeof title !== 'string') throw `Error: it must be a string!`;
  title = title.trim();
  if (title.length === 0) throw `Error: It cannot be an empty string or just spaces`;

  const { data } = await axios.get(`http://www.omdbapi.com/?apikey=CS546&s=${title}&page=${page}`);
  return data;
};

export const searchMovieById = async (id) => {
  /*Function to make an axios call to the the api matching the id
 API endpoint: http://www.omdbapi.com/?apikey=CS546&i={id}
  */
 if (typeof id !== 'string') throw `Error: it must be a string!`;
 id = id.trim();
 if (id.length === 0) throw `Error: It cannot be an empty string or just spaces`;
 const { data } = await axios.get(`http://www.omdbapi.com/?apikey=CS546&i=${id}`);
 return data;
};
