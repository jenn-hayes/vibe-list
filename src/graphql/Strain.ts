import { extendType, nonNull, objectType, stringArg } from "nexus";

export const Strain = objectType({
    name: "Strain",
    definition(t) {
        t.nonNull.int("id"); 
        t.nonNull.string("name");
        t.nonNull.string("type");
    },
});

export const StrainQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("allStrains", {
            type: "Strain",
            resolve(parent, args, context) {
                return context.prisma.strain.findMany();
            },
        });
        t.nonNull.list.nonNull.field("strainByType", {
            type: "Strain",
            args: {
                type: nonNull(stringArg()),
            },
            resolve(parent, args, context) {
                return context.prisma.strain.findMany({
                    where: {
                        type: args.type
                    }
                })
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
                return context.prisma.strain.create({
                    data: {
                        name: args.name,
                        type: args.type
                    }
                });
            },
        });
    },
});