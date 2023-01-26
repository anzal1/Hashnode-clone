const handleReverse = (regex, api, state, start, end) => {
  // Does not support `Heading`, `image`, `Link`

  if (state.selectedText.match(regex)) {
    api.replaceSelection(
      state.selectedText.slice(start, state.selectedText.length - end).trim()
    );
    api.setSelectionRange({
      start: state.selection.start,
      end: state.selection.end - (start - end + (start + end)),
    });
    return true;
  }
  return false;
};

export default handleReverse;
