import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsersTable1672186088471 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'telephone',
            type: 'varchar',
          },
          {
            name: 'gender',
            type: 'enum',
            enum: ['M', 'F', 'O'],
          },
          {
            name: 'age',
            type: 'tinyint',
          },
          {
            name: 'userRole',
            type: 'enum',
            enum: ['A', 'C'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true);
  }
}
