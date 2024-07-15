export const Error = ({ error }) => {
  return (
    <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50'>
      <div className='rounded bg-white p-8 shadow-lg'>
        <h2 className='mb-4 text-2xl font-bold'>Error</h2>
        <p>{error}</p>
      </div>
    </div>
  )
}
