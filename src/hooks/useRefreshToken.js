import axios from "../apis/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
    const { setAuth } = useAuth();

    async function refresh() {
        const response = await axios.get('/token', {
            withCredentials: true
        });
        setAuth(prev => {
            return { ...prev, accessToken: response.data.accessToken, userId: response.data.userId }
        });
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken