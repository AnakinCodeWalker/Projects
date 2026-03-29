import React from 'react'

const stats = [
    {
        count: "5k",
        label: "Active Students"
    },
    {
        count: "10+",
        label: "Mentors"
    },
    {
        count: "200+",
        label: "Courses"
    },
    {
        count: "50+",
        label: "awards"
    },
]
const StatsComponent = () => {
    return (
        <section>
            <div>
                <div className='mx-auto  max-w-11/12 bg-gray-700 py-8 my-5 w-screen flex justify-evenly '>
                    {
                        stats.map((data, index) => {
                            return (
                                <div className=' border border-slate-500 text-slate-300' key={index}>
                                    <h1 className='font-bold'>{data.count}</h1>
                                    <h1 className='font-light'>{data.label}</h1>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default StatsComponent



/*

<div className="bg-gray-700">     // #374151
<div className="bg-gray-900">     // #111827
<div className="text-gray-400">   // #9CA3AF

*/