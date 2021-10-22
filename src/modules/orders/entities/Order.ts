import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "../../games/entities/Game";
import { User } from "../../users/entities/User";

@Entity("orders")
class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  userId: string;

  @ManyToOne(() => Game)
  gameId: string;
}

export { Order };
