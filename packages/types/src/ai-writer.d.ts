type Item = {
  _id: string
  name: string
}

export interface UseCase {
  _id: string
  name: string
  slug: string
  caption: string
  description: string
  contextInputs: ContextInput[]
  image: string
  variants: number
  info: string
  createdAt?: string
  key: string
  isCustom: boolean
  isNew: boolean
}

export interface ContextInput {
  label: string
  placeholder: string
  keyLabel: string
  inputType: InputType
  inputMaximumCharacters: number
  isRequired?: boolean
  _id: string
}

export enum InputType {
  Text = 'text',
  Textarea = 'textarea',
}

export interface Language {
  _id: string
  isDefault: boolean
  name: string
  slug: string
  createdAt: string
  isNew: boolean
}

export interface Tone {
  _id: string
  name: string
  slug: string
  createdAt: string
  isNew: boolean
  isDefault?: boolean
}

export interface AIWriterConfig {
  languages: Language[]
  tones: Tone[]
  format: Item[]
  creativityLevel: Item[]
  useCases: UseCase[]
  defaults: Partial<{
    languageId: string
    toneId: string
    format: string
    creativityLevel: string
    useCaseId: string
  }>
}
