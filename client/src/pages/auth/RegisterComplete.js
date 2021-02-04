import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const RegisterComplete = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log(window.localStorage.getItem('emailForRegistration'));
    setEmail(window.localStorage.getItem('emailforRegistration'));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailLink(email);
    } catch (error) {}
  };
  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <input type='email' className='form-control' value={email} disabled />
      <input
        type='password'
        className='form-control'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        autoFocus
      />
      <br />
      <button type='submit' className='btn btn-raised'>
        Complete Register
      </button>
    </form>
  );
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>

          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
