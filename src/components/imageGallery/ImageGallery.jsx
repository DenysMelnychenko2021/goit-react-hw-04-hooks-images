import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

import { ImageGalleryItem } from 'components/imageGalleryItem';

export const ImageGallery = ({ hits }) => (
  <ul className={s.List}>
    {hits.map(hit => (
      <ImageGalleryItem
        key={hit.id}
        img={hit.webformatURL}
        largeImg={hit.largeImageURL}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
  ),
};
