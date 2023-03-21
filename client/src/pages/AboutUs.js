import React from 'react';
import Container from '../components/front/common/common/Container';
import SiteSkeleton from '../components/front/common/SiteSkeleton';
import { database } from '../database';

const {
    pages: {
        aboutUs: {
            sections: { detailParagraphs, bannerImage },
        },
    },
} = database;

const AboutUs = () => {
    return (
        <SiteSkeleton css={[
            '/assets/front/css/tailwind.css',
        ]}>
            <Container>
                <h1 className="text-5xl font-bold text-center m-10">
                    About Us
                </h1>

                <div className="mx-8 my-12 flex flex-col gap-8">
                    {detailParagraphs.map((para) => (
                        <div key={para.title} className="flex flex-col gap-3">
                            <h4 className="text-xl font-bold tracking-tight text-themeColor">
                                {para.title}
                            </h4>
                            <div className="flex flex-col gap-2">
                                {para.body.map((text, index) => (
                                    <p key={index}>{text}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* <image src={bannerImage} /> */}
            </Container>
        </SiteSkeleton>
    );
};

export default AboutUs;