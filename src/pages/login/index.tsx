import Link from 'next/link';
import {useRouter} from 'next/router';
import axiosClient from "@/src/utils/axios";
import Logo from "@/src/components/logo";
import {useAuth} from "@/src/context/auth-context";

export default function Login() {
    const router = useRouter();
    const {login} = useAuth();


    async function handleLogin(event) {
        event.preventDefault();

        const formData = {
            email: event.target.email.value,
            password: event.target.password.value,
        };

        axiosClient.post(`/login`, {
            login: formData.email,
            password: formData.password,
        })
            .then(response => {
                const {data} = response;
                if (response.status === 200) {
                    axiosClient.defaults.headers.post['Authorization'] = `Bearer ${data.jwt}`;
                    login()
                    router.push('/quiz');
                } else {
                    console.error('Login failed', data);
                    alert('Login failed: ' + (data.message || 'Unknown error'));
                }
            })
            .catch(error => {
                console.error('Error submitting form', error);
                alert('An error occurred. Please try again: ' + (error.response?.data.message || 'Unknown error'));
            });
    }

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className={"hidden md:block"}>
                        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <Logo/>
                        </div>
                    </div>
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Войдите в ваш аккаунт
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
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
