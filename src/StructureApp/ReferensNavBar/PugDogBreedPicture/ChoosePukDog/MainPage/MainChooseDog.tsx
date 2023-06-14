import React from 'react';
import s from './MainChooseDog.module.css'
import {WhitePugDogPictures} from "../WhiteDog/Dogs";
import BlackPugDogPictures from "./BlackPugDogPictures/BlackPugDogPictures";
export const MainChooseDog = () => {
    return (
        <div className={s.wrapper}>
        <header>
            <h1>Choose Pug dog</h1>
        </header>
       <section>
        <WhitePugDogPictures />
        <BlackPugDogPictures />
       </section>
        </div>
    );
};

