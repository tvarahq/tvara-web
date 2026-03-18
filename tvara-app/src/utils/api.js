import { supabase } from './supabase'

const BASE_URL = import.meta.env.VITE_BACKEND_URL

async function authHeaders() {
  const { data: { session } } = await supabase.auth.getSession()
  return {
    'Authorization': `Bearer ${session?.access_token}`,
    'Content-Type': 'application/json',
  }
}

export async function listIntegrations() {
  const headers = await authHeaders()
  const res = await fetch(`${BASE_URL}/credentials/integrations`, { headers })
  if (!res.ok) throw new Error('Failed to fetch integrations')
  return res.json()
}

export async function connectIntegration(toolkit_slug) {
  const headers = await authHeaders()
  const res = await fetch(`${BASE_URL}/credentials/connect`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ toolkit_slug }),
  })
  if (!res.ok) throw new Error('Failed to connect integration')
  return res.json()
}

export async function listConnections() {
  const headers = await authHeaders()
  const res = await fetch(`${BASE_URL}/credentials/connections`, { headers })
  if (!res.ok) throw new Error('Failed to fetch connections')
  return res.json()
}

export async function disconnectConnection(connected_account_id) {
  const headers = await authHeaders()
  const res = await fetch(`${BASE_URL}/credentials/connections/${connected_account_id}`, {
    method: 'DELETE',
    headers,
  })
  if (!res.ok) throw new Error('Failed to disconnect')
  return res.json()
}

export async function getRun(runId) {
  const headers = await authHeaders()
  const res = await fetch(`${BASE_URL}/runs/${runId}`, { headers })
  if (!res.ok) throw new Error(`Failed to fetch run: ${res.status}`)
  return res.json()
}

export async function getRunStats(days = 30) {
  const headers = await authHeaders()
  const res = await fetch(`${BASE_URL}/runs/stats?days=${days}`, { headers })
  if (!res.ok) throw new Error(`Failed to fetch run stats: ${res.status}`)
  return res.json()
}

export async function getChartData(days = 30) {
  const headers = await authHeaders()
  const res = await fetch(`${BASE_URL}/runs/chart?days=${days}`, { headers })
  if (!res.ok) throw new Error(`Failed to fetch chart data: ${res.status}`)
  return res.json()
}

export async function getTelegramStatus() {
  const headers = await authHeaders()
  const res = await fetch(`${BASE_URL}/telegram/status`, { headers })
  if (!res.ok) throw new Error('Failed to fetch Telegram status')
  return res.json()
}

export async function linkTelegram() {
  const headers = await authHeaders()
  const res = await fetch(`${BASE_URL}/telegram/link`, { method: 'POST', headers })
  if (!res.ok) throw new Error('Failed to generate Telegram link')
  return res.json()
}

export async function unlinkTelegram() {
  const headers = await authHeaders()
  const res = await fetch(`${BASE_URL}/telegram/unlink`, { method: 'DELETE', headers })
  if (!res.ok) throw new Error('Failed to unlink Telegram')
  return res.json()
}
