import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";

const meta: Meta<typeof Card> = {
    title: "Card",
    component: Card,
};

import imagen from "../../../public/images/test.jpg";

export default meta;
type Story = StoryObj<typeof Card>;

export const Flipped: Story = {
    args: {
        card: {
            id: 1,
            key: "card-1",
            state: "Flipped",
            position: 1,
            image_id: 1,
            url: imagen.src,
        },
        onClick: () => {},
    },
    render: (args) => <Card {...args} />,
};

export const Paired: Story = {
    args: {
        card: {
            id: 1,
            key: "card-1",
            state: "Paired",
            position: 1,
            image_id: 1,
            url: imagen.src,
        },
        onClick: () => {},
    },
    render: (args) => <Card {...args} />,
};

export const Hidden: Story = {
    args: {
        card: {
            id: 1,
            key: "card-1",
            state: "Hidden",
            position: 1,
            image_id: 1,
            url: imagen.src,
        },
        onClick: () => {},
    },
    render: (args) => <Card {...args} />,
};
