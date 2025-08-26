import ReactDom from "react-dom/client"
import { Provider } from "react-redux"
import {store} from "./store"
import App from "../App"

ReactDom.createRoot(document.getElementById("root")).render(
    <Provider>
        <App store={store} />
    </Provider>
)