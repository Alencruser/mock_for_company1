import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn('varchar', { length: 255, unique: true })
    email: string;

    @Column('varchar', { length: 50, unique: true })
    username: string;
}
