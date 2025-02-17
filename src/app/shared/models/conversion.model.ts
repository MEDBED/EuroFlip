export interface ConversionModel{
  id?:number
  rate: number|null,
  input: number|null,
  inputCurrency: string,
  output: number|null,
  outputCurrency: string
}
