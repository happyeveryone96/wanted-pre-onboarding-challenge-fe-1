import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import css from './Header.module.scss';

function Header() {
  const location = useLocation();
  const isTodo = location.pathname === '/';

  const navigate = useNavigate();
  const logOut = () => {
    navigate('/auth');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isTodo && token === null) {
      alert('로그인이 필요합니다.');
      navigate('/auth');
    }
  }, []);

  return (
    <div className={css.container}>
      <div className={css.title}>{isTodo ? '투두 리스트' : '환영합니다!'}</div>
      {isTodo && (
        <button className={css.logOut} onClick={logOut}>
          로그아웃
        </button>
      )}
    </div>
  );
}

export default Header;
