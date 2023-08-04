// This is used to quickly check if the OS of the user is a Mac.
export const isMacBased = () => {
  try {
    return navigator?.platform?.includes("Mac");
  } catch (e) {
    // throwing away the server ReferenceError here. This method is used within use-client components only.
  }
};