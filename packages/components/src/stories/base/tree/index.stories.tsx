import { Meta } from "@storybook/react/types-6-0";
import { ComponentStory } from "@storybook/react";
import { Tree } from "../../../molecules";
import { TreeProps } from "../../../molecules/tree/types";
import { StoryContainer } from "../../container";
import React from "react";
export default {
  title: "tree",
  component: Tree,
} as Meta<TreeProps<any>>;

type AnyCompProps = React.ComponentProps<typeof Tree>;

const mockData: AnyCompProps["data"] = [
  {
    id: "1",
    title: "test1",
  },
  { id: "2", title: "data2" },
  { id: "3", title: "test3" },
  {
    id: "4",
    title: "test4",
    children: [
      {
        id: "4-1",
        title: "test4-1",

        children: [
          { id: "4-1-1", title: "test4-1-1" },
          {
            id: "4-1-2",
            title: "test4-1-2",
            children: [
              { id: "4-1-1-1", title: "test4-1-1" },
              { id: "4-1-2-2", title: "test4-1-2" },
            ],
          },
        ],
      },
      { id: "4-2", title: "test4-2" },
      { id: "4-3", title: "test4-3" },
    ],
  },
  { id: "5", title: "test5" },
];

const Template: ComponentStory<typeof Tree> = () => (
  <StoryContainer>
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: 50,
      }}
    >
      <Tree data={mockData} />
    </div>
  </StoryContainer>
);

export const Primary = Template.bind({});

Primary.args = {
  data: mockData,
};
