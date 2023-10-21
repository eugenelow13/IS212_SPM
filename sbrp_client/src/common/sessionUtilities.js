import { redirect } from "react-router-dom";

export function getLoggedInUser() {
    return JSON.parse(window.sessionStorage.getItem("user"));
}

export function loginUser(user) {
    window.sessionStorage.setItem("user", JSON.stringify(user));
}

export function logoutUser() {
    window.sessionStorage.clear()
}

export function redirectIfNotLoggedInFactory(loader) {
    return function({ params }) {
        if (!getLoggedInUser()) {
            throw redirect("/");
        }
        return loader({ params });
    }
}