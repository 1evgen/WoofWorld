import React from 'react';
import s from './Header.module.css'
import logo from './img/logo.png'

export const Header = () => {
    return (
      <header className={s.header}>
          <div className={s.container}>
              <div className={s.wrapper}>
          <a href= {""}>
          <div className={s.logo}>
              <img className={s.logoPhoto}
                   src={logo}
                   alt="logo"/>
          </div>
          </a>
          <nav className={s.nav}>
              <div className={s.navbarlist}>
                  <a>Main</a>
                  <a>Dog Pictures</a>
                  <a>Price</a>
                  <a>Articles</a>
                  <a>Reviews</a>
              </div>
          </nav>
        {/*<div>*/}
        {/*    <a className={s.telNumber} href= 'tel:89011811148'>8-901-181-11-48</a>*/}
        {/*</div>*/}
          </div>
          </div>
      </header>
    );
};

