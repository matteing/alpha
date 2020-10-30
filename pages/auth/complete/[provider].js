import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { getAuthProvider, requireUnauthed } from "utils/auth";
import { useAuth } from "stores/AuthStore";
import { useRouter } from "next/router";
import ErrorMessageList from "components/error/ErrorMessageList";
import Card from "components/ui/Card";
import NarrowLayout from "layouts/NarrowLayout";
import Spinner from "components/ui/Spinner";
import { Router } from "routes";

function SocialAuthCompletePage() {
	const { loginWithToken } = useAuth();
	const [completed, setCompleted] = useState(false);
	const [loading, setLoading] = useState(true);
	const [errorMessages, setErrorMessages] = useState(null);
	const router = useRouter();

	const authenticateWithProvider = useCallback(async () => {
		try {
			setLoading(true);
			setErrorMessages(null);
			const { method, params } = getAuthProvider(router.query);
			if (!method) {
				throw new Error("No method found for this provider.");
			}
			const { token } = await method(...params);
			if (token) loginWithToken(token);
			Router.pushRoute("index");
			setLoading(false);
			setCompleted(true);
		} catch (e) {
			setLoading(false);
			setErrorMessages(e);
		}
	}, [router, loginWithToken]);

	useEffect(() => {
		authenticateWithProvider();
	}, [authenticateWithProvider]);

	return (
		<NarrowLayout
			maxWidthMultiplier={1}
			leftSidebar={null}
			rightSidebar={null}
		>
			<div className="text-white">
				<div className="mb-4">
					<h1>Sign in</h1>
					<p className="text-gray-200">
						Welcome back to the maker community.
					</p>
				</div>
			</div>
			<Card>
				<Card.Content>
					{completed && (
						<p>
							Done! You'll be taken to your log in a couple of
							seconds...
						</p>
					)}
					{errorMessages !== null && (
						<ErrorMessageList error={errorMessages} />
					)}
					{errorMessages === null && (!completed || loading) && (
						<Spinner text="Signing you right in..." />
					)}
				</Card.Content>
			</Card>
		</NarrowLayout>
	);
}

SocialAuthCompletePage.getInitialProps = async () => {
	return {
		layout: {
			className: "bg-people",
		},
	};
};

export default requireUnauthed(SocialAuthCompletePage);