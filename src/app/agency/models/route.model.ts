export interface Route{
    id: number,
    agencyId: number,
    name: string,
    description: string,
    location: string,
    score: number,
    price: number,
    newPrice: number,
    creationDate: string,
    photos: string,
    isOffer: number,
    isPopular: number,
    distance: number,
    difficult: string,
    altMax: number,
    altMin: number,
    typeRoute: string
}