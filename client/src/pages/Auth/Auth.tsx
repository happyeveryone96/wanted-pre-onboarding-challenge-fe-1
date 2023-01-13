import React, { useState, useEffect } from 'react';
import css from './Auth.module.scss';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../apis/Auth/auth';
import { handleError } from '../../error/handleError';

function Auth() {
  const navigate = useNavigate();

  const [signValid, setSignValid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailInput = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handlePasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  useEffect(() => {
    if (password.length > 7 && email.includes('@') && email.includes('.')) {
      setSignValid(true);
    } else {
      setSignValid(false);
    }
  }, [email, password]);

  const signIn = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    authApi
      .signIn({ email, password })
      .then(res => {
        alert('로그인 성공!');
        const { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/');
      })
      .catch(err => {
        handleError(err);
      });
  };

  const signUp = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    authApi
      .signUp({ email, password })
      .then(res => {
        alert('회원가입 성공!');
        const { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/');
      })
      .catch(err => {
        handleError(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) navigate('/');
  }, []);

  return (
    <div className={css.container}>
      <form>
        <div className={css.inputWrap}>
          <label htmlFor="email">이메일</label>
          <input
            className={css.input}
            value={email}
            onChange={handleEmailInput}
            name="email"
            placeholder="이메일을 입력해주세요"
            autoComplete="off"
            type="text"
          />
        </div>
        <div className={css.inputWrap}>
          <label htmlFor="password">패스워드</label>
          <input
            className={css.input}
            value={password}
            onChange={handlePasswordInput}
            name="password"
            placeholder="패스워드를 입력해주세요"
            autoComplete="off"
            type="password"
          />
        </div>
        <button
          className={!signValid ? `${css.disabled} ${css.button}` : css.button}
          disabled={!signValid}
          onClick={signIn}
        >
          로그인
        </button>
        <button
          className={!signValid ? `${css.disabled} ${css.button}` : css.button}
          disabled={!signValid}
          onClick={signUp}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Auth;
