import '../globals.css'
import {ThemeProvider} from "next-themes"
import TopBar from "../components/top-bar";
import {AuthProvider} from "../context/auth-context";


export default function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider attribute="class">
            <AuthProvider>
                <TopBar/>
                <Component {...pageProps} />
            </AuthProvider>
        </ThemeProvider>
    )
}
