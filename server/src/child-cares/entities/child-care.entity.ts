import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('child_care')
export class ChildCare {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 50 })
    name: string;

    // Because we only want to store the user email we don't use ManyToOne decorator but we could
    @Column('varchar', { name: 'referent', length: 255 })
    referent: string;
}
