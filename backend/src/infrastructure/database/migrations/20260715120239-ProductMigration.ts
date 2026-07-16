import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ProductMigration20260715120239 implements MigrationInterface {
    name = "ProductMigration20260715120239";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "product",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()", },
                    { name: "user_uuid", type: "uuid" },
                    { name: "name", type: "varchar", length: "150", isNullable: false, },
                    { name: "description", type: "text", isNullable: true, },
                    { name: "price", type: "decimal", precision: 10, scale: 2, isNullable: false, },
                    { name: "image_url", type: "varchar", isNullable: true, },
                    { name: "created_at", type: "timestamp", default: "now()", },
                    { name: "updated_at", type: "timestamp", default: "now()", },
                    { name: "deleted_at", type: "timestamp", isNullable: true, },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "product",
            new TableForeignKey({
                name: "FK_PRODUCT_USER",
                columnNames: ["user_uuid"],
                referencedColumnNames: ["uuid"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product", true);
        await queryRunner.dropForeignKey("product", "FK_PRODUCT_USER");
    }
}
