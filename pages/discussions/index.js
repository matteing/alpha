import React from "react";
import Button from "components/ui/Button";
import LatestThreads from "components/discussions/LatestThreads";
import PageHeader from "components/ui/PageHeader";
import NarrowLayout from "layouts/NarrowLayout";
import { NextSeo } from "next-seo";

function DiscussionsPage() {
	return (
		<NarrowLayout>
			<PageHeader>
				<h2 className="font-bold">Discussions</h2>
				<div className="flex-grow"></div>
				<div>
					<Button secondary>New discussion</Button>
				</div>
			</PageHeader>
			<LatestThreads />

			<NextSeo
				title="Discussions"
				description="Share knowledge, ask questions & build better products on Makerlog."
			/>
		</NarrowLayout>
	);
}

DiscussionsPage.getInitialProps = async () => {
	return {
		layout: {
			allowGuest: true,
		},
	};
};

export default DiscussionsPage;
