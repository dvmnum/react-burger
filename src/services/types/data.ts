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
