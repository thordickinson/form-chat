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

  const serializeFormData = () => {
    const completeFormData = {};
    fields.forEach(field => {
      completeFormData[field.name] = formData[field.name] || '';
    });
    return JSON.stringify(completeFormData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4 bg-white shadow-md rounded text-gray-800">
      {fields.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
          {field.type === 'text' && (
            <input
              type="text"
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
              value={formData[field.name] || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          )}
          {field.type === 'textarea' && (
            <textarea
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          )}
          {/* Add more input types as needed */}
        </div>
      ))}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
      <button type="button" onClick={() => console.log(serializeFormData())} className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">Serialize Form Data</button>
    </form>
  );
};

export default DynamicForm;
