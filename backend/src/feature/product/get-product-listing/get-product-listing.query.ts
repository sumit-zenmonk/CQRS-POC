import { Query } from "@nestjs/cqrs";

export default class GetProductLisintgQuery extends Query<unknown> {
    constructor(readonly page: number) {
        super();
    }
}