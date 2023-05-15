import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import client from "@/client/client";
import { UserContext } from "./_app";

const User = dynamic(() => import("@/components/user/User"), {
    loading: () => <p>Loading...</p>,
});

export type HomeProps = {
    memoGames: MemoGameType[];
};

export default function Home(props: HomeProps) {
    const router = useRouter();
    const { token } = useContext(UserContext);
    const [games, setGames] = useState<MemoGamesHasSessionType[]>([]);
    const [numberMaxCols, setNumberMaxCols] = useState(
        props.memoGames.length >= 4 ? 4 : props.memoGames.length
    );

    const queryGetSessionByToken = `
        query gameSessionsByTokenState($token:String!,$state:String!,$first:Int!) {
            gameSessionsByTokenState(user_token:$token,state:$state,first:$first){
                data{
                    memoTest{
                        id,
                        name
                    }
                    id,
                    state
                }
            }
        }
    `;

    const queryFinishSession = `
        mutation finishGameSession($game_session:ID!,$token:String!){
            finishGameSessions(game_session:$game_session,user_token:$token){
            id
            }
        }
      `;

    useEffect(() => {
        if (token) {
            client
                .request<SessionGameGraphqlType>(queryGetSessionByToken, {
                    first: 10,
                    token: token,
                    state: "Started",
                })
                .then((data) => {
                    const gamesHasSession = props.memoGames.map((memoGame) => {
                        const sessionID =
                            data.gameSessionsByTokenState.data.find(
                                (session) => session.memoTest.id === memoGame.id
                            )?.id;
                        return {
                            memoGame: memoGame,
                            hasSession: sessionID ? true : false,
                            sessionGameId: sessionID || 0,
                        };
                    });

                    setGames(gamesHasSession);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [token, queryGetSessionByToken, props.memoGames]);

    const clickHandlerFinishSession = (id: number, gameSesionId: number) => {
        client
            .request(queryFinishSession, {
                game_session: gameSesionId,
                token: token,
            })
            .then(() => {
                router.push(`/game/${id}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <header className="flex flex-col items-center justify-center md:my-5 my-2 ">
                <Image
                    src="/logo.png"
                    alt="Memo Test Logo"
                    priority
                    width={300}
                    height={200}
                />
                <User />
            </header>
            <section className="flex flex-col items-center justify-center">
                <p className="text-center">Select the game you want to play:</p>
                <nav className="">
                    <ul
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${numberMaxCols} gap-4`}
                    >
                        {games.map((game) => (
                            <li
                                key={game.memoGame.id}
                                className=" flex flex-row items-center justify-center m-5 p-3 hover:bg-gray-900 border-2 border-black rounded "
                            >
                                <div className="flex flex-col ">
                                    <figure className="mr-2">
                                        <Image
                                            src={game.memoGame.images[0].url}
                                            alt={game.memoGame.name}
                                            width={100}
                                            height={100}
                                        />
                                    </figure>
                                    <p className="text-center mr-2">
                                        {game.memoGame.name}
                                    </p>
                                    <p className="text-left mr-2">
                                        High Score: {game.memoGame.high_score}
                                    </p>
                                    {game.memoGame.user_name && (
                                        <p className=" text-left mr-2">
                                            By: {game.memoGame.user_name}
                                        </p>
                                    )}
                                </div>

                                {game.hasSession ? (
                                    <div className=" flex flex-col">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 h-10"
                                            onClick={() => {
                                                clickHandlerFinishSession(
                                                    game.memoGame.id,
                                                    game.sessionGameId
                                                );
                                            }}
                                        >
                                            Start
                                        </button>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 h-10"
                                            onClick={() => {
                                                router.push(
                                                    `/game/${game.memoGame.id}`
                                                );
                                            }}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 h-10"
                                        onClick={() => {
                                            router.push(
                                                `/game/${game.memoGame.id}`
                                            );
                                        }}
                                    >
                                        Start
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>
        </>
    );
}

export async function getServerSideProps() {
    const query = `
        query getAll($page:Int!){
            memoTest(first:$page){
                paginatorInfo{
                    currentPage,
                    count
                    hasMorePages
                },
                data{
                    name,
                    id,
                    high_score,
                    user_name,
                    images{
                        url
                    }
                }
            }
        }
      `;
    const variables = { page: 10 };

    const memoGames = await client.request<MemoGameGraphqlType>(
        query,
        variables
    );

    return {
        props: {
            memoGames: memoGames.memoTest.data,
            hasMorePages: memoGames.memoTest.paginatorInfo.hasMorePages,
        },
    };
}
