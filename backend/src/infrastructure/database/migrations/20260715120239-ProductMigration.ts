import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProductMigration20260715120239 implements MigrationInterface {
    name: "ProductMigration20260715120239"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "product",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, default: "uuid_generate_v4()" },
                    { name: "name", type: "varchar", length: "150" },
                    { name: "description", type: "text" },
                    { name: "price", type: "decimal", precision: 10, scale: 2 },
                    { name: "created_at", type: "timestamp", default: "now()" },
                    { name: "updated_at", type: "timestamp", default: "now()" },
                    { name: "deleted_at", type: "timestamp", isNullable: true }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product");
    }
}
