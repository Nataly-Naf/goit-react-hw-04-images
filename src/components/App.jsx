import React, { useState, useEffect } from 'react';
import { GetFilteredImage } from './Api/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import toast, { Toaster } from 'react-hot-toast';
import { AudioItem } from './Loader/Loader';
import { AppS } from './App.styled';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const onSubmitForm = filter => {
    setQuery(filter);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function getPicture() {
      try {
        setError(false);
        setLoading(true);
        const newPictures = await GetFilteredImage(query, page);
        console.log(newPictures);
        toast.success('We have found pictures');
        setPictures(prevState => [...prevState, ...newPictures]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getPicture();
  }, [query, page]);

  const loadMoreHandler = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <AppS>
      <Searchbar onSubmitForm={onSubmitForm} />
      {loading && <AudioItem />}
      <ImageGallery onPictures={pictures} />
      {loading && <b>Loading pictures...</b>}
      {error && <b>Whoops! Error! Please reload this page!!!</b>}
      {pictures.length > 0 && <Button onLoadMoreBtn={loadMoreHandler} />}
      <Toaster position="top-right" />
    </AppS>
  );
};
