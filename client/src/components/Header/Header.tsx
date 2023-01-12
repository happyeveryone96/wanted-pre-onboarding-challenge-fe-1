import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import css from './Header.module.scss';

function Header() {
  const { pathname } = useLocation();
  const isTodoPage = pathname === '/';

  const navigate = useNavigate();
  const logOut = () => {
    navigate('/auth');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isTodoPage && token === null) {
      alert('로그인이 필요합니다.');
      navigate('/auth');
    }
  }, [isTodoPage, navigate]);

  return (
    <div className={css.container}>
      <div className={css.title}>
        {isTodoPage ? '투두 리스트' : '환영합니다!'}
      </div>
      {isTodoPage && (
        <button className={css.logOut} onClick={logOut}>
          로그아웃
        </button>
      )}
    </div>
  );
}

export default Header;
