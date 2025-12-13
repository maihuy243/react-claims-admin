import { DEBOUNCE_SEARCH_DEFAULT } from "constant"
import { useEffect, useState } from "react"

export function useDebounce<T>(value: T, delay = DEBOUNCE_SEARCH_DEFAULT) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
