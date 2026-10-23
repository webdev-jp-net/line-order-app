import type { FC, ComponentProps } from 'react'
import { useEffect, useState } from 'react'

import { useIntersectionObserver } from '@uidotdev/usehooks'

import styles from './PopInView.module.scss'

type PopInViewProps = ComponentProps<'div'> & {
  once?: boolean
  threshold?: number
  rootMargin?: string
  children?: React.ReactNode
  callback?: (isVisible: boolean) => void
}

export const PopInView: FC<PopInViewProps> = ({
  once = false,
  threshold = 0,
  rootMargin = '-60px 0px -300px 0px',
  children,
  callback,
  ...props
}) => {
  const customClass = [props.className]
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, ...otherProps } = props

  const validRootMargin = rootMargin.split(' ').length === 4 ? rootMargin : '0px 0px 0px 0px'

  const [content, entry] = useIntersectionObserver({
    threshold,
    root: null,
    rootMargin: validRootMargin,
  })

  const isIntersecting = entry?.isIntersecting
  const [isVisible, setIsVisible] = useState(false)

  // 交差状態かonceが変わったときだけ表示状態を合わせる
  const [prevIntersecting, setPrevIntersecting] = useState(isIntersecting)
  const [prevOnce, setPrevOnce] = useState(once)
  if (!Object.is(isIntersecting, prevIntersecting) || !Object.is(once, prevOnce)) {
    setPrevIntersecting(isIntersecting)
    setPrevOnce(once)
    if (isIntersecting) {
      setIsVisible(true)
    } else if (!once) {
      setIsVisible(false)
    }
  }

  // 親への通知は副作用なのでeffectに残す
  useEffect(() => {
    if (isIntersecting) {
      callback?.(true)
    } else if (!once) {
      callback?.(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting, once])

  return (
    <div
      className={[styles.popInView, ...customClass].join(' ')}
      {...otherProps}
      ref={content}
      aria-hidden={!isVisible}
    >
      {children}
    </div>
  )
}
