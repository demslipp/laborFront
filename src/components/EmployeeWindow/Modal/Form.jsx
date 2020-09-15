import React from 'react'

const Form = ({
    firstName,
    lastName,
    grade,
    passport,
    salaryPerHour,
    handleFirstName,
    handleLastName,
    handleGrade,
    handlePassport,
    handleSalaryPerHour,
    onSubmit,
}) => {
    return (
        <form id="worker_form" onSubmit={onSubmit}>
            <label>
                {'Имя: '}
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => handleFirstName(e)}
                    placeholder="Иван"
                />
            </label>
            <label>
                {'Фамилия: '}
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => handleLastName(e)}
                    placeholder="Иванов"
                />
            </label>
            <label>
                {'Уровень: '}
                <select value={grade} onChange={(e) => handleGrade(e)}>
                    <option value="JUNIOR">junior</option>
                    <option value="MIDDLE">middle</option>
                    <option value="SENIOR">senior</option>
                </select>
            </label>
            <label>
                {'Паспорт: '}
                <input
                    type="text"
                    value={passport}
                    onChange={(e) => handlePassport(e)}
                    placeholder="12345678900"
                />
            </label>
            <label>
                {'Зарплата в час: '}
                <input
                    type="number"
                    value={salaryPerHour}
                    onChange={(e) => handleSalaryPerHour(e)}
                    placeholder="1200"
                />
            </label>
        </form>
    )
}

export default Form
