import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1674483996402 implements MigrationInterface {
  name = "migration1674483996402";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e2364281027b926b879fa2fa1e0"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nickname"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "nickname" character varying NOT NULL DEFAULT ''`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e2364281027b926b879fa2fa1e0" UNIQUE ("nickname")`
    );
  }
}
