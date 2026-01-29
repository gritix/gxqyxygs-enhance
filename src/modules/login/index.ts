import type { Item } from '../../types/item'
import { createBtn, getEleById, hideEle, showEle } from '../../utils/ele'
import { GEStorage } from '../../utils/storage'

const loginPageElementIds = {
  /** 统一社会信用代码/注册号 */
  regno: 'userModel_regno',
  /** 企业联络员身份证号码 */
  cid_p: 'userModel_contact_cid',
  /** 企业（个体、农专）名称 */
  entname: 'userModel_entname',
  /** 企业联络员姓名 */
  name_p: 'userModel_person',
  /** 企业联络员手机号 */
  phone_p: 'userModel_num_sjhm',
  /** 登录 */
  sure: 'sure',
}

function createOption(value: string, textContent: string) {
  const option = document.createElement('option')
  option.value = value
  option.textContent = textContent
  return option
}

function initSelection(key: string, def: string, selection: HTMLSelectElement) {
  while (selection.options.length > 0) {
    selection.remove(0)
  }
  Array.from(new Set(GEStorage.get(key, def).trim().split(' '))).forEach((cidStart) => {
    if (cidStart.length > 0) {
      const option = createOption(cidStart, cidStart)
      selection.options.add(option)
    }
  })
}

function init(key: string, def: string, select: HTMLSelectElement) {
  initSelection(key, def, select)
  const option1 = createOption('', '空(输入完整)')
  select.options.add(option1)
}

