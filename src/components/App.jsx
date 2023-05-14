import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getSearch } from 'api/getSearch';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from './Modal/Modal';

export function App() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (search && page) {
      setLoading(true);
      getSearch(search, page)
        .then((resp) => resp.json())
        .then((data) => {
          if (data.hits.length === 0) {
            setEmpty(true);
          }
          setImages((prevImages) => [...prevImages, ...data.hits]);
          setTotal(data.totalHits);
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    }
  }, [search, page]);

  const handleSearchSubmit = (text) => {
    setSearch(text);
    setImages([]);
    setPage(1);
    setTotal(1);
    setLoading(false);
    setError(null);
    setEmpty(false);
  };

  const handleLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleModalOpen = (largeImageURL, alt) => {
    setShowModal((prevShowModal) => !prevShowModal);
    setLargeImageURL(largeImageURL);
    setAlt(alt);
  };

  const handleModalClose = () => {
    setShowModal((prevShowModal) => !prevShowModal);
    setLargeImageURL('');
    setAlt('');
  };

  return (
    <div>
      <Toaster toastOptions={{ duration: 1500 }} />

      <Searchbar handleSubmit={handleSearchSubmit} />

      {error && (
        <h2 style={{ textAlign: 'center' }}>
          Something went wrong: ({error})!
        </h2>
      )}

      <ImageGallery togleModal={handleModalOpen} images={images} />

      {loading && <Loader />}

      {empty && (
        <h2 style={{ textAlign: 'center' }}>
          Sorry, the image could not be displayed.
        </h2>
      )}

      {total / 12 > page && <Button clickLoad={handleLoadMoreClick} />}

      {showModal && (
        <Modal closeModal={handleModalClose}>
          <img src={largeImageURL} alt={alt} />
        </Modal>
      )}
    </div>
  );
}