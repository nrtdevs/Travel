import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String) // Define return type explicitly
  getHello(): string {
    return 'Hello World!';
  }
}
    