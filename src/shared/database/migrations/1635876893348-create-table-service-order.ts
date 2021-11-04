import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTableServiceOrder1635876893348
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'service_orders',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
          },

          {
            name: 'packageName',
            type: 'varchar',
            isNullable: true,
          },

          {
            name: 'value',
            type: 'integer',
            isNullable: false,
          },

          {
            name: 'requestedId',
            type: 'integer',
            isNullable: false,
            default: null,
          },

          {
            name: 'providerId',
            type: 'integer',
            isNullable: false,
            default: null,
          },

          {
            name: 'startDate',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },

          {
            name: 'endDate',
            type: 'timestamp',
            isNullable: true,
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
      }),
    );

    await queryRunner.createForeignKey(
      'service_orders',
      new TableForeignKey({
        name: 'fk_providerId',
        columnNames: ['providerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'schedules',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'service_orders',
      new TableForeignKey({
        name: 'fk_requestedId',
        columnNames: ['requestedId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'schedules',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('service_orders', 'fk_requestedId');
    await queryRunner.dropForeignKey('service_orders', 'fk_providerId');
    await queryRunner.dropTable('service_orders');
  }
}
