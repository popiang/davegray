# steps
1. create app using vite
2. clean up the code
3. npm install @reduxjs/toolkit react-redux
4. create features folder in src folder
5. create counter folder in features folder
6. create counterSlice.js
   - import createSlice
   - create and export counterSlice = createSlice({})
     - name: "counter"
	 - initialState,
	 - reducers: {}
	   - increment: (state) => state.count += 1
	   - decrement: (state) => state.count -= 1
	   - reset: (state) => state.count = 0
	   - incrementByAmount: (state, action) => state.count += action.payload
	- export const {increment, decrement, reset, incrementByAmount} = counterSlice.actions
	- export default counterSlice.reducer
7. create app folder in src folder
8. create store.js
   - import configureStore
   - import counterReducer
   - create and export store = configureStore({})
     - reducer: {}
	   - counter: counterReducer
9. in main.jsx
   - import store
   - import Provider
   - wrap App with Provider
     - Provider receives props store={store}
10. in counter folder, create Counter.jsx, rfc
11. import useSelector and useDispatch
12. import increment, decrement, reset & incrementByAmount
13. get count from useSelector(state=> state.counter.count)
14. get dispatch from useDispatch()
15. create incrementAmount state
16. create the layout - check github for code
17. dispatch(increment / decrement) to respective button
18. call setIncrementAmount on onChange event on the input
19. at the top after declaring the state, change if incrementAmount is a number or not, if it's a number, assign to addValue, if it's not a number then assign 0 the addValue const
20. dispatch(incrementByAmount(addValue)) on the respective button
21. create resetAll function to handle reset action
22. in the function, first call setIncrementAmount(0) to reset it, then dispatch(reset()) to reset global state value
22. call resetAll function on onClick event on respective button
23. basically that's all
