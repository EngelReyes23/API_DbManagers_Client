import { useStore } from '../store/store'

export const TableRow = ({ dbManager }) => {
  const { deleteDbManager, setActualDbManager } = useStore((state) => state)

  const handleEdit = () => {
    setActualDbManager(dbManager)
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?')

    confirmDelete && deleteDbManager(dbManager.id)
  }

  return (
    <tr key={dbManager.id}>
      <td className='whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs'>
        {dbManager.id}
      </td>
      <td className='whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs'>
        {dbManager.name}
      </td>
      <td className='whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs'>
        {dbManager.company}
      </td>
      <td className='whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs'>
        {dbManager.year_creation}
      </td>
      <td className='whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs'>
        <button
          className='mb-1 mr-1 rounded bg-emerald-500 px-3 py-1 text-xs font-bold uppercase text-white outline-none focus:outline-none active:bg-emerald-600'
          type='button'
          onClick={handleEdit}>
          Edit
        </button>

        <button
          className='mb-1 mr-1 rounded bg-red-500 px-3 py-1 text-xs font-bold uppercase text-white outline-none focus:outline-none active:bg-red-600'
          type='button'
          onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  )
}
