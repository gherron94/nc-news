import { NavLink } from "react-router-dom";

export default function Home() {
	return (
		<>
			<h1>Welcome to NC News</h1>
			<div className="home-container">
				<img
					className="newspaper-img"
					src={
						"https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					}
					alt="a newspaper"
				/>
				<section className="home-section">
					<p className="home-p">
						Here you can find articles about Coding, Cooking and Football.{" "}
					</p>
					<p className="home-p">
						{" "}
						You can view all of our articles by clicking the article page on the
						navbar.{" "}
					</p>
					<p className="home-p">
						{" "}
						Alternatively you can view all articles by a particular topic by
						using the topics dropdown.{" "}
					</p>
					<p className="home-p">
						{" "}
						Don't forget to select your account in the profile section.
					</p>
				</section>
			</div>
			<NavLink to="/articles">
				<button className="home-button">Click to view all articles</button>
			</NavLink>
		</>
	);
}
