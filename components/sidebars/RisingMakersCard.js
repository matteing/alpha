import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "components/ui/Card";
import Spinner from "components/ui/Spinner";
import UserMedia from "components/ui/UserMedia";
import { useWorldStats } from "queries/stats";
import React from "react";
import SidebarItem from "./SidebarItem";

export default function RisingMakersCard() {
	const { isLoading, data: worldStats, error } = useWorldStats();

	if (error) return null;

	return (
		<SidebarItem title="Rising">
			<Card>
				<Card.Content>
					{isLoading && <Spinner small text="Loading users..." />}
					{worldStats && worldStats.rising_users && (
						<div className="space-y-2">
							{worldStats.rising_users
								.slice(0, 10)
								.map((user, idx) => (
									<div key={user.id} className="flex">
										<div
											className={
												"flex flex-col text-center items-center justify-center mr-2 " +
												(idx + 1 <= 3
													? "font-semibold"
													: "")
											}
										>
											{user.rising_change &&
											user.rising_change === "up" ? (
												<div style={{ lineHeight: 0 }}>
													<FontAwesomeIcon
														className="text-green-500"
														icon="caret-up"
													/>
												</div>
											) : null}
											{user.rising_change &&
											user.rising_change === "down" ? (
												<div style={{ lineHeight: 0 }}>
													<FontAwesomeIcon
														className="text-red-500"
														icon="caret-down"
													/>
												</div>
											) : null}
											<div>#{idx + 1}</div>
										</div>
										<div className="flex-initial">
											<UserMedia
												truncateName
												extraStreakText={false}
												key={user.id}
												user={user}
											/>
										</div>
									</div>
								))}
							<p className="help">
								The more you contribute, the more you shine on
								Makerlog! ✅
							</p>
						</div>
					)}
				</Card.Content>
			</Card>
		</SidebarItem>
	);
}
