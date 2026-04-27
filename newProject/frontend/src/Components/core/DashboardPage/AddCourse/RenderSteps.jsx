import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformationForm'
import CourseBuilderForm from './CourseBuilderForm'
import CoursePublishForm from './CoursePublishForm'

const RenderSteps = () => {

    const { step } = useSelector((state) => state.course)

    const steps = [
        {
            id: 1,
            title: "course Information",
        }, {
            id: 2,
            title: "course Builder",
        }, {
            id: 3,
            title: "Publish",
        },
    ]

    return (
        <>
        <div>
            {steps.map((item) => (
            <>
                <div>
                    <div className={`${step === item?.id ? "bg-yellow-900 border-yellow-50" : "text-black border-white   "}`}>

                        {
                            step > item.id ? (<FaCheck />) : (item.id)
                        }
                    </div>
                </div>

            </>
        ))}</div>

        
                <div>
                    {steps.map((item) => (
                        <>
                            <div>
                                <p>
                                    {item.title}
                                </p>
                            </div>
                        </>
                    ))}
                </div>

                {step === 1 && <CourseInformationForm/>}
                {step === 1 && <CourseBuilderForm/>}
                {step === 1 && <CoursePublishForm/>}

                </>
    )
}

export default RenderSteps