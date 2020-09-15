import React from 'react'
import ProgressBar from '../base/ProgressBar'
import { useHttp } from '../hooks/useHttp'

const Card = ({
    id,
    index,
    title,
    description,
    estimatedTimeInHours,
    priority,
    status,
    doneInPercents,
    difficultyДevel,
    onRefresh,
    onClick,
}) => {
    const { request } = useHttp()
    const onDelete = () => {
        request('/task/delete' + '?id=' + id, 'DELETE')
        onRefresh()
    }
    return (
        <div className="card">
            <div className="card__header">
                <div className="title">{title}</div>
                <div className="badge_collection">
                    <div className="badge">{priority}</div>
                    <div className="badge">{status}</div>
                </div>
            </div>
            <div className="card__progress"></div>
            <div className="card__body">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {'Прогресс: '}
                    <ProgressBar percentage={doneInPercents} />
                </div>
                <div>{'Предпологаемые затраты по времени:' + (estimatedTimeInHours ?? 0)}</div>
                <div className="description">{description}</div>
            </div>
            <div className="card__footer">
                <button onClick={onDelete}>Удалить</button>
                <button onClick={() => onClick(index)}>Открыть</button>
            </div>
        </div>
    )
}

export default Card
