import React from 'react'

const Info = ({
    title,
    description,
    priority,
    status,
    difficultyLevel,
    taskCost,
    created,
    doneInPercents,
    updated,
}) => {
    return (
        <div>
            <div>{'Название: ' + title}</div>
            <div>{'Описание: ' + description}</div>
            <div>{'Приоритет: ' + priority}</div>
            <div>{'Статус: ' + status}</div>
            <div>{'Сложность: ' + difficultyLevel}</div>
            <div>{'Стоимость: ' + taskCost}</div>
            {created && (
                <div>
                    {'Создана: ' +
                        `${created[2]}.${created[1]}.${created[0]}:${created[3]}.${created[4]}`}
                </div>
            )}
            {doneInPercents && <div>{'Выполнено: ' + doneInPercents}</div>}
            {updated && (
                <div>
                    {'Изменено: ' +
                        `${updated[2]}.${updated[1]}.${updated[0]}:${updated[3]}.${updated[4]}`}
                </div>
            )}
        </div>
    )
}

export default Info
