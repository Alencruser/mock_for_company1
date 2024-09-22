import { ChildCare } from 'src/child-cares/entities/child-care.entity';
import { Child } from 'src/children/entities/child.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('child_care_child')
export class ChildCareChild {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    childId: number;

    @Column()
    childCareId: number;

    // we could also store entire objects and use this kind of code
    /*
    @ManyToOne(() => Child, { eager: false })
    @JoinColumn({ name: 'id_child' })
    child: Child;

    @ManyToOne(() => ChildCare, { eager: false })
    @JoinColumn({ name: 'id_child_care' })
    childCare: ChildCare;
    */
}
