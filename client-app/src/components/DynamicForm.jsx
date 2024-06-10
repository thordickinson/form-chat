import React, { useState } from 'react';

const DynamicForm = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index}>
          <label>{field.label}</label>
          {field.type === 'text' && (
            <input
              type="text"
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          )}
          {field.type === 'number' && (
            <input
              type="number"
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          )}
          {field.type === 'textarea' && (
            <textarea
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          )}
          {/* Add more input types as needed */}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
