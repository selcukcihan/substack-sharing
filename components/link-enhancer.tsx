'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { checkUrl } from '../core/stuff'

export function LinkEnhancer() {
  const [url, setUrl] = useState('')
  const [enhancedUrl, setEnhancedUrl] = useState('')
  const [notification, setNotification] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (checkUrl(url)) {
        setEnhancedUrl(`${window.location.origin}/s?url=${Buffer.from(url).toString('base64')}`)
        setNotification('')
      } else {
        throw new Error('Invalid URL')
      }
    } catch (error: any) {
      setNotification(`Error: ${error.message}`)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(enhancedUrl)
    setNotification('Generated link copied to clipboard')
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="mb-6 text-center">

        <p className="text-sm text-gray-600">
          This tool creates a shareable link that helps bypass certain platform restrictions.
          Paste your URL, click "Generate Link", and share the generated link.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">Enter URL</Label>
          <Input
            id="url"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">Generate Link</Button>
      </form>
      {enhancedUrl && (
        <div className="space-y-2">
          <Label htmlFor="enhanced-url">Generated URL</Label>
          <div className="flex space-x-2">
            <Input
              id="enhanced-url"
              type="url"
              value={enhancedUrl}
              readOnly
            />
            <Button onClick={copyToClipboard}>Copy</Button>
          </div>
        </div>
      )}
      {notification && (
        <div className="mt-4 p-2 bg-blue-100 text-blue-700 rounded">
          {notification}
        </div>
      )}
      <div className="mt-8 text-center">
        <a
          href="https://github.com/selcukcihan/substack-sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          View source on GitHub
        </a>
      </div>
    </div>
  )
}
