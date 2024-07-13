import { useEffect } from 'react'
import { useStore } from './store/store'

function App() {
  const store = useStore((state) => state)
  const { listDbManager, isLoading, error } = store

  useEffect(() => {
    store.getData()
  }, [])

  return (
    <div>
      <h1>Db Manager</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {JSON.stringify(error)}</p>}

      {!isLoading && (
        <table className='min-w-full table-auto'>
          <thead>
            <tr>
              {Object.keys(listDbManager[0]).map((key) => (
                <th key={key} className='px-4 py-2'>
                  {key}
                </th>
              ))}
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listDbManager.map((dbManager) => (
              <tr key={dbManager.id}>
                {Object.keys(dbManager).map((key) => (
                  <td key={key} className='border px-4 py-2'>
                    {dbManager[key]}
                  </td>
                ))}

                <td className='border px-4 py-2'>
                  <button className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'>
                    Edit
                  </button>
                  <button
                    onClick={() => store.deleteDbManager(dbManager.id)}
                    className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App
