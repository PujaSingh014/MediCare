import React, { useEffect, useState } from 'react';
import DoctorCard from './DoctorCard';

const ConsultDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [specializationFilter, setSpecializationFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            const options = {
                method: "GET",
            }
            try {
                const res = await fetch('http://localhost:5000/doctors', options);
                const response = await res.json();
                console.log(response);
                setDoctors(response.doctors);
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    if (loading) {
        return <div className='text-center text-teal-700'>Loading...</div>;
    }

    const filteredDoctors = doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialization = specializationFilter ? doctor.specialization.toLowerCase() === specializationFilter.toLowerCase() : true;
      const matchesLocation = locationFilter ? doctor.location.toLowerCase() === locationFilter.toLowerCase() : true;
      return matchesSearch && matchesSpecialization && matchesLocation;
    });



    return (
        <div  className="flex flex-col w-full h-full px-8 py-1">
           <h1 className="text-3xl font-bold w-full text-teal-50 bg-teal-600 p-3 mb-6 text-center">Consult Doctors</h1>

           {/* Search Bar */}
           <div className="flex flex-col sm:flex-row justify-around items-start mb-4">
                <input 
                    type="text" 
                    placeholder="Search by doctor name..." 
                    className="border border-teal-300 rounded-lg p-2 mb-2 sm:mb-0 sm:w-1/2" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />

                {/* Filter Bar */}
                <select 
                    className="border border-teal-300 rounded-lg p-2  sm:w-1/5" 
                    value={specializationFilter} 
                    onChange={(e) => setSpecializationFilter(e.target.value)}
                >
                    <option value="">All Specializations</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Neurologist">Neurologist</option>
                </select>

                 {/* Location Filter */}
                 <select 
                    className="border border-teal-300 rounded-lg p-2 sm:w-1/5" 
                    value={locationFilter} 
                    onChange={(e) => setLocationFilter(e.target.value)}
                >
                    <option value="">All Locations</option>
                    <option value="Agra">Agra</option>
                    <option value="Gorakhpur">Gorakhpur</option>
                    <option value="Deoria">Lucknow</option>
                </select>
          </div>


           <div className="overflow-y-scroll border border-teal-300 rounded-lg p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {filteredDoctors.map((doctor, index) => (
                        <DoctorCard key={index} doctor={doctor} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConsultDoctor;
