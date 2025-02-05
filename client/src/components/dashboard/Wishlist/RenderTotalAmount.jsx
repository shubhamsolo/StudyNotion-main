import React from "react";
import { useSelector , useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { buyCourse } from "../../../services/operations/studentFeaturesAPI";

function RenderTotalAmount(){
    const {total, cart}=useSelector((state)=>state.cart);
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    function handleBuyCourse(){
        const courses=cart.map((course)=>course._id);
        buyCourse(token,courses,user,navigate,dispatch);
    }

    return (
        <div className="border border-richblack-300 rounded-lg w-[340px] h-[180px] p-6 flex flex-col gap-4">
            <p>Total:</p>
            <p className="text-yellow-25 text-2xl font-semibold">Rs. {total}</p>
            <button onClick={handleBuyCourse} className="text-center w-full text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black">Buy Now</button>
        </div>
    )
}

export default RenderTotalAmount;