import { useEffect, useState, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import client from "@/client/client";
import { UserContext } from "../_app";
import Board from "@/components/board/Board";

type GameSessionGraphqlType = {
    createGameSession: GameSessionType;
};

export default function Game() {
    const router = useRouter();
    const { token, username } = useContext(UserContext);
    const [gameSession, setGameSession] = useState<GameSessionType | null>(
        null
    );

    const getNewSession = useCallback(async () => {
        if (!token) return router.push("/");
        const query = `
            mutation createSession($memoId: ID!, $token:String!, $username:String!){
                createGameSession(memo_test_id:$memoId, user_token:$token, user_name: $username){
                    id,
                    state,
                    pairs{
                        id,
                        state,
                        position_a,
                        position_b,
                        image_id
                    },
                    memoTest{
                        id,
                        name,
                        images{
                            id,
                            url
                        }
                    }
                }
            }
            `;
        const variables = {
            memoId: router.query.id,
            token: token,
            username: username,
        };

        const memoGame = await client.request<GameSessionGraphqlType>(
            query,
            variables
        );
        setGameSession(memoGame.createGameSession);
    }, [router, token, username]);

    useEffect(() => {
        if (router.query.id) {
            console.log("get new session", token, router.query.id);

            getNewSession();
        }
    }, [router.query.id, getNewSession, token, router]);

    if (!gameSession) {
        return <div>Loading...</div>;
    }

    const setFinish = () => {
        console.log("finish");
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <header className="flex flex-col">
                <h1 className="text-4xl font-bold text-center">
                    Welcome to the game{gameSession.memoTest.name}
                </h1>
                <p className="text-center mt-2">
                    You have to find all the pairs of images
                </p>
            </header>

            <Board
                memoGame={gameSession.memoTest}
                pairs={gameSession.pairs}
                gameSessionId={gameSession.id}
                setFinish={setFinish}
            />
            <section className="flex flex-col items-center justify-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                    onClick={() => router.push("/")}
                >
                    Back
                </button>
            </section>
        </div>
    );
}
