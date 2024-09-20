import { MigrationInterface, QueryRunner } from 'typeorm';

export class Children1726841802506 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE child (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, first_name VARCHAR(20) NOT NULL, last_name VARCHAR(30) NOT NULL, referent VARCHAR(255) NOT NULL, FOREIGN KEY(referent) REFERENCES user(email))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE child`);
    }
}
