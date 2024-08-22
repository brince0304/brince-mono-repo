import { Loading } from "@/Loading/index";
import type { Meta } from "@storybook/react";

const meta: Meta<typeof Loading> = {
	title: "Components/Loading",
	component: Loading,
	tags: ["autodocs"],
	argTypes: {
		isLoading: { control: "boolean" },
	},
};

export default meta;

export const Default = {
	args: {
		isLoading: true,
	},
};

export const NotLoading = {
	args: {
		isLoading: false,
	},
};
