// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import App from "./App.jsx";
import "./index.css";
import { fetchUsers } from "./features/users/usersSlice.js";

store.dispatch(fetchUsers());

createRoot(document.getElementById("root")).render(
    // <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    // </StrictMode>
);
