import {  QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { Todos } from './components/TaskList'

const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: TWENTY_FOUR_HOURS,
    }
  }
})

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

function App() {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <Todos />
    </PersistQueryClientProvider>
  )
}

export default App
