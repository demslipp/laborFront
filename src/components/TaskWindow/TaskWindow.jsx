import React, { useState, useEffect } from 'react'
import SortPopup from '../base/SortPopup'
import Card from './Card'
import Modal from './Modal/Modal'
import { useHttp } from '../hooks/useHttp'

const TaskWindow = () => {
    const [activeSortType, setActiveSortType] = useState('name')
    const [visibleModal, setVisibleModal] = useState(false)
    const [tasks, setTasks] = useState([])
    const [selectedTask, setSelectedTask] = useState(null)
    const { loading, error, request } = useHttp()

    const items = [
        {
            name: 'Имя',
            type: 'name',
            compare: (a, b) => {
                console.log('kek')
                let x = a.title ? a.title.toLowerCase() : ''
                let y = b.title ? b.title.toLowerCase() : ''
                // return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                return x.localeCompare(y, { ignorePunctuation: true })
            },
        },
        {
            name: 'Статус',
            type: 'status',
            compare: (a, b) => {
                if (a.status === 'IN_PROGRESS' && b.status === 'CLOSE') return 1
                if (a.status === 'CLOSE' && b.status === 'IN_PROGRESS') return -1
                return 0
            },
        },
    ]

    const onClickSortType = (obj) => {
        // if (obj.type !== activeSortType) {
        console.log(obj)
        console.log(tasks)
        console.log(tasks.sort(obj.compare))
        setTasks([...tasks.sort(obj.compare)])
        // }
        setActiveSortType(obj.type)
    }

    const FetchData = async () => {
        try {
            const res = await request('/task/all')
            setTasks(res)
            //if (!!res) {
            // setTimeout(() => onClickSortType(items[0]), 1000)
            //}
        } catch (e) {
            console.log('EEE', e)
        }
    }

    useEffect(() => {
        FetchData()
        setInterval(() => FetchData(), 10000)
    }, [])

    const onCloseModal = () => {
        setTimeout(FetchData, 1000)
        setVisibleModal(false)
    }

    const onClickTask = (index) => {
        setSelectedTask(tasks[index])
        setVisibleModal(true)
    }

    const onClickNewTask = () => {
        setSelectedTask(null)
        setVisibleModal(true)
    }

    if (typeof tasks === 'undefined') {
        return null
    }

    return (
        <div className="window__task">
            {visibleModal && <Modal toogleModal={onCloseModal} taskInit={selectedTask} />}
            <div className="header">
                <SortPopup
                    items={items}
                    activeSortType={activeSortType}
                    onClickSortType={onClickSortType}
                />
                <button onClick={onClickNewTask}>+</button>
            </div>
            <Body
                loading={loading}
                error={error}
                tasks={tasks}
                onClickTask={onClickTask}
                onRefresh={onCloseModal}
            />
        </div>
    )
}

const Body = ({ loading, error, tasks, onClickTask, onRefresh }) => {
    if (error) return 'error'

    return (
        <div>
            {tasks &&
                tasks.map((val, index) => (
                    <Card
                        key={`task_card_${val.id}`}
                        index={index}
                        onRefresh={onRefresh}
                        onClick={onClickTask}
                        {...val}
                    />
                ))}
        </div>
    )
}

export default TaskWindow
