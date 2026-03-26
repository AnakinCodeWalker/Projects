import { useQuery } from '@tanstack/react-query'
import { getAuthUser } from '../lib/api'

// used in the App.jsx

const useAuthUser = () => {
    // usequery documentation...  instead of manually hitting an api we are using react query

    const authUser = useQuery({
        queryKey: ['authUser'], // what does this do ?
        queryFn: getAuthUser,
        retry: false,
    })

    return {
        isLoading: authUser.isLoading,
        authUser: authUser.data?.user
    }
}

export default useAuthUser