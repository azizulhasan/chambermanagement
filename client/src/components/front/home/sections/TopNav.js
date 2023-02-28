import { database } from '../../../../database';

const {
    basic: { phone, email },
} = database;

export default function TopNav() {
    return <nav className="bg-themeColor">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center text-white py-1 gap-2">
                <div>
                    <i
                        className="fa fa-phone"
                        aria-hidden="true"
                    ></i>{' '}
                    <a
                        href={`callto:${phone}`}
                        className="hover:text-white"
                    >
                        {phone}
                    </a>
                </div>
                <div>
                    <i
                        className="fa fa-envelope"
                        aria-hidden="true"
                    ></i>{' '}
                    <a
                        href={`mailto:${email}`}
                        className="hover:text-white"
                    >
                        {email}
                    </a>
                </div>
            </div>
        </div>
    </nav>
}
