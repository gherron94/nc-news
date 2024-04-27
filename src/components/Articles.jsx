import { useEffect, useState } from "react";
import newsApi from "./api";
import { NavLink, useParams } from "react-router-dom";

export default function Articles() {
	const { topic_id } = useParams();

	const [articleList, setArticleList] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [totalArticles, setTotalArticles] = useState(0);
	const [isFirstPage, setIsFirstPage] = useState(true);
	const [isLastPage, setIsLastPage] = useState(false);
	const [sortByDate, setSortByDate] = useState(false);
	const [sortByCommentCount, setSortByCommentCount] = useState(false);
	const [sortByVotes, setSortByVotes] = useState(false);
	const [sortBy, setSortBy] = useState("Date");
	const [isAscending, setIsAscending] = useState(false);
	const [isLoadingArticles, setIsLoadingArticles] = useState(true);
	const [isError, setIsError] = useState(false);
	const [sortOrder, setSortOrder] = useState("Descending");

	const pageLimit = Math.ceil(totalArticles / 10);

	let urlString = `/articles?`;

	if (topic_id) {
		urlString += `topic=${topic_id}&`;
	}

	if (sortByDate) {
		urlString += `sort_by=created_at&`;
	}

	if (sortByCommentCount) {
		urlString += `sort_by=comment_count&`;
	}

	if (sortByVotes) {
		urlString += `sort_by=votes&`;
	}

	if (isAscending) {
		urlString += `order=asc&`;
	}

	urlString += `p=${pageNumber}`;

	useEffect(() => {
		newsApi
			.get(urlString)
			.then(({ data }) => {
				setIsLoadingArticles(false);
				setIsLoadingArticles(false);
				setArticleList(data.articles);
				setTotalArticles(data.total_count);
			})
			.catch(() => {
				setIsLoadingArticles(false);
				setIsError(true);
			});
	}, [
		pageNumber,
		topic_id,
		sortByCommentCount,
		sortByDate,
		sortByVotes,
		isAscending,
	]);

	function nextPage() {
		if (pageNumber < pageLimit) {
			setPageNumber(pageNumber + 1);
			setIsFirstPage(false);
		}
		if (pageNumber === pageLimit - 1) {
			setIsLastPage(true);
		}
	}

	function previousPage() {
		if (pageNumber > 1) {
			setPageNumber(pageNumber - 1);
		}
		if (pageNumber === 2) {
			setIsFirstPage(true);
		}
		if (pageNumber === pageLimit) {
			setIsLastPage(false);
		}
	}

	function handleDateSorting() {
		setSortByDate(true);
		setSortByCommentCount(false);
		setSortByVotes(false);
		setSortBy("Date");
	}

	function handleCommentSorting() {
		setSortByCommentCount(true);
		setSortByDate(false);
		setSortByVotes(false);
		setSortBy("Comment count");
	}

	function handleVotesSorting() {
		setSortByVotes(true);
		setSortByCommentCount(false);
		setSortByDate(false);
		setSortBy("Votes");
	}

	function handleDesc() {
		setIsAscending(false);
		setSortOrder("Descending");
	}

	function handleAsc() {
		setIsAscending(true);
		setSortOrder("Ascending");
	}

	return (
		<>
			{isLoadingArticles ? (
				<div className="loading">
					<h2>Loading Articles...</h2>
				</div>
			) : isError ? (
				<h2>Error: Cannot load articles</h2>
			) : (
				<>
					{topic_id ? (
						<h1 id="top">{topic_id} Articles</h1>
					) : (
						<h1 id="top">All Articles</h1>
					)}
					<div className="sorting-bar">
						<div className="sort-dropdown">
							<h3 className="sort">Sort Order: {sortOrder}</h3>
							<div className="sort-list">
								<p onClick={handleDesc}>Descending</p>
								<p onClick={handleAsc}>Ascending</p>
							</div>
						</div>

						<div className="filter-dropdown">
							<h3 className="filter">Sort By: {sortBy}</h3>
							<div className="filter-list">
								<p onClick={handleDateSorting}>Date</p>
								<p onClick={handleCommentSorting}>Comment count</p>
								<p onClick={handleVotesSorting}>Votes</p>
							</div>
						</div>
					</div>

					<div className="articles">
						<ul>
							{articleList.map((article) => {
								const dateCreated = `${new Date(article.created_at)}`;

								return (
									<li key={article.article_id}>
										<NavLink to={`/articles/${article.article_id}`}>
											<h2>{article.title}</h2>
										</NavLink>
										<p className="author">Written by: {article.author}</p>
										<p>Topic: {article.topic}</p>
										<p>Total votes: {article.votes}</p>
										<p>Total comments: {article.comment_count}</p>
										<p>Date created: {dateCreated}</p>
									</li>
								);
							})}
						</ul>
						<p className="total">Total articles: {totalArticles}</p>
						<p className="total">Current Page: {pageNumber}</p>
					</div>
					<div id="pageButtons">
						<div className="previousButton">
							{isFirstPage ? null : (
								<button onClick={previousPage}>Pevious Page</button>
							)}
						</div>

						<div className="nextButton">
							{isLastPage ? null : (
								<button onClick={nextPage}>Next Page</button>
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
}
