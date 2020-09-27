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
    
    const getFilters = (filter, table) => {
        return issuesContext.issues.map(issue=>{
            if(!(issue[filter] in table)) {
                table[issue[filter]] = 1
                return <Button key={`${issue[filter]}_${issue.filter}_button`} outline color='secondary' onClick={(e)=>{
                    e.preventDefault()
                    props.updateFiltered([filter, issue[filter]])
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
                    props.updateFiltered(['org', 'all'])
                }}>All</Button>
                {getFilters('org', orgs)}
            </div>
            <div>
                <h3>Projects</h3>
                <Button outline color='secondary' onClick={(e)=>{
                    e.preventDefault()
                    props.updateFiltered(['project', 'all'])
                }}>All</Button>
                {getFilters('project', projects)}
            </div>
            <div>
                <h3>Active</h3>
                <Button outline color='secondary' onClick={(e)=>{
                    e.preventDefault()
                    props.updateFiltered(['open', 'all'])
                }}>All</Button>
                {getFilters('open', active)}
            </div>
            <div>
                <h3>Priority</h3>
                <Button outline color='secondary' onClick={(e)=>{
                    e.preventDefault()
                    props.updateFiltered(['importance', 'all'])
                }}>All</Button>
                {getFilters('importance', importance)}
            </div>
            <div>
                <h3>Role</h3>
                <Button outline color='secondary' onClick={(e)=>{
                    e.preventDefault()
                    props.updateFiltered(['role', 'all'])
                }}>All</Button>
                {getFilters('role', roles)}
            </div>
        </section>
    )
}

export default Filters