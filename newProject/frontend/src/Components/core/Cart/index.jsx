// import auth from "../../../slices/authSlice"
import RenderCartComponent from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

import { useSelector } from "react-redux"
export default function Cart() {


    const { total, totaitems } = useSelector((state) => (state.auth))
    return <>

        <div>
            <h1>
                your cart
            </h1>

            <p>
                {totaitems} Courses in cart
            </p>

            {
                (total > 0)
                    ? (<div>


                        <RenderCartComponent />
                        <RenderTotalAmount />

                    </div>)
                    : (<p>
                        your cart is empty
                    </p>)
            }
        </div>
    </>
}