import React from "react";
import Head from "next/head";

// https://favicon.io/favicon-converter/

export default function DefaultHead() {
	return (
		<Head>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/img/icons/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/img/icons/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/img/icons/favicon-16x16.png"
			/>
			<link rel="manifest" href="/img/icons/site.webmanifest" />
		</Head>
	);
}