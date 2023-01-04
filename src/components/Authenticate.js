import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const Authenticate = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const verifyRefreshToken = async () => {
            try {
                // console.log("here");
                await refresh();
            }
            catch (err) {
                console.error(err);
                //console.log();
            }
            finally {
                setIsLoading(false);
            }
        }

        // Avoids unwanted call to verifyRefreshToken
        !auth?.accessToken? verifyRefreshToken() : setIsLoading(false);

    }, [refresh, auth?.accessToken])

    return (
        <>
            {isLoading
                ? <div className="spinner-border text-danger" style={{width: 50, height: 50}} role="status"></div>
                : <Outlet />
            }
        </>
    )
}

export default Authenticate