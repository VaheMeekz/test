import React, {useEffect} from 'react';
import {Route, Routes,useNavigate} from "react-router-dom";
import {authPages, isAuthPages} from "../../routing/routes";
import {useDispatch, useSelector} from "react-redux";
import {token} from "../../config/keys";
import {authAC} from "../../store/actions/authAction";

const Pages = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.auth.auth);
    useEffect(() => {
        if (token) {
            dispatch(authAC(true))
        }else {
            navigate('/sign-in')
        }
    }, []);
    return (
        <Routes>
            {
                isAuth
                    ?
                    authPages.map(({id, path, Component}) => {
                        return <Route path={path} element={<Component/>} key={id}/>;
                    })
                    :
                    isAuthPages.map(({id, path, Component}) => {
                        return <Route path={path} element={<Component/>} key={id}/>;
                    })
            }
        </Routes>
    );
};

export default Pages;