import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Child {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 20 })
    first_name: string;

    @Column('varchar', { length: 30 })
    last_name: string;

    @Column('varchar', { length: 255 })
    referent: string;
}
