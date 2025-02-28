import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity('users')
export class Users {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({type:'varchar'})
  username: string;

  @Field({ nullable: true })
  @Column()
  org_name: string;

  @Field({ nullable: true }) 
  @Column({})
  email: string;

  @Field({ nullable: true })
  // Don't expose password in GraphQL responses
  @Column()
  password: string; 

  @Field({ nullable: true })
  @Column({ type: 'bigint', nullable: true })
  mobileNo: number; 

  @Field({ nullable: true })
  @Column({ default: 'avatar' })
  avatar: string;

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

 

  // @Field({ nullable: false })
  // @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' }) // Role column
  // placholder: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  createdBy: number;

  @Field({ nullable: true })
  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async validatePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password)
  }
}