const loginPageItem: Item[] = [
  {
    name: '自动填写',
    id: 'login-page-auto-input',
    description: [
      '自动填写由【注册页】保存的【统一社会信用代码/注册号】和【联络员证件号码】',
    ],
    fnRunAt: 'document-end',
    fn: () => {
      const regno = getEleById<HTMLInputElement>(loginPageElementIds.regno)
      const cid = getEleById<HTMLInputElement>(loginPageElementIds.cid_p)
      if (regno) {
        regno.value = GEStorage.get('register_to_login_regno', '')
        GEStorage.remove('register_to_login_regno')
      }
      if (cid) {
        cid.value = GEStorage.get('register_to_login_cid_p', '')
        GEStorage.remove('register_to_login_cid_p')
      }
    },
  },
  {
    name: '添加【统一社会信用代码/注册号】选择框',
    id: 'add-select-regno',
    description: [
      '添加【统一社会信用代码/注册号】开头选择框并自动拼接选择框和输入框内容',
    ],
    fnRunAt: 'document-end',
    fn: () => {
      const regno = getEleById<HTMLInputElement>(loginPageElementIds.regno)
      if (!regno)
        return
      const fakeRegNoInput = document.createElement('input')
      fakeRegNoInput.className = `${regno.className} inject-ele`
      regno.classList.add('reverse-show')
      fakeRegNoInput.style.position = 'relative'
      fakeRegNoInput.onblur = regno.onblur

      const regNoSelection = document.createElement('select')
      regNoSelection.className = 'inject-ele my-btn-login'
      regNoSelection.style.verticalAlign = 'bottom'
      regNoSelection.style.height = `${regno.getBoundingClientRect().height}px`

      const modifyBtn = createBtn('input', 'inject-ele my-btn-login', '修改列表', () => {
        // eslint-disable-next-line no-alert
        const userInputCidStartList = prompt('请输入统一社会信用代码/注册号开头，多个以【空格】分开，如：9110000000 1100002000', GEStorage.get('regno_start_list', ''))
        if (userInputCidStartList) {
          if (userInputCidStartList.length > 0) {
            const userInputCidStarts = userInputCidStartList.trim().toUpperCase().split(' ')
            GEStorage.set('regno_start_list', Array.from(new Set(userInputCidStarts)).join(' '))
          }
          else {
            GEStorage.remove('regno_start_list')
          }
          init('regno_start_list', '', regNoSelection)
        }
      })
      modifyBtn.className = 'inject-ele my-btn-login'
      modifyBtn.style.verticalAlign = 'bottom'
      modifyBtn.style.height = `${regno.getBoundingClientRect().height}px`

      init('regno_start_list', '', regNoSelection)

      regno.insertAdjacentElement('beforebegin', regNoSelection)
      regno.insertAdjacentElement('beforebegin', modifyBtn)
      regno.insertAdjacentElement('beforebegin', fakeRegNoInput)
      fakeRegNoInput.style.width = `${300 - regNoSelection.getBoundingClientRect().width - modifyBtn.getBoundingClientRect().width}px`
      hideEle(regno)
      function event() {
        fakeRegNoInput.value = fakeRegNoInput.value.toUpperCase()
        if (!regno)
          return
        regno.value = regNoSelection.value + fakeRegNoInput.value
        if (regno.value.length === 18) {
          fakeRegNoInput.remove()
          regNoSelection.remove()
          modifyBtn.remove()
          showEle(regno)
          regno.classList.remove('reverse-show')
        }
      }
      regNoSelection.addEventListener('change', event)
      fakeRegNoInput.addEventListener('input', event)
    },
  },
  {
    name: '添加【联络员证件号码】选择框',
    id: 'add-cid-select',
    description: [
      '添加【联络员证件号码】开头选择框并自动拼接选择框和输入框内容',
    ],
    fnRunAt: 'document-end',
    fn: () => {
      const cid = getEleById<HTMLInputElement>(loginPageElementIds.cid_p)
      if (!cid)
        return
      const fakeCidInput = document.createElement('input')
      fakeCidInput.className = `${cid.className} inject-ele`
      cid.classList.add('reverse-show')
      fakeCidInput.style.position = 'relative'
      fakeCidInput.onblur = cid.onblur

      const cidSelection = document.createElement('select')
      cidSelection.className = 'inject-ele my-btn-login'
      cidSelection.style.height = `${cid.getBoundingClientRect().height}px`

      const modifyBtn = createBtn('input', 'inject-ele my-btn-login', '修改列表', () => {
        // eslint-disable-next-line no-alert
        const userInputCidStartList = prompt('请输入身份证开头，多个以【空格】分开，如：11000019 11000020', GEStorage.get('cid_start_list', ''))
        if (userInputCidStartList) {
          if (userInputCidStartList.length > 0) {
            const userInputCidStarts = userInputCidStartList.trim().toUpperCase().split(' ')
            GEStorage.set('cid_start_list', Array.from(new Set(userInputCidStarts)).join(' '))
          }
          else {
            GEStorage.remove('cid_start_list')
          }
          init('cid_start_list', '', cidSelection)
        }
      })
      modifyBtn.className = 'inject-ele my-btn-login'
      modifyBtn.style.height = `${cid.getBoundingClientRect().height}px`

      init('cid_start_list', '', cidSelection)

      cid.insertAdjacentElement('beforebegin', cidSelection)
      cid.insertAdjacentElement('beforebegin', modifyBtn)
      cid.insertAdjacentElement('beforebegin', fakeCidInput)
      fakeCidInput.style.width = `${300 - cidSelection.getBoundingClientRect().width - modifyBtn.getBoundingClientRect().width}px`
      hideEle(cid)
      function event() {
        fakeCidInput.value = fakeCidInput.value.toUpperCase()
        if (!cid)
          return
        cid.value = cidSelection.value + fakeCidInput.value
        if (cid.value.length === 18) {
          fakeCidInput.remove()
          cidSelection.remove()
          modifyBtn.remove()
          showEle(cid)
          cid.classList.remove('reverse-show')
        }
      }
      cidSelection.addEventListener('change', event)
      fakeCidInput.addEventListener('input', event)
    },
  },
  {
    name: '自动保存',
    id: 'login-page-auto-save',
    description: [
      '自动保存【统一社会信用代码/注册号】和【联络员证件号码】用于跳转【注册页】时自动填写',
      '自动保存【统一社会信用代码/注册号】、【联络员证件号码】、【企业联络员姓名】和【企业联络员手机号】用于跳转【变更页】时自动填写',
    ],
    fnRunAt: 'document-end',
    fn: () => {
      const regno = getEleById<HTMLInputElement>(loginPageElementIds.regno)
      const cid = getEleById<HTMLInputElement>(loginPageElementIds.cid_p)
      const name = getEleById<HTMLInputElement>(loginPageElementIds.name_p)
      const phone = getEleById<HTMLInputElement>(loginPageElementIds.phone_p)
      if ((!regno) || (!cid) || (!name) || (!phone)) {
        return
      }

      const sureBtn = getEleById<HTMLButtonElement>(loginPageElementIds.sure)
      sureBtn && sureBtn.addEventListener('click', () => {
        GEStorage.set('login_to_index_phone_p', phone.value)
        const saveRegNoStartList = new Set(GEStorage.get('regno_start_list', '').trim().toUpperCase().split(' '))
        const nowRegNoStart = regno.value.substring(0, 10).toUpperCase()
        if (!saveRegNoStartList.has(nowRegNoStart)) {
          saveRegNoStartList.add(nowRegNoStart)
          GEStorage.set('regno_start_list', Array.from(saveRegNoStartList).join(' '))
        }
        const saveCidStartList = new Set(GEStorage.get('cid_start_list', '').trim().toUpperCase().split(' '))
        const nowCidStart = cid.value.substring(0, 8).toUpperCase()
        if (!saveCidStartList.has(nowCidStart)) {
          saveCidStartList.add(nowCidStart)
          GEStorage.set('cid_start_list', Array.from(saveCidStartList).join(' '))
        }
      })
      const toRegister = document.querySelector('span > a[href="/nb/user_register/registerAction!register_xj_jsp.dhtml"]') as HTMLAnchorElement
      toRegister && toRegister.addEventListener('click', () => {
        regno.value.length === 18 && GEStorage.set('login_to_register_regno', regno.value)
        cid.value.length === 18 && GEStorage.set('login_to_register_cid_p', cid.value)
      })
      const toChange = document.querySelector('span > a[href="/nb/user_register/registerAction!llybg_jsp.dhtml"]') as HTMLAnchorElement
      toChange && toChange.addEventListener('click', () => {
        regno.value.length === 18 && GEStorage.set('login_to_change_regno', regno.value)
        cid.value.length === 18 && GEStorage.set('login_to_change_cid_p', cid.value)
        phone.value.length === 11 && GEStorage.set('login_to_change_phone_p', phone.value)
        name.value.length > 0 && GEStorage.set('login_to_change_name_p', name.value)
      })
    },
  },
  {
    name: '添加复制按钮',
    id: 'add-copy-btn',
    description: [
      '格式化复制信息到剪切版',
    ],
    fnRunAt: 'document-end',
    fn: () => {
      const teg = getEleById<HTMLButtonElement>(loginPageElementIds.sure)?.parentElement
      teg && teg.appendChild(createBtn('button', 'btn btn-4 inject-ele', '复  制', () => {
        const regno = getEleById<HTMLInputElement>(loginPageElementIds.regno)?.value
        const cid_p = getEleById<HTMLInputElement>(loginPageElementIds.cid_p)?.value
        const entname = getEleById<HTMLInputElement>(loginPageElementIds.entname)?.value
        const name_p = getEleById<HTMLInputElement>(loginPageElementIds.name_p)?.value
        const phone_p = getEleById<HTMLInputElement>(loginPageElementIds.phone_p)?.value
        const copyText = []
        regno && copyText.push(`统一社会信用代码/注册号：${regno}`)
        cid_p && copyText.push(`企业联络员身份证号码：${cid_p}`)
        entname && copyText.push(`企业（个体、农专）名称：${entname}`)
        name_p && copyText.push(`企业联络员姓名：${name_p}`)
        phone_p && copyText.push(`企业联络员手机号：${phone_p}`)
        copyText.length > 0 && navigator.clipboard.writeText(copyText.join('\n'))
      }))
    },
  },
]

export default loginPageItem
