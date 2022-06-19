import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1655637318191 implements MigrationInterface {
    name = 'migration1655637318191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "UQ_5c1cf55c308037b5aca1038a131" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '"2022-06-19T11:15:24.563Z"'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "updatedAt" SET DEFAULT '"2022-06-19T11:15:24.563Z"'`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "updatedAt" SET DEFAULT '2022-06-19 10:56:14.379'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '2022-06-19 10:56:14.379'`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "UQ_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "userId"`);
    }

}
