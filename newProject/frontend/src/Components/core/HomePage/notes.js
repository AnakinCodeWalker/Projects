{/* mx -left right my - top bottom 
 */}

 /*

use navlink in in the navbar usme active class hota hai jis se color chagne kr skte ho us class ko select krke.
*/

//  w-fit se div unta hi space lega , jitna need hoga 
//  flex-row-reverse  =  puts the elemnts into reverse order
// justify between = both will left place on extreme left and right to main axis


//  a  -- external link 
// Link -- website internal links 

//   / = either fraction OR opacity (depends on context)



// footer  ------------------------------- section banao  

// nav bar mai edit baki hai  ,
// check route and load nav accordingly



/*
    function submitHandler(event) {
        event.preventDefault()  // page will not re render and i am going to handle the events is se yeh hots hai
        setIsLoggedIn(true)
        toast.success("Logged in")
        navigate("/dashboard")   //Based on condition change the routes..
    }

*/

/*

slice - reducer - store created - wrap provider
app - wrap - provider
provider - store provide and create store via configure store  isme reducer pass krte hai 
combine these reducer into root reducer
    add these rooot reducer into store
    reducer are created via slices 
    each one has its own slice
    token ka data from slices  token hai to profile drop down else login signup 
*/


/*

//  feature add  kro..
// jis button pr click kre woh value ho jaye 
//  studnet to role mai student 
// instructor to instructor
*/



/*
useRef se UI tabhi change dikhega jab tum manually DOM change karoge
🔹 useState se UI automatically change hota hai
useRef : 
DOM access chahiye (focus, scroll)
value store karna hai bina re-render
performance optimization

useState use karo jab:
UI change dikhana hai
data render ho raha hai
*/

/*  

state management
 
you should put most of your time in here as your component grows u will find eventually , your state varaible will be needed by multiple components 

state create karna
state update karna
state ko components me pass karna
UI ko sync rakhna

*/


/*
Reconciliation = process of comparing old Virtual DOM with new Virtual DOM and updating the real DOM efficiently
*/

/*
props are passed parents to child genreally but u can do vice versa but u shoud n't its antipattern
*/

/*
// state.reducerkey.leftvariable

  /*
  
   state → poora Redux store
auth → reducer key (store me jo naam diya)
loading → uske andar ka variable
*/


/*

import { useDispatch } from "react-redux";
import { setSignupData } from "../slices/authSlice";

const dispatch = useDispatch();

dispatch(setSignupData({ name: "Prince", email: "abc@gmail.com" }));



import { useSelector } from "react-redux";

const { signupData, loading, token } = useSelector((state) => state.auth);

*/

/*
delete 
update page

*/
