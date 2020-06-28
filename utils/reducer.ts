const reducer = (state = { isDark: false }, action) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return {
        isDark: action.value
      };
    default:
      return state;
  }
};

export default reducer;
