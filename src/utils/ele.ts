/** 等待head出现 */
export function waitForHead() {
  return new Promise<void>((resolve) => {
    if (document.head) {
      resolve()
      return
    }
    const observer = new MutationObserver(() => {
      if (document.head) {
        observer.disconnect()
        resolve()
      }
    })
    observer.observe(document, { childList: true, subtree: true })
  })
}

/** 等待body出现 */
export function waitForBody() {
  return new Promise<void>((resolve) => {
    if (document.body) {
      resolve()
      return
    }
    const observer = new MutationObserver(() => {
      if (document.body) {
        observer.disconnect()
        resolve()
      }
    })
    observer.observe(document, { childList: true, subtree: true })
  })
}

export function getEleById<T extends HTMLElement>(id: string) {
  return document.getElementById(id) as T || null
}

export function createBtn(type: 'button' | 'input', className: string, textContent: string, onclick: () => void) {
  const btn = document.createElement(type)
  if (type === 'input') {
    btn.type = 'button'
    btn.value = textContent
  }
  else {
    btn.textContent = textContent
  }
  className.length > 0 && (btn.className = className)
  onclick && btn.addEventListener('click', onclick)
  return btn
}

// 隐藏元素
export function hideEle(ele: HTMLElement) {
  ele.style.setProperty('display', 'none', 'important')
}
// 显示元素
export function showEle(ele: HTMLElement) {
  ele.style.removeProperty('display')
}
// 判断是否隐藏中
export function isEleHide(ele: HTMLElement) {
  return ele.style.display === 'none'
}

/**
 * 监听元素出现
 * @param watchEle 被监听的元素
 * @param selector 选择器
 * @param isTargetNode 判断Mutation node是否为target的函数
 */
export async function waitForEle(watchEle: HTMLElement | Document, selector: string, isTargetNode: (node: HTMLElement) => boolean): Promise<HTMLElement | null> {
  if (!selector) {
    return null
  }
  let ele = watchEle.querySelector(selector) as HTMLElement | null
  if (ele) {
    return ele
  }
  return await new Promise<HTMLElement | null>((resolve) => {
    const observer = new MutationObserver((mutationList) => {
      mutationList.forEach((mutation) => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement && isTargetNode(node)) {
              observer.disconnect()
              ele = watchEle.querySelector(selector) as HTMLElement | null
              resolve(ele)
            }
          })
        }
      })
    })
    observer.observe(watchEle, { childList: true, subtree: true })
  })
}

export function GE_addStyle(css: string) {
  const style = document.createElement('style')
  style.innerHTML = css
  waitForHead().then(() => document.head.appendChild(style))
}
