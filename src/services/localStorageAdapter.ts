import { themeStorageService } from '@application/ports'
import { Theme } from '@domain/theme'
import { useLocalStorage } from './localStorage'

export const useThemeStorage = (): themeStorageService => {
  const [value, setStorageValue, removeStorageValue] = useLocalStorage<Theme>({
    key: 'theme',
  })

  return {
    theme: value,
    setTheme: setStorageValue,
    clearTheme: removeStorageValue,
  }
}
