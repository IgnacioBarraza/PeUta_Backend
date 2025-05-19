import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateRelations1747623950743 implements MigrationInterface {
  name = 'UpdateRelations1747623950743'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "evaluation_scores" DROP CONSTRAINT "FK_5400708c7ea33755f72ce69e753"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_scores" RENAME COLUMN "evaluationQuestionsUid" TO "questionsUid"`
    )
    await queryRunner.query(
      `ALTER TABLE "project" RENAME COLUMN "category" TO "members"`
    )
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "roleName"`)
    await queryRunner.query(
      `ALTER TABLE "role" ADD "name" character varying NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "role" ADD "permissions" jsonb NOT NULL DEFAULT '[]'`
    )
    await queryRunner.query(
      `ALTER TABLE "project_categories" ADD "projectUid" uuid`
    )
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "members"`)
    await queryRunner.query(
      `ALTER TABLE "project" ADD "members" jsonb NOT NULL DEFAULT '[]'`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_scores" ADD CONSTRAINT "FK_d75b271a51b224b7dd33dd02625" FOREIGN KEY ("questionsUid") REFERENCES "evaluation_questions"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "project_categories" ADD CONSTRAINT "FK_e5efe65e1435f04dd781de78a1c" FOREIGN KEY ("projectUid") REFERENCES "project"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_categories" DROP CONSTRAINT "FK_e5efe65e1435f04dd781de78a1c"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_scores" DROP CONSTRAINT "FK_d75b271a51b224b7dd33dd02625"`
    )
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "members"`)
    await queryRunner.query(
      `ALTER TABLE "project" ADD "members" character varying NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "project_categories" DROP COLUMN "projectUid"`
    )
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "permissions"`)
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "name"`)
    await queryRunner.query(
      `ALTER TABLE "role" ADD "roleName" character varying NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "project" RENAME COLUMN "members" TO "category"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_scores" RENAME COLUMN "questionsUid" TO "evaluationQuestionsUid"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_scores" ADD CONSTRAINT "FK_5400708c7ea33755f72ce69e753" FOREIGN KEY ("evaluationQuestionsUid") REFERENCES "evaluation_questions"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }
}
