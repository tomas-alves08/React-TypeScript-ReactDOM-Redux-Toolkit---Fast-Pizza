export interface ICoordinates {
  latitude: number
  longitude: number
}

export interface IPizza {
  id: string
  name: string
  unitPrice: number
  ingredients: string[]
  soldOut: boolean
  imageUrl: string
}

export interface IItem {
  pizzaId: number
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
  addIngredients?: string[]
  removeIngredients?: string[]
}

export interface ICart {
  pizzaId: number
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface IDelivery {
  id?: string
  customer: string
  phone: string
  address?: string
  priority?: boolean
  estimatedDelivery?: string
  cart?: IItem[]
  position?: string
  orderPrice?: number
  priorityPrice: number
  status: string
}

export interface IButtonStyles {
  primary: string
  small: string
  round: string
  secondary: string
}

export interface IUserState {
  username: string
  status: string
  position: ICoordinates | null
  address: string
  error: string
}

export interface ICartState {
  cart: ICart[] | null
}
