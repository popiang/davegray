import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "./api/posts";
import Home from "./Home";
import PostPage from "./PostPage";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import About from "./About";
import Missing from "./Missing";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {

    return (
        <div className="App">
            <Header />
            <Nav search={search} setSearch={setSearch} />
            <Routes>
                <Route path="/" exact element={<Home posts={posts} />} />
                <Route
                    path="/post/:id"
                    element={
                        <PostPage posts={posts} handleDelete={handleDelete} />
                    }
                />
                <Route
                    path="/post"
                    element={
                        <NewPost
                            postTitle={postTitle}
                            setPostTitle={setPostTitle}
                            postBody={postBody}
                            setPostBody={setPostBody}
                            handleSubmit={handleSubmit}
                        />
                    }
                />
                <Route
                    path="/edit/:id"
                    element={
                        <EditPost
                            posts={posts}
                            editTitle={editTitle}
                            setEditTitle={setEditTitle}
                            editBody={editBody}
                            setEditBody={setEditBody}
                            handleEdit={handleEdit}
                        />
                    }
                />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Missing />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
