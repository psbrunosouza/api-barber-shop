import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTableServiceOrder1638064251994
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
        foreignKeys: [
          {
            name: 'fk_requestedId',
            columnNames: ['requestedId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_providerId',
            columnNames: ['providerId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'barbers',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('service_orders');
  }
}
