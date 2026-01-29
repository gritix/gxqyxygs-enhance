import type { Item } from '../../types/item'

const toIndexPageItem: Item[] = [
  {
    name: '添加一键进入填写按钮',
    id: 'add-enter-btn',
    description: [
      '于顶部添加一键进入填写按钮免于勾选和选择年份',
    ],
    fnRunAt: 'document-end',
    fn: () => {
      const ele = document.querySelector(`body > div.container4 > div.box > ul:has(> li > #notice)`)
      const enterBtn = document.createElement('li')
      enterBtn.className = 'nav1 active inject-ele'
      enterBtn.style.margin = '5px'

      const icon = document.createElement('span')
      icon.className = 'icon inject-ele'
      icon.style.filter = 'hue-rotate(100deg)'
      icon.setAttribute('onclick', 'closeWindow();')

      const title = document.createElement('span')
      title.className = 'title inject-ele'
      title.textContent = '一键进入填写'
      title.setAttribute('onclick', 'closeWindow();')

      enterBtn.appendChild(icon)
      enterBtn.appendChild(title)

      ele?.insertAdjacentElement('afterbegin', enterBtn)
    },
  },
]

export default toIndexPageItem
