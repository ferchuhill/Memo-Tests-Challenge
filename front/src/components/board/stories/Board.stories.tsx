import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Board from '../Board';

const meta: Meta<typeof Board> = {
  title: 'Board',
  component: Board,
};

import imagen from '../../../../public/images/test.jpg';
import imagen2 from '../../../../public/images/test2.webp';

export default meta;
type Story = StoryObj<typeof Board>;

export const BoardInit: Story = {
  args: {
    gameSessionId: 1,
    memoGame: {
      name: 'MemoTest',
      id: 1,
      high_score: 10,
      user_name: 'User',
      images: [
        {
          id: 1,
          url: imagen.src,
        },
        {
          id: 2,
          url: imagen2.src,
        },
      ],
    },
    pairs: [
      {
        id: 1,
        state: 'Hidden',
        position_a: 1,
        position_b: 3,
        image_id: 1,
      },
      {
        id: 2,
        state: 'Hidden',
        position_a: 2,
        position_b: 4,
        image_id: 2,
      },
    ],
    setFinish: () => {},
  },
  render: (args) => <Board {...args} />,
};
