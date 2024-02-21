import Logo from "@/src/components/logo";
import {useAuth} from "@/src/context/auth-context";

const pages = [
    {
        url: "/quizzes",
        title: "Вопросы"
    },
    {
        url: "/users",
        title: "Пользователи"
    },
    {
        url: "/login",
        title: "Войти"
    },
    {
        url: "/logout",
        title: "Выйти"
    },
]
export default function TopBar() {
    const {isAuthenticated} = useAuth();

    const availablePages = pages.filter((item) =>
        item.url !== (isAuthenticated ? "/login" : "/logout"))

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-800 dark:border-b dark:border-gray-700 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Logo/>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700">
                        {availablePages.map((route) => (
                            <li key={route.url}>
                                <a href={route.url}
                                   className={`block py-2 px-3 rounded md:p-0 md:border-0 text-gray-900 dark:text-white dark:hover:text-primary-500`}
                                >
                                    {route.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
