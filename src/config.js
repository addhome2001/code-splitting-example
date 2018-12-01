/* eslint-disable no-alert */
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

OfflinePluginRuntime.install({
  onUpdateReady() {
    // 讓使用者決定是否讓新的SW接管
    if (window.confirm('有新的更新資源，確定要更新嗎？')) {
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
