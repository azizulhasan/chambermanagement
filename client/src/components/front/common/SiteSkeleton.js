import { addCSS, addScripts, removeCSSFromDOM, removeJsFromDOM } from '../../../utilities/utilities';
/**
 * Sections
 */
import MenuBar from '../home/sections/MenuBar';
import Footer from './partials/Footer';
import TopNav from '../home/sections/TopNav';


export default function SiteSkeleton({ children, css = [], js = [] }) {
    addCSS(css);
    addScripts(js);


    return (
        <>
            {/* Header Section*/}
            <TopNav />
            <MenuBar />
            <main id="main">{children}</main>
            {/* End #main */}

            {/** Footer */}
            <Footer />
            {/* End Footer */}
        </>
    );
}
