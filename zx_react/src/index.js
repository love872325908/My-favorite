import dva, {connect} from 'dva';

import {browserHistory} from 'dva/router';
import './index.html';
import './index.less';



// 1. Initialize
const app = dva(
{
  //  history:browserHistory
}
);

// 2. Plugin



// 3. Model
app.model(require('./models/home'));
app.model(require('./models/region'));
app.model(require('./models/score'));
app.model(require('./models/admit'));
app.model(require('./models/schooldetails'))
app.model(require('./models/queryresult'))
app.model(require('./models/searchmajor'))
app.model(require('./models/voluteercar'))

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
