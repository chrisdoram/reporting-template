import { useThemeEvent } from '@services/customEventAdapter'
import { useThemeStorage } from '@services/localStorageAdapter'

export function useSetTheme() {
  // use local storage here to get the storage object
  // persistance layer to store theme across sessions
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { theme, setTheme: setStorageTheme } = useThemeStorage()
  // use event to publish a theme changed event to the subscribers
  // propagate event to listeners who have responsibilities like
  // changing the href of the link for 3rd party css files
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { publish } = useThemeEvent()

  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      publish('dark')
      setStorageTheme('dark')
      // document.body.classList.remove('OTHER')
      document.body.classList.add('dark')
    } else {
      publish('light')
      setStorageTheme('light')
      document.body.classList.remove('dark')
    }
  }

  return { theme, setTheme }
}
