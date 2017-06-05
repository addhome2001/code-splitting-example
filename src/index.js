/* eslint-disable no-alert */
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import routes from './main';

OfflinePluginRuntime.install({
  onUpdateReady() {
    // 讓使用者決定是否讓新的SW接管
    if (confirm('有新的更新資源，確定要更新嗎？')) {
      // 更新SW
      OfflinePluginRuntime.applyUpdate();
    }
    // 否則等到下一次重新整理
  },
  onUpdated() {
    // 新的SW接管後
    // 重新整理頁面，讀取新版本資源
    window.location.reload();
  },
});

// css
require('./assets/css/app.css');

render(
  <Router history={ browserHistory } routes={ routes } />,
  document.getElementById('container'),
);
