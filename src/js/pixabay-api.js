const apiKey = '43344529-efab811219d9ae176ef45ef76';
const baseUrl = 'https://pixabay.com/api/';

async function searchImages(query) {
  const url = `${baseUrl}?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error('Error searching images:', error);
    return [];
  }
}

export { searchImages };
