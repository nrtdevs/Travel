import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1740726494631 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE users (
              id INT AUTO_INCREMENT PRIMARY KEY,
              username VARCHAR(255) NOT NULL,
              org_name VARCHAR(255) NOT NULL,
              mobileNo BIGINT(20) NULL DEFAULT NULL,
              email VARCHAR(191) NOT NULL UNIQUE,
              
              password VARCHAR(255) NOT NULL,
              createdBy INT NULL DEFAULT NULL,
              createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              deletedAt TIMESTAMP NULL DEFAULT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE users`);
  }
    

}



