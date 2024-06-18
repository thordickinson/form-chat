import React, { useState, useEffect } from 'react';
import {FormGroup} from '../form/api';

interface DynamicFormProps {
  formGroup: FormGroup;
  onSubmit?: (data: any) => void;
  onChange?: (data: any) => void;
  formData?: any;
}

const DynamicForm = ({ formGroup, onSubmit, onChange, formData }: DynamicFormProps) => {
 
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;
    const updatedFormData = {
      ...formData,
      [name]: updatedValue,
    };
    if(onChange) onChange(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(onSubmit) onSubmit(formData);
  };

  const fields = formGroup.fields
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className='text-left pb-8 pt-4'>{formGroup.description}</div>
      {fields.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-left">{field.label}</label>
          {field.type === 'text' && (
            <input
              type="text"
              placeholder={field.placeholder}
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
              placeholder={field.placeholder}
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
    </form>
  );
};

export default DynamicForm;
