import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialMigration1753051292727 implements MigrationInterface {
  name = 'InitialMigration1753051292727'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pending_client_staff" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "position" character varying, "invite_token" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "clientId" uuid, "roleId" uuid, CONSTRAINT "UQ_3940263fc6549797d6f6960a114" UNIQUE ("email"), CONSTRAINT "UQ_82721f379c520f1531b80803cc1" UNIQUE ("invite_token"), CONSTRAINT "PK_5685e19cc48ec887ed422c6878f" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_4dd5873974dc60ec8a678b9c7b" ON "pending_client_staff" ("email", "clientId") `
    )
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "label" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying, "rut" character varying(12), "password" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "roleId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_9f839e522b3b8c8c8223cde81db" UNIQUE ("rut"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_9f839e522b3b8c8c8223cde81d" ON "user" ("rut") `
    )
    await queryRunner.query(
      `CREATE TABLE "client_staff" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "position" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid, "client_id" uuid, "role_id" uuid, CONSTRAINT "UQ_dc1570109c73c05d1a99c61d3c6" UNIQUE ("user_id", "client_id"), CONSTRAINT "PK_9f072fc3ba5c391f041eb2bbf0b" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "api_key" character varying NOT NULL, "contact_email" character varying NOT NULL, "logo_url" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_480f88a019346eae487a0cd7f0c" UNIQUE ("name"), CONSTRAINT "UQ_627a791f99ca54aa80baaf2d717" UNIQUE ("api_key"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_627a791f99ca54aa80baaf2d71" ON "client" ("api_key") `
    )
    await queryRunner.query(
      `CREATE TABLE "evaluation_question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "question" text NOT NULL, "weigth" double precision NOT NULL, "order" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "formId" uuid, CONSTRAINT "PK_6ecc0e6614b9c4bc65c6de2c021" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "evaluation_form" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "eventId" uuid, CONSTRAINT "PK_490ac2ce05cce13a03005a478f6" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "evaluation_reviewer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" character varying NOT NULL, "assigned_forms" integer, "eventId" uuid, "userId" uuid, CONSTRAINT "PK_704273af0b0b815b056d9697a0c" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "attendance_session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "eventId" uuid, CONSTRAINT "PK_5940f7beb6d791a618dbf88361e" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "date_start" TIMESTAMP WITH TIME ZONE NOT NULL, "date_end" TIMESTAMP WITH TIME ZONE NOT NULL, "location" character varying NOT NULL, "banner_url" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "client_id" uuid, CONSTRAINT "UQ_b535fbe8ec6d832dde22065ebdb" UNIQUE ("name"), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_07c71f2d1cbf2a9625c8fcb516" ON "event" ("client_id") `
    )
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "event_id" uuid, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "evaluation_answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "score" double precision NOT NULL, "comment" text, "evaluationId" uuid, "questionId" uuid, CONSTRAINT "PK_26adcf2e8e65214d2558b8f6910" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "project_evaluation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "final_score" double precision NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "projectId" uuid, "evaluatorId" uuid, "formId" uuid, CONSTRAINT "PK_81031df8a11ad6b59f181ea09a7" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "image_url" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "category_id" uuid, "event_id" uuid, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "project_member_attendance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL DEFAULT 'pending', "comment" text, "timestamp" TIMESTAMP NOT NULL, "sessionId" uuid, "projectMemberId" uuid, CONSTRAINT "PK_ef41a6e5c9080539a94d3c3f1fb" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "project_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, "project_id" uuid, CONSTRAINT "PK_64dba8e9dcf96ce383cfd19d6fb" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "visitor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, "institution" character varying, "visit_time" TIMESTAMP NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "projectMemberId" uuid, CONSTRAINT "PK_ba6ae421d03de90a99ed838741d" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "pending_client_staff" ADD CONSTRAINT "FK_1af23403e4e5eaeb9b76b5646e5" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "pending_client_staff" ADD CONSTRAINT "FK_682f5deadc7b0f5fe7f7de47e98" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "client_staff" ADD CONSTRAINT "FK_dcaf835751795a0cbf06c170f3d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "client_staff" ADD CONSTRAINT "FK_e96ffb4c538a45fe901e97f15e6" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "client_staff" ADD CONSTRAINT "FK_51842f3b42f0ba495ebfc893451" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_question" ADD CONSTRAINT "FK_dbe3a3e78d3e826a3a06a89c562" FOREIGN KEY ("formId") REFERENCES "evaluation_form"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_form" ADD CONSTRAINT "FK_440a6f343c281976ddc96d8de08" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_reviewer" ADD CONSTRAINT "FK_94ac581fa783f5da2d8c1e79aeb" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_reviewer" ADD CONSTRAINT "FK_2e9e0b0d4801c6aaafbc0795a4f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "attendance_session" ADD CONSTRAINT "FK_a9795ffd82446eb07669f196b27" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_07c71f2d1cbf2a9625c8fcb516e" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_2b37ae831bfa2cdc72fc18326f1" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_answer" ADD CONSTRAINT "FK_ffe01531544524587279e70fe15" FOREIGN KEY ("evaluationId") REFERENCES "project_evaluation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_answer" ADD CONSTRAINT "FK_e952c14eb3d298412a1a4499962" FOREIGN KEY ("questionId") REFERENCES "evaluation_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "project_evaluation" ADD CONSTRAINT "FK_c57433ca0e377d0ca4becfcf5ca" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "project_evaluation" ADD CONSTRAINT "FK_8a5c63c6d339a94d01807821b47" FOREIGN KEY ("evaluatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "project_evaluation" ADD CONSTRAINT "FK_1162b7e337c85479ae7a5ee3a1a" FOREIGN KEY ("formId") REFERENCES "evaluation_form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_826c5e0f45e35b5983c8379be7b" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_84a11a59920c5c503d1e4c23c08" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "project_member_attendance" ADD CONSTRAINT "FK_4ca2cae248b78c2d52d3f4dbeb5" FOREIGN KEY ("sessionId") REFERENCES "attendance_session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "project_member_attendance" ADD CONSTRAINT "FK_9e92f67778bffda846a61844071" FOREIGN KEY ("projectMemberId") REFERENCES "project_member"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "project_member" ADD CONSTRAINT "FK_aaef76230abfcdf30adb15d0be8" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "visitor" ADD CONSTRAINT "FK_f07e027721cbaf727759b61a7e6" FOREIGN KEY ("projectMemberId") REFERENCES "project_member"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "visitor" DROP CONSTRAINT "FK_f07e027721cbaf727759b61a7e6"`
    )
    await queryRunner.query(
      `ALTER TABLE "project_member" DROP CONSTRAINT "FK_aaef76230abfcdf30adb15d0be8"`
    )
    await queryRunner.query(
      `ALTER TABLE "project_member_attendance" DROP CONSTRAINT "FK_9e92f67778bffda846a61844071"`
    )
    await queryRunner.query(
      `ALTER TABLE "project_member_attendance" DROP CONSTRAINT "FK_4ca2cae248b78c2d52d3f4dbeb5"`
    )
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_84a11a59920c5c503d1e4c23c08"`
    )
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_826c5e0f45e35b5983c8379be7b"`
    )
    await queryRunner.query(
      `ALTER TABLE "project_evaluation" DROP CONSTRAINT "FK_1162b7e337c85479ae7a5ee3a1a"`
    )
    await queryRunner.query(
      `ALTER TABLE "project_evaluation" DROP CONSTRAINT "FK_8a5c63c6d339a94d01807821b47"`
    )
    await queryRunner.query(
      `ALTER TABLE "project_evaluation" DROP CONSTRAINT "FK_c57433ca0e377d0ca4becfcf5ca"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_answer" DROP CONSTRAINT "FK_e952c14eb3d298412a1a4499962"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_answer" DROP CONSTRAINT "FK_ffe01531544524587279e70fe15"`
    )
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_2b37ae831bfa2cdc72fc18326f1"`
    )
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_07c71f2d1cbf2a9625c8fcb516e"`
    )
    await queryRunner.query(
      `ALTER TABLE "attendance_session" DROP CONSTRAINT "FK_a9795ffd82446eb07669f196b27"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_reviewer" DROP CONSTRAINT "FK_2e9e0b0d4801c6aaafbc0795a4f"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_reviewer" DROP CONSTRAINT "FK_94ac581fa783f5da2d8c1e79aeb"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_form" DROP CONSTRAINT "FK_440a6f343c281976ddc96d8de08"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_question" DROP CONSTRAINT "FK_dbe3a3e78d3e826a3a06a89c562"`
    )
    await queryRunner.query(
      `ALTER TABLE "client_staff" DROP CONSTRAINT "FK_51842f3b42f0ba495ebfc893451"`
    )
    await queryRunner.query(
      `ALTER TABLE "client_staff" DROP CONSTRAINT "FK_e96ffb4c538a45fe901e97f15e6"`
    )
    await queryRunner.query(
      `ALTER TABLE "client_staff" DROP CONSTRAINT "FK_dcaf835751795a0cbf06c170f3d"`
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`
    )
    await queryRunner.query(
      `ALTER TABLE "pending_client_staff" DROP CONSTRAINT "FK_682f5deadc7b0f5fe7f7de47e98"`
    )
    await queryRunner.query(
      `ALTER TABLE "pending_client_staff" DROP CONSTRAINT "FK_1af23403e4e5eaeb9b76b5646e5"`
    )
    await queryRunner.query(`DROP TABLE "visitor"`)
    await queryRunner.query(`DROP TABLE "project_member"`)
    await queryRunner.query(`DROP TABLE "project_member_attendance"`)
    await queryRunner.query(`DROP TABLE "project"`)
    await queryRunner.query(`DROP TABLE "project_evaluation"`)
    await queryRunner.query(`DROP TABLE "evaluation_answer"`)
    await queryRunner.query(`DROP TABLE "category"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_07c71f2d1cbf2a9625c8fcb516"`
    )
    await queryRunner.query(`DROP TABLE "event"`)
    await queryRunner.query(`DROP TABLE "attendance_session"`)
    await queryRunner.query(`DROP TABLE "evaluation_reviewer"`)
    await queryRunner.query(`DROP TABLE "evaluation_form"`)
    await queryRunner.query(`DROP TABLE "evaluation_question"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_627a791f99ca54aa80baaf2d71"`
    )
    await queryRunner.query(`DROP TABLE "client"`)
    await queryRunner.query(`DROP TABLE "client_staff"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9f839e522b3b8c8c8223cde81d"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`
    )
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TABLE "role"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4dd5873974dc60ec8a678b9c7b"`
    )
    await queryRunner.query(`DROP TABLE "pending_client_staff"`)
  }
}
