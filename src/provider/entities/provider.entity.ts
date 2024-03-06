import { ApiProperty } from '@nestjs/swagger';
import { genSalt, hash } from 'bcrypt';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  providerName: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  @ApiProperty({ example: 'Berlingo', description: 'The car brand' })
  vehicle: string;

  @Column()
  @ApiProperty({ example: 'small', description: 'car size' })
  vehicleSize: string;

  @Column()
  @ApiProperty({ example: 'Barcelona', description: 'provider location' })
  origin: string;

  @Column()
  @ApiProperty({ example: 'Catalunya', description: 'Working area' })
  trip: string;

  @Column()
  @ApiProperty({ example: 'available', description: 'provider availability' })
  availability: boolean;

  @Column()
  @ApiProperty({ example: 'Excellent', description: 'provider rating' })
  reviews: string;

  @BeforeInsert()
  async hashPassword() {
    try {
      const salt = await genSalt(10);
      const hashedPassword = await hash(this.password, salt);
      this.password = hashedPassword;
      console.log(hashedPassword);
    } catch (error) {
      throw new Error('encrypting password failed');
    }
  }

  @OneToMany(() => Ticket, (ticket: Ticket) => ticket.provider)
  tickets: Ticket[];
}
