import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: "varchar", length: 150, nullable: false })
    name: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: 'varchar', nullable: true })
    image_url: string;

    @Column({ type: 'uuid' })
    user_uuid: string;

    @ManyToOne(() => UserEntity, (user) => user.products, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_uuid' })
    user: UserEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}
