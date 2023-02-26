import { addCSS, addScripts } from "../../../utilities/utilities";
/**
 * Sections
 */
import MenuBar from "../home/sections/MenuBar";
import Footer from "./partials/Footer";
import TopNav from "../home/sections/TopNav";
import { useDispatch, useSelector } from "react-redux";

export default function SiteSkeleton({ children, css = [], js = [] }) {
    const dispatch = useDispatch();
    addCSS(css);
    addScripts(js);
    return (
        <>
            {/* Header Section*/}
            <TopNav />
            <MenuBar />
            <main id="main">
                {children}
            </main>
            {/* End #main */}

            {/** Footer */}
            <Footer />
            {/* End Footer */}
        </>
    );
}
