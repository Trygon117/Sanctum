import { useSelector } from "react-redux";
import "../pages.css";
import "./home.css";
import Login from "../../components/login/Login";
import * as query from "../../functions/query";

const Home = (props) => {
    const lightMode = useSelector((state: any) => state.page.lightMode);
    const account = useSelector((state: any) => state.page.account);

    const logout = () => {
        query.GET("/logout")
            .then((result) => {
                console.log(result);
                if (!result.loggedIn) {
                    window.location.pathname = '/';
                }
            });
    }

    return (
        <div className={lightMode ? "page light" : "page dark"}>
            {account != null ?
                <div className="home-container">
                    <div className="user">
                        <div className="profile"></div>
                        <div className="username">{account.username}</div>
                        <div onClick={logout}>logout</div>
                    </div>

                    <div className="display">
                    </div>
                </div>
                :
                <div className="login-container">
                    <Login />
                </div>
            }

        </div>
    );
}

export default Home;