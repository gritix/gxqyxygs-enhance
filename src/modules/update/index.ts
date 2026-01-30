import type { Item } from '../../types/item'
import { createBtn, waitForEle } from '../../utils/ele'

const updatePageItem: Item[] = [
  {
    name: '添加一键提交并公示按钮',
    id: 'add-submit-btn',
    description: [
      '于顶部添加一键提交并公示按钮免于滚动到底部',
    ],
    fnRunAt: 'document-end',
    fn: () => {
      const bottomBtn = document.querySelector('#tab_7 > form > div > input[value="提交并公示"]')
      if (!bottomBtn)
        return
      const ele = document.querySelector(`body > div.qiye-tian`)
      const checkBtn = createBtn('input', 'inject-ele my-base-btn my-btn-update', '一键提交并公示', () => {})
      checkBtn.setAttribute('onclick', 'document.forms[0].submit();')
      const eleDiv = document.createElement('div')
      eleDiv.className = 'inject-ele'
      eleDiv.style.paddingBottom = '20px'
      eleDiv.style.textAlign = 'center'
      eleDiv.appendChild(checkBtn)
      ele?.insertAdjacentElement('afterbegin', eleDiv)
    },
  },
]

export default updatePageItem
