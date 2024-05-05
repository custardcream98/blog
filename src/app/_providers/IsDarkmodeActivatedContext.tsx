import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"

type IsDarkmodeActivatedContext = {
  isDarkmodeActivated: boolean
  setIsDarkmodeActivated: (isDarkmodeActivated: boolean) => void
  setIsDarkmodeActivatedToggle: () => void
  setIsDarkmodeActivatedTrue: () => void
  setIsDarkmodeActivatedFalse: () => void
}

const IsDarkmodeActivatedContext = createContext<IsDarkmodeActivatedContext>(
  null as unknown as IsDarkmodeActivatedContext,
)

export function useIsDarkmodeActivated() {
  const { isDarkmodeActivated } = useContext(IsDarkmodeActivatedContext)
  return isDarkmodeActivated
}

export function useSetIsDarkmodeActivatedContext() {
  return useContext(IsDarkmodeActivatedContext)
}

const LOCALSTORAGE_IS_DARKMODE_ACTIVATED_KEY = "isDarkmodeActivated"
const MEDIAQUERY_PREFERS_DARK_COLOR_CHEME = "(prefers-color-scheme: dark)"

const getIsDarkmodeActivatedOnLocal = (): boolean => {
  const isDarkmodeActivatedOnLocal =
    localStorage.getItem(LOCALSTORAGE_IS_DARKMODE_ACTIVATED_KEY) ?? undefined

  if (!isDarkmodeActivatedOnLocal) {
    const { matches: isUserPrefersDarkColorScheme } = window.matchMedia(
      MEDIAQUERY_PREFERS_DARK_COLOR_CHEME,
    )

    localStorage.setItem(
      LOCALSTORAGE_IS_DARKMODE_ACTIVATED_KEY,
      JSON.stringify(isUserPrefersDarkColorScheme),
    )

    return isUserPrefersDarkColorScheme
  }

  return JSON.parse(isDarkmodeActivatedOnLocal)
}

const setIsDarkmodeActivatedOnLocal = (target: boolean) => {
  localStorage.setItem(LOCALSTORAGE_IS_DARKMODE_ACTIVATED_KEY, JSON.stringify(target))
}

const DARKMODE_CLASS_NAME = "dark"
const setIsDarkmodeActivatedOnRootElement = (
  $root: HTMLElement | null,
  isDarkmodeActivated: boolean,
) => {
  if (!$root) {
    return
  }

  if (isDarkmodeActivated) {
    $root.classList.add(DARKMODE_CLASS_NAME)
  } else {
    $root.classList.remove(DARKMODE_CLASS_NAME)
  }
}

export function IsDarkmodeActivatedContextProvider({ children }: PropsWithChildren) {
  const [isDarkmodeActivated, setIsDarkmodeActivated] = useState(true)
  const $root = useRef<HTMLElement | null>(null)

  const setIsDarkmodeActivatedToggle = useCallback((target?: boolean) => {
    setIsDarkmodeActivated((prev) => {
      const nextValue = typeof target === "boolean" ? target : !prev

      setIsDarkmodeActivatedOnLocal(nextValue)
      setIsDarkmodeActivatedOnRootElement($root.current, nextValue)

      return nextValue
    })
  }, [])

  const setIsDarkmodeActivatedTrue = useCallback(() => {
    setIsDarkmodeActivatedToggle(true)
  }, [setIsDarkmodeActivatedToggle])
  const setIsDarkmodeActivatedFalse = useCallback(() => {
    setIsDarkmodeActivatedToggle(false)
  }, [setIsDarkmodeActivatedToggle])

  const isDarkmodeActivatedContextValue = useMemo(
    () => ({
      isDarkmodeActivated,
      setIsDarkmodeActivated,
      setIsDarkmodeActivatedFalse,
      setIsDarkmodeActivatedToggle,
      setIsDarkmodeActivatedTrue,
    }),
    [
      isDarkmodeActivated,
      setIsDarkmodeActivatedFalse,
      setIsDarkmodeActivatedToggle,
      setIsDarkmodeActivatedTrue,
    ],
  )

  useLayoutEffect(() => {
    const isDarkmodeActivatedOnLocal = getIsDarkmodeActivatedOnLocal()
    $root.current = document.documentElement

    if (!isDarkmodeActivatedOnLocal) {
      setIsDarkmodeActivatedOnRootElement($root.current, false)
      setIsDarkmodeActivated(false)
    }
  }, [])

  return (
    <IsDarkmodeActivatedContext.Provider value={isDarkmodeActivatedContextValue}>
      {children}
    </IsDarkmodeActivatedContext.Provider>
  )
}
