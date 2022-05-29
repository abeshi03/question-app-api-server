export const questionType = {
  singleOption: "SINGLE_OPTION",
  singleOrMultipleOptions: "SINGLE_OR_MULTIPLE_OPTIONS",
  numberInputting: "NUMBER_INPUTTING"
} as const;

export type QuestionType = typeof questionType[keyof typeof questionType];
