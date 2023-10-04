import http from "../http_common";

const setAuthToken = (token: string) => {
    if (token) {
        // в axios записує токен
        http.defaults.headers.common["Authorization"] = `Bearer ${token}`; // по цьому сєрвак буде знати, що ми авторизовані.
        // Кожен axios запрос, буде передавати наш токен і вказувати, що юзер авторизований
        localStorage.token = token;
    }
    else {
        // видаляєм з axios токен
        delete http.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
    }
}

export default setAuthToken;