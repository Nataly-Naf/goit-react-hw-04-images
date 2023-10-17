import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const perPage = 40;

export const GetFilteredImage = async (value, page) => {
  const response = await axios.get(`${URL}`, {
      params: {
        key: '5826986-30cf6df7309c66ae8af35763a',
        q: `${value}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      per_page: perPage,
          page: page,
      },
    });       

    return response.data.hits;
};
  


