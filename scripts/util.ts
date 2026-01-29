export function getDescription(descriptions: { [name: string]: { name: string, description: string[] }[] }) {
  const pageMap: { [key: string]: string } = {
    login: '登录',
    register: '注册',
    change: '变更',
    toIndex: '选项',
    add: '填写',
    update: '预览',
  }
  return Object.entries(descriptions).map(([moduleName, items]) => {
    if (moduleName in pageMap)
      return `${pageMap[moduleName]}页：${items.map(v => v.description.join(' ')).join('，')}`
    return null
  }).join('；')
}

export function formatDate(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')

  return `${y}${m}${d}${h}${min}${s}`
}
