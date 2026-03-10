import { useEffect, useCallback, useState, useRef } from 'react'

type FormData = {
  [key: string]: string | number | boolean | undefined
}

/**
 * フォームの入力状態を監視する
 * isValid: required属性を持つinput要素が全て入力されているか
 * formRef: 監視対象のフォーム要素
 * formData: フォームの入力値を保存する
 * watchValidation: 入力値のバリデーションを行うか
 *
 * ※ input要素のname属性をkeyとして、入力値を保存する
 */
export const useForm = (watchValidation = true) => {
  const [isValid, setIsValid] = useState(watchValidation ? false : true)
  const [formData, setFormData] = useState<FormData>({})

  const formRef = useRef<HTMLFormElement>(null)

  const watchStatus = useCallback(() => {
    if (!watchValidation) return

    const target = formRef?.current
    if (!target) return
    target.querySelectorAll('[data-saved]').forEach(item => {
      const element = item as HTMLElement
      delete element.dataset.saved // 保存済みフラグを削除
    })

    // 必須項目が全て入力されているかチェック
    let isValid = target?.checkValidity()

    // `data-required-group`が付与されているチェックボックスのみを対象にグループのバリデーションを実行
    const requiredCheckboxGroups = new Set<string>()
    const checkboxes = target.querySelectorAll('input[type="checkbox"][data-required-group="true"]')

    if (checkboxes && checkboxes.length > 0) {
      checkboxes.forEach(input => {
        const element = input as HTMLInputElement
        if (element.name && !requiredCheckboxGroups.has(element.name)) {
          // 同じ`name`属性を持つチェックボックスグループを保存
          requiredCheckboxGroups.add(element.name)

          // 同じ`name`属性を持つチェックボックスグループで、少なくとも1つが選択されているかを確認
          const groupFilled = Array.from(target.elements).some(
            el =>
              el instanceof HTMLInputElement &&
              el.type === 'checkbox' &&
              el.name === element.name &&
              el.checked
          )

          // グループに1つも選択がなければ、フォームのバリデーションを無効に設定
          if (!groupFilled) {
            isValid = false
          }
        }
      })
    }

    // 即時に更新するとonChangeイベントの処置と競合するため、遅延させる
    setTimeout(() => {
      setIsValid(isValid)
    }, 100)
  }, [watchValidation])

  // formRefからフォームの入力値を取得して保存
  const updateFormData = useCallback(() => {
    const target = formRef.current
    if (!target) return

    const formValues = Array.from(target.elements).reduce<FormData>((acc, element) => {
      // input, textarea, select の場合
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement
      ) {
        if (element.type === 'checkbox') {
          if (element instanceof HTMLInputElement) {
            if (element.value) {
              const answer = acc[element.name] ? (acc[element.name] as string).split(',') : []
              if (element.checked) {
                const newAnswer = [...answer, element.value]
                acc[element.name] = newAnswer.join(',')
              } else {
                const newAnswer = answer.filter(v => v !== element.value)
                acc[element.name] = newAnswer.join(',')
              }
            } else {
              acc[element.name] = element.checked
            }
          }
        } else if (element.type === 'radio') {
          if (element instanceof HTMLInputElement && element.checked) {
            acc[element.name] = element.value // ラジオボタンはチェックされた値を取得
          }
        } else {
          // 数値の入力がある場合、number型に変換
          acc[element.name] = element.type === 'number' ? parseFloat(element.value) : element.value
        }
      }
      return acc
    }, {})

    // 即時に更新するとonChangeイベントの処置と競合するため、遅延させる
    setTimeout(() => {
      setFormData(formValues)
    }, 100)
  }, [formRef])

  // フォームの入力状態を監視
  useEffect(() => {
    const target = formRef?.current
    if (!target) return

    target.addEventListener('input', updateFormData, false)

    if (watchValidation) {
      // 初回にステータスをチェック
      watchStatus()
      target.addEventListener('input', watchStatus, false)
    }

    return () => {
      target.removeEventListener('input', watchStatus, false)
      target.removeEventListener('input', updateFormData, false)
    }
  }, [formRef, updateFormData, watchStatus, watchValidation])

  return { isValid, formRef, updateFormData, formData }
}
