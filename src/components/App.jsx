import React, { Component } from 'react';
import { GetFilteredImage } from './Api/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import toast, { Toaster } from 'react-hot-toast';
import { AudioItem } from './Loader/Loader';
import { AppS } from './App.styled';

export class App extends Component {
  state = {
    pictures: [],
    query: 'dog',
    loading: false,
    error: false,
    page: 1,
  };

  onSubmitForm = filter => {
    console.log(filter);
    this.setState({ page: 1, pictures: [] });
    return this.setState({ query: filter });
  };

  loadMoreHandler = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true, error: false });

        const newPictures = await GetFilteredImage(
          this.state.query,
          this.state.page
        );
        console.log(newPictures);
        toast.success('We have found pictures');
        this.setState(prevState => {
          return {
            pictures: [...prevState.pictures, ...newPictures],
          };
        });
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false });
      }
    }
  }
  render() {
    const { loading, error } = this.state;
    return (
      <AppS>
        <Searchbar onSubmitForm={this.onSubmitForm} />
        {loading && <AudioItem />}

        <ImageGallery onPictures={this.state.pictures} />
        {loading && <b>Loading pictures...</b>}
        {error && <b>Whoops! Error! Please reload this page!!!</b>}
        {this.state.pictures.length > 0 && (
          <Button onLoadMoreBtn={this.loadMoreHandler} />
        )}
        <Toaster position="top-right" />
      </AppS>
    );
  }
}
