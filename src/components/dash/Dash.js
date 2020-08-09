import React, {useState, useEffect} from 'react';
import {axiosAuth} from '../../util/axiosAuth'
import Filters from './filters/Filters'
import IssueList from './issueList/IssueList'

const Dash = () => {
    const [issues, setIssues] = useState([])
    const [filters, setFilters] = useState({})
    const [filtered, setFiltered] = useState([])
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
    const updateFilteredIssues = (arr) => {
        console.log('filtered on click', filters)
        const filter = arr[0]
        const val = arr[1]
        if ((filters.hasOwnProperty(filter)) && val === 'all') {
            setFilters(()=>{ //Not sure if there's a better/more concise way to do this
                const newObj = {}
                for (let prop in filters) {
                    if(filters.hasOwnProperty(prop) && prop !== filter) {
                        newObj[prop] = filters[prop]
                    }
                }
                return newObj
            })
            setFiltered(()=>{
                let temp = []
                issues.forEach(issue=>{
                    for (const f in filters) {
                    if ((issue[f] === filters[f]) && !temp.includes(issue)) {
                        
                        temp.push(issue)
                    }
                    }
                })
                return temp
            })
        }
        else if ((filters.hasOwnProperty(filter)) && (filters[filter] !== val)) {
            setFilters(()=>{
            let temp = filters;
            temp[filter] = val
            return temp
        })
            setFiltered(()=>{
                let temp = []
                issues.forEach(issue=>{
                    for (const f in filters) {
                    if (issue[f] === val) {
                        temp.push(issue)
                    }
                    }
                })
                return temp
            })
        }
        else if (!filters.hasOwnProperty(filter)) {
            setFilters(()=>{
            let temp = filters;
            temp[filter] = val
            return temp
        })
            setFiltered(filtered.filter(issue=>{return issue[filter] === val}))
        }
    }
    return (
        <div>
            <h1>Hello from the dash</h1>
            <IssueList list={filtered}/>
            <p>_________________________________________________</p>
            <Filters issues={issues} updateFiltered={updateFilteredIssues}/>
        </div>
        
    )
}

export default Dash