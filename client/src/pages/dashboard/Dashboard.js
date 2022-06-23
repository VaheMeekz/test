import React, {useState,useEffect} from 'react';
import DashboardMain from "../../components/dashboard";
import {useDispatch, useSelector} from "react-redux";
import {getWorkspacesAC} from "../../store/actions/workspaceAction";
import CircularProgress from '@mui/material/CircularProgress';
import {makeArray} from "../../components/helpers/makeArray/makeArray";
const Dashboard = () => {


    const limit = 5;
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState([]);
    const workspaces = useSelector(state => state.workspace.workspaces);
    const count = useSelector(state => state.workspace.count);
    const loading = useSelector(state => state.workspace.loading);

    useEffect(()=>{
        dispatch(getWorkspacesAC(page,limit))
    },[page]);

    useEffect(() => {
        if (count) {
            setPages(makeArray(Math.ceil(count / limit)));
        }
    }, [count]);


    return (
        <div>
            {
                loading ? <CircularProgress /> : <DashboardMain data={workspaces} page={page} setPage={setPage} pages={pages}/>
            }
        </div>
    );
};

export default Dashboard;