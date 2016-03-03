import { Dispatcher } from "flux";

const AppDispatcher = new Dispatcher();

export default AppDispatcher;

export const dispatch = AppDispatcher.dispatch.bind(AppDispatcher);
