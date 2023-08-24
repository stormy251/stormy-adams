export const INITIAL_VARIANT_NAME = "hidden";
export const ANIMATE_VARIANT_NAME = "visible";
export const EXIT_VARIANT_NAME = "hidden";

export const ANIMATE_VARIANT_BINDINGS = {
  initial: INITIAL_VARIANT_NAME,
  animate: ANIMATE_VARIANT_NAME,
  exit: EXIT_VARIANT_NAME,
};

export const BASE_TIMING = 0.15;
export const FAST_TIMING = BASE_TIMING / 2;
export const SLOW_TIMING = BASE_TIMING * 1.5;

export const fadeVariants = {
  [ANIMATE_VARIANT_NAME]: {
    opacity: 1,
  },
  [INITIAL_VARIANT_NAME]: {
    opacity: 0,
  },
};

export const fadeLeftVariants = {
  [ANIMATE_VARIANT_NAME]: {
    opacity: 1,
    x: 0,
  },
  [INITIAL_VARIANT_NAME]: {
    opacity: 0,
    x: 5,
  },
};

export const fadeRightVariants = {
  [ANIMATE_VARIANT_NAME]: {
    opacity: 1,
    x: 0,
  },
  [INITIAL_VARIANT_NAME]: {
    opacity: 0,
    x: -5,
  },
};

export const fadeUpVariants = {
  [ANIMATE_VARIANT_NAME]: {
    opacity: 1,
    y: 0,
    transition: {
      duration: SLOW_TIMING,
    },
  },
  [INITIAL_VARIANT_NAME]: {
    opacity: 0,
    y: -5,
    transition: {
      duration: SLOW_TIMING,
    },
  },
};

export const fadeHeightVariants = {
  [ANIMATE_VARIANT_NAME]: {
    opacity: 1,
    height: "auto",
    overflow: "visible",
    transition: {
      duration: SLOW_TIMING,
    },
  },
  [INITIAL_VARIANT_NAME]: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: {
      duration: SLOW_TIMING,
    },
  },
};

export const fadeSectionHeightVariants = {
  [ANIMATE_VARIANT_NAME]: {
    opacity: 1,
    height: "10rem",
    minHeight: "10rem",
    overflow: "visible",
    transition: {
      duration: SLOW_TIMING * 2,
    },
  },
  [INITIAL_VARIANT_NAME]: {
    opacity: 0,
    height: "0",
    minHeight: "0",
    overflow: "hidden",
    transition: {
      duration: SLOW_TIMING * 2,
    },
  },
};

export const fadeMenuVariants = {
  [ANIMATE_VARIANT_NAME]: {
    opacity: 1,
  },
  [INITIAL_VARIANT_NAME]: {
    opacity: 0,
  },
};

export const fadeQuickVariants = {
  [ANIMATE_VARIANT_NAME]: {
    opacity: 1,
    transition: {
      duration: FAST_TIMING,
    },
  },
  [INITIAL_VARIANT_NAME]: {
    opacity: 0,
    transition: {
      duration: FAST_TIMING,
    },
  },
};

export const fadeDownVariants = {
  [ANIMATE_VARIANT_NAME]: {
    opacity: 1,
    y: 0,
  },
  [INITIAL_VARIANT_NAME]: {
    opacity: 0,
    y: -5,
  },
};

export const fadeMenuUpVariants = {
  [ANIMATE_VARIANT_NAME]: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: BASE_TIMING,
    },
  },
  [INITIAL_VARIANT_NAME]: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: BASE_TIMING,
    },
  },
};

export const toastCardVariants = {
  [ANIMATE_VARIANT_NAME]: {
    height: "auto",
    opacity: 1,
    scale: 1,
    transition: {
      duration: SLOW_TIMING,
    },
  },
  [INITIAL_VARIANT_NAME]: {
    height: 0,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: SLOW_TIMING,
      delay: SLOW_TIMING,
    },
  },
};

export const fadeToastHeightAutoVariants = {
  [ANIMATE_VARIANT_NAME]: {
    opacity: 1,
    height: "auto",
    overflow: "visible",
    transition: {
      duration: SLOW_TIMING,
      delay: 2 * SLOW_TIMING,
    },
  },
  [INITIAL_VARIANT_NAME]: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: {
      duration: SLOW_TIMING,
      delay: 2 * SLOW_TIMING,
    },
  },
};
