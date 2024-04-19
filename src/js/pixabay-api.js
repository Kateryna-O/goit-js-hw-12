import axios from 'axios';

const apiKey = '43344529-efab811219d9ae176ef45ef76';
const baseUrl = 'https://pixabay.com/api/';

async function searchImages(query, page) {
  const perPage = 15;
  const url = `${baseUrl}?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  try {
    const response = await axios.get(url);
    return response.data.hits;
  } catch (error) {
    console.error('Error searching images:', error);
    throw new Error('Error searching images');
  }
}

export { searchImages };
