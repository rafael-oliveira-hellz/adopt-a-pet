import styles from './Select.module.css';

const Select = ({ text, name, options, handleOnChange, value, color }) => {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <select
        style={{ backgroundColor: `${color}` }}
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ''}
      >
        <option>Selecione uma opção</option>
        {options.map((option) => (
          <option
            style={{ backgroundColor: `${color}` }}
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
