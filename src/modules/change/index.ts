import type { Item } from '../../types/item'
import { createBtn, getEleById } from '../../utils/ele'
import { GEStorage } from '../../utils/storage'

const changePageElementIds = {
  /** 统一社会信用代码/注册号 */
  regno: 'uni_regno',
  /** 法定代表人（负责人）姓名 */
  name_l: 'lerep',
  /** 法定代表人（负责人）证件号码 */
  cid_l: 'lerepno',
  /** 原联络员姓名 */
  name_p: 'name',
  /** 原联络员证件号码 */
  cid_p: 'cerno',
  /** 原联络员手机号码 */
  phone_p: 'mobtel',
  /** 新联络员姓名 */
  name_new_p: 'name_new',
  /** 新联络员证件号码 */
  cid_new_p: 'cerno_new',
  /** 新联络员手机号码 */
  phone_new_p: 'mobtel_new',
}

const changePageItem: Item[] = [
  {
    name: '自动填写',
    id: 'change-page-auto-input',
    description: [
      '自动填写由【登录页】保存的【统一社会信用代码/注册号】【原联络员证件号码】【原联络员姓名】和【原联络员手机号码】',
    ],
    fnRunAt: 'document-end',
    fn: () => {
      const regno = getEleById<HTMLInputElement>(changePageElementIds.regno)
      const name_p = getEleById<HTMLInputElement>(changePageElementIds.name_p)
      const cid_p = getEleById<HTMLInputElement>(changePageElementIds.cid_p)
      const phone_p = getEleById<HTMLInputElement>(changePageElementIds.phone_p)
      const name_new_p = getEleById<HTMLInputElement>(changePageElementIds.name_new_p)
      const cid_new_p = getEleById<HTMLInputElement>(changePageElementIds.cid_new_p)

      if (regno) {
        regno.value = GEStorage.get('login_to_change_regno', regno.value)
        GEStorage.remove('login_to_change_regno')
      }
      if (cid_p && cid_new_p) {
        cid_p.value = GEStorage.get('login_to_change_cid_p', cid_p.value)
        cid_new_p.value = cid_p.value
        GEStorage.remove('login_to_change_cid_p')
      }
      if (phone_p) {
        phone_p.value = GEStorage.get('login_to_change_phone_p', phone_p.value)
        GEStorage.remove('login_to_change_phone_p')
      }
      if (name_p && name_new_p) {
        name_p.value = GEStorage.get('login_to_change_name_p', name_p.value)
        name_new_p.value = name_p.value
        GEStorage.remove('login_to_change_name_p')
      }
    },
  },
  {
    name: '添加同步按钮',
    id: 'add-sync-btn',
    description: [
      '添加【联络员信息】与【法定代表人（负责人）信息】同步按钮',
    ],
    fnRunAt: 'document-end',
    fn: () => {
      const name_l = getEleById<HTMLInputElement>(changePageElementIds.name_l)
      const cid_l = getEleById<HTMLInputElement>(changePageElementIds.cid_l)
      const name_p = getEleById<HTMLInputElement>(changePageElementIds.name_p)
      const cid_p = getEleById<HTMLInputElement>(changePageElementIds.cid_p)
      const name_new_p = getEleById<HTMLInputElement>(changePageElementIds.name_new_p)
      const cid_new_p = getEleById<HTMLInputElement>(changePageElementIds.cid_new_p)

      if ((!name_l) || (!cid_l) || (!name_p) || (!cid_p) || (!name_new_p) || (!cid_new_p))
        return
      const syncL2PBtn = createBtn('input', 'my-btn-change inject-ele', '同步到原联络员', () => {
        name_p.value = name_l.value
        cid_p.value = cid_l.value
      })

      const syncL2NPBtn = createBtn('input', 'my-btn-change inject-ele', '同步到新联络员', () => {
        name_new_p.value = name_l.value
        cid_new_p.value = cid_l.value
      })
      syncL2PBtn.style.height = `${name_l.getBoundingClientRect().height}px`
      syncL2NPBtn.style.height = `${name_l.getBoundingClientRect().height}px`
      name_l.parentElement?.appendChild(syncL2PBtn)
      name_l.parentElement?.appendChild(syncL2NPBtn)
      name_l.classList.add('recover-width-358')
      name_l.style.width = `${358 - syncL2PBtn.getBoundingClientRect().width - syncL2NPBtn.getBoundingClientRect().width}px`

      const syncP2LBtn = createBtn('input', 'my-btn-change inject-ele', '同步到负责人', () => {
        name_l.value = name_p.value
        cid_l.value = cid_p.value
      })

      const syncP2NPBtn = createBtn('input', 'my-btn-change inject-ele', '同步到原联络员', () => {
        name_new_p.value = name_p.value
        cid_new_p.value = cid_p.value
      })
      syncP2LBtn.style.height = `${name_p.getBoundingClientRect().height}px`
      syncP2NPBtn.style.height = `${name_p.getBoundingClientRect().height}px`
      name_p.parentElement?.appendChild(syncP2LBtn)
      name_p.parentElement?.appendChild(syncP2NPBtn)
      name_p.classList.add('recover-width-358')
      name_p.style.width = `${358 - syncP2LBtn.getBoundingClientRect().width - syncP2NPBtn.getBoundingClientRect().width}px`

      const syncNP2LBtn = createBtn('input', 'my-btn-change inject-ele', '同步到负责人', () => {
        name_l.value = name_new_p.value
        cid_l.value = cid_new_p.value
      })

      const syncNP2PBtn = createBtn('input', 'my-btn-change inject-ele', '同步到原联络员', () => {
        name_p.value = name_new_p.value
        cid_p.value = cid_new_p.value
      })
      syncNP2LBtn.style.height = `${name_new_p.getBoundingClientRect().height}px`
      syncNP2PBtn.style.height = `${name_new_p.getBoundingClientRect().height}px`
      name_new_p.parentElement?.appendChild(syncNP2LBtn)
      name_new_p.parentElement?.appendChild(syncNP2PBtn)
      name_new_p.classList.add('recover-width-358')
      name_new_p.style.width = `${358 - syncNP2LBtn.getBoundingClientRect().width - syncNP2PBtn.getBoundingClientRect().width}px`
    },
  },
  {
    name: '自动保存',
    id: 'change-page-auto-save',
    description: [
      '自动保存【统一社会信用代码/注册号】和【联络员证件号码】用于跳转【登录页】时自动填写',
      '自动保存【新联络员手机号码】用于跳转【填写页】时自动填写',
    ],
    fnRunAt: 'document-end',
    fn: () => {
      const regno = getEleById<HTMLInputElement>(changePageElementIds.regno)
      const cid_p = getEleById<HTMLInputElement>(changePageElementIds.cid_p)
      const phone_new_p = getEleById<HTMLInputElement>(changePageElementIds.phone_new_p)

      const saveBtn = document.querySelector('button.btn-1[onclick="checkform();"]') as HTMLButtonElement
      saveBtn && saveBtn.addEventListener('click', () => {
        regno && (regno.value.length === 18) && GEStorage.set('change_to_login_regno', regno.value)
        cid_p && (cid_p.value.length === 18) && GEStorage.set('change_to_login_cid_p', cid_p.value)
        phone_new_p && (phone_new_p.value.length === 11) && GEStorage.set('change_to_add_phone_new_p', phone_new_p.value)
      })
    },
  },
]

export default changePageItem
