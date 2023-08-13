import Head from "next/head";
import Connect4 from "../components/Game/Connect4/Connect4";

export default function Home() {
    return (
        <>
            <Head>
                <title>Connect4</title>
                <meta name="description" content="Connect4 Game" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                    user-scalable="yes"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Connect4 m={6} n={7} />
            </main>
        </>
    );
}
