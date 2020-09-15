import React from 'react'
import AddWorker from './AddWorker'

const Form = ({
    id,
    employee,
    title,
    description,
    priority,
    status,
    difficultyLevel,
    taskCost,
    handleTitle,
    handleDescription,
    handleStatus,
    handlePriority,
    handleDifficultyLevel,
    handleCost,
    handleSubmit,
}) => {
    return (
        <>
            <form id="task_form" onSubmit={handleSubmit}>
                <label>
                    {'Название: '}
                    <input placeholder={'Задача'} value={title} onChange={(e) => handleTitle(e)} />
                </label>
                <label>
                    {'Описание: '}
                    <textarea
                        placeholder={'Сложная задача'}
                        value={description}
                        onChange={(e) => handleDescription(e)}
                    />
                </label>
                <label>
                    {'Приоритет: '}
                    <select value={priority} onChange={(e) => handlePriority(e)}>
                        <option value="LOW">low</option>
                        <option value="HIGH">high</option>
                        <option value="CRITICAL">critical</option>
                    </select>
                </label>
                <label>
                    {'Статус: '}
                    <select value={status} onChange={(e) => handleStatus(e)}>
                        <option value="OPEN">open</option>
                        <option value="CLOSE">close</option>
                    </select>
                </label>
                <label>
                    {'Сложность: '}
                    <input type="number" value={difficultyLevel} onChange={handleDifficultyLevel} />
                </label>
                <label>
                    {'Стоимость: '}
                    <input type="number" value={taskCost} onChange={handleCost} />
                </label>
                <div className="assign"></div>
                <div className="no-assign"></div>
            </form>
            {id && <AddWorker id={id} employee={employee} />}
        </>
    )
}

export default Form
