import { extendType, nonNull, objectType, stringArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const Link = objectType({
    name: "Strain",
    definition(t) {
        t.nonNull.int("id"); 
        t.nonNull.string("name");
        t.nonNull.string("type");
    },
});

let strains: NexusGenObjects["Strain"][]= [
    {
        id: 1,
        name: "Blue Dream",
        type: "Sativa",
    },
    {
        id: 2,
        name: "Gorilla Glue",
        type: "Hybrid",
    },
    {
        id: 3,
        name: "Blueberry",
        type: "Indica",
    }
];

export const StrainQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("allStrains", {
            type: "Strain",
            resolve() {
                return strains;
            },
        });
        t.nonNull.list.nonNull.field("strainByType", {
            type: "Strain",
            args: {
                type: stringArg(),
              },
            resolve(parent, args) {
                return strains.filter(strain => strain.type == args.type);
            },
        });
    },
});

export const StrainMutation = extendType({
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("addStrain", {
            type: "Strain",  
            args: {
                name: nonNull(stringArg()),
                type: nonNull(stringArg()),
            },
            
            resolve(parent, args, context) {    
                const { name, type } = args;
                
                let idCount = strains.length + 1;
                const strain = {
                    id: idCount,
                    name: name,
                    type: type,
                };
                strains.push(strain);
                return strain;
            },
        });
    },
});