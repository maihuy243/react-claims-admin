import { useEffect, useRef } from "react"

export const useDidUpdateEffect = (
  func: any,
  deps: any,
  isDisable?: boolean,
) => {
  //INFO: This hook is the same as useEffect but it not run for first time component render until deps change

  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current && !isDisable) func()
    else didMountRef.current = true
  }, [...deps])
}
