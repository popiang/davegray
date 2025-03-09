import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { fetchUsers } from "./features/users/usersSlice.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { extendedApiSlice } from "./features/posts/postsSlice.js";
import App from "./App.jsx";
import "./index.css";

store.dispatch(extendedApiSlice.endpoints.getPosts.select());
store.dispatch(fetchUsers());

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);
