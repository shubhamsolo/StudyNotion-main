import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

function TagField({ name, label, register, errors, setValue, getValues }) {
    const [tag, setTag] = useState('');
    const [tagList, setTagList] = useState(getValues().courseTags || []);

    const handleAddTag = (newTag) => {
        if (newTag && !tagList.includes(newTag)) {
            setTagList([...tagList, newTag]);
            setTag('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            handleAddTag(tag.trim());
        }
    };

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        });
    }, [register, name]);

    useEffect(() => {
        setValue(name, tagList);
    }, [tagList, setValue, name]);

    const handleRemoveTag = (index) => {
        const updatedTagList = [...tagList];
        updatedTagList.splice(index, 1);
        setTagList(updatedTagList);
    };

    return (
        <div className="flex flex-col gap-4">
            <label className="text-richblack-25 text-base">{label}<sup className="text-pink-100">*</sup></label>
            {tagList?.length > 0 && (
            <div className="flex flex-wrap gap-2">
                {tagList.map((tag, index) => (
                    <span key={index} className="flex items-center text-richblack-25 bg-richblack-700 px-3 py-[3px] rounded-full rounded">
                        <span>{tag}</span>
                        <button
                            type="button"
                            onClick={() => handleRemoveTag(index)}
                            className="ml-2 text-red-500"
                        >
                            <IoMdClose />
                        </button>
                    </span>
                ))}
            </div>
)}

            <div className="flex gap-2">
                <input
                    type="text"
                    id={name}
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full p-2 mt-1 rounded bg-richblack-700"
                />
            </div>
            {errors[name] && (
                <span className="text-red-500">{label} is required</span>
            )}
        </div>
    );
}

export default TagField;
