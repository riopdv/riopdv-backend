export default interface Products {
  id: number

  name: string
  price: number
  currentAmount: number
  userId: number //RELAÇÂO COM USERS ID

  createdAt: Date
}
