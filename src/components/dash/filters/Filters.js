import React from 'react';
import {useIssues} from '../../../contexts/IssuesContext'
import { Button } from 'reactstrap'

const Filters = () => {
    const issuesContext = useIssues()
    //Objects allow for O(1) lookup for when checking if a filter has already been listed.
    let projects = {}
    let orgs = {}
    let roles = {}
    let importance = {}
    let active = {}

    const updateFilters = (filter, value) => {
        const contextFilters = {...issuesContext.filters} // new mutable object of filters
        
        //if there is a double click or 'all' click remove filter
        if (value === ('all' || contextFilters[filter])) {
            delete contextFilters[filter]
        }
        //else assign/reassign filter to the value
        else {
            contextFilters[filter] = value
        }
        //updates filters in context
        issuesContext.update(issuesContext.filters, contextFilters)
    }
    

    const getFilters = (filter, table) => {
        return issuesContext.issues.map(issue=>{
            if(!(issue[filter] in table)) {
                table[issue[filter]] = 1
                return <Button key={`${issue[filter]}_${issue.filter}_button`} outline color='secondary' onClick={(e)=>{
                    e.preventDefault()
                    updateFilters(filter, issue[filter])
                }}>{`${issue[filter]}`}</Button>
            }
            else {
                table[issue[filter]] ++
            }
        })
    }
    return (
        <section className='filtersWrapper'>
            <h2>Filters</h2>
            <div>
                <h3>Orgs</h3>
                <Button outline color='secondary' onClick={(e)=>{
                    e.preventDefault()
                    updateFilters('org', 'all')
                }}>All</Button>
                {getFilters('org', orgs)}
            </div>
            <div>
                <h3>Projects</h3>
                <Button outline color='secondary' onClick={(e)=>{
                    e.preventDefault()
                    updateFilters('project', 'all')
                }}>All</Button>
                {getFilters('project', projects)}
            </div>
            <div>
                <h3>Active</h3>
                <Button outline color='secondary' onClick={(e)=>{
                    e.preventDefault()
                    updateFilters('open', 'all')
                }}>All</Button>
                {getFilters('open', active)}
            </div>
            <div>
                <h3>Priority</h3>
                <Button outline color='secondary' onClick={(e)=>{
                    e.preventDefault()
                    updateFilters('importance', 'all')
                }}>All</Button>
                {getFilters('importance', importance)}
            </div>
            <div>
                <h3>Role</h3>
                <Button outline color='secondary' onClick={(e)=>{
                    e.preventDefault()
                    updateFilters('role', 'all')
                }}>All</Button>
                {getFilters('role', roles)}
            </div>
        </section>
    )
}

export default Filters