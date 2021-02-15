import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';

const RegisterComplete = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    //console.log(window.localStorage.getItem('emailForRegistration'));
    setEmail(window.localStorage.getItem('emailforRegistration'));
    //console.log(window.location.href);
    //console.log(window.localStorage.getItem('emailforRegistration'));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //validation
    if (!email || !password) {
      toast.error('Email and password is required');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //console.log('RESULT', result);
      if (result.user.emailVerified) {
        //remove user email from local storage
        window.localStorage.removeItem('emailforRegistration');
        //get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        //redux store
        console.log('user', user, 'idTOkenResult', idTokenResult);
        //redirect

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.roles,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
        history.push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
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
        Complete Registration
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
