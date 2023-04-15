import { useEffect, lazy, Suspense, useState, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCSS } from '../utilities/utilities';
import Loader from '../components/common/CircleLoader';

//Sections
const Slider = lazy(() => import('../features/front/home/Slider'));
const Professionals = lazy(() =>
    import('../features/front/home/Professionals')
);
const HealthSerivces = lazy(() =>
    import('../features/front/home/HealthSerivces')
);
const Contact = lazy(() => import('../features/front/home/Contact'));
const Resources = lazy(() => import('../features/front/home/Resources'));
const FrontSkeleton = lazy(() => import('../layouts/front/FrontSkeleton'));

const lazyComponents = [
    {
        compoent: <Professionals />,
        id: 'team',
    },
];

export default function Home() {
    const [displaCompoents, setDisplaCompoents] = useState({});
    const { showModal } = useSelector((state) => state.common);
    const dispatch = useDispatch();
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        /**
         * Display or hide portfolio menus.
         */
        const displayMunu = () => {
            let menus = document.getElementsByClassName('mobileMenu');
            if (window.innerWidth > 991) {
                [...menus].forEach((menu) => {
                    menu.style.display = 'none';
                });
            } else {
                [...menus].forEach((menu) => {
                    menu.style.display = 'block';
                });
            }
        };
        displayMunu();
        /**
         * Display some menus on mobile
         */
        window.addEventListener('resize', () => {
            if (window.innerWidth > 991) {
                displayMunu();
            } else if (window.innerWidth < 991 && window.innerWidth > 989) {
                window.location.reload(true);
                displayMunu();
            }
        });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            let data = JSON.parse(JSON.stringify(displaCompoents));
            data.professional = true;
            setDisplaCompoents(data);
        }, 500);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', function () {
            let data = JSON.parse(JSON.stringify(displaCompoents));
            if (window.scrollY > 600) {
                data.contact = true;
                setDisplaCompoents(data);
            } else if (window.scrollY > 300) {
                data.resource = true;
                setDisplaCompoents(data);
            } else if (window.scrollY > 100) {
                data.healthService = true;
                setDisplaCompoents(data);
            }
        });
    }, [displaCompoents]);

    return (
        <>
            <Suspense fallback={<Loader />}>
                <FrontSkeleton
                    css={[
                        '/assets/front/css/tailwind.css',
                        '/assets/front/css/slider.css',
                        '/assets/front/css/carousel.css',
                        '/assets/front/css/professional.css',
                        '/assets/front/css/footer.css',
                    ]}
                >
                    {/** Slider Section */}
                    <Slider />
                    {/** End Slider */}
                    <div className="wrapper">
                        {displaCompoents.hasOwnProperty('professional') &&
                            displaCompoents.professional && (
                                <Professionals id={'team'} />
                            )}

                        {/** Healteh Service Section */}
                        {displaCompoents.hasOwnProperty('healthService') &&
                            displaCompoents.healthService && (
                                <HealthSerivces id={'healthService'} />
                            )}
                        {/** Resource */}
                        {/* {displaCompoents.hasOwnProperty('resource') &&
                            displaCompoents.resource && (
                                <Resources id={'resource'} />
                            )} */}

                        {/** Contact Section */}
                        {displaCompoents.hasOwnProperty('contact') &&
                            displaCompoents.contact && (
                                <Contact id={'contact'} />
                            )}
                    </div>
                </FrontSkeleton>

                {/* MODAL */}
                <div className="hidden min-h-full relative transform overflow-hidden bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6 w-full sm:w-7/12 sm:w-4/12"></div>
                <div className="hidden ml-16 ml-60 ml-96 bg-red-700 -ml-2 mr-2 sm:ml-10 md:ml-20 lg:ml-40 xl:ml-48 2xl:ml-60"></div>
                <div className="hidden mx-auto ease-out duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 opacity-100 translate-y-0 sm:scale-100 ease-in duration-200 opacity-100 translate-y-0 sm:scale-100 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"></div>
                <div className="hidden z-50 relative transform overflow-hidden bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6 w-full sm:w-10/12 mx-auto opacity-100 translate-y-0 sm:scale-100 flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 absolute top-0 right-0 hidden pt-4 pr-4 rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-6 w-6 flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 fixed inset-0 z-10 overflow-y-auto"></div>
                {/* Professionals */}
                <div className="hidden col-span-3 w-300"></div>
                {/* Footer */}
                <div className="hidden grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"></div>
                <div className="hidden text-center sm:flex sm:justify-between sm:text-left"></div>
                <div className="hidden inline-block text-black underline transition hover:text-white/75"></div>
                {/* TABLE */}
                <div className='hidden hover:bg-gray-200 hover:!bg-gray-200'></div>
                {/* LOGIN */}
                <div className='hidden text-red-700 text-green-700'></div>
                {/*ADD PREFIX TO EVERY CLASS*/}
                {/*in your editor (i used phpstorm ctrl+shift+f for find and replace in all files of a specific folder):*/}
                {/*find  : (?<=class=["'][^"']*)([0-9a-zA-Z_-]+\s*)(?=[^"']*["'])*/}
                {/*replace : tw-$1*/}
            </Suspense>
        </>
    );
}
