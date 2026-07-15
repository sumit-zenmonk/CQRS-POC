import { faker } from '@faker-js/faker';
import { dataSource, options } from '../data-source';
import { ProductEntity } from 'src/domain/product/product.entity';

async function create() {
    dataSource.setOptions({
        ...options,
    });

    await dataSource.initialize();

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const _ of Array.from(Array(15).keys())) {
            await queryRunner.manager.save(ProductEntity, {
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: Number(faker.commerce.price({ min: 23, max: 100 })),
            });
        }

        await queryRunner.commitTransaction();
        console.info('✅ Seeded successfully');
    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error('❌ Something went wrong:', error);
    } finally {
        await queryRunner.release();
    }
}

void create();