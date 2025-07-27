import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrations1753557072124 implements MigrationInterface {
  name = 'Migrations1753557072124'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9f839e522b3b8c8c8223cde81d"`
    )
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_9f839e522b3b8c8c8223cde81db"`
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "rut"`)
    await queryRunner.query(`ALTER TABLE "user" ADD "rut" character varying`)
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
    await queryRunner.query(`ALTER TABLE "user" ADD "rut" character varying(6)`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_9f839e522b3b8c8c8223cde81db" UNIQUE ("rut")`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_9f839e522b3b8c8c8223cde81d" ON "user" ("rut") `
    )
  }
}
