export interface Entity {
    id: number
    nom: string
    categorie: string
    canton: string,
    commune: string,
    prefecture: string,
    description: string,
    services: string[],
    jours_ouverture: string[],
    latitude: number,
    longitude: number,
    autres_infos: string[],
    created_at: string,
}