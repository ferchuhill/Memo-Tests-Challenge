import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card, { CardProps } from "../../../components/board/Card";

const onClick = jest.fn(() => {});

describe("Card", () => {
    it("renders the card front and back", () => {
        const card: CardProps["card"] = {
            id: 1,
            position: 0,
            key: "1",
            state: "Hidden",
            url: "http://card.png",
            image_id: 1,
        };

        const { getByText } = render(<Card card={card} onClick={onClick} />);

        expect(getByText("1")).toBeInTheDocument();
    });

    it("Card Flipped", () => {
        const card: CardProps["card"] = {
            id: 1,
            position: 0,
            key: "1",
            state: "Flipped",
            url: "http://card.png",
            image_id: 1,
        };
        const { getByLabelText } = render(
            <Card card={card} onClick={onClick} />
        );

        const cardElement = document.querySelector("button");
        //    expect the card to be flipped with css transform
        expect(cardElement).toHaveStyle(
            "transform: translateX(-100%) rotateY(-180deg)"
        );
    });
    it("calls onClick function when the card is clicked", () => {
        const card: CardProps["card"] = {
            id: 1,
            position: 0,
            key: "1",
            state: "Hidden",
            url: "http://card.png",
            image_id: 1,
        };
        render(<Card card={card} onClick={onClick} />);
        const cardElement = document.querySelector("button");

        fireEvent.click(cardElement!);

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(card);
    });
});
