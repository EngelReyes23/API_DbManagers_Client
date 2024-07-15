import { useEffect } from 'react'
import { Toaster } from 'sonner'

import { EntryForm, Error, Spinner, Table } from './Components'
import { useStore } from './store/store'

function App() {
  const { isLoading, error, getData, isEntryVisible } = useStore((state) => state)

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Toaster position='top-center' richColors />

      <h1 className='mt-4 text-center text-3xl font-bold'>CRUD Operations</h1>

      {isEntryVisible && <EntryForm />}

      {isLoading && <Spinner />}

      {error && <Error error={error} />}

      {!isLoading && !error && <Table />}

      <button
        className='fixed bottom-4 right-4 rounded-md bg-blue-500 p-2 text-white'
        onClick={() => useStore.getState().toggleEntryVisibility()}>
        Add new
      </button>
    </>
  )
}

export default App
