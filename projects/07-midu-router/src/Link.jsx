import { BUTTONS, EVENTS } from './utils/consts.js'

export function navigate (href) {
  window.history.pushState({}, '', href)
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link ({ target, to, ...props }) {
  const handlelick = (event) => {
    const isMainEvent = event.button === BUTTONS.primary // primary click
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const isManageableEvent = target === undefined || target === 'self'

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault() // Para que no haga una navegación completa
      navigate(to) // navegación cons SPA
    }
  }

  return (
    <a href={to} target={target} {...props} onClick={handlelick} />
  )
}
