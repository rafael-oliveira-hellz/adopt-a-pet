const Button = ({ type, value, HandleOnClick }) => (
  <div>
    <button onClick={HandleOnClick} type={type}>
      {value}
    </button>
  </div>
);

export default Button;
