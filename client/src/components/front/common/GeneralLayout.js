import { addCSS, addScripts } from '../../../utilities/utilities';
/**
 * Sections
 */
import MenuBar from '../home/sections/MenuBar';
import Footer from './partials/Footer';
import TopNav from '../home/sections/TopNav';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function GeneralLayout({ children, css = [], js = [] }) {
    const dispatch = useDispatch();
    addCSS(css);
    addScripts(js);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col">
            {/* Header Section*/}
            <TopNav />
            <MenuBar />
            <main id="main" className="grow">
                {children}
            </main>
            {/* End #main */}

            {/** Footer */}
            <Footer />
            {/* End Footer */}
        </div>
    );
}
