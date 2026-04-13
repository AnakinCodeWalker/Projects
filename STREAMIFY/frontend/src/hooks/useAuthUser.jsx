import { useQuery } from '@tanstack/react-query'
import { getAuthUser } from '../lib/api'

// used in the App.jsx

const useAuthUser = () => {
    // usequery documentation...  instead of manually hitting an api we are using react query

    const authUser = useQuery({  //lets  u do get request 
        queryKey: ['authUser'], // refetching and caching when you load the data 
        queryFn: getAuthUser, // to pass some args make it a cb  
          // function will run  whenever we run the query with this key this is where u put you apii
        retry: false,
    })


    return {
        isLoading: authUser.isLoading,
        authUser: authUser?.data
    }
}

export default useAuthUser