import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const AllSongs = () => {
    const [songs,setSongs]=useState();
    const navigate=useNavigate();
    const user = useSelector((state) => state.login.user);
    useEffect(() => {
        if (user === null) {
            fetchAllSongs();
        }
    }, [])

    const fetchAllSongs = async () => {
        try {
            const response = await axios.get("https://localhost:7001/api/Song");
            
        }
        catch {

        }
    }
    return (<></>);
}

export default AllSongs;