import { useStore } from '../store/store'
import { TableRow } from './TableRow'

const columnDataName = ['ID', 'Name', 'Company', 'Year Of Creation', 'Actions']

const NoData = () => {
  return (
    <tr>
      <td colSpan='5' className='border px-4 py-2 text-center'>
        No data
      </td>
    </tr>
  )
}

export const Table = () => {
  const { listDbManager, toggleEntryVisibility } = useStore((state) => state)

  return (
    <section className='bg-blueGray-50 py-1'>
      <div className='mx-auto mb-12 mt-10 w-full px-4 xl:mb-0 xl:w-8/12'>
        <div className='relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg'>
          <div className='mb-0 rounded-t border-0 px-4 py-3'>
            <div className='flex flex-wrap items-center'>
              <div className='relative w-full max-w-full flex-1 flex-grow px-4'>
                <h3 className='text-blueGray-700 text-base font-semibold'>
                  Database Managers Info
                </h3>
              </div>
              <div className='relative w-full max-w-full flex-1 flex-grow px-4 text-right'>
                <button
                  onClick={() => toggleEntryVisibility()}
                  className='mb-1 mr-1 rounded bg-indigo-500 px-3 py-1 text-xs font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-indigo-600'
                  type='button'>
                  New Entry
                </button>
              </div>
            </div>
          </div>

          <div className='block w-full overflow-x-auto'>
            <table className='w-full border-collapse items-center bg-transparent'>
              <thead>
                <tr>
                  {columnDataName.map((column, index) => (
                    <th
                      key={index}
                      className='bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase'>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {listDbManager.length === 0 && <NoData />}

                {listDbManager.length > 0 &&
                  listDbManager.map((dbManager) => (
                    <TableRow key={dbManager.id} dbManager={dbManager} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
