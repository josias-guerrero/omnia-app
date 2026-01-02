const API_URL = process.env.NEXT_PUBLIC_API_URL

type FetchProps = {
  endpoint: string
  options?: RequestInit
}

export async function apiFetch<T>({ endpoint, options }: FetchProps): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include',
  })

  if (!res.ok) {
    throw new Error(await res.text())
  }

  if (res.status === 204) {
    return undefined as T
  }

  return res.json()
}
