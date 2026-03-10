import type { FC } from 'react'

import { BaseLayout } from 'layout/BaseLayout'
import { Head } from 'layout/Head'

import { Expectation } from 'components/form/Expectation'
import type { ExpectationOption } from 'components/form/Expectation/Expectation'
import { Select } from 'components/form/Select'
import { Button } from 'components/ui/Button'

import styles from './Profile.module.scss'

import { useProfile } from './useProfile'

export const Profile: FC = () => {
  const { formRef, isValid, handleSubmit, genderOptions, ageGroupOptions, residenceOptions } =
    useProfile()

  return (
    <BaseLayout>
      <Head pageTitle="Profile" />
      <main className={styles.profile} data-testid="profile-registration">
        <div className={styles.header}>
          <h1 className={styles.title}>プロフィール登録</h1>
          <small className={styles.annotation}>全て必須の項目です。</small>
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
          <Expectation
            name="gender"
            options={genderOptions as ExpectationOption[]}
            required
          ></Expectation>

          <Select name="ageGroup" option={ageGroupOptions} placeholder="年代" required></Select>

          <Select
            name="residence"
            option={residenceOptions}
            placeholder="都道府県"
            required
          ></Select>

          <Button
            type="submit"
            disabled={!isValid}
            variant="accent"
            size="full"
            className={styles.button}
          >
            登録する
          </Button>
        </form>
      </main>
    </BaseLayout>
  )
}
