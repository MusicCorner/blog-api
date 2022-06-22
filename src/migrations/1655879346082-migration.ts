import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1655879346082 implements MigrationInterface {
    name = 'migration1655879346082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts_users_votes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "vote" integer NOT NULL DEFAULT '0', "userId" uuid, "postId" uuid, CONSTRAINT "PK_7b2ba49fd7289b094122015608a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '"2022-06-22T06:29:12.303Z"'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "updatedAt" SET DEFAULT '"2022-06-22T06:29:12.303Z"'`);
        await queryRunner.query(`ALTER TABLE "posts_users_votes" ADD CONSTRAINT "FK_fd814d7d99d01f90dcd772fd85c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_users_votes" ADD CONSTRAINT "FK_653bf873f2bc609fa6a58945ada" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_users_votes" DROP CONSTRAINT "FK_653bf873f2bc609fa6a58945ada"`);
        await queryRunner.query(`ALTER TABLE "posts_users_votes" DROP CONSTRAINT "FK_fd814d7d99d01f90dcd772fd85c"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "updatedAt" SET DEFAULT '2022-06-22 06:14:36.343'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '2022-06-22 06:14:36.343'`);
        await queryRunner.query(`DROP TABLE "posts_users_votes"`);
    }

}
