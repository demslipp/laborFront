import React, { useState, useEffect } from 'react'
import Card from './Card'
import SortPopup from '../base/SortPopup'
import Modal from './Modal/Modal'
import { useHttp } from '../hooks/useHttp'

const EmployeeWindow = () => {
    const [activeSortType, setActiveSortType] = useState('name')
    const [visibleModal, setVisibleModal] = useState(false)
    const [employee, setEmployee] = useState(null)
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const { request } = useHttp()
    const FetchData = async () => {
        try {
            const res = await request('/employee/all')
            setEmployee(res)
        } catch (e) {}
    }

    useEffect(() => {
        FetchData()
    }, [])

    const items = [
        {
            name: 'Имя',
            type: 'name',
            compare: (a, b) => {
                let x = a.firstName ? a.firstName.toLowerCase() : ''
                let y = b.firstName ? b.firstName.toLowerCase() : ''
                // return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                return x.localeCompare(y, { ignorePunctuation: true })
            },
        },
        {
            name: 'Зарплата',
            type: 'price',
            compare: (a, b) => {
                if (a.salaryPerHour < b.salaryPerHour) return 1
                if (a.salaryPerHour > b.salaryPerHour) return -1
                return 0
            },
        },
    ]

    const onClickSortType = (obj) => {
        setEmployee(employee.sort(obj.compare))
        setActiveSortType(obj.type)
    }

    const onCloseModal = () => {
        setTimeout(FetchData, 3000)
        setVisibleModal(false)
    }

    const onClickEmployee = (id) => {
        setSelectedEmployee(employee[id])
        setVisibleModal(true)
    }

    const onClickNewEmployee = () => {
        setSelectedEmployee(null)
        setVisibleModal(true)
    }

    return (
        <div className="window__employee">
            {visibleModal && (
                <Modal toogleModal={onCloseModal} selectedEmployee={selectedEmployee} />
            )}
            <div className="header">
                <SortPopup
                    items={items}
                    activeSortType={activeSortType}
                    onClickSortType={onClickSortType}
                />
                <button onClick={onClickNewEmployee}>+</button>
            </div>
            {employee &&
                employee.map((val, index) => (
                    <Card key={val.id} index={index} onClick={onClickEmployee} {...val} />
                ))}
        </div>
    )
}

export default EmployeeWindow
