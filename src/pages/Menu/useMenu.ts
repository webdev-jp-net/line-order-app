import { useState } from 'react'

import { useSelector } from 'react-redux'

import { RootState } from 'store'
export const useMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isOnboardingCompleted } = useSelector(
    (state: RootState) => state.player.progress ?? { isOnboardingCompleted: false }
  )

  const { playGuide } = useSelector((state: RootState) => state.external)

  const handleOpenPlayGuide = () => {
    setIsOpen(true)
  }

  const handleClosePlayGuide = () => {
    setIsOpen(false)
  }
  return {
    contentsData: playGuide,
    isOnboardingCompleted,
    isOpen,
    handleOpenPlayGuide,
    handleClosePlayGuide,
  }
}
