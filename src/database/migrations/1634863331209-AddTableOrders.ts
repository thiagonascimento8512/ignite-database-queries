import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class AddTableOrders1634863331209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "userId",
            type: "uuid",
          },
          {
            name: "gameId",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createForeignKeys("orders", [
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["gameId"],
        referencedColumnNames: ["id"],
        referencedTableName: "games",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("orders");
    const foreinKeyUserId = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("userId") !== -1
    );
    const foreinKeyGameId = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("gameId") !== -1
    );

    if (foreinKeyUserId)
      await queryRunner.dropForeignKey("game_genres", foreinKeyUserId);

    if (foreinKeyGameId)
      await queryRunner.dropForeignKey("game_genres", foreinKeyGameId);

    await queryRunner.dropTable("orders");
  }
}
