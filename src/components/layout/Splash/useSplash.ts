type SplashProps = {
  isAuthLoading: boolean
}

export const useSplash = ({ isAuthLoading }: SplashProps) => {
  return { isLoading: isAuthLoading }
}
