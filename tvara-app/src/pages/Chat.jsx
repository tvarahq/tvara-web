import React, { useState } from 'react'
import ExtendedNavbar from '../components/elements/ExtendedNavbar'
import AILoader from '../components/ui/AILoader'
import { api } from '../services/httpClient'

function Chat() {
  const [userQuery, setUserQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState('')
  const [error, setError] = useState('')

  const handleGenerateWorkflow = async () => {
    if (!userQuery.trim()) {
      setError('Please enter a query')
      return
    }

    setIsLoading(true)
    setError('')
    setResponse('')

    try {
      const result = await api.chat(userQuery)
      // Handle the response object - extract the actual response text
      const responseText = typeof result === 'string' ? result : result.response || JSON.stringify(result)
      setResponse(responseText)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleGenerateWorkflow()
    }
  }

  return (
    <div className='bg-background min-h-screen flex flex-col'>
      <ExtendedNavbar />
      
      <div className='flex-1 flex items-center justify-center px-4 py-8'>
        <div className='w-full max-w-2xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-white mb-4'>
              AI Workflow Generator
            </h1>
            <p className='text-gray-400 text-lg'>
              Describe what you want to build and we'll generate a workflow for you
            </p>
          </div>

          {/* Input Section */}
          <div className='bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50'>
            <div className='space-y-4'>
              <div>
                <label htmlFor='userQuery' className='block text-sm font-medium text-gray-300 mb-2'>
                  What would you like to build?
                </label>
                <textarea
                  id='userQuery'
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder='e.g., Create a workflow that processes user signups and sends welcome emails...'
                  className='w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                  rows={4}
                  disabled={isLoading}
                />
              </div>

              <button
                onClick={handleGenerateWorkflow}
                disabled={isLoading || !userQuery.trim()}
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed'
              >
                {isLoading ? 'Generating...' : 'Generate Workflow'}
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className='mt-8'>
              <AILoader message="Analyzing your request and generating workflow..." />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className='mt-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl'>
              <p className='text-red-400 text-sm'>{error}</p>
            </div>
          )}

          {/* Response */}
          {response && (
            <div className='mt-6'>
              <div className='bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50'>
                <h3 className='text-lg font-semibold text-white mb-4'>Generated Workflow:</h3>
                <div className='bg-gray-900/50 rounded-xl p-4'>
                  <pre className='text-gray-300 whitespace-pre-wrap text-sm leading-relaxed'>
                    {response}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Chat
