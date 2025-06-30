import { createContext, useEffect, useState } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "../api/posts";

const DataContext = createContext();

const DataContextProvider = ({children}) => {
	const {data, fetchError, isLoading} = useAxiosFetch("http://localhost:3500")
	const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setPosts(data);
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPost = {
                id: posts.length ? posts[posts.length - 1].id + 1 : 1,
                title: postTitle,
                datetime: format(new Date(), "MMMM dd, yyyy pp"),
                body: postBody,
            };

            const response = await api.post("/", newPost);
            const allPosts = [...posts, response.data];
            setPosts(allPosts);
            setPostTitle("");
            setPostBody("");
            navigate("/");
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    };

    const handleEdit = async (id) => {
        try {
            const updatedPost = {
                id,
                title: editTitle,
                datetime: format(new Date(), "MMMM dd, yyyy pp"),
                body: editBody,
            };

            const response = await api.put(`/${id}`, updatedPost);
            setPosts(
                posts.map((post) => (post.id === id ? response.data : post))
            );
            setEditTitle("");
            setEditBody("");
            navigate("/");
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/${id}`);
            const postsList = posts.filter((post) => post.id.toString() !== id);
            setPosts(postsList);
            navigate("/");
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    };


	return (
		<DataContext.Provider>
			{children}
		</DataContext.Provider>
	)
}