import { loadModules } from '../modules'
import css from '../style.css?inline'
import { GE_addStyle, waitForBody } from '../utils/ele'

export default defineContentScript({
  matches: ['https://gxqyxygs.scjdglj.gxzf.gov.cn:8443/*'],
  runAt: 'document_start',
  main() {
    // eslint-disable-next-line no-restricted-globals
    if (self !== top)
      return
    if ((new Date()).getFullYear() > 2026) {
    // eslint-disable-next-line no-alert
      alert(`该版本全国企业信用信息公示系统（广西）增强扩展（插件）已停用，请更新或卸载。
更新方式：
GitHub：https://github.com/gritix/gxqyxygs-enhance
联系邮箱：qq32vip@163.com
卸载方式：
Google Chrome/360安全浏览器/360极速浏览器/Edge等：
- 浏览器-扩展程序-管理扩展程序-全国企业信用信息公示系统（广西）增强-卸载/移除`)
      return
    }
    GE_addStyle(css)
    waitForBody().then(() => loadModules())
  },
})
