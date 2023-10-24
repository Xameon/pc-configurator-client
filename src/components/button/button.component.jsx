import './button.styles.scss';

const Button = ({ children, buttonStyle, ...otherProps }) => {
  return (
    <button className={`button-container ${buttonStyle}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
