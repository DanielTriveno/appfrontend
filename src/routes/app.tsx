import ChangePasswordPage from "../pages/ChangePasswordName";
import Home from "../pages/HomePage";
import UpdateNamePage from "../pages/UpdateNamePage";
import UpdateUserNamePage from "../pages/UpdateUserNamePage";

const appRouter = [
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/update-name",
        element: <UpdateNamePage/>,
    },
    {
        path: "/update-username",
        element: <UpdateUserNamePage />,
    },
    {
        path: "/change-password",
        element: <ChangePasswordPage />,
    },
];

export default appRouter;
