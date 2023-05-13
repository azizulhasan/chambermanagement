import {
    addCSS,
    addScripts,
} from '../../utilities/utilities';
import Footer from './Footer';
import MenuBar from './MenuBar';
import TopNav from './TopNav';
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
