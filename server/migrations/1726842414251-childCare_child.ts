import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChildCareChild1726842414251 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE child_care_child (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, child_care_id INT NOT NULL, child_id INT NOT NULL, FOREIGN KEY(child_care_id) REFERENCES child_care(id), FOREIGN KEY(child_id) REFERENCES child(id))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE child_care_child`);
    }
}
