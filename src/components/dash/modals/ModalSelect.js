import React, {useState} from 'react';
import {Button} from 'reactstrap'

import OrgModal from './OrgModal';
import ProjectModal from './ProjectModal';
import IssueModal from './IssueModal';

const ModalSelect = (props) => {
    const [goal, setGoal] = useState(null)
    const [modal, setModal] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

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
    return (
        <>
        <IssueModal id={props.id} modal={modal} setModal={setModal} goalButton={goalButton} goToModal={goToModal}/>
        <ProjectModal id={props.id} modal={modal} setModal={setModal} goalButton={goalButton} goToModal={goToModal}/>
        <OrgModal id={props.id} modal={modal} setModal={setModal} goalButton={goalButton} goToModal={goToModal}/>
        </>
    )
}

export default ModalSelect