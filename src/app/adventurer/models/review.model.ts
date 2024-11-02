export interface Review {
    id: number,
    agencyId: number,
    routeId: number,
    touristId: number,
    date: string,
    score: number,
    comment: string
}