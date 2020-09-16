
import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ id, index, firstName, lastName, grade, salaryPerHour, passport, onClick }) => {
    return (
        <div onClick={() => onClick(index)} className="card">
            <div className="name">
                <span>{firstName}</span> <span>{lastName}</span>
            </div>
            <div className="badge_collection">
                <div className="badge">{grade}</div>
                <div className="badge">{salaryPerHour}$</div>
            </div>
        </div>
    )
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    grade: PropTypes.string.isRequired,
    salaryPerHour: PropTypes.number.isRequired,
    passport: PropTypes.string.isRequired,
}

export default Card
