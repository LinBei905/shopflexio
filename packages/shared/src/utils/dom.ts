import { isString } from '.'

export const querySelector = (el: string | Element): Element | null => {
  if (!el) return null
  return isString(el) ? document.querySelector(el) : el
}

function attachDataAsOctetStream(data) {
  return 'data:application/octet-stream,' + encodeURIComponent(data)
}

export function downloadTextAsFile(filename, data = '') {
  return new Promise((resolve) => {
    // const anchor = document.createElement('a')
    const id = `shopflex-download-text-as-file`
    const anchor = document.getElementById(id) || document.createElement('a')
    anchor.style.display = 'none'
    anchor.id = id
    anchor.setAttribute('download', filename)
    const link = attachDataAsOctetStream(data)
    anchor.setAttribute('href', link)
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(document.getElementById(id)!)
    return resolve(true)
  })
}

export function downloadUrlAsFile(filename, data: string) {
  return new Promise((resolve) => {
    const id = `shopflex-download-url-as-file`
    const anchor = document.getElementById(id) || document.createElement('a')
    anchor.style.display = 'none'
    anchor.id = id
    const url = window.URL.createObjectURL(new Blob([data]))
    anchor.setAttribute('download', filename)
    anchor.setAttribute('href', url)
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(document.getElementById(id)!)
    return resolve(true)
  })
}

const _copyToClipboard = (text, callback) => {
  try {
    const tag = document.createElement('input')
    tag.setAttribute('id', 'copy-to-clip-input000')
    tag.value = text
    document.getElementsByTagName('body')[0].appendChild(tag)
    // @ts-ignore
    document.getElementById('copy-to-clip-input000').select()
    document.execCommand('copy')
    // @ts-ignore
    document.getElementById('copy-to-clip-input000').remove()
    if (callback) {
      callback({ data: text })
    }
  } catch (err) {
    callback({ error: err })
  }
}

export const copyToClipboard = (text: string) => {
  if (typeof text === 'object' && text !== null) {
    try {
      text = JSON.stringify(text)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  return new Promise((resolve, reject) => {
    _copyToClipboard(text, (payload) => {
      if (payload && payload.error) return reject(new Error(payload.error))
      return resolve(payload)
    })
  })
}

export function getCursorPosition(
  elem: HTMLTextAreaElement | HTMLInputElement,
) {
  var pp = 0
  // IE
  // @ts-ignore
  if (document.selection) {
    elem.focus()
    // @ts-ignore
    var aa = document.selection.createRange()
    aa.moveStart('character', -elem.value.length)
    pp = aa.text.length
  }
  // FF, Chrome
  // @ts-ignore
  else if (elem.selectionStart || elem.selectionStart == '0') {
    pp = elem.selectionStart
  }
  return pp
}

export function insertAtCursor(
  elem: HTMLInputElement | HTMLTextAreaElement,
  value: string,
) {
  var field = elem
  var newValue = ''
  // IE support
  // @ts-ignore
  if (document.selection) {
    field.focus()
    // @ts-ignore
    var sel = document.selection.createRange()
    sel.text = newValue = value
    sel.select()
  } else if (field.selectionStart || field.selectionStart === 0) {
    var startPos = field.selectionStart
    var endPos = field.selectionEnd || 0
    var restoreTop = field.scrollTop
    newValue =
      field.value.substring(0, startPos) +
      value +
      field.value.substring(endPos, field.value.length)
    if (restoreTop > 0) {
      field.scrollTop = restoreTop
    }
    field.value = newValue
    field.focus()

    setTimeout(function () {
      field.selectionStart = startPos + value.length
      field.selectionEnd = startPos + value.length
    }, 0)
  } else {
    newValue = field.value + value
    field.value = newValue
    field.focus()
  }
}

export function setCaretPosition(
  elem: HTMLInputElement | HTMLTextAreaElement,
  pos: number,
) {
  // IE
  if (elem.setSelectionRange) {
    elem.focus()
    elem.setSelectionRange(pos, pos)
  }
  // FF, Chrome
  // @ts-ignore
  else if (elem.createTextRange) {
    // @ts-ignore
    var range = elem.createTextRange()
    range.collapse(true)
    range.moveEnd('character', pos)
    range.moveStart('character', pos)
    range.select()
  }
}

export const open = (
  url: string,
  options: {
    maxTries?: number
    width?: number
    height?: number
    closeWhenSameOrigin?: boolean
  } = {},
) => {
  // half hour
  const {
    maxTries = 60 * 30,
    height = 800,
    width = 800,
    closeWhenSameOrigin = true,
  } = options
  const { width: sWidth, height: sHeight } = window.screen

  let w: any = null
  w = window.open(
    url,
    undefined,
    `height=${height},width=${width},screenX=${Math.floor(
      (sWidth - width) / 2,
    )},screenY=${Math.floor((sHeight - height) / 2)}`,
  )
  // @ts-ignore
  if (window.focus) {
    w.focus()
  }

  let count = 0
  let timer: any = null
  const cleanup = () => {
    clearInterval(timer)
    timer = null
    w = null
  }

  const parentOrigin = window.location.origin
  return new Promise((resolve, reject) => {
    timer = setInterval(() => {
      try {
        const origin = w.location.origin
        console.log('origin: ', origin, parentOrigin)
        console.log('sub-window location: ', w.location)
        if (origin == parentOrigin) {
          w.close()
          cleanup()
          resolve({ close: true })
          return
        }
      } catch (err) {}

      count++
      if (count >= maxTries) {
        cleanup()
        reject(new Error('Timeout'))
        return
      }

      if (w.closed) {
        resolve({ closed: true })
        cleanup()

        return
      }
    }, 1000)
  })
}

export function isMobile() {
  const flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
  return flag
}
