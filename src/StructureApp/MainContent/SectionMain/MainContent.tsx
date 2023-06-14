import React from 'react';
import s from "../SectionPreviw/SectionPreview.module.css";
import {SectionPreview} from "../SectionPreviw/SectionPreview";
import {SectionInfoAboutDogs} from "../SectionInfoAboutDogs/SectionInfoAboutDogs";

export const MainContent = () => {
    return (
        <main className={s.mainContent}>
            <SectionPreview />
            <SectionInfoAboutDogs />
        </main>
    );
};

