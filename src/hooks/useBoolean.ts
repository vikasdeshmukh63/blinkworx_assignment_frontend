import { useMemo, useState, useCallback } from 'react'

// custom hook for managing boolean state
export function useBoolean(defaultValue = false) {
    // main boolean state
    const [value, setValue] = useState(defaultValue)

    // set value to true
    const onTrue = useCallback(() => {
        setValue(true)
    }, [])

    // set value to false
    const onFalse = useCallback(() => {
        setValue(false)
    }, [])

    // toggle between true/false
    const onToggle = useCallback(() => {
        setValue((prev) => !prev)
    }, [])

    // memoize return object to prevent unnecessary rerenders
    const memoizedValue = useMemo(
        () => ({
            value,
            onTrue,
            onFalse,
            onToggle,
            setValue
        }),
        [value, onTrue, onFalse, onToggle, setValue]
    )

    return memoizedValue
}
