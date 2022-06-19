import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1655641407461 implements MigrationInterface {
    name = 'migration1655641407461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "nickname" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "userId" uuid, CONSTRAINT "UQ_952e252e7470ff78b18a9ec786d" UNIQUE ("login"), CONSTRAINT "REL_373ead146f110f04dad6084815" UNIQUE ("userId"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" character varying NOT NULL, "likes" integer NOT NULL DEFAULT '0', "dislikes" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT '"2022-06-19T12:23:33.770Z"', "updatedAt" TIMESTAMP NOT NULL DEFAULT '"2022-06-19T12:23:33.770Z"', "userId" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "FK_373ead146f110f04dad60848154" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "FK_373ead146f110f04dad60848154"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
