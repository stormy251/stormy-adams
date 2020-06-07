export const INITIAL_VARIANT_NAME = 'hidden';
export const ANIMATE_VARIANT_NAME = 'visible';
export const EXIT_VARIANT_NAME = 'hidden';

const BASE_TIMING = 0.3;

export const staggerChildrenVariants = {
  [ANIMATE_VARIANT_NAME]: {
    opacity: 1,
    transition: {
      staggerChildren: BASE_TIMING,
      delayChildren: 0
    }
  },
  [INITIAL_VARIANT_NAME]: {
    opacity: 0,
    transition: {
      staggerChildren: BASE_TIMING,
      staggerDirection: -1
    }
  }
};

export const staggerChildrenFastVariants = {
  [ANIMATE_VARIANT_NAME]: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0
    }
  },
  [INITIAL_VARIANT_NAME]: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  }
};

export const fadeVariants = {
  [ANIMATE_VARIANT_NAME]: (baseTimeDelayMultiple = 0) => ({
    opacity: 1,
    transition: {
      delay: baseTimeDelayMultiple * BASE_TIMING,
      duration: 0.4
    }
  }),
  [INITIAL_VARIANT_NAME]: (baseTimeDelayMultiple = 0) => ({
    opacity: 0,
    transition: {
      delay: baseTimeDelayMultiple * BASE_TIMING,
      duration: 0.4
    }
  })
};

export const fadeUpVariants = {
  [ANIMATE_VARIANT_NAME]: (baseTimeDelayMultiple = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: baseTimeDelayMultiple * BASE_TIMING
    }
  }),
  [INITIAL_VARIANT_NAME]: (baseTimeDelayMultiple = 0) => ({
    opacity: 0,
    y: 15,
    transition: {
      delay: baseTimeDelayMultiple * BASE_TIMING
    }
  })
};

export const fadeLeftVariants = {
  [ANIMATE_VARIANT_NAME]: (baseTimeDelayMultiple = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: baseTimeDelayMultiple * BASE_TIMING
    }
  }),
  [INITIAL_VARIANT_NAME]: (baseTimeDelayMultiple = 0) => ({
    opacity: 0,
    x: 15,
    transition: {
      delay: baseTimeDelayMultiple * BASE_TIMING
    }
  })
};

export const fadeZoomUpVariants = {
  [ANIMATE_VARIANT_NAME]: (baseTimeDelayMultiple = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: baseTimeDelayMultiple * BASE_TIMING
    }
  }),
  [INITIAL_VARIANT_NAME]: (baseTimeDelayMultiple = 0) => ({
    opacity: 0,
    y: 15,
    scale: 0.95,
    transition: {
      delay: baseTimeDelayMultiple * BASE_TIMING
    }
  })
};

export const fade45DownVariants = {
  [ANIMATE_VARIANT_NAME]: (baseTimeDelayMultiple = 0) => ({
    x: 0,
    y: 0,
    transition: {
      delay: baseTimeDelayMultiple * BASE_TIMING,
      duration: 0.5
    }
  }),
  [INITIAL_VARIANT_NAME]: (baseTimeDelayMultiple = 0) => ({
    x: '-100%',
    y: '-100%',
    transition: {
      delay: baseTimeDelayMultiple * BASE_TIMING,
      duration: 0.5
    }
  })
};

export const fadeMenuDownVariants = {
  [ANIMATE_VARIANT_NAME]: (baseTimeDelayMultiple = 0) => ({
    x: 0,
    y: 0,
    opacity: 1,
    boxShadow: '0 3px 6px rgba(74, 123, 207, 0.16), 0 3px 6px rgba(74, 123, 207, 0.23)',
    transition: {
      delay: baseTimeDelayMultiple * BASE_TIMING,
      duration: 0.4
    }
  }),
  [INITIAL_VARIANT_NAME]: (baseTimeDelayMultiple = 0) => ({
    x: -25,
    y: -5,
    opacity: 0,
    boxShadow: '0px 0px 0px rgba(74, 123, 207, 0.16), 0px 0px 0px rgba(74, 123, 207, 0.23)',
    transition: {
      delay: baseTimeDelayMultiple * BASE_TIMING,
      duration: 0.4
    }
  })
};
