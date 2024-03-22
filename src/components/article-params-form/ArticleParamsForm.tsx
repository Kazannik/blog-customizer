import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';

import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Select } from '../select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';

import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { useClose } from 'src/hooks/useClose';

type ArticleParamsForm = {
	formState: {
		fontFamilyOption: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
		fontSizeOption: OptionType;
	};
	setFormState: React.Dispatch<
		React.SetStateAction<{
			fontFamilyOption: OptionType;
			fontColor: OptionType;
			backgroundColor: OptionType;
			contentWidth: OptionType;
			fontSizeOption: OptionType;
		}>
	>;
	resetForm: () => void;
	submitForm: (e: FormEvent<HTMLFormElement>) => void;
};

export function ArticleParamsForm(props: ArticleParamsForm) {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		return setIsOpen(!isOpen);
	};

	const rootRef = useRef<HTMLFormElement | null>(null);

	useClose({
		isOpen,
		onClose: () => setIsOpen(false),
		rootRef: rootRef,
	});

	return (
		<>
			<ArrowButton state={isOpen} onClick={handleClick} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={props.submitForm} ref={rootRef}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={props.formState.fontFamilyOption}
						onChange={(option) =>
							props.setFormState({
								...props.formState,
								fontFamilyOption: option,
							})
						}
						options={fontFamilyOptions}
						placeholder='Open Sans'
						title='шрифт'
					/>
					<RadioGroup
						selected={props.formState.fontSizeOption}
						onChange={(option) =>
							props.setFormState({
								...props.formState,
								fontSizeOption: option,
							})
						}
						options={fontSizeOptions}
						name='font-size'
						title='размер шрифта'
					/>
					<Select
						selected={props.formState.fontColor}
						onChange={(option) =>
							props.setFormState({
								...props.formState,
								fontColor: option,
							})
						}
						options={fontColors}
						placeholder='Чёрный'
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={props.formState.backgroundColor}
						onChange={(option) =>
							props.setFormState({
								...props.formState,
								backgroundColor: option,
							})
						}
						options={backgroundColors}
						placeholder='Белый'
						title='цвет фона'
					/>
					<Select
						selected={props.formState.contentWidth}
						onChange={(option) =>
							props.setFormState({
								...props.formState,
								contentWidth: option,
							})
						}
						options={contentWidthArr}
						placeholder='Широкий'
						title='ширина контейнера'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={props.resetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
}
