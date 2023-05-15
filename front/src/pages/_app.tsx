import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { createContext, useState } from "react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const UserContext = createContext<ContextType>({
    token: null,
    setToken: () => {},
    username: null,
    setUsername: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    return (
        <>
            <Head>
                <title>Memo Game</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <UserContext.Provider
                value={{ token, setToken, username, setUsername }}
            >
                <div className="h-screen w-screen flex flex-col relative">
                    <main
                        className={`flex flex-col items-center justify-between p-7 ${inter.className} `}
                    >
                        <Component {...pageProps} />
                    </main>
                </div>
            </UserContext.Provider>
        </>
    );
}
