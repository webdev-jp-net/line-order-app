import { useState, useCallback, useRef } from 'react'

interface UsePlayGuideProps {
  totalSteps: number
  isOpen: boolean
}

export const usePlayGuide = ({ totalSteps, isOpen }: UsePlayGuideProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const currentStepRef = useRef<number>(currentStep)

  const goToNext = useCallback(() => {
    if (currentStepRef.current === totalSteps) return
    if (!isOpen) return

    setCurrentStep(prev => {
      const result = Math.min(totalSteps, prev + 1)
      currentStepRef.current = result
      return result
    })
  }, [totalSteps, isOpen])

  const goToPrevious = useCallback(() => {
    if (currentStepRef.current === 1) return
    setCurrentStep(prev => {
      const result = Math.max(1, prev - 1)
      currentStepRef.current = result
      return result
    })
  }, [])

  // ダイアログ終了後の処理
  const handleInitialized = useCallback(() => {
    // 初期化
    setCurrentStep(() => {
      const result = 1
      currentStepRef.current = 1
      return result
    })
  }, [])

  return {
    currentStep,
    goToNext,
    goToPrevious,
    handleInitialized,
  }
}
