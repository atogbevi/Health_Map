export interface Stats {
    pharmacies: number
    centres_de_sante: number
    institutions: number
    health_tech: number
    total: number
}

export type LocalityType = 'canton' | 'commune' | 'prefecture'

export interface LocalityStats {
    name: string
    total: number
    pharmacie: number
    hopital: number
    clinique: number
    institution: number
    startup: number
}