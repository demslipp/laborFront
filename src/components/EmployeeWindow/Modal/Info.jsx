import React from 'react'

const Info = ({ firstName, lastName, grade, salaryPerHour, passport }) => {
    return (
        <div>
            <div>{'Имя: ' + firstName}</div>
            <div>{'Фамилия: ' + lastName}</div>
            <div>{'Уровень: ' + grade}</div>
            <div>{'Зарплата: ' + salaryPerHour}</div>
            <div>{'Паспорт: ' + passport}</div>
        </div>
    )
}

export default Info
