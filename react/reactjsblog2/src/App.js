import { Route, Routes } from "react-router-dom";
import About from "./About";
import EditPost from "./EditPost";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import { useEffect, useState } from "react";
import api from "./api/posts";

function App() {
    const [search, setSearch] = useState("");
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get("/");
				setPosts(response.data);
			} catch (error) {
				console.log(error.message);
			}
		}

		fetchData();
	}, []);

    return (
        <div className="App">
            <Header />
            <Nav search={search} setSearch={setSearch} />
            <Routes>
                <Route exact path="/" element={<Home posts={posts} />} />
                <Route path="/posts/:id" element={<PostPage />} />
                <Route exact path="/post" element={<NewPost />} />
                <Route path="/edit/:id" element={<EditPost />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Missing />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
