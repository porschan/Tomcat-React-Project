import dva from 'dva';
import config from './config';
import $$ from 'cmn-utils';
import request from 'cmn-utils/lib/request';
import './index.css';
import createHashHistory from "history/createHashHistory";

// 1. Initialize
const app = dva({
  history: createHashHistory(),
});

// 2. Plugins
app.use({});

$$.requestHeaders({
  'Content-Type': 'application/json;charset=UTF-8',
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
});

request.config(config.request);

// 3. Model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
