import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class alterTableBarbers1638134634767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('barbers', [
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'average_time',
        type: 'integer',
        isNullable: true,
      }),
      new TableColumn({
        name: 'opening_hour',
        type: 'integer',
        isNullable: true,
      }),
      new TableColumn({
        name: 'closing_hour',
        type: 'integer',
        isNullable: true,
      }),

    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('barbers', [
      'average_time',
      'closing_hour',
      'opening_hour',
      'description',
    ]);
  }
}
