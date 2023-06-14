import React from 'react';
import s from './SectionInfoAboutDogs.module.css'

export const SectionInfoAboutDogs = () => {
    return (
        <section className={s.sectionDescribe}>
            <div className={s.container}>
                <div className={s.wrapper}>
                    <h1 className={s.HeadPug}> Pug dogs </h1>
                    <p className={s.describe}>
                        The Pug is often described as a lot of dog in a small space. These sturdy, compact dogs are a
                        part of
                        the American Kennel Club’s Toy group, and are known as the clowns of the canine world because
                        they have
                        a great sense of humor and like to show off.

                        Even though these are purebred dogs, you may find them in the care of shelters or rescue groups.
                        Remember to adopt! Don’t shop if you want to bring a dog home.
                    </p>
                    <div className={s.video}>
                        <iframe
                            src="https://www.youtube.com/embed/8rxiATGk2bg"
                            title="Pug Video"
                            allowFullScreen
                            className={s.videoFrame}
                        />
                    </div>
                    <p>
                        Originally bred to be lap dogs,<u> Pugs thrive on human companionship.</u> They’re highly sensitive,
                        and though
                        they can make for great apartment pets, they will not appreciate being left home alone for long
                        hours of
                        the day. Although these pups have a stubborn side, especially when it comes to house training,
                        they’re
                        playful, affectionate dogs who will get along well even with novice pet parents. If you’re
                        looking for a
                        loving, easygoing pal, this may be the breed for you!
                        See below for complete list of dog breed traits and facts about Pugs!
                    </p>
                </div>
            </div>
        </section>
    );
};

