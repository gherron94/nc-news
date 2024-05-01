import { useState, useContext } from "react";
import newsApi from "./api";
import { useParams } from "react-router-dom";
import UserContext from "./UserContext";

export default function PostComment({ isCommentPosted, setISCommentPosted }) {
	const { signedInUser } = useContext(UserContext);
	const [commentBody, setCommentBody] = useState("");
	const { article_id } = useParams();

	function handleOnChange(event) {
		setCommentBody(event.target.value);
		setISCommentPosted(false);
	}

	function addComment(event) {
		event.preventDefault();

		newsApi
			.post(`/articles/${article_id}/comments`, {
				body: commentBody,
				username: signedInUser.username,
			})
			.then((response) => {
				if (response.status === 201) {
					setISCommentPosted(true);
				}
			});
		setCommentBody("");
	}

	return (
		<>
			<form onSubmit={addComment} className="new-comment">
				<label htmlFor="comment-body">Add a new comment:</label>
				<textarea
					onChange={handleOnChange}
					value={commentBody}
					id="comment-body"
					rows="5"
				></textarea>
				<button>Add comment</button>
			</form>
			{isCommentPosted ? <p>Comment has been added</p> : null}
		</>
	);
}
