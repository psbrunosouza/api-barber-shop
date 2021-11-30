import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTablePackages1638064624312 implements MigrationInterface {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('packages', 'fk_barberid');
    await queryRunner.dropTable('packages');
  }
}
