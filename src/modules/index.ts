import type { Group } from '../types/item'
import { isAddPage, isChangePage, isLoginPage, isRegisterPage, isToIndexPage, isUpdatePage } from '../utils/page'
import addPageItem from './add'
import changePageItem from './change'
import commonItem from './common'
import loginPageItem from './login'
import registerPageItem from './register'
import toIndexPageItem from './toIndex'
import updatePageItem from './update'

export const groups: Group[] = [
  {
    name: '登录页',
    id: 'login-page',
    checkFn: () => isLoginPage,
    items: loginPageItem,
  },
  {
    name: '注册页',
    id: 'register-page',
    checkFn: () => isRegisterPage,
    items: registerPageItem,
  },
  {
    name: '变更页',
    id: 'change-page',
    checkFn: () => isChangePage,
    items: changePageItem,
  },
  {
    name: '选项页',
    id: 'to-index-page',
    checkFn: () => isToIndexPage,
    items: toIndexPageItem,
  },
  {
    name: '填写页',
    id: 'add-page',
    checkFn: () => isAddPage,
    items: addPageItem,
  },
  {
    name: '预览页',
    id: 'update-page',
    checkFn: () => isUpdatePage,
    items: updatePageItem,
  },
  {
    name: '通用',
    id: 'common',
    checkFn: () => true,
    items: commonItem,
  },
]

export function loadModules() {
  groups.forEach((group) => {
    if (group.checkFn()) {
      group.items.forEach((item) => {
        if (item.fnRunAt === 'document-end' && document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => item.fn()?.catch(() => { }))
        }
        else {
          item.fn()?.catch(() => { })
        }
      })
    }
  })
}
