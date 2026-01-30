import type { Item } from '../../types/item'
import { createBtn, getEleById } from '../../utils/ele'
import { GEStorage } from '../../utils/storage'

const registerPageElementIds = {
  /** 统一社会信用代码/注册号 */
  regno: 'uni_regno',
  /** 法定代表人（负责人）姓名 */
  name_l: 'lerep',
  /** 法定代表人（负责人）证件号码 */
  cid_l: 'lerepno',
  /** 联络员姓名 */
  name_p: 'name',
  /** 联络员证件号码 */
  cid_p: 'cerno',
  /** 联络员手机号码 */
  phone_p: 'mobtel',
}

const registerPageItem: Item[] = [
  {
    name: '自动填写',
    id: 'register-page-auto-input',
    description: [
      '自动填写由【登录页】保存的【统一社会信用代码/注册号】和【联络员证件号码】',
    ],
    fnRunAt: 'document-end',
    fn: () => {
      const regno = getEleById<HTMLInputElement>(registerPageElementIds.regno)
      const cid_p = getEleById<HTMLInputElement>(registerPageElementIds.cid_p)

      if (regno) {
        regno.value = GEStorage.get('login_to_register_regno', regno.value)
        GEStorage.remove('login_to_register_regno')
      }
      if (cid_p) {
        cid_p.value = GEStorage.get('login_to_register_cid_p', cid_p.value)
        GEStorage.remove('login_to_register_cid_p')
      }
    },
  },
  {
    name: '添加同步按钮',
    id: 'add-sync-button',
    description: [
      '添加【联络员证件号码】与【法定代表人（负责人）证件号码】、【联络员姓名】与【法定代表人（负责人）姓名】互相同步按钮',
    ],
    fnRunAt: 'document-end',
    fn: () => {
      const name_l = getEleById<HTMLInputElement>(registerPageElementIds.name_l)
      const cid_l = getEleById<HTMLInputElement>(registerPageElementIds.cid_l)
      const name_p = getEleById<HTMLInputElement>(registerPageElementIds.name_p)
      const cid_p = getEleById<HTMLInputElement>(registerPageElementIds.cid_p)

      if ((!name_l) || (!cid_l) || (!name_p) || (!cid_p))
        return
      const syncL2PBtn = createBtn('input', 'my-btn-register inject-ele', '同步到联络员', () => {
        name_l.value.length > 0 && (name_p.value = name_l.value)
        cid_l.value.length > 0 && (cid_p.value = cid_l.value)
      })
      syncL2PBtn.style.height = `${name_l.getBoundingClientRect().height}px`
      name_l.parentElement?.appendChild(syncL2PBtn)
      name_l.classList.add('recover-width-358')
      name_l.style.width = `${358 - syncL2PBtn.getBoundingClientRect().width}px`

      const syncP2LBtn = createBtn('input', 'my-btn-register inject-ele', '同步到负责人', () => {
        name_p.value.length > 0 && (name_l.value = name_p.value)
        cid_p.value.length > 0 && (cid_l.value = cid_p.value)
      })
      syncP2LBtn.style.height = `${name_p.getBoundingClientRect().height}px`
      name_p.parentElement?.appendChild(syncP2LBtn)
      name_p.classList.add('recover-width-358')
      name_p.style.width = `${358 - syncP2LBtn.getBoundingClientRect().width}px`
    },
  },
  {
    name: '自动保存',
    id: 'register-page-auto-save',
    description: [
      '自动保存【统一社会信用代码/注册号】和【联络员证件号码】用于跳转【登录页】时自动填写',
      '自动保存【联络员手机号码】用于跳转【填写页】时自动填写',
    ],
    fnRunAt: 'document-end',
    fn: () => {
      const saveBtn = document.querySelector('button.btn-1[onclick="checkform();"]') as HTMLButtonElement
      saveBtn.addEventListener('click', () => {
        const regno = getEleById<HTMLInputElement>(registerPageElementIds.regno)
        const cid_p = getEleById<HTMLInputElement>(registerPageElementIds.cid_p)
        const phone_p = getEleById<HTMLInputElement>(registerPageElementIds.phone_p)
        regno && (regno.value.length === 18 || regno.value.length === 15) && GEStorage.set('register_to_login_regno', regno.value)
        cid_p && (cid_p.value.length === 18) && GEStorage.set('register_to_login_cid_p', cid_p.value)
        phone_p && (phone_p.value.length === 11) && GEStorage.set('register_to_add_phone_p', phone_p.value)
      })
    },
  },
]

export default registerPageItem
