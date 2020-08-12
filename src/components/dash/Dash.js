import React, {useState, useEffect} from 'react';
import {axiosAuth} from '../../util/axiosAuth'
import Filters from './filters/Filters'
import IssueList from './issueList/IssueList'

const Dash = (props) => {
    const [issues, setIssues] = useState([])
    const [filtered, setFiltered] = useState([])
    const [filters, setFilters] = useState({})
    useEffect(()=>{
        axiosAuth().get(`/issues/${props.match.params}`)
        .then(res => {
            if (res.data.error && res.data.message) {
                return console.error(res.data)
            }
            setIssues(res.data)
            setFiltered(res.data)
        })
        .catch(()=>{
            console.log('There was an issue retrieving your issues')
        })
    }, [])

    //Used in onFilterClick to clean up the filters update
    const updateFilters = (filters, filter, val, del = false) => {
        if (del) {
            delete filters[filter]
        }
        else {
            filters[filter] = val
        }
        return filters
    }
    //Used in onFilterClick to clean up setFiltered() function
    const updateFilteredIssues = () => {
        const updated = issues.filter(issue=>{
            let addIssue = true;
            //Check the issue against each filter
            for (const filter in filters) {
                if (issue[filter] !== filters[filter]) {
                    addIssue = false
                }
            }
            // Wont return if any of the filters match the issue
            if (addIssue) {return issue}
        })
        return updated
    }
    
    const onFilterClick = async (arr) => {  // arr = [filter, value]
        const filter = arr[0]
        const val = arr[1]
        //awaiting the results keeps the current render up to date with the click event
        if (filters.hasOwnProperty(filter)) {
            //Clicking all or reclicking a filter will remove that filter from the list
            if ((val === filters[filter]) || (val === 'all')) {
                await setFilters(updateFilters(filters, filter, val, true))
            }
            //Reassigns a new value to an already existing filter
            else {
                await setFilters(updateFilters(filters, filter, val))
            }
        }
        else {
            //adds a new filter to list as long as the value is not 'all'
            if (val !== 'all') {
                await setFilters(updateFilters(filters, filter, val))
            }
        }
        //Updates the list of issues to be rendered
        setFiltered(updateFilteredIssues())
    }
    return (
        <div className='dashWrapper'>
            
            <Filters issues={issues} updateFiltered={onFilterClick}/>
            <IssueList list={filtered}/>
        </div>
        
    )
}

export default Dash