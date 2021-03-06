// import { EntityManager, FindManyOptions, FindOneOptions, getManager } from "typeorm";
// import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Intern } from "../entities/intern";
import { getManager, FindManyOptions, EntityManager} from "typeorm";
import { InternModel } from "../entities/models";
import { getHashWithSalt } from '../utils/crypto'

export class InternRepository {

    public static async insert(model: InternModel, entityManager?: EntityManager): Promise<void> {
        const manager = entityManager || getManager();

        model.password = await getHashWithSalt(model.password);

        await manager.save(Intern, { ...model });
    }

    public static async findOneById(id: number): Promise<Intern> {
        return await getManager().findOneOrFail(Intern, id);
    }

    public static async find(options: FindManyOptions<Intern>): Promise<Intern[]> {
        return await getManager().find(Intern, options);
    }

    public static async deleteIntern(id:number): Promise<void>{
        await getManager().delete(Intern, id);
    }

    public static async updateIntern(id:number, newInternData:InternModel){
        if(newInternData.hasOwnProperty("password")){
            newInternData.password = await getHashWithSalt(newInternData.password);
        }
        await getManager().update(Intern,id,newInternData)
    }

    // public static async update(criteria: any, partialEntity: QueryDeepPartialEntity<Action>): Promise<void> {
    //     await getManager().update(Action, criteria, partialEntity);
    // }

    // public static async updateById(id: number, partialEntity: QueryDeepPartialEntity<Action>): Promise<void> {
    //     await getManager().update(Action, id, partialEntity);
    // }

    // public static async delete(criteria: any): Promise<void> {
    //     await getManager().delete(Action, criteria);
    // }

    // public static async deleteById(id: number): Promise<void> {
    //     await getManager().delete(Action, id);
    // }
    
}