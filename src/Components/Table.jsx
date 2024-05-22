import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';

export default function Table() {
    const [state, setState] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredState, setFilteredState] = useState([]);
    const itemsPerPage = 10;


    // Normal fetch Data Method 

    // useEffect(() => {
    //     get_Api();
    // }, []);

    // const get_Api = async () => {
    //     try {
    //         let res = await axios.get("https://jsonplaceholder.typicode.com/comments?_limit=20");
    //         setState(res.data);
    //         setFilteredState(res.data);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    let reduxData = useSelector((state) => state.data.data)

    useEffect(() => {
        console.log(reduxData);
        setState(reduxData);
        setFilteredState(reduxData);
    }, [reduxData])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        const filteredData = state.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.email.toLowerCase().includes(query.toLowerCase()) ||
            item.body.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredState(filteredData);
        setCurrentPage(1);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredState.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        return pageNumbers.map(number => (
            <button key={number} onClick={() => handlePageChange(number)} className={currentPage === number ? "active" : ""}>
                {number}
            </button>
        ));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredState.slice(indexOfFirstItem, indexOfLastItem);

    const headers = [
        { label: "S.No", key: "sno" },
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Comments", key: "body" }
    ];

    const csvData = currentItems.map((item, index) => ({
        sno: indexOfFirstItem + index + 1,
        name: item.name,
        email: item.email,
        body: item.body
    }));

    return (
        <>
            <div className="container tableStyle">
            <h1 style={{textAlign:"center"}}>Table Using Redux</h1>
                <div className="group">
                    <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                        <g>
                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                        </g>
                    </svg>
                    <input placeholder="Search" type="search" className="input" value={searchQuery} onChange={handleSearch} />
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? currentItems.map((val, i) => (
                            <tr key={indexOfFirstItem + i}>
                                <td>{indexOfFirstItem + i + 1}</td>
                                <td>{val.name}</td>
                                <td>{val.email}</td>
                                <td>{val.body}</td>
                            </tr>
                        )) : <p style={{ textAlign: "center" }}>No Data Is There</p>}
                    </tbody>
                </table>
                <div className="pagination">
                    {renderPageNumbers()}
                </div>
                <CSVLink
                    data={csvData}
                    headers={headers}
                    className='button'
                    filename='registerdata.xslx'
                >

                    <span className="button__text"> Export Data</span>
                    <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="bdd05811-e15d-428c-bb53-8661459f9307" data-name="Layer 2" className="svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>

                </CSVLink>


            </div>
        </>
    );
}
