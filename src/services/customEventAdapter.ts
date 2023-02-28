import { Listener, themeEventService } from '@application/ports'

declare global {
  interface DocumentEventMap {
    'theme-changed': CustomEvent
  }
}

export const useThemeEvent = (): themeEventService<CustomEvent<Theme>> => {
  const publish = (theme: Theme) => {
    const event = new CustomEvent('theme-changed', { detail: theme })
    document.dispatchEvent(event)
  }
  const subscribe = (listener: Listener<CustomEvent>) => {
    document.addEventListener('theme-changed', listener)
  }
  const unsubscribe = (listener: Listener<CustomEvent>) => {
    document.removeEventListener('theme-changed', listener)
  }

  return {
    publish,
    subscribe,
    unsubscribe,
  }
}
