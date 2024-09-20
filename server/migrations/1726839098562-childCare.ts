import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChildCare1726839098562 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE child_care (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100) NOT NULL, referent VARCHAR(255) NOT NULL ,FOREIGN KEY(referent) REFERENCES user(email))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE child_care`);
    }
}
