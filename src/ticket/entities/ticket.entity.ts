import { ApiProperty } from '@nestjs/swagger';
import { Provider } from 'src/provider/entities/provider.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  orderId: number;
  @Column()
  @ApiProperty({ example: 100, description: 'moving fare' })
  fare: number;
  @Column()
  @ApiProperty({ example: 'excellent', description: 'moving service' })
  review: number;
  @Column()
  @ApiProperty({
    example: 'The move was great',
    description: 'comment on the moving service',
  })
  comments: string;
  @Column()
  @ApiProperty({ example: 'bed', description: 'bedroom furnitures' })
  commodities: string;
  @Column()
  @ApiProperty({ example: '2024/02/25', description: 'service date' })
  date_time: Date;
  @Column()
  @ApiProperty({ example: 'Barcelona', description: 'client location' })
  origin: string;
  @Column()
  @ApiProperty({ example: 'Girona', description: 'the client new location' })
  destination: string;
  @Column()
  @ApiProperty({ example: 'debidcard', description: 'payment method' })
  paymenttype: string;
  @Column()
  @ApiProperty({ example: 'accepted', description: 'payment status' })
  paymentstatus: boolean;
  @Column()
  userId: number;
  @Column()
  providerId: number;
  @ManyToOne(() => User, (user: User) => user.tickets)
  user: User;
  @ManyToOne(() => Provider, (provider: Provider) => provider.tickets)
  provider: Provider;
}
