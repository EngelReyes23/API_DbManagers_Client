import { useEffect, useState } from 'react'
import { useStore } from '../store/store'

export const EntryForm = () => {
  const {
    addDbManager,
    actualDbManager,
    updateDbManager,
    toggleEntryVisibility,
    removeActualDbManager
  } = useStore((state) => state)

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [yearOfCreation, setYearOfCreation] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    switch (name) {
      case 'name':
        setName(value)
        break
      case 'company':
        setCompany(value)
        break
      case 'year_creation':
        setYearOfCreation(value)
        break
      default:
        break
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      name,
      company,
      year_creation: yearOfCreation
    }

    actualDbManager ? updateDbManager({ ...data, id: actualDbManager.id }) : addDbManager(data)

    toggleEntryVisibility()
  }

  const handleCancel = () => {
    actualDbManager && removeActualDbManager()
    toggleEntryVisibility()
  }

  useEffect(() => {
    if (actualDbManager) {
      setName(actualDbManager.name)
      setCompany(actualDbManager.company)
      setYearOfCreation(actualDbManager.year_creation)
    } else {
      setName('')
      setCompany('')
      setYearOfCreation('')
    }
  }, [actualDbManager])

  return (
    <form
      className='fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50'
      onSubmit={handleSubmit}>
      <div className='w-1/2 rounded-lg bg-white p-8'>
        <h2 className='mb-4 text-2xl font-bold'>
          {actualDbManager ? 'Edit' : 'Add'} Database Manager
        </h2>

        <div className='mb-4'>
          <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
            Name
          </label>
          <input
            required
            id='name'
            type='text'
            name='name'
            value={name}
            onChange={handleChange}
            className='mt-1 block w-full rounded-md border border-gray-300 p-2'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='company' className='block text-sm font-medium text-gray-700'>
            Company
          </label>
          <input
            required
            type='text'
            id='company'
            name='company'
            value={company}
            onChange={handleChange}
            className='mt-1 block w-full rounded-md border border-gray-300 p-2'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='yearOfCreation' className='block text-sm font-medium text-gray-700'>
            Year of Creation
          </label>
          <input
            required
            type='number'
            id='year_creation'
            name='year_creation'
            value={yearOfCreation}
            onChange={handleChange}
            className='mt-1 block w-full rounded-md border border-gray-300 p-2'
          />
        </div>

        <div className='flex justify-end'>
          <button
            type='button'
            onClick={handleCancel}
            className='mr-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'>
            Cancel
          </button>
          <button
            type='submit'
            className='rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700'>
            {actualDbManager ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </form>
  )
}
