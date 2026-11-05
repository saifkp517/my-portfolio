// Any "contact me" button can call this; ContactWidget listens for the event
// and opens the sheet, so there is exactly one contact UI on the page.
export function openContact() {
  window.dispatchEvent(new Event('open-contact'))
}
