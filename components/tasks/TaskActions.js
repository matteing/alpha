import React, { useState } from "react";
import Button from "components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PraiseButton from "components/praise/PraiseButton";
import TaskComments from "./TaskComments";
import { useAuth } from "stores/AuthStore";
import Dropdown from "components/ui/Dropdown";
import copy from "clipboard-copy";
import { isServer } from "config";
import { buildAbsoluteUrl } from "utils/random";
import {
	getTwitterShareUrl,
	getDoneState,
	DoneStates,
	getDeltaFromDoneState,
} from "utils/tasks";
import { useDeleteTask, useUpdateTask } from "queries/tasks";
import { getLogger } from "utils/logging";

const log = getLogger("TaskActions");

function TaskStateDropdown({ task, onUpdate }) {
	const ds = getDoneState(task);

	const markAsDoneState = (doneState) => {
		onUpdate(getDeltaFromDoneState(doneState));
	};

	return (
		<Dropdown
			items={
				<>
					{ds == DoneStates.DONE ? (
						<>
							<Dropdown.Item
								onClick={() =>
									markAsDoneState(DoneStates.REMAINING)
								}
							>
								Mark as remaining
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() =>
									markAsDoneState(DoneStates.IN_PROGRESS)
								}
							>
								Mark as in-progress
							</Dropdown.Item>
						</>
					) : null}

					{ds == DoneStates.IN_PROGRESS ? (
						<>
							<Dropdown.Item
								onClick={() => markAsDoneState(DoneStates.DONE)}
							>
								Mark as completed
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() =>
									markAsDoneState(DoneStates.REMAINING)
								}
							>
								Mark as remaining
							</Dropdown.Item>
						</>
					) : null}

					{ds == DoneStates.REMAINING ? (
						<>
							<Dropdown.Item
								onClick={() => markAsDoneState(DoneStates.DONE)}
							>
								Mark as completed
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() =>
									markAsDoneState(DoneStates.IN_PROGRESS)
								}
							>
								Mark as in-progress
							</Dropdown.Item>
						</>
					) : null}
				</>
			}
		>
			<Button xs secondary>
				Mark as...
				<Button.Icon right>
					<FontAwesomeIcon icon="caret-down" />
				</Button.Icon>
			</Button>
		</Dropdown>
	);
}

function TaskPermalinkAction({ task }) {
	const [copied, setCopied] = useState(false);

	return (
		<Dropdown.Item
			onClick={() => {
				if (isServer) return;
				copy(buildAbsoluteUrl(`/tasks/${task.id}`));
				setCopied(true);
				setInterval(() => setCopied(false), 1000);
			}}
		>
			<Dropdown.Item.Icon>
				<FontAwesomeIcon icon="link" />
			</Dropdown.Item.Icon>
			{copied ? "Copied!" : "Permalink"}
		</Dropdown.Item>
	);
}

function TaskDeleteAction({ task, onDelete = () => {} }) {
	const { isLoggedIn, user } = useAuth();

	if (!isLoggedIn || user.id !== task.user.id) return null;

	return (
		<Dropdown.Item onClick={onDelete}>
			<Dropdown.Item.Icon>
				<FontAwesomeIcon icon="trash" />
			</Dropdown.Item.Icon>
			Delete
		</Dropdown.Item>
	);
}

function TaskMoreDropdown({ task, onDelete }) {
	const { isLoggedIn, user } = useAuth();

	return (
		<Dropdown
			items={
				<>
					<TaskPermalinkAction task={task} />

					<Dropdown.Item
						href={getTwitterShareUrl([task])}
						target="_blank"
					>
						<Dropdown.Item.Icon>
							<FontAwesomeIcon icon={["fab", "twitter"]} />
						</Dropdown.Item.Icon>
						Tweet
					</Dropdown.Item>
					{isLoggedIn && user.id === task.user.id && (
						<div className="mt-2 mb-2 border-b border-gray-200"></div>
					)}
					<TaskDeleteAction task={task} onDelete={onDelete} />
				</>
			}
		>
			<Button xs>
				<Button.Icon>
					<FontAwesomeIcon icon="ellipsis-v" />
				</Button.Icon>
				More
				<Button.Icon right>
					<FontAwesomeIcon icon="caret-down" />
				</Button.Icon>
			</Button>
		</Dropdown>
	);
}

function TaskActions({ task, stream = false }) {
	// We allow this to be false, favoring a boolean op below.
	// This allows for autofocus on click.
	const { user } = useAuth();
	const [updateMutation] = useUpdateTask(task);
	const [deleteMutation] = useDeleteTask(task);
	const [commentsOpen, setCommentsOpen] = useState(false);
	if (!task) return;

	const updateTask = async (delta) => {
		await updateMutation({ payload: delta, id: task.id });
		log(`Task #${task.id} has been updated. (${delta})`);
	};

	const deleteTask = async () => {
		await deleteMutation({ id: task.id });
		log(`Task #${task.id} has been deleted.`);
	};

	if (stream) {
		return (
			<div>
				<span className="inline-flex">
					<span className="mr-2">
						<PraiseButton
							disabled={user && task.user.id === user.id}
							initialCount={task.praise}
							indexUrl={`/tasks/${task.id}`}
						/>
					</span>
					<span className="mr-2">
						<Button
							xs
							onClick={() => {
								setCommentsOpen(true);
							}}
						>
							<Button.Icon>
								<FontAwesomeIcon icon="comment" />
							</Button.Icon>
							Comment
						</Button>
					</span>
					<span className="mr-2">
						<TaskMoreDropdown task={task} />
					</span>
				</span>
				{(commentsOpen || task.comment_count > 0) && (
					<div className="mt-2">
						<TaskComments task={task} focused={commentsOpen} />
					</div>
				)}
			</div>
		);
	} else {
		return (
			<div>
				<span className="inline-flex">
					<span className="mr-2">
						<TaskStateDropdown task={task} onUpdate={updateTask} />
					</span>
					<span className="mr-2">
						<TaskMoreDropdown task={task} onDelete={deleteTask} />
					</span>
				</span>
			</div>
		);
	}
}

export default TaskActions;
