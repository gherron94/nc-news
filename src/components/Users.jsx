import { useState, useContext } from "react";
import newsApi from "./api";
import UserContext from "./UserContext";

export default function Users() {
	const { signedInUser, setSignedInUser } = useContext(UserContext);
	const [usersList, setUsersList] = useState([]);
	const [isLoadingUsers, setIsLoadingUsers] = useState(true);
	const [isUsersError, setisUsersError] = useState(false);

	newsApi
		.get("/users")
		.then(({ data }) => {
			setIsLoadingUsers(false);
			setUsersList(data.users);
		})
		.catch(() => {
			setIsLoadingUsers(false);
			setisUsersError(true);
		});

	function switchUser(event) {
		const username = event.target.parentNode.childNodes[0].innerText;
		const avatar_url = event.target.parentNode.childNodes[1].src;
		setSignedInUser((currSignedInUser) => {
			return { ...currSignedInUser, username, avatar_url };
		});
	}

	return (
		<>
			{isLoadingUsers ? (
				<div className="loading">
					<h2>Loading Users...</h2>
				</div>
			) : isUsersError ? (
				<h2>Error: Cannot load Users</h2>
			) : (
				<>
					<h1>Select User</h1>
					<div className="flex-box-user">
						<ul>
							{usersList.map((user) => {
								return (
									<li
										className={
											user.username !== signedInUser.username
												? "signed-out-card"
												: "signed-in-card"
										}
										key={user.username}
									>
										<h2>{user.username}</h2>
										<img
											src={user.avatar_url}
											alt={`An image of ${user.username}'s avatar`}
										/>
										{console.log()}
										{user.username !== signedInUser.username ? (
											<button onClick={switchUser}>Select User</button>
										) : (
											<p>
												<strong>Signed In</strong>
											</p>
										)}
									</li>
								);
							})}
						</ul>
					</div>
				</>
			)}
		</>
	);
}
