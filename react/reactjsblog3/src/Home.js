import Feed from "./Feed";

const Home = ({posts}) => {
	return (
		<main className="Home">
			{posts && <Feed posts={posts} />}
		</main>
	);
}

export default Home;
