import PropTypes from 'prop-types';
import css from './Button.module.css'; 
export const Button = ({ clickLoad }) => {
  return (
    <button onClick={clickLoad} className={css.Button} type="button">
      Load more
    </button>
  );
};

Button.propTypes = {
  clickLoad: PropTypes.func.isRequired,
};

