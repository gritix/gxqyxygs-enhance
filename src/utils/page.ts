const pathname = location.pathname

const pageMap = {
  login: 'loginSydqAction!sydq',
  register: 'registerAction!register_xj_jsp',
  change: 'registerAction!llybg_jsp',
  toIndex: 'user_nzAction!toIndex',
  add: 'ancheIndAction!add',
  update: 'ancheIndAction!update',
}

const getPageType = (page: keyof typeof pageMap) => pathname.includes(pageMap[page])

export const isLoginPage = getPageType('login')
export const isRegisterPage = getPageType('register')
export const isChangePage = getPageType('change')
export const isToIndexPage = getPageType('toIndex')
export const isAddPage = getPageType('add')
export const isUpdatePage = getPageType('update')
