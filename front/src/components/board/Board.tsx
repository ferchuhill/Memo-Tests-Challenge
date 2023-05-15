import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import client from "@/client/client";
import Card from "./Card";
import { UserContext } from "../../pages/_app";
import Popup from "../popUp/Popup";

export type BoardProps = {
    gameSessionId: number;
    pairs: PairsType;
    memoGame: MemoGameType;
    setFinish: React.Dispatch<React.SetStateAction<boolean>>;
};

export type GameSessionGraphqlType = {
    checkPointGameSession: GameSessionType;
};

const Board = ({ memoGame, gameSessionId, pairs, setFinish }: BoardProps) => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [pairsState, setPairs] = useState<PairsType>([]);
    const { width, height } = useWindowSize();
    const [isFinish, setIsFinish] = useState(false);
    const [score, setScore] = useState(0);

    // get the User token from the context
    const { token } = useContext(UserContext);

    const router = useRouter();

    const queryUpdateSession = `
                mutation checkPointGameSession($sesionId:ID!, $token:String,$pairs:[PairsInput!]){
                    checkPointGameSession(
                        game_session: $sesionId,
                        user_token: $token,
                        pairs:$pairs
                    ){
                        id,
                        state,
                        score,
                        memoTest{
                            id,
                            name
                        },
                        pairs{
                            id,
                            state,
                            position_a,
                            position_b,
                            image_id
                        },
                    }
                }
            `;

    useEffect(() => {
        setPairs(pairs);
    }, [pairs]);

    // generate the cards base on the pairs
    useEffect(() => {
        const searchUrl = (id: number) => {
            const image = memoGame.images.find((image) => image.id === id);
            return image?.url;
        };

        // cont the number of pairs
        const numberCards = pairsState.length;
        // create an organice array with the cards
        const cardsArray = Array(numberCards * 2);
        for (let i = 0; i < numberCards; i++) {
            cardsArray[pairsState[i].position_a - 1] = {
                id: pairsState[i].id,
                key: `${pairsState[i].id.toString()}A`,
                state: pairsState[i].state,
                position: pairsState[i].position_a - 1,
                image_id: pairsState[i].image_id,
                url: searchUrl(pairsState[i].image_id),
            };
            cardsArray[pairsState[i].position_b - 1] = {
                id: pairsState[i].id,
                key: `${pairsState[i].id.toString()}B`,
                state: pairsState[i].state,
                position: pairsState[i].position_b - 1,
                image_id: pairsState[i].image_id,
                url: searchUrl(pairsState[i].image_id),
            };
        }
        setCards(cardsArray);
    }, [pairsState, memoGame.images]);

    const onClick = (card: CardType) => {
        setCards((prev) =>
            prev.map((prevCard) => {
                if (prevCard.key === card.key) {
                    return {
                        ...prevCard,
                        state: "Flipped",
                    };
                }
                return prevCard;
            })
        );
    };

    // check if the are two flipped card and check in the backend if are paired and finish the game
    useEffect(() => {
        const updatedStatus = async (id: number | null) => {
            const pairedCards = cards.filter((card) => card.state === "Paired");

            //init an array with the id recive
            const uniqueIds: { id: number }[] = [];

            if (id) {
                uniqueIds.push({ id: +id });
            }

            //add the id of the paired cards
            pairedCards.forEach((card) => {
                uniqueIds.push({ id: +card.id });
            });

            const variables = {
                sesionId: +gameSessionId,
                token: token,
                pairs: uniqueIds,
            };
            const gameUpadeted = await client.request<GameSessionGraphqlType>(
                queryUpdateSession,
                variables
            );
            setScore(gameUpadeted.checkPointGameSession.score);

            if (gameUpadeted.checkPointGameSession.state === "Finished") {
                setIsFinish(true);
                setFinish(true);
            }
            setPairs(gameUpadeted.checkPointGameSession.pairs);
            //     setPairs(newA.checkPointGameSession.pairs);
        };

        const flippedCards = cards.filter((card) => card.state === "Flipped");

        if (flippedCards.length === 2) {
            if (flippedCards[0].image_id != flippedCards[1].image_id) {
                setTimeout(() => {
                    setCards((prev) =>
                        prev.map((prevCard) => {
                            if (
                                prevCard.key === flippedCards[0].key ||
                                prevCard.key === flippedCards[1].key
                            ) {
                                return {
                                    ...prevCard,
                                    state: "Hidden",
                                };
                            }
                            return prevCard;
                        })
                    );
                    updatedStatus(null);
                }, 1000);
            } else {
                updatedStatus(flippedCards[0].id);
            }
        }
    }, [cards, setFinish, gameSessionId, token, queryUpdateSession, pairs]);

    const handlerOnClose = () => {
        router.push("/");
    };

    return (
        <>
            {isFinish && (
                <>
                    <Confetti width={width} height={height} />
                    <Popup title="" onClose={handlerOnClose}>
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-4xl font-bold text-center">
                                Amazing Job!
                            </h1>
                            <div className=" flex flex-row  items-center justify-center m-2 ">
                                <Image
                                    src="/images/trophy.png"
                                    alt="medal"
                                    width={100}
                                    height={100}
                                />

                                <h2 className="text-2xl font-bold text-center">
                                    You finished the game and your score is{" "}
                                    {score}
                                </h2>
                            </div>
                        </div>
                        <button
                            className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                            onClick={handlerOnClose}
                        >
                            Close
                        </button>
                    </Popup>
                </>
            )}
            <div
                aria-label="board"
                className="grid grid-cols-3 md:grid-cols-5 grid-rows-8 gap-3 m-7"
            >
                {cards.map((card) => (
                    <Card key={card.key} card={card} onClick={onClick} />
                ))}
            </div>
        </>
    );
};

export default Board;
