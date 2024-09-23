import React from 'react';

const DoctorCard = ({ doctor }) => {
    return (
        <div className="bg-teal-50 border border-teal-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className='text-xl font-semibold text-teal-800'>{doctor.name}</h2>
            <p className='text-teal-600'><strong>Specialization:</strong> {doctor.specialization}</p>
            <p className='text-teal-600'><strong>Degree:</strong> {doctor.degree}</p>
            <p className='text-teal-600'><strong>Location:</strong> {doctor.location}</p>
        </div>
    );
};

export default DoctorCard;
