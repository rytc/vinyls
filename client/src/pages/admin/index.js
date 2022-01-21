import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import SearchRecords from '../../components/SearchRecords.js';
import VinylList from '../../components/VinylList/VinylList.js';


const Admin = (props) => {

    const [adminState, setAdminState] = useState({
        records: [],
        jwt: localStorage.getItem('jwt')
    })

    useEffect(() => {
        fetch("/api/records")
            .then(res => res.json())
            .then(result => {
                setAdminState({
                    isLoaded: true,
                    records: result
                });
            },
                (err) => {
                    setAdminState({
                        isLoaded: false,
                        error: err
                    })
                });

    }, []);

    const onItemClick = (event) => {
        alert('bleh');
    }

    return (
        <>
            <h1>Admin</h1>
            <Link to="/">Home</Link>
            <h2>Add a new record</h2>
            <SearchRecords jwt={adminState.jwt}/>
            
            <h2>Record List</h2>
            <VinylList items={adminState.records} onItemClick={onItemClick} />
        </>

    )
}

export default Admin;