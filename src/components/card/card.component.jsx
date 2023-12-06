import './card.styles.scss';

const Card = ({ header, body }) => {
  return (
    <div className='card'>
      <span className='header'>{header}</span>
      <p className='body'>{body}</p>
    </div>
  );
};

export default Card;
