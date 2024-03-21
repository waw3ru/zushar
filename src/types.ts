export type BaseQuestionField = {
  refNo: string;
};

export type TextField = BaseQuestionField & {
  validation: {
    required: {
      value: boolean;
      message?: string;
    };
    pattern: {
      value: string;
      message?: string;
    };
    minlength: {
      value: number;
      message?: string;
    };
    maxlength: {
      value: number;
      message?: string;
    };
  };
  ui: {
    //* not supported yet
    // prefix?: string;
    // suffix?: string;
    hint?: string;
    inputmode?: string;
  };
};

export type HiddenField = BaseQuestionField & {
  value: string;
};

export type QuestionFields =
  | {
      type: 'text';
      questionField: TextField;
    }
  | {
      type: 'hidden';
      questionField: HiddenField;
    };

export type Question = {
  refId: string;
  question: string;
  fields: QuestionFields[];
};
