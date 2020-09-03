import orderBy from "lodash/orderBy";
import groupBy from "lodash/groupBy";

export const DoneStates = {
	DONE: 0,
	IN_PROGRESS: 1,
	REMAINING: 2,
};

export function getDoneState(task) {
	if (task.done && !task.in_progress) return DoneStates.DONE;
	if (!task.done && task.in_progress) return DoneStates.IN_PROGRESS;
	return DoneStates.REMAINING;
}

export function getHumanStateFromDoneState(ds) {
	switch (ds) {
		case DoneStates.DONE:
			return "Done";
		case DoneStates.IN_PROGRESS:
			return "In progress";
		case DoneStates.REMAINING:
			return "To-do";
		default:
			"Task";
	}
}

export function getHumanStateFromTask(task) {
	const ds = getDoneState(task);
	return getHumanStateFromDoneState(ds);
}

export function getDeltaFromDoneState(doneState) {
	// Loose comparison in case input is string.
	return {
		done: doneState == DoneStates.DONE,
		in_progress: doneState == DoneStates.IN_PROGRESS,
	};
}

export function groupTasksByDone(tasks) {
	tasks = orderBy(tasks, "created_at", "desc");
	let resultObj = {};
	resultObj[DoneStates.DONE] = [];
	resultObj[DoneStates.IN_PROGRESS] = [];
	resultObj[DoneStates.REMAINING] = [];
	let newObj = groupBy(tasks, (task) => {
		return getDoneState(task);
	});
	return { ...resultObj, ...newObj };
}

export function getTwitterShareUrl(tasks, me = null) {
	// We assume it has been serialized and validated.
	if (tasks.length === 0) return null;
	let user = tasks[0].user;
	let name = user.twitter_handle ? `@${user.twitter_handle}` : user.username;
	let text = `Done today by ${name} on @GetMakerlog:\n`;
	if (me && me.id === user.id) {
		text = `Done today on @GetMakerlog:\n`;
	}
	orderBy(tasks, "created_at", "asc").map((task) => {
		text = text + `\n✅ ${task.content}`;
		return true;
	});
	return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}
