import Modal from './Modal';
import type { Meta, StoryFn } from '@storybook/react';
import { IModalProps } from './Modal.types';

export default {
  title: 'components/Modal',
  component: Modal,
} as Meta;

const Template: StoryFn<IModalProps> = args => <Modal {...args} />;

export const Default = Template.bind({});

Default.args = {
  type: 'new',
};
