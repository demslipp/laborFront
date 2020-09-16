import React, { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/useHttp'

const AddWorker = ({ id, employee }) => {
    const { request } = useHttp()
    const [allWorkers, setAllWorkers] = useState(null)
    const [nonWorker, setNonWorker] = useState([])
    const [workers, setWorkers] = useState([])

    const Fetch = async () => {
        try {
            const res = await request('/employee/all')
            console.log('w', res)
            const ids = employee.map((ids) => ids.id)
            const non = res.filter((val) => {
                console.log('kek', val, !ids.includes(val.id))
                return !ids.includes(val.id)
            })
            setAllWorkers(res)
            setNonWorker(non)
            setWorkers(employee)
        } catch (e) {
            console.log('Error', e)
        }
    }

    const handleAddEmployee = (idWorker) => {
        request(`/assignment/assign/e/${idWorker}/t/${id}`)
        setWorkers([...workers, ...allWorkers.filter((val) => val.id === idWorker)])
        setNonWorker([...nonWorker.filter((val) => val.id !== idWorker)])
    }

    const handleDeleteEmployee = (idWorker) => {
        request(`/assignment/unassign/e/${idWorker}/t/${id}`)

        setWorkers([...workers.filter((val) => val.id !== idWorker)])
        setNonWorker([...nonWorker, ...allWorkers.filter((val) => val.id === idWorker)])
    }

    useEffect(() => {
        Fetch()
    }, [])

    return (
        <div className="add-worker">
            <div>
                <div className="title">{'Работают'}</div>
                {workers &&
                    workers.map((val) => (
                        <div key={`${val.id}_work`} onClick={() => handleDeleteEmployee(val.id)}>
                            {val.firstName}
                        </div>
                    ))}
            </div>
            <div>
                <div className="title">{'Не работают'}</div>
                {nonWorker &&
                    nonWorker.map((val) => (
                        <div key={`${val.id}_nonwork`} onClick={() => handleAddEmployee(val.id)}>
                            {val.firstName}
                        </div>
                    ))}
            </div>
        </div>
    )
}

AddWorker.propTypes = {}

export default AddWorker
