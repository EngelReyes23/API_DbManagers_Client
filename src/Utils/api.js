const API_URL = 'https://localhost:7100/api/Manager/'

const handleApiCall = async (method, url, data = {}) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      ...((method === 'POST' || method === 'PUT') && { body: JSON.stringify(data) })
    })

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API error:', error)
    return { error: error.message }
  }
}

export const apiManagement = {
  getData: async () => await handleApiCall('GET', API_URL),
  addData: async (data) => await handleApiCall('POST', API_URL, data),
  deleteData: async (id) => await handleApiCall('DELETE', `${API_URL}/${id}`),
  updateData: async (data) => await handleApiCall('PUT', `${API_URL}/${data.id}`, data)
}
