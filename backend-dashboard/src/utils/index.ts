type Event = React.FormEvent<HTMLFormElement> | any;

export function stopEventBubbling(e: Event) {
  e.preventDefault();
  e.stopPropagation();
}
