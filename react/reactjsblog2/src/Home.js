const Home = ({posts}) => {
	return (
		<main className="Home">
			<h1>Main</h1>
			{posts && posts.map(post => (
				<p>{post.id}</p>
			))}
		</main>
	);
}

export default Home;
