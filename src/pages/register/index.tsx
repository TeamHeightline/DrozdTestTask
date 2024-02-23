import Link from 'next/link';
import axiosClient from "@/src/utils/axios";
import {useRouter} from "next/router";
import Logo from "@/src/components/logo";

export default function Register() {
    const router = useRouter();

    async function handleSubmit(event: any) {
        event.preventDefault();

        const formData = {
            email: event.target.email.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirmPassword.value,
        };


        if (formData.password !== formData.confirmPassword) {
            alert('Пароли не совпадают!');
            return;
        }

        axiosClient.post('/register', {
            login: formData.email,
            password: formData.password,
        })
            .then(response => {
                const {data} = response;
                if (response.status === 200) {
                    router.push('/login');
                } else {
                    console.error('Registration failed', data);
                    alert('Не удалось зарегистрироваться: ' + (data.message || 'Unknown error'));
                }
            })
            .catch(error => {
                console.error('Error submitting form', error);
                alert('Произошла ошибка, Пожалуйста, повторите попытку: ' + (error.response?.data.message || 'Unknown error'));
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
                                Создайте ваш аккаунт
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email"
                                           className="input-label">
                                        Email
                                    </label>
                                    <input type="email" name="email" id="email" className="text-input"
                                           placeholder="name@company.com" required/>
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="input-label">
                                        Пароль
                                    </label>
                                    <input type="password" name="password" id="password" className="text-input"
                                           placeholder="••••••••" required/>
                                </div>
                                <div>
                                    <label htmlFor="confirm-password"
                                           className="input-label">
                                        Подтвердите пароль
                                    </label>
                                    <input type="password" name="confirmPassword" id="confirm-password"
                                           className="text-input"
                                           placeholder="••••••••" required/>
                                </div>
                                <button type="submit"
                                        className="w-full btn-primary">
                                    Зарегистрироваться
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Уже есть аккаунт?
                                    <Link href="/login"
                                          className="link-text">
                                        Войти
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
