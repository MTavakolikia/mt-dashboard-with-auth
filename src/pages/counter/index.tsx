import React from 'react'
import type { RootState } from 'state-management/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from 'state-management/counterSlice'

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <h3>{count}</h3>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          aria-label="Increment +5 value"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          Increment +5
        </button>
      </div>
    </div>
  )
}