// import { Query } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';

@Resolver(() => String)
export class AppResolver {
  constructor() {}
  @Query(() => String)
  index() {
    return 'GrapgQl Initialised';
  }
}
