import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the user' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The first name of the user' })
  firstName: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'The email address of the user' })
  email: string;

  @Column()
  @ApiProperty({ description: 'The password of the user' })
  password: string;
}
