import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import Table from './Table';
import Crud from './Crud';
import Description from './Description';
import NoPage from './NoPage';
import { useDispatch } from 'react-redux';
import { setData } from '../slices/dataSlice';
import axios from 'axios';

export default function Routing() {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axios.get("https://jsonplaceholder.typicode.com/comments?_limit=20");
                dispatch(setData(res.data));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<Description />} />
                    <Route path="table" element={<Table />} />
                    <Route path="crud" element={<Crud />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
