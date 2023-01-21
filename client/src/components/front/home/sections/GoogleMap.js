const GoogleMap = () => {
    return (
        <div className="mapouter">
            <div className="gmap_canvas map-container relative shadow-lg rounded-lg">
                <iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=dhaka,Mind To Heart&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
            </div>
        </div>
    )
}

export default GoogleMap;