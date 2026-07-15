import { Command } from "@nestjs/cqrs";

export default class DeleteProductCommand extends Command<unknown> {
    constructor(readonly product_uuid: string) {
        super();
    }
}