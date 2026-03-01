import { BrowserRouter } from "react-router"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { AppRouter } from "@routes/AppRouter"
import { persistor, store } from "@store/store"

export const BookTracker = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <AppRouter/>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  )
}
