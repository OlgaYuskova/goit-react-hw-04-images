import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import fetchImages from '../API';
import { Loaders } from './Loader/Loader';
import { Button } from './Button/Button.js';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [state, setState] = useState({
    query: '',
    images: [],
    page: 1,
  });

  const [getMoreImg, setGetMoreImg] = useState({ getMoreImg: true });

  const [isLoading, setIsLoading] = useState({ isLoading: false });

  const [showModal, setShowModal] = useState({ showModal: false });

  const [selectedImage, setSelectedImage] = useState({ selectedImage: '' });

  const { images, query, page } = state;

  const getData = useCallback(async () => {
    if (query && page) {
      try {
        const newImages = await fetchImages(query, page);
        setState(prev => ({
          ...prev,
          images: [...prev.images, ...newImages],
        }));
        setGetMoreImg(newImages.length > 0);
      } catch (error) {
        console.error('Error fetching images:', error);
      }

      setIsLoading(false);
    }
  }, [page, query]);

  useEffect(() => {
    setShowModal(false);

    if (!query) {
      return;
    }
    getData();
  }, [getData, query, page]);

  const handleFormSubmit = query => {
    setState(prev => ({
      ...prev,
      query,
      images: [],
      page: 1,
    }));
    setIsLoading(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  const handleClickOpenModal = selectedImage => {
    setShowModal(true);
    setSelectedImage(selectedImage);
  };

  const handleClickNextPage = () => {
    setState(prev => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery
        query={query}
        images={images}
        onClickImageItem={handleClickOpenModal}
      />

      {isLoading === true && <Loaders />}

      {images.length !== 0 && <Button onClick={handleClickNextPage} />}

      {showModal && <Modal image={selectedImage} onClose={handleCloseModal} />}
    </>
  );
};
