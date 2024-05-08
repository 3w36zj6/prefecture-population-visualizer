import type { Meta, StoryObj } from "@storybook/react";
import Title from "./../../components/atoms/Title";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "atoms/Title",
  component: Title,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Level1Title: Story = {
  args: {
    text: "Title",
    level: "h1",
  },
};

export const Level2Title: Story = {
  args: {
    text: "Title",
    level: "h2",
  },
};

export const Level3Title: Story = {
  args: {
    text: "Title",
    level: "h3",
  },
};

export const Level4Title: Story = {
  args: {
    text: "Title",
    level: "h4",
  },
};

export const Level5Title: Story = {
  args: {
    text: "Title",
    level: "h5",
  },
};

export const Level6Title: Story = {
  args: {
    text: "Title",
    level: "h6",
  },
};
