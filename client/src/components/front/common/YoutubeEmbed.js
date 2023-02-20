
const YoutubeEmbed = ({ title, url, width, height, classes }) => (
    <div className="video-responsive">
        <iframe
            width={width}
            height={height}
            className={classes}
            src={`https://www.youtube.com/embed/${url}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
        />
    </div>


);


export default YoutubeEmbed;