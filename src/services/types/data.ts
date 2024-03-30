export type User = {
    name: string,
    email: string,
    password?: string,
}

export type TAuth = {
    user: User | null,
    isAuthChecked: boolean
}

export type TIngredient = {
    _id:           string,
    name:          string,
    type:          string,
    proteins:      number,
    fat:           number,
    carbohydrates: number,
    calories:      number,
    price:         number,
    image:         string,
    image_mobile:  string,
    image_large:   string,
    __v:           number,
    id?:           string
}

export type TConstructor = {
    bun: TIngredient | null,
    ingredients: TIngredient[]
}

export type IFeedOrder = {
    ingredients: string[],
    _id: string,
    status: string,
    number: number,
    createdAt: string,
    updatedAt: string,
    name?: string
}

export type IFeed = {
    success: boolean,
    orders: IFeedOrder[],
    total: number,
    totalToday: number
}