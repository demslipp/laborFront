import React, { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/useHttp'
import Info from './Info'
import Form from './Form'

const Modal = ({ toogleModal, selectedEmployee }) => {
    const { loading, error, request } = useHttp()
    const [employee, setEmployee] = useState(null)
    const [preview, setPreview] = useState(false)

    const handleFirstName = (e) => {
        setEmployee({ ...employee, firstName: e.target.value })
    }
    const handleLastName = (e) => {
        setEmployee({ ...employee, lastName: e.target.value })
    }
    const handleGrade = (e) => {
        setEmployee({ ...employee, grade: e.target.value })
    }
    const handlePassport = (e) => {
        setEmployee({ ...employee, passport: e.target.value })
    }
    const handleSalaryPerHour = (e) => {
        setEmployee({ ...employee, salaryPerHour: e.target.value })
    }

    const onSumbit = (e) => {
        e.preventDefault()
        request('/employee/create', 'POST', employee)
    }

    useEffect(() => {
        if (selectedEmployee === null) {
            setEmployee({
                firstName: null,
                lastName: null,
                grade: 'JUNIOR',
                passport: null,
                salaryPerHour: null,
            })
        } else {
            setEmployee(selectedEmployee)
            setPreview(true)
        }
    }, [selectedEmployee])

    return (
        <div className="modal__overlay">
            <div className="modal__window">
                <div className="modal__header">
                    <h3>Добавить работника</h3>
                </div>
                <div className="modal__body">
                    {preview ? (
                        <Info {...employee} />
                    ) : (
                        <Form
                            {...employee}
                            handleFirstName={handleFirstName}
                            handleLastName={handleLastName}
                            handleGrade={handleGrade}
                            handlePassport={handlePassport}
                            handleSalaryPerHour={handleSalaryPerHour}
                            onSubmit={onSumbit}
                        />
                    )}
                </div>
                <div className="modal__footer">
                    <button onClick={toogleModal}>Отменить</button>
                    <button onClick={() => setPreview(!preview)}>
                        {preview ? 'Изменить' : 'Предсмотр'}
                    </button>
                    <button
                        form="worker_form"
                        type="submit"
                        onClick={(e) => {
                            onSumbit(e)
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
