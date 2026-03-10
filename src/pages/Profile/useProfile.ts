import { useCallback } from 'react'

import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import { useForm } from 'hooks/useForm'
import { usePutProfileMutation } from 'store/_apiClient'
import { setError } from 'store/layout'

import {
  GENDER_OPTIONS,
  AGE_GROUP_OPTIONS,
  RESIDENCE_OPTIONS,
  TRANSPORTATION_OPTIONS,
} from 'constants/profile'

export const useProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isValid, formRef, formData } = useForm(true)

  const [putProfile] = usePutProfileMutation()

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!isValid || !formData) return

      try {
        // プロフィール登録
        await putProfile({
          userProfile: {
            gender: Number(formData.gender) as 0 | 1 | 2,
            ageGroup: Number(formData.ageGroup) as 0 | 1 | 2 | 3 | 4 | 5 | 6,
            residence: formData.residence as string,
            transportation: Number(formData.transportation) as 0 | 1 | 2 | 3 | 4,
          },
        }).unwrap()

        // HOMEへ遷移（PlayGuideオーバーレイはHOME側で表示）
        navigate('/home')
      } catch {
        dispatch(setError(true))
      }
    },
    [isValid, formData, putProfile, navigate, dispatch]
  )

  return {
    formRef,
    isValid,
    handleSubmit,
    genderOptions: GENDER_OPTIONS,
    ageGroupOptions: AGE_GROUP_OPTIONS,
    residenceOptions: RESIDENCE_OPTIONS,
    transportationOptions: TRANSPORTATION_OPTIONS,
  }
}
