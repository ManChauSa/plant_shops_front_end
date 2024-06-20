import axios from "axios";
import store from "../store/store";
export const host = "http://localhost:8080";
const client = axios.create({ baseURL: host });
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 403) {
            store.dispatch({type: "logout"});
            window.location = '/login';
        }

        // reject with error if response status is not 403
        return Promise.reject(error);
    }
);

const useAPI = () => {
    const GetClient = (path, token, headers = { "Content-Type": "Application/json" }) => {
        let config = {
            headers: {
                ...headers,
            }
        }
        if (token) {
            config = {
                headers: {
                    ...headers,
                    Authorization: "Bearer " + token
                }
            }
        }
        return client.get(path, config);
    }

    const PostClient = (path, data, token, headers = { "Content-Type": "Application/json" }) => {
        let config = {
            headers: {
                ...headers,
            }
        }
        if (token) {
            config = {
                headers: {
                    ...headers,
                    Authorization: "Bearer " + token
                }
            }
        }
        return client.post(host + path, data, config);
    }

    const PutClient = (path, data, token, headers = { "Content-Type": "Application/json" }) => {
        const config = {
            headers: {
                ...headers,
                Authorization: "Bearer " + token
            }
        }
        return client.put(path, data, config);
    }

    const DeleteClient = (path, token, headers = { "Content-Type": "Application/json" }) => {
        let config = {
            headers: {
                ...headers,
            }
        }
        if (token) {
            config = {
                headers: {
                    ...headers,
                    Authorization: "Bearer " + token
                }
            }
        }
        return client.delete(path, config);
    }

    return { PostClient, GetClient, DeleteClient, PutClient }
}

export default useAPI;