import './TextInput.css';

const TextInput = ({ label, type = 'text', id, className = '', ...props }) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <input type={type} id={id} className="text-input" {...props} />
    </div>
  );
};

export default TextInput;
