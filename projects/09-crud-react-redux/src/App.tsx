import './App.css'
import { Toaster } from 'sonner'
import { CreateNewUser } from './components/CreateNewUser.tsx'
import { ListOfUsers } from './components/ListOfUsers.tsx'

function App() {
  return (
    <>
      <ListOfUsers/>
      <CreateNewUser/>
      <Toaster richColors/>
    </>
  )
}

export default App
