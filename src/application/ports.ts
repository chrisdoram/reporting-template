import { Theme } from '@domain/theme'

export interface themeStorageService {
  theme: Theme | undefined
  setTheme(value: Theme): void
  clearTheme(): void
}

export type Listener<T> = (event: T) => void

export interface themeEventService<E> {
  publish(theme: Theme): void
  subscribe(listener: Listener<E>): void
  unsubscribe(listener: Listener<E>): void
}
