import React, { useState } from 'react';
import axios from 'axios';

const TestRegistration = () => {
  const [result, setResult] = useState('');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@test.com',
    password: 'password123',
    role: 'STUDENT',
    university: 'MIT',
    graduationYear: 2024,
    major: 'Computer Science',
    location: 'Boston, MA',
    phone: '123-456-7890'
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const testAPI = async () => {
    try {
      setResult('Testing...');
      
      // Test basic endpoint first
      const testResponse = await axios.get('http://localhost:8081/api/test/hello');
      console.log('Test API Response:', testResponse.data);
      
      // Test registration with full data
      const registerResponse = await axios.post('http://localhost:8081/api/auth/register', formData);
      console.log('Registration Response:', registerResponse.data);
      
      setResult('SUCCESS: ' + JSON.stringify(registerResponse.data, null, 2));
    } catch (error) {
      console.error('Error:', error);
      setResult('ERROR: ' + error.message);
      if (error.response) {
        setResult(prev => prev + '\n\nResponse: ' + JSON.stringify(error.response.data, null, 2));
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>Test Registration</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        <input placeholder="First Name" value={formData.firstName} onChange={handleChange('firstName')} />
        <input placeholder="Last Name" value={formData.lastName} onChange={handleChange('lastName')} />
        <input placeholder="Email" value={formData.email} onChange={handleChange('email')} />
        <input placeholder="Password" type="password" value={formData.password} onChange={handleChange('password')} />
        <select value={formData.role} onChange={handleChange('role')}>
          <option value="STUDENT">Student</option>
          <option value="ALUMNI">Alumni</option>
        </select>
        <input placeholder="University" value={formData.university} onChange={handleChange('university')} />
        <input placeholder="Graduation Year" type="number" value={formData.graduationYear} onChange={handleChange('graduationYear')} />
        <input placeholder="Major" value={formData.major} onChange={handleChange('major')} />
        <input placeholder="Location" value={formData.location} onChange={handleChange('location')} />
        <input placeholder="Phone" value={formData.phone} onChange={handleChange('phone')} />
      </div>
      
      <button onClick={testAPI} style={{ padding: '10px 20px', fontSize: '16px' }}>Test Registration</button>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <strong>Result:</strong>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>
      </div>
    </div>
  );
};

export default TestRegistration;