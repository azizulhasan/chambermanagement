import { database } from '../../../../database';

const {
    basic: {
        contacts: {
            phone: { number, icon: phoneIcon },
            email: { address, icon: emailIcon },
        },
    },
} = database;

export default function TopNav() {
    return (
        <nav className="bg-themeColor">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center text-white py-1 gap-3">
                    <div className="flex gap-1">
                        {phoneIcon()}
                        <a
                            href={`callto:${number}`}
                            className="hover:text-white"
                        >
                            {number}
                        </a>
                    </div>
                    <div className="flex gap-1">
                        {emailIcon()}
                        <a
                            href={`mailto:${address}`}
                            className="hover:text-white"
                        >
                            {address}
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
