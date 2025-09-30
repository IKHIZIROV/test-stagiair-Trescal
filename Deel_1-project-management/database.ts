import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { Project } from "./types"

dotenv.config();

export const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017");

export const db = client.db("projectmanagement");

export async function connectDB() {
    try {
        await client.connect();
        console.log("✅✅✅ Connected to MongoDB ✅✅✅");
    } catch (err) {
        console.error("❌❌❌ Database connection failed ❌❌❌", err);
        process.exit(1);
    }
}

export const projectsCollection = db.collection<Project>("projects");
export const projectsCollectionString = db.collection<Project>("projects").toString()


export async function seed() {
    try {
        const count = await projectsCollection.countDocuments();

        if (count > 0) {
            console.log("⚠️⚠️⚠️ Projects collection already has data, skipping seed... ⚠️⚠️⚠️");
            console.log(projectsCollectionString);
            return;

        } else {
            await projectsCollection.insertMany(demoProjects);
            console.log("✅✅✅ Database seeded ✅✅✅");
            console.log(projectsCollectionString);
        }
    } catch (err) {
        console.error(err);
    }
}

const demoProjects: Project[] = [
    {
        id: 1,
        naam: "Website Redesign",
        startdatum: new Date("2025-09-01"),
        einddatum: new Date("2025-12-31"),
        beschrijving: "Volledige herontwerp van de corporate website",
        milestones: [
            { id: 1, titel: "Design fase", datum: new Date("2025-09-30"), omschrijving: "UI/UX ontwerp afronden" },
            { id: 2, titel: "Development fase", datum: new Date("2025-11-15"), omschrijving: "Frontend + backend implementatie" },
            { id: 3, titel: "Launch", datum: new Date("2025-12-31"), omschrijving: "Website live zetten" }
        ],
        eigenaar: { id: 1, naam: "Sarah Manager" },
        medewerkers: [
            { id: 1, naam: "Ali Developer", tijdsallocatie: 50 },
            { id: 2, naam: "Emma Designer", tijdsallocatie: 40 }
        ],
        budget: 20000
    },
    {
        id: 2,
        naam: "Mobile App MVP",
        startdatum: new Date("2025-10-01"),
        einddatum: new Date("2026-01-15"),
        beschrijving: "Eerste versie van mobiele app voor klanten",
        milestones: [
            { id: 1, titel: "Prototyping", datum: new Date("2025-10-20"), omschrijving: "Klaarzetten UI prototype" },
            { id: 2, titel: "Beta release", datum: new Date("2025-12-15"), omschrijving: "App uitbrengen voor testgebruikers" }
        ],
        eigenaar: { id: 2, naam: "John Supervisor" },
        medewerkers: [
            { id: 3, naam: "Lina Developer", tijdsallocatie: 70 },
            { id: 4, naam: "Marc QA", tijdsallocatie: 30 }
        ],
        budget: 15000
    }
];