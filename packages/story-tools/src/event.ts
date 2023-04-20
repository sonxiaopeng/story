type EventGroup = {
  eventName: keyof HTMLElementEventMap
  handler: globalThis.EventListener | EventListenerObject
}

type EventOption = boolean | AddEventListenerOptions

export function listener(
  element: HTMLElement,
  eventName: keyof HTMLElementEventMap,
  handler: globalThis.EventListener | EventListenerObject,
  option: EventOption = false
) {
  element.addEventListener(eventName, handler, option)
  return () => {
    element.removeEventListener(eventName, handler, option)
  }
}

export function multiListener(element: HTMLElement, eventGroups: EventGroup[]) {
  const offlist: ((o?: EventOption) => void)[] = []
  eventGroups.forEach((group) => {
    const { eventName, handler } = group
    element.addEventListener(eventName, handler, false)
    offlist.push((option: EventOption = false) => {
      element.removeEventListener(eventName, handler, option)
    })
  })
  return offlist
}
