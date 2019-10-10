import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const goTo = (path) => history.push(path);

export default history;
