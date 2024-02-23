import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useAuth} from "@/src/context/auth-context";

export default function Index() {
    const router = useRouter();
    const {logout} = useAuth()

    useEffect(() => {
        logout()
        router.replace('/');
    }, [router]);


    return (
        <div className="flex justify-center items-center h-screen">
            <p>Выход из системы...</p>
        </div>
    );
}
