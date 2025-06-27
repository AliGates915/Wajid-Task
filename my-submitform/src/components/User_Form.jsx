import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const defaultFormValues = {
  fullName: '',
  email: '',
  profileUrl: '',
  city: '',
  country: '',
};

const requiredFields = ['fullName', 'email', 'profileUrl'];

function getFieldError(fieldName, value) {
  if (fieldName === 'fullName') {
    return value.trim() ? '' : 'Full name is required';
  }

  if (fieldName === 'email') {
    return /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email format';
  }

  if (fieldName === 'profileUrl') {
    return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(value)
      ? ''
      : 'Invalid image URL';
  }

  return '';
}

const UserForm = ({ onAddUser }) => {
  const navigate = useNavigate(); // ✅ Step 2

  const [values, setValues] = useState(defaultFormValues);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));

    if (requiredFields.includes(name)) {
      const error = getFieldError(name, value);
      setFormErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = () => {
    const errors = {};
    requiredFields.forEach((field) => {
      const error = getFieldError(field, values[field]);
      if (error) errors[field] = error;
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onAddUser(values);
      setValues(defaultFormValues);
      setFormErrors({});
      navigate('/');
    }
  };

  const isFormValid = requiredFields.every(
    (field) => !getFieldError(field, values[field])
  );

  return (
    <form onSubmit={handleSubmit} className="mt-5 bg-white p-4 rounded shadow max-w-xl mx-auto mb-6">
      
      <Link to="/">
        <h2 className="text-xl font-bold text-center mb-2 bg-blue-400 py-2">Back to Home</h2>
      </Link>
      <h2 className="text-2xl font-bold text-center mb-6">Registration Form</h2>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={values.fullName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        {formErrors.fullName && <p className="text-red-500 text-sm">{formErrors.fullName}</p>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Email *</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
      </div>

      {/* Profile URL */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Profile URL *</label>
        <input
          type="text"
          name="profileUrl"
          value={values.profileUrl}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        {formErrors.profileUrl && <p className="text-red-500 text-sm">{formErrors.profileUrl}</p>}
      </div>

      {/* City */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">City</label>
        <input
          type="text"
          name="city"
          value={values.city}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Country */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Country</label>
        <input
          type="text"
          name="country"
          value={values.country}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
    {/* Add new usr btn */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full bg-blue-600 text-white py-2 rounded cursor-pointer ${
          !isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
        }`}
      >
        Add User
      </button>
    </form>
  );
};

export default UserForm;
