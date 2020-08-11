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