import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('child_care_child')
export class ChildCareChild {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'child_id' })
    childId: number;

    @Column({ name: 'child_care_id' })
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
