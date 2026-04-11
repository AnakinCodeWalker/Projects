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


/*
tanstack query 

we have to initialize the queryClient


              1.useQuery({ }) 

-- most of the time used to  make get request 
take a bunch of options as well 
querykey  : ['something unique'] that make the unqiue and help in caching  when u load the data
queryFn :    function a cb function under the hood its going to hit the api
retry : false 

this reutrns a bunch of method u can destructure it

{ isloading , isPending  , isFetching }
 { data  , refetch , error}  -- refetch lets u re hit the api 
  // error lets u show the error
  // data is what comes when u hit the api

NOTE :  IF SOMETHING IS AFFECTING YOUR API DATA THEN PUT THAT INTO QUERYKEY
EXAMPLE : SEARCH PAGINATION AND FILTERS.

normal hooks can not be called conditionally 
but we can call , these useQuery hooks in react conditonally

enabled: !!userId -- by using this in the object you can , make it conditionally render the hook 
  // 
*/

/*
FALLBACK COMPONENT : 

Jab main data ready na ho → tab kya dikhana hai

*/

/*    ---------- second thing stale and fresh data inside useQuery ----------  
fresh and stale data 

if data is fresh we will use the cache data

if stale then we need to query again to get new data .

staletime : time in milliseconds 
 
by default no staletime everytime u hit the route an api call is made 
provide some stale time and ,  if the stale time is not over then when u hit the api 
it will fetch the cached data instead of hitting the route 


*/


/*
---------- query  Invalidation ----------

when we need to fetch fresh data ,  it means telling the query client our data is invalid and we have to fetch new data 

to use this we have to import the QueryClient() 
and then use this , invalidate syntax

const  queryClient = QueryClient()
queryClient.invalidateQueries({ queryKey: ["key name"] }),

when ever you , create , update delete use this invalidateQuery to get the updated data
*/


/*  MUTATION :  refer to docs for more 

similar to useQuery 

const { bunch of options } = useMutation({

mutationfn : function will hit the be,
onSuccess : (   data from backend , some args  here ) => {  // this has some args by default 
                         
  } ,

  onError : (error , other args) => {  // error is default arg here 

  },

  onSettled : (data , error , other args) => {  // going to run regardless of sucess or failure
    
    }

}) 

cls

*/

/*  for pagination  use infinite query options  

//  NOTE : if your api has no limits u can not use this hook  

*/