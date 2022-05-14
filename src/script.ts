import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Strain = {
    name: string,
    type: string
}; 

async function main() {
    let strains: Strain[]= [
        {
            name: 'Blue Dream',
            type: 'Sativa'
        },
        {
            name: 'Gorilla Glue',
            type: 'Hybrid'
        },
        {
            name: 'Blueberry',
            type: 'Indica'
        },
        {
            name: 'Purple Haze',
            type: 'Sativa'
        },
        {
            name: 'Amnesia Haze',
            type: 'Sativa'
        }  
    ]
    
    strains.forEach(async (currStrain) => {
        await prisma.strain.create({
            data: {
                name: currStrain.name,
                type: currStrain.type
            }
        })
    })
    
    const allStrains = await prisma.strain.findMany();
    console.log(allStrains);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


