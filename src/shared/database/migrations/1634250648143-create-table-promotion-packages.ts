import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTablePromotionPackages1634250648143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'promotion-packages',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                    },
                    { name: 'name', type: 'varchar', isNullable: false },
                    { name: 'value', type: 'number', isNullable: false },
                    { name: 'description', type: 'varchar', isNullable: false },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: true,
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('promotion-packages');
    }

}
