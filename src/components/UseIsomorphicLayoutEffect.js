import { useLayoutEffect, useEffect } from 'react';
const UseIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;
export default UseIsomorphicLayoutEffect;