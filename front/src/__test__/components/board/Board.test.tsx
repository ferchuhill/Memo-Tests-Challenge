import React from "react";
import Board from "../../../components/board/Board";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { setupServer } from "msw/node";
import { rest } from "msw";

jest.mock("next/router", () => require("next-router-mock"));

const memoGame: MemoGameType = {
    id: 1,
    name: "Memo Test",
    high_score: 10,
    user_name: "User",
    images: [
        {
            id: 1,
            url: "http://image1.png",
        },
        {
            id: 2,
            url: "http://image2.png",
        },
    ],
};

const pairs: PairsType = [
    {
        id: 1,
        position_a: 1,
        position_b: 2,
        state: "Hidden",
        image_id: 1,
    },
    {
        id: 2,
        position_a: 3,
        position_b: 4,
        state: "Hidden",
        image_id: 2,
    },
];

const gameSessionId = 1;
const setFinish = jest.fn();

describe("Board", () => {
    it("renders the board", () => {
        const board = (
            <Board
                memoGame={memoGame}
                pairs={pairs}
                gameSessionId={gameSessionId}
                setFinish={setFinish}
            />
        );
        expect(board).toBeTruthy();
    });

    it("renders the board with the correct number of cards", () => {
        const board = (
            <Board
                memoGame={memoGame}
                pairs={pairs}
                gameSessionId={gameSessionId}
                setFinish={setFinish}
            />
        );
        const { getAllByLabelText } = render(board);
        const cards = getAllByLabelText("card");
        expect(cards.length).toEqual(4);
    });

    it("changes the state of the card when clicked", () => {
        const board = (
            <Board
                memoGame={memoGame}
                pairs={pairs}
                gameSessionId={gameSessionId}
                setFinish={setFinish}
            />
        );
        const { getAllByLabelText } = render(board);
        const cards = getAllByLabelText("card");
        const card = cards[0];
        fireEvent.click(card!);
        expect(card).toHaveStyle(
            "transform: translateX(-100%) rotateY(-180deg)"
        );
    });

    describe("when the user clicks two cards", () => {
        // Create a mock server
        const pairs: PairsType = [
            {
                id: 1,
                position_a: 1,
                position_b: 2,
                state: "Paired",
                image_id: 1,
            },
            {
                id: 2,
                position_a: 3,
                position_b: 4,
                state: "Hidden",
                image_id: 2,
            },
        ];

        const server = setupServer(
            rest.post("/graphql", (req, res, ctx) => {
                // Mock the response from the server
                const response = {
                    data: {
                        checkPointGameSession: {
                            id: 1,
                            state: "Started",
                            score: 10,
                            memoTest: { id: 1, name: "Memo Test" },
                            pairs: pairs.map((pair: any) => ({
                                id: pair.id,
                                state: "Paired",
                                position_a: 1,
                                position_b: 2,
                                image_id: 1,
                            })),
                        },
                    },
                };
                return res(ctx.json(response));
            })
        );
        beforeEach(() => {
            server.listen();
        });

        afterEach(() => {
            server.close();
        });

        it("should call the api to check the pair", () => {
            const board = (
                <Board
                    memoGame={memoGame}
                    pairs={pairs}
                    gameSessionId={gameSessionId}
                    setFinish={setFinish}
                />
            );
            const { getAllByLabelText } = render(board);
            const cards = getAllByLabelText("card");
            let card = cards[0];
            fireEvent.click(card!);
            expect(card).toHaveStyle(
                "transform: translateX(-100%) rotateY(-180deg)"
            );

            card = cards[2];
            fireEvent.click(card!);
            expect(card).toHaveStyle(
                "transform: translateX(-100%) rotateY(-180deg)"
            );

            server.resetHandlers();
        });
    });

    describe("when the user clicks on a card and finish", () => {
        // Create a mock server

        const pairsFinished: PairsType = [
            {
                id: 1,
                position_a: 1,
                position_b: 2,
                state: "Paired",
                image_id: 1,
            },
            {
                id: 2,
                position_a: 3,
                position_b: 4,
                state: "Paired",
                image_id: 2,
            },
        ];

        const server2 = setupServer(
            rest.post("/graphql", (req, res, ctx) => {
                // Mock the response from the server
                const response = {
                    data: {
                        checkPointGameSession: {
                            id: 1,
                            state: "Finished",
                            score: 10,
                            memoTest: { id: 1, name: "Memo Test" },
                            pairs: pairsFinished.map((pair: any) => ({
                                ...pair,
                                state: "Paired",
                            })),
                        },
                    },
                };
                return res(ctx.json(response));
            })
        );

        beforeEach(() => {
            server2.listen();
        });

        afterEach(() => {
            server2.close();
        });

        it("should call the api to check the pair and finish the game", async () => {
            const board = (
                <Board
                    memoGame={memoGame}
                    pairs={pairs}
                    gameSessionId={gameSessionId}
                    setFinish={setFinish}
                />
            );

            // create a mock up for component react-confetti to avoid errors
            jest.mock("react-confetti", () => () => null);

            const { getAllByLabelText } = render(board);
            const cards = getAllByLabelText("card");
            const card1 = cards[0];
            fireEvent.click(card1!);
            expect(card1).toHaveStyle(
                "transform: translateX(-100%) rotateY(-180deg)"
            );

            const card2 = cards[1];
            fireEvent.click(card2!);
            expect(card2).toHaveStyle(
                "transform: translateX(-100%) rotateY(-180deg)"
            );

            // wait the api call to finish
            await waitFor(() => expect(setFinish).toHaveBeenCalledWith(true));

            expect(setFinish).toBeCalledWith(true);
            expect(setFinish).toHaveBeenCalledTimes(1);

            // search the  Amazing Job! message
            const message = screen.getByText("Amazing Job!");
            expect(message).toBeInTheDocument();
        });
    });
});
