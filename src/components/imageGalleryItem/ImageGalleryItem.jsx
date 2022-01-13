import { useContext } from 'react';

import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

import { ItemContext } from 'contexts/ItemContext';

export const ImageGalleryItem = ({ img, largeImg }) => {
  const { query, showLargeImg } = useContext(ItemContext);

  return (
    <li className={s.Item}>
      <img
        src={img}
        width="290"
        alt={query}
        onClick={() => showLargeImg(largeImg)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  largeImg: PropTypes.string,
};
