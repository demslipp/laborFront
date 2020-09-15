import React from 'react'
import EmployeeWindow from './components/EmployeeWindow/EmployeeWindow'
import TaskWindow from './components/TaskWindow/TaskWindow'

function App() {
    return (
        <div className="wrapper">
            <EmployeeWindow></EmployeeWindow>
            <TaskWindow></TaskWindow>
        </div>
    )
}

export default App
