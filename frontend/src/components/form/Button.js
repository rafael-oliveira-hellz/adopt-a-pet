const Button = ({ 
    type,
    value
}) => {
    return (
        <div>
            <button type={type}>{value}</button>
        </div>
    );
  }   
  
  export default Button;