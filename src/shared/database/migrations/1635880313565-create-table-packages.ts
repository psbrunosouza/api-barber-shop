import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTablePackages1635880313565 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'packages',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
          },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'value', type: 'integer', isNullable: false },
          { name: 'description', type: 'varchar', isNullable: false },

          {
            name: 'serviceOrderId',
            type: 'integer',
            isNullable: true,
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

          {
            name: 'barberId',
            type: 'integer',
            isNullable: false,
            default: null,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'packages',
      new TableForeignKey({
        name: 'fk_barberid',
        columnNames: ['barberId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'barbers',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'packages',
      new TableForeignKey({
        name: 'fk_serviceOrderid',
        columnNames: ['serviceOrderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'service_orders',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('packages', 'fk_serviceOrdersId');
    await queryRunner.dropForeignKey('packages', 'fk_barberid');
    await queryRunner.dropTable('packages');
  }
}
