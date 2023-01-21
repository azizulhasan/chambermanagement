import { Disclosure } from '@headlessui/react'


export default function TopNav() {
    return (
        <Disclosure as="nav" className="bg-themeColor" >
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-10 items-center justify-between">

                            <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-center text-white  text-centent">
                                <div>
                                Call for Appointments: <a href='callto:+8801715769060' className='hover:text-white'> +8801715769060</a>
                                </div> , 
                                <div>
                                Email: <a href='mailto:mindtoheart.bd@gmail.com' className='hover:text-white'> mindtoheart.bd@gmail.com</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    )
}
