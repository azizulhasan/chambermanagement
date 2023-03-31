import {
    addCSS,
    addScripts,
    removeCSSFromDOM,
    removeJsFromDOM,
} from '../utilities/utilities';
import Footer from '../features/front/components/Footer';
import MenuBar from '../features/front/components/MenuBar';
import TopNav from '../features/front/components/TopNav';
/**
 * Sections
 */

export default function FrontSkeleton({ children, css = [], js = [] }) {
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
