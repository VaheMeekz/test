import SignUp from "../pages/signUp/SignUp";
import SignIn from "../pages/signIn/SignIn";
import Dashboard from "../pages/dashboard/Dashboard";
import {dashboardPage, signInPage, signUpPage} from "./urls";

export const isAuthPages = [
    {id: 1, path: signUpPage, name: "Sign Up", Component: SignUp},
    {id: 2, path: signInPage, name: "Sign In", Component: SignIn},
]

export const authPages = [
    {id: 1, path: dashboardPage, name: "Dashboard", Component: Dashboard},
]