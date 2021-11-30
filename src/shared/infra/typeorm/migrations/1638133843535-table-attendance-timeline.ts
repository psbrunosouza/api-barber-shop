import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

export class tableAttendanceTimeline1638133843535
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'attendance_timeline',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
          },

          {
            name: 'start',
            type: 'timestamp',
            isNullable: false,
          },

          {
            name: 'end',
            type: 'timestamp',
            isNullable: false,
          },

          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'barberId',
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
            name: 'fk_barberid',
            columnNames: ['barberId'],
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
    await queryRunner.dropTable('attendance_timeline');
  }
}
