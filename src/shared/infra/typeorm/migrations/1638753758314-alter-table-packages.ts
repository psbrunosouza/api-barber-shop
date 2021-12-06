import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class alterTablePackages1638753758314 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('packages', [
      new TableColumn({
        name: 'time',
        type: 'integer',
        isNullable: true,
      }),
      new TableColumn({
        name: 'tag',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('packages', ['time', 'tag', 'image']);
  }
}
