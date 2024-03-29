import { GiNinjaHead } from 'react-icons/gi'

const NavBar = () => {
    return (
        <nav className="border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
                <a
                    href="https://flowbite.com/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <GiNinjaHead className="text-4xl text-white" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                        JSON Ninja
                    </span>
                </a>
            </div>
        </nav>
    )
}

export default NavBar
