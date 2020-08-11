import React, {useState, useEffect} from 'react';
import {axiosAuth} from '../../util/axiosAuth'
import Filters from './filters/Filters'
import IssueList from './issueList/IssueList'

const Dash = () => {
    const [issues, setIssues] = useState([])
    const [filtered, setFiltered] = useState([])
    const [filters, setFilters] = useState({})
    let excluded = {};
    useEffect(()=>{
        axiosAuth().get('/issues/1')
        .then(res => {
            setIssues(res.data)
            setFiltered(res.data)
        })
        .catch(()=>{
            console.log('There was an issue retrieving your issues')
        })
    }, [])
    // array ---> [filter, value]
    const updateFilteredIssues = async (arr) => {
        const filter = arr[0]
        const val = arr[1]
        if (filters.hasOwnProperty(filter)) {
            console.log('it is in filters')
            if ((val === filters[filter]) || (val === 'all')) {
                console.log('Value is the same')
                await setFilters(()=>{
                    let temp = filters;
                    delete temp[filter];
                    return temp
                })
            }
            else {
                console.log('value is not the same')
                await setFilters(()=> {
                    let temp = filters;
                    temp[filter] = val
                    return temp
                })
            }
        }
        else {
            if (val !== 'all') {
                await setFilters(()=>{
                    let temp = filters;
                    temp[filter] = val;
                    return temp
                })
            }
            
        }
        console.log("FILTERS:", filters)
        setFiltered(issues.filter(issue=>{
            
            let addIssue = true;
            for (const f in filters) {
                if (issue[f] !== filters[f]) {
                    addIssue = false
                }
            }
            if (addIssue) {
                return issue
            }
        }))
        
    }
    return (
        <div className='dashWrapper'>
            
            <Filters issues={issues} updateFiltered={updateFilteredIssues}/>
            <IssueList list={filtered}/>
        </div>
        
    )
}

export default Dash