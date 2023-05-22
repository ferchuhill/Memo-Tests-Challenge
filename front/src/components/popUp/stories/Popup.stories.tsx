import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Popup from '../Popup';

const meta: Meta<typeof Popup> = {
  title: 'Popup',
  component: Popup,
};

export default meta;
type Story = StoryObj<typeof Popup>;

export const PopupInit: Story = {
  args: {
    title: 'My windows',
    isOpen: true,
    onClose: () => {},
    children: <div>This is a custiom Popup</div>,
  },
  render: (args) => <Popup {...args} />,
};
