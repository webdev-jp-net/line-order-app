import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'store';
import { type MissionId, usePostAnswerByIdMutation } from 'store/_apiClient';
import { updateProgress } from 'store/player';

export const useAnswerSubmission = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [postAnswer, { isLoading }] = usePostAnswerByIdMutation();

  const submitAnswer = async (
    missionId: MissionId,
    answer: string,
    resultPath: string
  ) => {
    try {
      const result = await postAnswer({
        id: missionId,
        body: { answer },
      }).unwrap();

      if (result.progress) {
        dispatch(updateProgress(result.progress));
      }

      navigate(resultPath);
    } catch {
      navigate(resultPath);
    }
  };

  return { submitAnswer, isLoading };
};
