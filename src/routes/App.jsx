import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import Login from './Login';
import styles from '../components/app.less';

// 入口判断
const App = ({ children, location, dispatch, app, loading }) => {
  const { login, loginBtnLoading } = app;
  const loginProps = {
    loading,
    loginBtnLoading,
    onLogin(data) {
      dispatch({ type: 'app/login', payload: data});
    }
  };

  return (
    <div>
      { login ?
        <div>
          主程序界面
          {children}
        </div> :
        <div className={styles['login-layout']}>
          <Spin tip="正在努力加载" spinning={loading} size="large">
            <Login {...loginProps} />
          </Spin>
        </div> }
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.bool,
};

export default connect(({ app, loading}) => {
  return {
    app,
    loading: loading.models.app
  };
})(App);