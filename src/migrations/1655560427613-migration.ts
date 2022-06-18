import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1655560427613 implements MigrationInterface {
    name = 'migration1655560427613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "likes" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "dislikes" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT '"2022-06-18T13:53:53.687Z"'`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT '"2022-06-18T13:53:53.687Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "updatedAt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "createdAt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "dislikes" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "likes" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")`);
    }

}
