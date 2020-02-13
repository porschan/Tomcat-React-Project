import {getInitData} from '../service/index';

/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default ({
  namespace: 'dashboard',

  state: {},

  subscriptions: {
    setup({dashboard, history}) {
      history.listen(({pathname}) => {

      });
    }
  },

  effects: {
    // 进入页面加载
    * init({payload}, {call, put, select}) {
      const {pageData} = yield select(state => {
        return state.dispatchjob
      });
      yield put({
        type: 'getInitData',
        payload: {
          pageData: pageData.startPage(1, 10)
        }
      });
    },
    // 获取初始化数据
    * getInitData({payload}, {call, put}) {
      try {
        const {pageData} = payload;
        const resInit = yield call(getInitData);
        if (resInit.status == 0) {
          yield put({
            type: 'setInitData',
            payload: resInit.data
          });
        }
      } catch (e) {
        throw e;
      }
    }
  },

  reducers: {
    setInitData(state, {payload}) {
      return {...state, ...payload};
    },
  }
});
