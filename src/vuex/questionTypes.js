
export const textInput = {
  normal: {
    id: null,
    label: null,
    fieldType: 'text-input',
    field: 'Normal',
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
    field: 'url',
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
  measurement: {},
  address: {},
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
      mode: 'single', /* single or multiple or range */
      format: null,
      utc: false,
      default: null, /* use moment.js to format the date on save */
      showWeekNum: false
    },
    params: {
      max: null,
      min: null
    }
  },
  time: {},
  paragraph: {}
}

export const selection = {
  dropdown: {},
  multiChoice: {},
  multiSelect: {}
}

export const scale = {
  singleScale: {}
}
