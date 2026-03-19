import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1712345678901 implements MigrationInterface {
    name = 'Init1712345678901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "calculations" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "expression" text NOT NULL,
                "result" float NOT NULL,
                "timestamp" datetime NOT NULL DEFAULT (datetime('now'))
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "calculations"`);
    }
}
