import { ApiProperty } from '@nestjs/swagger';
import { genSalt, hash } from 'bcrypt';
import { log } from 'console';
import { Role } from 'src/auth/constants/role.enum';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  @ApiProperty({ example: 'lunatico', description: 'nickname' })
  username: string;
  @Column()
  @ApiProperty({ example: '123456', description: 'user password' })
  password: string;
  @Column({ unique: true })
  @ApiProperty({ example: 'inno@correo.com', description: 'user email' })
  email: string;
  @Column()
  @ApiProperty({ example: 'Ignacio', description: 'user name' })
  name: string;
  @Column()
  @ApiProperty({ example: 'Sambade', description: 'user lastname' })
  lastname: string;
  @Column()
  @ApiProperty({ example: 'Admin', description: 'user in charge' })
  // role: string; //Debe estructurarse como un array: role: []
  admin: boolean;
  @BeforeInsert()
  async hashPassword() {
    try {
      const salt = await genSalt(10);
      const hashedPassword = await hash(this.password, salt);
      this.password = hashedPassword;
      console.log(hashedPassword);
    } catch (error) {
      throw new Error('Encripting password failed');
    }
  }
  @OneToMany(() => Ticket, (ticket: Ticket) => ticket.user)
  tickets: Ticket[];
}
