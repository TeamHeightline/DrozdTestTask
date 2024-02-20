import Link from 'next/link';

export default function Login() {
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="109.921" height="21.81"
                             data-name="Component 1 – 3" viewBox="0 0 109.921 21.81">
                            <path
                                d="M0 .45h14.01a10.32 10.32 0 015.685 1.545 9.508 9.508 0 013.54 3.855 11.222 11.222 0 011.125 4.98 11.333 11.333 0 01-.615 3.885 10.7 10.7 0 01-1.905 3.39 8.872 8.872 0 01-3.285 2.415 11.074 11.074 0 01-4.545.9H6V6.384zm11.49 16.02c4.02 0 5.23-.55 6.09-1.65a6.19 6.19 0 001.29-3.93 6.055 6.055 0 00-1.3-3.87 4.352 4.352 0 00-3.615-1.65H11.49zm30.3-2.52l4.555 7.44H40.08l-3.6-6.57H33.6v6.57h-5.49v-21l4.635-.015q4.6-.015 4.6.015a7.1 7.1 0 015.565 2.22 7.557 7.557 0 012 5.22 7.1 7.1 0 01-3.12 6.12zm-8.28-3.6h3.81A2 2 0 0039 9.57a2.961 2.961 0 00.6-1.86 2.823 2.823 0 00-.585-1.815 2.038 2.038 0 00-1.695-.735h-3.81zm36 .57a10.675 10.675 0 01-3.015 7.845 10.479 10.479 0 01-7.785 3.045 11.756 11.756 0 01-4.035-.69 10.715 10.715 0 01-3.42-2.01 9.146 9.146 0 01-2.4-3.435 12.212 12.212 0 01-.885-4.755 11.086 11.086 0 011.59-6.015 9.821 9.821 0 014.005-3.72A11.722 11.722 0 0158.8 0a11.277 11.277 0 013.945.705 10.942 10.942 0 013.42 2.025 9.435 9.435 0 012.43 3.435 11.861 11.861 0 01.915 4.755zm-16.05 0a5.563 5.563 0 001.56 4.185 5.154 5.154 0 003.72 1.515 5.17 5.17 0 003.705-1.515 5.534 5.534 0 001.575-4.185 5.563 5.563 0 00-1.56-4.185A5.084 5.084 0 0058.8 5.22a5.282 5.282 0 00-3.78 1.485 5.543 5.543 0 00-1.56 4.215zM88.476.45L79.35 16.53h8.52v4.89H70.642l9.1-16.23H72.03V.42zm3.084 0h8.01a10.32 10.32 0 015.685 1.545 9.508 9.508 0 013.54 3.855 11.222 11.222 0 011.125 4.98 11.333 11.333 0 01-.615 3.885 10.7 10.7 0 01-1.9 3.39 8.872 8.872 0 01-3.29 2.415 11.074 11.074 0 01-4.545.9h-8.01zm5.49 16.02h2.46a4.343 4.343 0 003.63-1.65 6.19 6.19 0 001.29-3.93 6.055 6.055 0 00-1.31-3.87 4.352 4.352 0 00-3.615-1.65H97.05z"
                                data-name="Path 3844" fill="#f21137"></path>
                        </svg>
                    </a>
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Войдите в ваш аккаунт
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Email
                                    </label>
                                    <input type="email" name="email" id="email"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="name@company.com" required={true}/>
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Пароль
                                    </label>
                                    <input type="password" name="password" id="password" placeholder="••••••••"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required={true}/>
                                </div>
                                <button type="submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                                        dark:bg-primary-600
                                        dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Войти
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    У вас еще нет аккаунта?
                                    <Link href="/register"
                                          className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-2">
                                        Зарегистрироваться
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}