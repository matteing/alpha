import React from "react";
import { useThread, getThread, DISCUSSION_QUERIES } from "queries/discussions";
import { useRouter } from "next/router";
import ErrorCard from "components/ui/ErrorCard";
import Spinner from "components/ui/Spinner";
import { makeQueryCache } from "react-query";
import { dehydrate } from "react-query/hydration";
import Thread from "components/discussions/Thread";
import { Link } from "routes";
import ThreadReplies from "components/discussions/ThreadReplies";
import ThreadReplyForm from "components/discussions/ThreadReplyForm";

function DiscussionThreadPage() {
	const router = useRouter();
	const { slug } = router.query;
	const { isLoading, data, error } = useThread(slug);

	if (isLoading) return <Spinner text="Loading discussion..." />;

	if (error) {
		return <ErrorCard statusCode={error.intCode ? error.intCode() : 400} />;
	}

	return (
		<div>
			<div className="flex flex-row w-full mb-2 text-sm">
				<Link route="discussions">
					<a>← Discussions</a>
				</Link>
			</div>
			<div className="mb-4">
				<Thread full withActionBar={false} thread={data} />
			</div>
			<div>
				<ThreadReplyForm thread={data} />
			</div>
			<div className="mt-4">
				<h4 className="mb-2 font-semibold text-gray-700">
					{data.reply_count} replies
				</h4>
				<ThreadReplies thread={data} />
			</div>
		</div>
	);
}

DiscussionThreadPage.getInitialProps = async ({ query: { slug } }) => {
	const queryCache = makeQueryCache();

	await queryCache.prefetchQuery(
		[DISCUSSION_QUERIES.getThread, { slug }],
		getThread
	);

	return {
		dehydratedState: dehydrate(queryCache),
		layout: {
			layout: "app",
			allowGuest: true,
		},
	};
};

export default DiscussionThreadPage;