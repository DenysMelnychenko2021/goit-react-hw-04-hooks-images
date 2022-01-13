import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SearchBar } from 'components/searchBar';
import { ImageGallery } from 'components/imageGallery';
import { Modal } from 'components/modal';
import { Button } from 'components/button';
import { Loader } from 'components/loader';

import API from 'services/imagesApi';
import { getScroll } from 'services/getScroll';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [total, setTotal] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!query) return;

    setStatus('pending');

    setTimeout(() => {
      API.fetchImages(query, page)
        .then(({ hits, total }) => {
          if (page === 1) {
            setHits(hits);
          } else {
            setHits(prevHits => [...prevHits, ...hits]);
          }
          setTotal(total);
          setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }, 500);
  }, [page, query]);

  useEffect(() => {
    if (hits.length <= 12) return;
    setTimeout(() => getScroll(hits), 300);
  }, [hits]);

  const handleSearch = search => {
    setQuery(search);
    setPage(1);
    setHits([]);
  };

  const handleButton = () => setPage(prevPage => prevPage + 1);

  const showLargeImg = largeImg => {
    setLargeImg(largeImg);
    setShowModal(!showModal);
  };

  return (
    <div>
      <SearchBar submitFormFinder={handleSearch} />

      {status === 'idle' && <p>Enter your request</p>}

      {status === 'pending' && (
        <>
          {hits.length === 0 && <Loader />}

          {hits.length > 0 && (
            <>
              <ImageGallery
                query={query}
                hits={hits}
                showLargeImg={showLargeImg}
              />
              <Loader />
            </>
          )}
        </>
      )}

      {status === 'rejected' && <p>{error.message}</p>}

      {status === 'resolved' && (
        <>
          {total === 0 && (
            <p>No results were found for {query.toUpperCase()}</p>
          )}

          {total > 0 && (
            <p>
              {query.toUpperCase()}: total {total} images found
            </p>
          )}

          <ImageGallery query={query} hits={hits} showLargeImg={showLargeImg} />

          {hits.length > 0 && (
            <p>
              Total images shown: {hits.length} from {total}
            </p>
          )}

          {hits.length > 0 && hits.length < total && (
            <Button handleButtonLoadMore={handleButton} />
          )}
        </>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(!showModal)}>
          <img src={largeImg} width="700" alt={query} />
        </Modal>
      )}

      <ToastContainer position="top-center" />
    </div>
  );
};
