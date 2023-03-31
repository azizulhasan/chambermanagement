import { useState } from 'react';

const YoutubeEmbed = ({ title, url, width, height, classes }) => {
    return (
        <div
            className={`relative`}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <iframe
                style={{
                    width: '100%',
                    height: '100%',
                }}
                src={`https://www.youtube.com/embed/${url}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={title}
            ></iframe>
        </div>
    );
};

export default YoutubeEmbed;
