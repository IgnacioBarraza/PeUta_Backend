import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1742701904548 implements MigrationInterface {
    name = 'InitialMigration1742701904548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "action" character varying NOT NULL, CONSTRAINT "PK_df7a31ef51a9c86c235475c01dd" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "role_permissions" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "roleId" uuid, "permissionId" uuid, CONSTRAINT "PK_c88929a0f14c2dc523ef10b388c" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "role" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "roleName" character varying NOT NULL, CONSTRAINT "PK_914a4da5bf2e66f917f4737908a" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "project_members" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "projectUid" uuid, CONSTRAINT "PK_f3eed000e9a8313d362acee2516" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "project" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "projectName" character varying NOT NULL, "description" character varying NOT NULL, "category" character varying NOT NULL, "imageUrl" character varying NOT NULL, "averageScore" double precision NOT NULL DEFAULT '0', CONSTRAINT "PK_8505f3977d7839dd709ff79f9d7" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "project_categories" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_85004a7ccb46ca820b3b882f853" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "evaluation_questions" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "weight" double precision NOT NULL, "question" character varying NOT NULL, "minScore" integer NOT NULL, "maxScore" integer NOT NULL, CONSTRAINT "PK_97d7bad59ff5fa6d637aae18269" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "evaluation_scores" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "score" double precision NOT NULL DEFAULT '0', "evaluationsUid" uuid, "evaluationQuestionsUid" uuid, CONSTRAINT "PK_4ec6d40460f7104d5e798621f8f" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "evaluations" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "finalScore" double precision NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL, "userUid" uuid, "projectUid" uuid, CONSTRAINT "PK_b0c9fafc02aca716d265248e320" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "user" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "rut" character varying NOT NULL, "password" character varying NOT NULL, "roleUid" uuid, CONSTRAINT "UQ_9f839e522b3b8c8c8223cde81db" UNIQUE ("rut"), CONSTRAINT "PK_df955cae05f17b2bcf5045cc021" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "project_categories_questions_evaluation_questions" ("projectCategoriesUid" uuid NOT NULL, "evaluationQuestionsUid" uuid NOT NULL, CONSTRAINT "PK_83c42c745ff7fbc4adc6cc7bac5" PRIMARY KEY ("projectCategoriesUid", "evaluationQuestionsUid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8066bae3d0b19487e8f8c845a0" ON "project_categories_questions_evaluation_questions" ("projectCategoriesUid") `);
        await queryRunner.query(`CREATE INDEX "IDX_0f0bd81f940fabac82792e2c97" ON "project_categories_questions_evaluation_questions" ("evaluationQuestionsUid") `);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c" FOREIGN KEY ("roleId") REFERENCES "role"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd" FOREIGN KEY ("permissionId") REFERENCES "permission"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_members" ADD CONSTRAINT "FK_67d212140b044bb80cc74e789df" FOREIGN KEY ("projectUid") REFERENCES "project"("uid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evaluation_scores" ADD CONSTRAINT "FK_a367d011172fbfbdfb674bde0f1" FOREIGN KEY ("evaluationsUid") REFERENCES "evaluations"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evaluation_scores" ADD CONSTRAINT "FK_5400708c7ea33755f72ce69e753" FOREIGN KEY ("evaluationQuestionsUid") REFERENCES "evaluation_questions"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evaluations" ADD CONSTRAINT "FK_7d2ffc6d5ec0d34bd239418bfae" FOREIGN KEY ("userUid") REFERENCES "user"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evaluations" ADD CONSTRAINT "FK_79a8a94c273ce741bebe4e5795c" FOREIGN KEY ("projectUid") REFERENCES "project"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_697a01994e9034f887e89242156" FOREIGN KEY ("roleUid") REFERENCES "role"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_categories_questions_evaluation_questions" ADD CONSTRAINT "FK_8066bae3d0b19487e8f8c845a0e" FOREIGN KEY ("projectCategoriesUid") REFERENCES "project_categories"("uid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_categories_questions_evaluation_questions" ADD CONSTRAINT "FK_0f0bd81f940fabac82792e2c977" FOREIGN KEY ("evaluationQuestionsUid") REFERENCES "evaluation_questions"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_categories_questions_evaluation_questions" DROP CONSTRAINT "FK_0f0bd81f940fabac82792e2c977"`);
        await queryRunner.query(`ALTER TABLE "project_categories_questions_evaluation_questions" DROP CONSTRAINT "FK_8066bae3d0b19487e8f8c845a0e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_697a01994e9034f887e89242156"`);
        await queryRunner.query(`ALTER TABLE "evaluations" DROP CONSTRAINT "FK_79a8a94c273ce741bebe4e5795c"`);
        await queryRunner.query(`ALTER TABLE "evaluations" DROP CONSTRAINT "FK_7d2ffc6d5ec0d34bd239418bfae"`);
        await queryRunner.query(`ALTER TABLE "evaluation_scores" DROP CONSTRAINT "FK_5400708c7ea33755f72ce69e753"`);
        await queryRunner.query(`ALTER TABLE "evaluation_scores" DROP CONSTRAINT "FK_a367d011172fbfbdfb674bde0f1"`);
        await queryRunner.query(`ALTER TABLE "project_members" DROP CONSTRAINT "FK_67d212140b044bb80cc74e789df"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0f0bd81f940fabac82792e2c97"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8066bae3d0b19487e8f8c845a0"`);
        await queryRunner.query(`DROP TABLE "project_categories_questions_evaluation_questions"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "evaluations"`);
        await queryRunner.query(`DROP TABLE "evaluation_scores"`);
        await queryRunner.query(`DROP TABLE "evaluation_questions"`);
        await queryRunner.query(`DROP TABLE "project_categories"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "project_members"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "role_permissions"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
