import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "../product/product.entity";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: "varchar", length: 150 })
    username: string;

    @Column({ type: "varchar", length: 150, unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => ProductEntity, (product) => product.user)
    products: ProductEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}