export interface User {
	id: number,
	email: string,
	name: string,
	completed: boolean
};

export interface Board {
	title: string,
	description: string,
}

export interface Column {
	title: string,
	order: number,
}

export interface Task {
	title: string,
	done: boolean,
	order: number,
	description: string,
	userId: string,
}

export interface File {
	taskId: string,
	file: string, // бинарно
}