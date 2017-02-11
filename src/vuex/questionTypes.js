
/*
* sample choices for all question types requiring choices
* */

let choices = [
  { display: 'Sample Choice 1', value: 1 },
  { display: 'Sample Choice 2', value: 2 },
  { display: 'Sample Choice 3', value: 3 }
]
// end of sample choices

export const textInput = {
  normal: {
    id: null,
    label: null,
    fieldType: 'text-input',
    field: 'normal',
    instructions: null,
    isMandatory: false,
    addon: {
      prefix: null,
      suffix: null
    },
    addedBy: null,
    params: {
      max: 25,
      min: 1
    },
    placeholder: null
  },
  email: {
    id: null,
    fieldType: 'text-input',
    field: 'email',
    label: null,
    instructions: null,
    isMandatory: false,
    addedBy: null,
    validate: true,
    placeholder: null
  },
  phone: {
    id: null,
    fieldType: 'text-input',
    field: 'phone',
    label: null,
    instructions: null,
    isMandatory: false,
    addedBy: null,
    validate: true,
    placeholder: null 
  },
  url: {
    id: null,
    fieldType: 'text-input',
    field: 'url',
    label: null,
    instructions: null,
    isMandatory: false,
    addedBy: null,
    validate: true,
    placeholder: null 
  },
  measure: {
    id: null,
    fieldType: 'text-input',
    field: 'measure',
    label: null,
    instructions: null,
    addedBy: null,
    isMandatory: false,
    placeholder: null,
    params: {
      max: null,
      min: null,
      decimalPoints: 2,
      decimalSeparationType: '.'
    },
    addon: {
      prefix: null,
      suffix: null
    },
    typeOfMeasure: null
  },
  address: {
    id: null,
    fieldType: 'text-input',
    field: 'address',
    label: null,
    instructions: null,
    addedBy: null,  
    isMandatory: false
  },
  date: {
    id: null,
    fieldType: 'text-input',
    field: 'date',
    label: null,
    instructions: null,
    isMandatory: false,
    addedBy: null,
    placeholder: null,
    date: {
      format: null,
      default: null, /* use moment.js to format the date on save */
      startView: 0
    },
    params: {
      max: null,
      min: null
    }
  },
  paragraph: {
    id: null,
    label: null,
    fieldType: 'text-input',
    field: 'paragraph',
    instructions: null,
    isMandatory: false,
    addedBy: null,
    params: {
      max: 25,
      min: 1
    }
  }
}

export const selection = {
  dropdown: {
    id: null,
    label: null,
    fieldType: 'selection',
    field: 'dropdown',
    instructions: null,
    isMandatory: false,
    addedBy: null,
    choices
  },
  multichoice: {
    id: null,
    label: null,
    fieldType: 'selection',
    field: 'multi-choice',
    instructions: null,
    isMandatory: false,
    addedBy: null,
    choices,
    displayFormat: 'vertical' /* horizontal or vertical */
  },
  multiselect: {
    id: null,
    label: null,
    fieldType: 'selection',
    field: 'multi-select',
    instructions: null,
    isMandatory: false,
    addedBy: null,
    choices,
    displayFormat: 'vertical' /* horizontal or vertical */
  }
}