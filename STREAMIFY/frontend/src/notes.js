// items-center = cross axis justify-center = main axis


// react query  tanstack query 
// daisy ui  --tailwind 
// react-hot-toast {/* to provide buttons and more , library react-toast */}

//  tan stack query used to fetch data from the api 

/*

When you hit an API, 3 possible states hote hain

loading pending state
success data mil gya
error request failure 

const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

try {
  setIsLoading(true);

  const res = await axios.get("/api/user");

  setData(res.data);      // success
} catch (err) {
  setError("Failed");     // error
} finally {
  setIsLoading(false);    // stop loading
}


React Query manages this internally

const { data, isLoading, error } = useQuery(...)
*/

/*
//   “Protected Route” concepts 
    
 “We fetch the current user from backend using /auth/me. If user exists, allow access; otherwise redirect to login.” 

      // <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />}> </Route>

*/

/*  Instead of creating multiple  ,variable create an object
const [formData, setFormData] = useState({
  email: "",
  password: ""
});

const handleChange = (e) => {
  const { name, value } = e.target;  // this is what event provides.

  setFormData(prev => ({
    ...prev,
    [name]: value  // dynamic key value pair 
  }));
};


<input
  name="email"
  value={formData.email}
  onChange={handleChange}
/>

<input
  name="password"
  value={formData.password}
  onChange={handleChange}
/>
*/


/*
/////////////////////////////////////////////////////
 complete the onbaording page from the start 
////////////////////////////////
update the route page

change the url of the profile in the backend ..
*/

/*
react query 
map 
conditional  rendering 
protected routes
hook
*/

/*

Frontend → sends request
        ↓
Browser → attaches cookies (JWT)   -- api hit mai with credential se hota hai yeh 
        ↓
Middleware → verifies token
        ↓
req.user = decoded token
        ↓
Controller → uses req.user.id

*/

/*
have a look an onboarding page
*/


/*
add error loading in login page 
*/