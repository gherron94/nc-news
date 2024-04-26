import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";

export default function NavBar({ isTopics, setIsTopics }) {
	const { signedInUser } = useContext(UserContext);

	function showTopics() {
		setIsTopics(true);
		if (isTopics) {
			setIsTopics(false);
		}
	}

	function chooseTopic() {
		setIsTopics(false);
	}

	return (
		<nav>
			<ul>
				<li onClick={chooseTopic}>
					<NavLink to="/">Home</NavLink>
				</li>
				<li onClick={chooseTopic}>
					<NavLink to="/articles">Articles</NavLink>
				</li>
				<li onClick={showTopics}>Topics</li>
				<li onClick={chooseTopic} id="currentUser">
					<NavLink to="/users">
						<div id="loggedIn">
							<img src={signedInUser.avatar_url} alt="placeholder" />
							<p>{signedInUser.username}</p>
						</div>
					</NavLink>
				</li>
			</ul>
			{isTopics ? (
				<div id="topics-bar">
					<ul>
						<li onClick={chooseTopic}>
							<NavLink to="articles/topics/cooking"> Cooking</NavLink>
						</li>
						<li onClick={chooseTopic}>
							<NavLink to="articles/topics/football"> Football</NavLink>
						</li>
						<li onClick={chooseTopic}>
							<NavLink to="articles/topics/coding"> Coding</NavLink>
						</li>
					</ul>
				</div>
			) : null}
		</nav>
	);
}
