import React, {useState, useEffect} from 'react';
import {axiosAuth} from '../../util/axiosAuth'

const Dash = () => {
    const [issues, setIssues] = useState()
    useEffect(()=>{
        axiosAuth().get('/issues/1')
        .then(res => {
            setIssues(res.data)
        })
        .catch(()=>{
            console.log('There was an issue retrieving your issues')
        })
    }, [])
    console.log('issues', issues)
    return (
        <h1>Hello from the dash</h1>
    )
}

export default Dash