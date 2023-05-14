import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'; 
import PropTypes from 'prop-types'; 
import css from './ImageGallery.module.css'; 

export const ImageGallery = ({ images, togleModal }) => {
  return (
    <>
      <ul className={css.gallery}>
        <ImageGalleryItem togleModal={togleModal} images={images} />
      </ul>
    </>
  );
};


ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  togleModal: PropTypes.func.isRequired,
};

