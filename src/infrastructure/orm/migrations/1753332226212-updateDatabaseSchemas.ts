import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateDatabaseSchemas1753332226212 implements MigrationInterface {
  name = 'UpdateDatabaseSchemas1753332226212'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "evaluation_question" RENAME COLUMN "weigth" TO "weight"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_answer" DROP COLUMN "comment"`
    )
    await queryRunner.query(
      `ALTER TABLE "event" ADD "sub_title" character varying`
    )
    await queryRunner.query(
      `ALTER TABLE "project_evaluation" ADD "comment" text`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9f839e522b3b8c8c8223cde81d"`
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_9f839e522b3b8c8c8223cde81db"`
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "rut"`)
    await queryRunner.query(`ALTER TABLE "user" ADD "rut" character varying(6)`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_9f839e522b3b8c8c8223cde81db" UNIQUE ("rut")`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_9f839e522b3b8c8c8223cde81d" ON "user" ("rut") `
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9f839e522b3b8c8c8223cde81d"`
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_9f839e522b3b8c8c8223cde81db"`
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "rut"`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD "rut" character varying(12)`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_9f839e522b3b8c8c8223cde81db" UNIQUE ("rut")`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_9f839e522b3b8c8c8223cde81d" ON "user" ("rut") `
    )
    await queryRunner.query(
      `ALTER TABLE "project_evaluation" DROP COLUMN "comment"`
    )
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "sub_title"`)
    await queryRunner.query(
      `ALTER TABLE "evaluation_answer" ADD "comment" text`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_question" RENAME COLUMN "weight" TO "weigth"`
    )
  }
}
