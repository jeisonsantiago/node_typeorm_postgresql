import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateTransaction1605849696190 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name:'transactions',
                columns:[
                    {
                        name:'id',
                        type:'uuid',
                        isPrimary:true,
                        generationStrategy:'uuid',
                        default:'uuid_generate_v4()',
                    },
                    {
                        name:'title',
                        type:'varchar',
                    },
                    {
                        name:'type',
                        type:'varchar',
                    },
                    {
                        name:'value',
                        type:'real',
                    },
                    {
                        name:'category_id', // foreignKEY
                        type:'uuid',
                    },
                    {
                        name:'created_at',
                        type:'timestamp',
                        default:'now()',
                    },
                    {
                        name:'updated_at',
                        type:'timestamp',
                        default:'now()',
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}