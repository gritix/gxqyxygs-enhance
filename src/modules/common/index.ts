import type { Item } from '../../types/item'
import { createBtn, hideEle, showEle, waitForBody } from '../../utils/ele'
import { GEStorage } from '../../utils/storage'

const commonItem: Item[] = [
  {
    name: '添加侧边按钮',
    id: 'add-side-btn',
    description: [
      '于右下角添加显示/隐藏按钮用于显示/隐藏非原页面元素',
    ],
    fn: () => {
      const isHide = GEStorage.get('is-hide', '隐藏')
      if (isHide === '显示') {
        document.documentElement.setAttribute('inject-hide', '')
        document.querySelectorAll('.reverse-show').forEach(ele => showEle(ele as HTMLElement))
      }
      const hide = createBtn('button', 'my-base-btn side-btn', isHide, () => {
        if (hide.textContent === '隐藏') {
          hide.textContent = '显示'
          document.documentElement.setAttribute('inject-hide', '')
          document.querySelectorAll('.reverse-show').forEach(ele => showEle(ele as HTMLElement))
          GEStorage.set('is-hide', '显示')
        }
        else {
          hide.textContent = '隐藏'
          document.documentElement.removeAttribute('inject-hide')
          document.querySelectorAll('.reverse-show').forEach(ele => hideEle(ele as HTMLElement))
          GEStorage.set('is-hide', '隐藏')
        }
      })
      waitForBody().then(() => {
        document.body.insertAdjacentElement('beforeend', hide)
      })
    },
  },
]

export default commonItem
