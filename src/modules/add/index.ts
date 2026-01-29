import type { Item } from '../../types/item'
import { createBtn, getEleById } from '../../utils/ele'
import { GEStorage } from '../../utils/storage'

const addPageElementIds = {
  /** 联系方式 */
  phone_p: 'ancheIndModel_tel',
  /** 资金数额 */
  fundam: 'ancheIndModel_fundam',
  /** 从业人数 */
  empnum: 'ancheIndModel_empnum',
  /** 高校毕业生 */
  col: {
    granum: 'ancheIndModel_colgranum',
    emplnum: 'ancheIndModel_colemplnum',
  },
  /** 退役士兵 */
  ret: {
    solnum: 'ancheIndModel_retsolnum',
    emplnum: 'ancheIndModel_retemplnum',
  },
  /** 残疾人 */
  dis: {
    pernum: 'ancheIndModel_dispernum',
    emplnum: 'ancheIndModel_disemplnum',
  },
  /** 失业人员再就业 */
  une: {
    num: 'ancheIndModel_unenum',
    emplnum: 'ancheIndModel_eneemplnum',
  },
  /** 营业额或营业收入 */
  vendinc: {
    num: 'ancheIndModel_anche_capitalModel_vendinc',
    /** 公示 */
    pub: 'ancheIndModel_anche_capitalModel_vendincispub1',
    /** 不公示 */
    nopub: 'ancheIndModel_anche_capitalModel_vendincispub2',
  },
  /** 纳税总额 */
  ratgro: {
    num: 'ancheIndModel_anche_capitalModel_ratgro',
    /** 公示 */
    pub: 'ancheIndModel_anche_capitalModel_ratgroispub1',
    /** 不公示 */
    nopub: 'ancheIndModel_anche_capitalModel_ratgroispub2',
  },
  /** 网站或网店 */
  web: {
    yes: 'sfywzhwd1',
    no: 'sfywzhwd2',
  },
  /** 党建 */
  party: {
    yes: 'ancheIndModel_anche_partyModel_isparty1',
    no: 'ancheIndModel_anche_partyModel_isparty2',
  },
  /** 团建 */
  party_t: {
    yes: 'ancheIndModel_anche_partyModel_isparty_t1',
    no: 'ancheIndModel_anche_partyModel_isparty_t2',
  },
}

const addPageItem: Item[] = [
  {
    name: '自动填写',
    id: 'add-page-auto-input',
    description: [
      '自动填写由【注册页】或【变更页】保存的【（新）联络员手机号码】',
    ],
    fnRunAt: 'document-end',
    fn: () => {
      const phone_p = getEleById<HTMLInputElement>(addPageElementIds.phone_p)
      if (!phone_p)
        return
      if (!getEleById('importBeforeYearData')) {
        const savePhone = GEStorage.get('register_to_add_phone_p', '')
        if (savePhone.length > 0) {
          phone_p.value = savePhone
          GEStorage.remove('register_to_add_phone_p')
        }
      }
      else {
        const savePhone = GEStorage.get('change_to_add_phone_new_p', '')
        if (savePhone.length > 0) {
          phone_p.value = savePhone
          GEStorage.remove('change_to_add_phone_new_p')
        }
      }
    },
  },
  {
    name: '添加预览并公示按钮',
    id: 'add-save-next-btn',
    description: [
      '于顶部添加一键预览并公示按钮免于滚动到底部',
    ],
    fnRunAt: 'document-end',
    fn: () => {
      const ele = document.querySelector(`#tab_1 > form > div.qiye-biaoge > div:has(> input[value="重置"])`)
      const saveNextBtn = createBtn('input', 'inject-ele my-base-btn my-btn-add', '预览并公示', () => {})
      saveNextBtn.setAttribute('onclick', 'saveNext();')
      if (document.getElementById('importBeforeYearData')) {
        ele?.insertAdjacentHTML('afterbegin', `&nbsp;&nbsp;&nbsp;&nbsp;\n `)
      }
      ele?.insertAdjacentElement('afterbegin', saveNextBtn)
    },
  },
  {
    name: '添加填写默认按钮',
    id: 'add-input-default-btn',
    description: [
      '于顶部添加填写默认按钮可填充默认数值（0）和选项（否）',
    ],
    fnRunAt: 'document-end',
    fn: () => {
      const ele = document.querySelector(`#tab_1 > form > div.qiye-biaoge > div:has(> input[value="重置"])`)
      const inputDef = createBtn('input', 'inject-ele my-base-btn my-btn-add', '填写默认', () => {
        const fundam = getEleById<HTMLInputElement>(addPageElementIds.fundam)
        if (fundam) {
          fundam.value = Number.parseFloat(fundam.value).toFixed(4)
        }
        const empnum = getEleById<HTMLInputElement>(addPageElementIds.empnum)
        empnum && (empnum.value = '0')
        const col_granum = getEleById<HTMLInputElement>(addPageElementIds.col.granum)
        col_granum && (col_granum.value = '0')
        const col_emplnum = getEleById<HTMLInputElement>(addPageElementIds.col.emplnum)
        col_emplnum && (col_emplnum.value = '0')
        const ret_solnum = getEleById<HTMLInputElement>(addPageElementIds.ret.solnum)
        ret_solnum && (ret_solnum.value = '0')
        const ret_emplnum = getEleById<HTMLInputElement>(addPageElementIds.ret.emplnum)
        ret_emplnum && (ret_emplnum.value = '0')
        const dis_pernum = getEleById<HTMLInputElement>(addPageElementIds.dis.pernum)
        dis_pernum && (dis_pernum.value = '0')
        const dis_emplnum = getEleById<HTMLInputElement>(addPageElementIds.dis.emplnum)
        dis_emplnum && (dis_emplnum.value = '0')
        const une_num = getEleById<HTMLInputElement>(addPageElementIds.une.num)
        une_num && (une_num.value = '0')
        const une_emplnum = getEleById<HTMLInputElement>(addPageElementIds.une.emplnum)
        une_emplnum && (une_emplnum.value = '0')
        const vendinc_num = getEleById<HTMLInputElement>(addPageElementIds.vendinc.num)
        vendinc_num && (vendinc_num.value = '0')
        const vendinc_nopub = getEleById<HTMLInputElement>(addPageElementIds.vendinc.nopub)
        vendinc_nopub && (vendinc_nopub.checked = true)
        const ratgro_num = getEleById<HTMLInputElement>(addPageElementIds.ratgro.num)
        ratgro_num && (ratgro_num.value = '0')
        const ratgro_nopub = getEleById<HTMLInputElement>(addPageElementIds.ratgro.nopub)
        ratgro_nopub && (ratgro_nopub.checked = true)
        const web_no = getEleById<HTMLInputElement>(addPageElementIds.web.no)
        web_no && (web_no.checked = true)
        const party_no = getEleById<HTMLInputElement>(addPageElementIds.party.no)
        party_no && (party_no.checked = true)
        const party_t_no = getEleById<HTMLInputElement>(addPageElementIds.party_t.no)
        party_t_no && (party_t_no.checked = true)
      })
      if (document.getElementById('importBeforeYearData')) {
        ele?.insertAdjacentHTML('afterbegin', `&nbsp;&nbsp;&nbsp;&nbsp;\n `)
      }
      ele?.insertAdjacentElement('afterbegin', inputDef)
    },
  },
]

export default addPageItem
