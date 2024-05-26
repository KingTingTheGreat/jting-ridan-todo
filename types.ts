export type Entry = {
	id: string;
	title: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	completed: boolean;
};

export type EntryInput = {
	title: string;
	description: string;
};
