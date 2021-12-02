import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class alterTableServiceOrders1638391030530
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('service_orders', [
      new TableColumn({
        name: 'initial_service_time',
        type: 'timestamp',
        isNullable: false,
      }),
      new TableColumn({
        name: 'final_service_time',
        type: 'timestamp',
        isNullable: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('service_orders', [
      'initial_service_time',
      'final_service_time',
    ]);
  }
}
