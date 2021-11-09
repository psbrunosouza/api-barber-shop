import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTableSchedule1635205951448 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'schedules',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
          },

          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'description',
            type: 'varchar',
          },

          {
            name: 'userId',
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
      }),
    );

    await queryRunner.createForeignKey(
      'schedules',
      new TableForeignKey({
        name: 'fk_scheduleid',
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('schedules', 'fk_scheduleid');
    await queryRunner.dropTable('schedules');
  }
}
