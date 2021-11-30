import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class alterTableBarbers1638134634767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('barbers', [
      new TableColumn({
        name: 'average',
        type: 'integer',
        isNullable: true,
      }),
      new TableColumn({
        name: 'start_date',
        type: 'timestamp',
        isNullable: true,
      }),
      new TableColumn({
        name: 'end_date',
        type: 'timestamp',
        isNullable: true,
      }),
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('barbers', [
      'average',
      'start_date',
      'end_date',
    ]);
  }
}
