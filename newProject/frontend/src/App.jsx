import './App.css'
import AppRoute from './routes/AppRoute'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from './slices/profileSlice'

function App() {

  const dispatch = useDispatch();

  // ✅ YAHI ADD KARNA HAI
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, []);

  return(
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <AppRoute/>
    </div>
  )
}

export default App