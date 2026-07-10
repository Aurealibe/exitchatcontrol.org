import { useSyncExternalStore, type ReactNode } from 'react'

export type CheckItem = { id: string; lvl: '🟢' | '🟡' | '🔴'; label: ReactNode }

/* Migration checklist — progress persists in localStorage ONLY (this site
   sends nothing anywhere; the network tab stays empty, verify it).
   Module-level store + useSyncExternalStore: the server snapshot is the
   stable empty object, the client snapshot is hydrated from localStorage
   right after hydration (the sanctioned mismatch-free pattern). */
const STORAGE_KEY = 'ecc-checklist'
const EMPTY: Record<string, boolean> = {}

let done: Record<string, boolean> = EMPTY
if (typeof window !== 'undefined') {
  try {
    done = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Record<string, boolean>
  } catch {
    done = EMPTY
  }
}

const subs = new Set<() => void>()
function subscribe(cb: () => void) {
  subs.add(cb)
  return () => {
    subs.delete(cb)
  }
}

function toggle(id: string) {
  done = { ...done, [id]: !done[id] }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(done))
  } catch {
    /* private mode */
  }
  subs.forEach((f) => f())
}

export function Checklist({ items }: { items: CheckItem[] }) {
  const state = useSyncExternalStore(
    subscribe,
    () => done,
    () => EMPTY,
  )
  const doneCount = items.filter((i) => state[i.id]).length

  return (
    <>
      {/* progress meter — derived from the same store, localStorage only */}
      <div className="check-meter">
        <span className="check-count" aria-live="polite">
          {doneCount}/{items.length}
        </span>
        <div className="check-meter-bar" aria-hidden="true">
          <div
            className="check-meter-fill"
            style={{ transform: `scaleX(${items.length ? doneCount / items.length : 0})` }}
          ></div>
        </div>
      </div>
      <ul className="check">
      {items.map((item) => (
        <li key={item.id}>
          <label>
            <input
              type="checkbox"
              data-id={item.id}
              checked={state[item.id] ?? false}
              onChange={() => toggle(item.id)}
            />
            <span className="step-lvl" aria-hidden="true">
              {item.lvl}
            </span>
            <span>{item.label}</span>
          </label>
        </li>
      ))}
      </ul>
    </>
  )
}
