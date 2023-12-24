import './loader.styles.scss';

const Loader = ({ active, message }) => {
  return (
    <div className={`loader-container ${active && 'active'}`}>
      <div className='lds-grid'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {message && <div className='message'>{message}</div>}
    </div>
  );
};

export default Loader;
