import { useCallback, useEffect, useState } from "react";

type UseInputProps = {
	defaultValue?: string;
	syncValue?: (value: string) => void;
};

export const useInput = ({ defaultValue = "", syncValue }: UseInputProps) => {
	// 入力値を保持するステート
	const [inputValue, setInputValue] = useState<string>("");

	// 親コンポーネントから渡された入力初期値をセット
	useEffect(() => {
		setInputValue(() => defaultValue ?? "");
	}, [defaultValue]);

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setInputValue(() => event.target.value);
		},
		[],
	);

	// blurイベントで入力値を整形する
	const formatValue = useCallback(
		(value: string) => {
			const trimmedValue = value.trim();
			setInputValue(trimmedValue);

			// 整形した値を親コンポーネントに渡す
			if (syncValue) {
				syncValue(trimmedValue);
			}
		},
		[syncValue],
	);

	return { inputValue, handleChange, formatValue };
};
