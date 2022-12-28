import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createOrdersTable1672186198792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['A', 'R', 'S'],
            default: 'S',
          },
          {
            name: 'client_fk',
            type: 'varchar',
          },
          {
            name: 'architect_fk',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'varchar',
          },
          {
            name: 'updatedAt',
            type: 'varchar',
          },
          {
            name: 'deletedAt',
            type: 'varchar',
            default: null,
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['client_fk'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['architect_fk'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('orders');
    const foreignKeys = table?.foreignKeys;

    if (foreignKeys) {
      await queryRunner.dropForeignKeys(table, foreignKeys);
    }

    await queryRunner.dropTable('orders', true);
  }
}
