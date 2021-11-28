import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createRelationTableServiceOrdersPackages1638064687677
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'service_orders_packages',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
          },

          {
            name: 'packageId',
            type: 'integer',
            isNullable: false,
            default: null,
          },

          {
            name: 'serviceOrderId',
            type: 'integer',
            isNullable: false,
            default: null,
          },

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

        foreignKeys: [
          {
            name: 'fk_packageId',
            columnNames: ['packageId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'packages',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_serviceOrders',
            columnNames: ['serviceOrderId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'service_orders',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'service_orders_packages',
      'fk_serviceOrders',
    );
    await queryRunner.dropForeignKey('service_orders_packages', 'fk_packageId');
    await queryRunner.dropTable('service_orders_packages');
  }
}
