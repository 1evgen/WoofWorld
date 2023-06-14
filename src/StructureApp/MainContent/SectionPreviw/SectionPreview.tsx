import React from 'react';
import s from './SectionPreview.module.css'
import familyDogs from './img/famaliDogs.png'

export const SectionPreview = () => {
    return (
        <section className={s.sectionPreview}>
            <div className={s.container}>
                <div className={s.wrapper}>
                    <img className={s.dogsFamilyPhoto}
                         src={familyDogs}
                         alt="PugDogsFamily"/>
                    <div className={s.statistics}>

                        <h2>Statistics</h2>

                        <dl className={s.dlContainer}>

                            <div className={s.infoAboutGroup}>
                                <dt>DOG BREED GROUP</dt>
                                <dd>
                                    <a className={s.describeCompanionDogsRef} href={''}>
                                        Companion Dogs
                                    </a>
                                </dd>
                            </div>

                            <div className={s.height}>
                                <dt>HEIGHT</dt>
                                <dd>10 to 14 inches tall at the shoulder</dd>
                            </div>

                            <div className={s.weight}>
                                <dt>WEIGHT</dt>
                                <dd>14 to 18 pounds</dd>
                            </div>

                            <div className={s.LiveSpan}>
                                <dt>LIFE SPAN</dt>
                                <dd>12 to 15 years</dd>
                            </div>

                        </dl>
                    </div>
                </div>

            </div>
        </section>

    );
};

