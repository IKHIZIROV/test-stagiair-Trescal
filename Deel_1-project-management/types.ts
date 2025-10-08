export interface Project {
    id: number;
    naam: string;
    startdatum: Date;
    einddatum: Date;
    beschrijving: string;
    milestones: Milestone[];
    eigenaar: Manager;
    medewerkers: Medewerker[];
    budget: number;
}

export interface Milestone {
    id: number;
    titel: string;
    datum: Date;
    omschrijving: string;
}

export interface Manager {
    id: number;
    naam: string;
}

export interface Medewerker {
    id: number;
    naam: string;
    tijdsallocatie: number;
}