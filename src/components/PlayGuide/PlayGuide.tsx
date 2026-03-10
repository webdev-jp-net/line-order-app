import { FC } from 'react'

import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from 'components/ui/Button'
import { Dialog } from 'components/ui/Dialog'

import styles from './PlayGuide.module.scss'

import { usePlayGuide } from './usePlayGuide'

type PlayGuideData = {
  title: string
  body: string
  image: string
}

type PlayGuideProps = {
  contentsData: PlayGuideData[]
  isOpen: boolean
  onClose: () => void
  isOnboardingCompleted: boolean
}

export const PlayGuide: FC<PlayGuideProps> = ({
  contentsData,
  isOpen,
  onClose,
  isOnboardingCompleted,
}) => {
  const totalSteps = contentsData.length

  const { currentStep, goToNext, goToPrevious, handleInitialized } = usePlayGuide({
    totalSteps,
    isOpen,
  })

  const currentContent = contentsData[currentStep - 1]

  const isLastStep = currentStep === totalSteps
  const buttonLabel = !isOnboardingCompleted && isLastStep ? 'スタート' : '閉じる'

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      afterLeave={handleInitialized}
      className={styles.playGuide}
    >
      <section className={styles.container}>
        <figure className={styles.figure}>
          <img className={styles.image} src={currentContent?.image || ''} alt="" />
        </figure>
        <h1 className={styles.title}>{currentContent?.title || ''}</h1>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: currentContent?.body || '' }}
        />
        <div className={styles.console}>
          <Button
            size="icon"
            headIcon={ArrowLeft}
            onClick={goToPrevious}
            disabled={currentStep === 1}
          >
            前へ
          </Button>
          <div className={styles.stepper}>
            {currentStep} / {totalSteps}
          </div>
          <Button
            size="icon"
            headIcon={ArrowRight}
            onClick={goToNext}
            disabled={currentStep === totalSteps}
          >
            次へ
          </Button>
        </div>
      </section>

      <Button
        size="full"
        className={styles.completeButton}
        onClick={onClose}
        aria-hidden={!isLastStep && !isOnboardingCompleted}
      >
        {buttonLabel}
      </Button>
    </Dialog>
  )
}
