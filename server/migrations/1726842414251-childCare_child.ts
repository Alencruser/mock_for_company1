import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChildCareChild1726842414251 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE child_care_child (id_child_care INT NOT NULL, id_child INT NOT NULL, FOREIGN KEY(id_child_care) REFERENCES child_care(id), FOREIGN KEY(id_child) REFERENCES child(id))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE child_care_child`);
    }
}
