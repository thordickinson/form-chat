import React, { useState } from 'react';

const DynamicForm = ({ fields, onSubmit, onChange, response }) => {
  const [formData, setFormData] = useState({});

  // Update formData with response data when response changes
  React.useEffect(() => {
    if (response) {
      console.log(response);
      setFormData(prevFormData => ({
        ...prevFormData,
        ...response
      }));
    }
  }, [response]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const updatedValue = type === "boolean" ? checked : value;
    const updatedFormData = {
      ...formData,
      [name]: updatedValue,
    };
    setFormData(updatedFormData);
    onChange(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4 bg-white shadow-md rounded text-gray-800 m-2">
      {fields.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-left">{field.label}</label>
          {field.type === 'text' && (
            <input
              type="text"
              placeholder={field.description}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          )}
          {field.type === 'number' && (
            <input
              type="number"
              name={field.name}
              placeholder={field.description}
              value={formData[field.name] || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          )}
          {field.type === 'textarea' && (
            <textarea
              name={field.name}
              placeholder={field.description}
              value={formData[field.name] || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          )}
          {field.type === 'boolean' && (
            <input
              type="checkbox"
              name={field.name}
              checked={Boolean(formData[field.name]) || false}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded checkbox-lg"
            />
          )}
          {/* Add more input types as needed */}
        </div>
      ))}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
    </form>
  );
};

export default DynamicForm;
