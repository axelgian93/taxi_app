export type SseEvent = { event?: string; data?: any }

export type SseConnection = {
  close: () => void
}

export async function connectSSE(
  url: string,
  opts: {
    token?: string
    onEvent: (e: SseEvent) => void
    signal?: AbortSignal
  }
): Promise<SseConnection> {
  const controller = new AbortController()
  const signal = opts.signal ? mergeSignals(controller.signal, opts.signal) : controller.signal

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'text/event-stream',
      ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}),
    },
    cache: 'no-store',
    signal,
  })
  if (!res.ok || !res.body) throw new Error(`SSE HTTP ${res.status}`)

  const reader = res.body.getReader()
  const decoder = new TextDecoder('utf-8')
  let buffer = ''
  let closed = false

  ;(async () => {
    try {
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        let idx
        while ((idx = buffer.indexOf('\n\n')) !== -1) {
          const raw = buffer.slice(0, idx)
          buffer = buffer.slice(idx + 2)
          const evt = parseSseChunk(raw)
          if (evt) opts.onEvent(evt)
        }
      }
    } catch {
      // swallow; consumer can reconnect
    } finally {
      if (!closed) controller.abort()
    }
  })()

  return { close: () => { closed = true; controller.abort() } }
}

function parseSseChunk(chunk: string): SseEvent | null {
  const lines = chunk.split(/\r?\n/)
  let event: string | undefined
  let dataLines: string[] = []
  for (const line of lines) {
    if (!line) continue
    if (line.startsWith(':')) continue // comment
    const idx = line.indexOf(':')
    const field = idx === -1 ? line : line.slice(0, idx)
    const value = idx === -1 ? '' : line.slice(idx + 1).replace(/^ /, '')
    if (field === 'event') event = value
    else if (field === 'data') dataLines.push(value)
  }
  const dataStr = dataLines.join('\n')
  let data: any = dataStr
  try { data = dataStr ? JSON.parse(dataStr) : undefined } catch {}
  if (!event && !dataStr) return null
  return { event, data }
}

function mergeSignals(a: AbortSignal, b: AbortSignal): AbortSignal {
  if (a.aborted) return a
  if (b.aborted) return b
  const ctrl = new AbortController()
  const onAbort = () => ctrl.abort()
  a.addEventListener('abort', onAbort)
  b.addEventListener('abort', onAbort)
  return ctrl.signal
}

