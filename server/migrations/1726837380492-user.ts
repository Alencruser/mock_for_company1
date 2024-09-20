import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1726837380492 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE user (email VARCHAR(255) UNIQUE NOT NULL, username VARCHAR(50) NOT NULL UNIQUE, PRIMARY KEY(email))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE user`);
    }
}
