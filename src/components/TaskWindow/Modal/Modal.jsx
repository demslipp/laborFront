import React, { useState, useEffect } from 'react'
import Form from './Form'
import Info from './Info'
import { useHttp } from '../../hooks/useHttp'

const Modal = ({ toogleModal, taskInit }) => {
    const [preview, setPreview] = useState(false)
    const { request } = useHttp()
    const [task, setTask] = useState(null)

    const handleTitle = (e) => {
        setTask({ ...task, title: e.target.value })
    }
    const handleDescription = (e) => {
        setTask({ ...task, description: e.target.value })
    }
    const handlePriority = (e) => {
        setTask({ ...task, priority: e.target.value })
    }
    const handleStatus = (e) => {
        setTask({ ...task, status: e.target.value })
    }
    const handleDifficultyLevel = (e) => {
        setTask({ ...task, difficultyLevel: e.target.value })
    }
    const handleCost = (e) => {
        setTask({ ...task, taskCost: e.target.value })
    }
    const handleAddEmployee = (id) => {
        request(`/assignment/assign/e/${id}/t/${task.id}`)
    }
    const handleDeleteEmployee = (id) => {
        request(`/assignment/unassign/e/${id}/t/${task.id}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (taskInit === null) {
                await request('/task/create', 'POST', task)
                return
            }
            let t = task
            delete t.updated
            delete t.created
            t = [t]
            await request('/task', 'PUT', t)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (taskInit === null) {
            setTask({
                title: null,
                description: null,
                status: 'OPEN',
                priority: 'NORMAL',
                difficultyLevel: null,
                taskCost: null,
                employee: [],
            })
        } else {
            setTask(taskInit)
            setPreview(true)
        }
    }, [])

    if (task === null) {
        return null
    }

    return (
        <div className="modal__overlay">
            <div className="modal__window">
                <div className="modal__header">
                    <h3>Добавить задачу</h3>
                </div>
                <div className="modal__body">
                    {preview ? (
                        <Info {...task} />
                    ) : (
                        <Form
                            {...task}
                            handleTitle={handleTitle}
                            handleDescription={handleDescription}
                            handlePriority={handlePriority}
                            handleStatus={handleStatus}
                            handleDifficultyLevel={handleDifficultyLevel}
                            handleCost={handleCost}
                            handleAddEmployee={handleAddEmployee}
                            handleDeleteEmployee={handleDeleteEmployee}
                            handleSubmit={handleSubmit}
                        />
                    )}
                    {/* <AddWorker {...task} /> */}
                </div>
                <div className="modal__footer">
                    <button onClick={toogleModal}>Отменить</button>
                    <button onClick={() => setPreview(!preview)}>
                        {preview ? 'Изменить' : 'Предсмотр'}
                    </button>
                    <button
                        form="task_form"
                        type="submit"
                        onClick={(e) => {
                            handleSubmit(e)
                            toogleModal()
                        }}
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal
