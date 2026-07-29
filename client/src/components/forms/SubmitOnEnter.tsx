/**
 * Enables Enter-to-submit for forms whose action button lives outside the `<form>` —
 * a dialog footer or a page header.
 *
 * Browsers only perform implicit submission when the form contains a submit control, so
 * without this an operator pressing Enter mid-entry gets nothing. Keeping it `disabled`
 * while a save is in flight is what stops Enter from firing a second submission behind
 * the already-disabled visible button.
 */
export function SubmitOnEnter({ disabled }: { disabled?: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      aria-hidden="true"
      tabIndex={-1}
      className="pointer-events-none absolute h-0 w-0 opacity-0"
    />
  );
}
