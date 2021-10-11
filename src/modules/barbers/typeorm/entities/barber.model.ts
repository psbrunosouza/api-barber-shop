import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Barbers {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    document: string;

    @Column()
    zipcode: string;

    @Column()
    street: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    streetNumber: string;

    @Column('date')
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}