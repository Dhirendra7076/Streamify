//Since it is a custom hook make sure to add use in the starting of the file

import { useQuery } from '@tanstack/react-query'
import { getAuthUser } from '../lib/api'

const useAuthUser = () => {

    const useAuthUser = () =>{
        const authUser = useQuery({
            queryKey: ["authUser"],
            queryFn: getAuthUser,
            retry: false , //auth check
        })
    }
  return (
   {isloading: authUser.isloading , authUser: authUser.data?.user}
  )
}

export default useAuthUser
