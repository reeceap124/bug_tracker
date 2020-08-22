import React, {useState} from 'react';
import {Button} from 'reactstrap'

import OrgModal from './OrgModal';
import ProjectModal from './ProjectModal';
import IssueModal from './IssueModal';

const ModalSelect = (props) => {
    const [goal, setGoal] = useState(null)
    const [modal, setModal] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [created, setCreated] = useState({org: null, project: null})

    const goalButton = (textStr, goalStr, toggle ) => {
        if (goal === null) {
            return <Button onClick={()=>{
                setGoal(goalStr)
                const runToggle = () => toggle
                runToggle()
            }}>{textStr}</Button>
        }
    }

    const goToModal = (nextModal = null)=> {
        if (modal !== goal) {
            setModal(nextModal)
        }
    }

    const updateCreated = (update) => {
        setCreated(update)
    }
    console.log("CREATED:", created)
    const cancelCreation = () => {
        setGoal(null)
        setModal(null)
        setCreated({org:null, project:null})
    }
    return (
        <>
        <IssueModal id={props.id} modal={modal} setModal={setModal} goalButton={goalButton} goToModal={goToModal} created={created} cancelCreation={cancelCreation}/>
        <ProjectModal id={props.id} modal={modal} setModal={setModal} goalButton={goalButton} goToModal={goToModal} created={created} cancelCreation={cancelCreation} updateCreated={updateCreated}/>
        <OrgModal id={props.id} modal={modal} setModal={setModal} goalButton={goalButton} goToModal={goToModal} created={created} cancelCreation={cancelCreation} updateCreated={updateCreated}/>
        </>
    )
}

export default ModalSelect