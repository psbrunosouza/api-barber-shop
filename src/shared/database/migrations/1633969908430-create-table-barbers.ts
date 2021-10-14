import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTableBarbers1633969908430 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'barbers',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
          },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'document', type: 'varchar', isNullable: false },
          { name: 'email', type: 'varchar', isNullable: true, isUnique: true },
          { name: 'zipcode', type: 'varchar', isNullable: false },
          { name: 'street', type: 'varchar', isNullable: false },
          { name: 'state', type: 'varchar', isNullable: false },
          { name: 'city', type: 'varchar', isNullable: false },
          { name: 'streetNumber', type: 'varchar', isNullable: false },
          {
            name: 'userId',
            type: 'integer',
            isNullable: true,
            default: null,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'barbers',
      new TableForeignKey({
        name: 'fk_userid',
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('barbers', 'fk_userid');
    await queryRunner.dropTable('barbers');
  }
}
