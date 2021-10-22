import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class AddTableGenres1634750321819 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "genres",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "game_genres",
        columns: [
          {
            name: "gameId",
            type: "uuid",
          },
          {
            name: "genreId",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createPrimaryKey("game_genres", ["gameId", "genreId"]);
    await queryRunner.createForeignKeys("game_genres", [
      new TableForeignKey({
        columnNames: ["gameId"],
        referencedColumnNames: ["id"],
        referencedTableName: "games",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["genreId"],
        referencedColumnNames: ["id"],
        referencedTableName: "genres",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("game_genres");
    const foreinKeyGameId = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("gameId") !== -1
    );
    const foreinKeyGenreId = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("genreId") !== -1
    );

    if (foreinKeyGameId)
      await queryRunner.dropForeignKey("game_genres", foreinKeyGameId);

    if (foreinKeyGenreId)
      await queryRunner.dropForeignKey("game_genres", foreinKeyGenreId);

    await queryRunner.dropPrimaryKey("game_genres");
    await queryRunner.dropTable("game_genres");
    await queryRunner.dropTable("genres");
  }
}
