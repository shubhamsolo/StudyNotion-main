import React from "react";

function ConfirmationModal({ modalData }) {
    const { text1, text2, btn1Text, btn1Handler, btn2Text, btn2Handler } = modalData;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-richblack-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
                <div>
                    <p className="text-white text-3xl font-semibold mb-2">{text1}</p>
                    <p className="text-richblack-300 text-gray-600 mb-6">{text2}</p>
                    <div className="flex justify-end gap-4 mt-10">
                        <button
                            onClick={btn1Handler}
                            className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-lg font-semibold"
                        >
                            {btn1Text}
                        </button>
                        <button
                            onClick={btn2Handler}
                            className="bg-richblack-300 text-richblack-900 px-4 py-2 rounded-lg font-semibold"
                        >
                            {btn2Text}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
