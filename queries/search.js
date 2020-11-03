import axios, { axiosWrapper } from "utils/axios";
import { useInfiniteQuery } from "react-query";

export const SEARCH_QUERIES = {
	searchUsers: "search.searchUsers",
	searchProducts: "search.searchProducts",
	searchTasks: "search.searchTasks",
};

export async function searchUsers(key, { query }) {
	const { data } = await axiosWrapper(axios.get, `/search/users/?q=${query}`);
	return data;
}

export async function searchProducts(key, { query }) {
	const { data } = await axiosWrapper(
		axios.get,
		`/search/products/?q=${query}`
	);
	return data;
}

export async function searchTasks(key, { query }) {
	const { data } = await axiosWrapper(axios.get, `/search/tasks/?q=${query}`);
	return data;
}

export function useSearchUsers(query) {
	return useInfiniteQuery(
		[SEARCH_QUERIES.searchUsers, { query }],
		searchUsers,
		{
			getFetchMore: (lastGroup) => {
				return lastGroup.next;
			},
		}
	);
}

export function useSearchProducts(query) {
	return useInfiniteQuery(
		[SEARCH_QUERIES.searchProducts, { query }],
		searchProducts,
		{
			getFetchMore: (lastGroup) => {
				return lastGroup.next;
			},
		}
	);
}

export function useSearchTasks(query) {
	return useInfiniteQuery(
		[SEARCH_QUERIES.searchTasks, { query }],
		searchTasks,
		{
			getFetchMore: (lastGroup) => {
				return lastGroup.next;
			},
		}
	);
}
