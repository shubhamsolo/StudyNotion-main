import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5"; // Importing an icon for clear button

function RequirementField({ name, label, register, errors, setValue, getValues }) {
    const [requirement, setRequirement] = useState('');
    const [requirementList, setRequirementList] = useState(getValues().courseRequirements || []);
    

    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement('');
        }
    };

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        });
    }, [register, name]);

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList, setValue, name]);

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    };

    return (
        <div className="flex flex-col gap-4">
            <label className="text-richblack-25 text-base">{label}<sup className="text-pink-100">*</sup></label>
            <div>
                <input
                    type="text"
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="w-full p-2 mt-1 rounded bg-richblack-700"
                />
                <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="text-yellow-25 font-bold p-2"
                >
                    Add
                </button>
            </div>
            {requirementList?.length > 0 && (
                <ul className="list-disc pl-2">
                    {requirementList.map((requirement, index) => (
                        <li key={index} className="flex justify-start items-center">
                            <span className="text-richblack-100">{requirement}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveRequirement(index)}
                                className="text-red-500 ml-2"
                            >
                                <IoClose />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {errors[name] && (
                <span className="text-red-500">{label} is required</span>
            )}
        </div>
    );
}

export default RequirementField;
