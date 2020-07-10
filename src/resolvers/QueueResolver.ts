import { GetUserMiddleware } from './../middlewares/GetUserMiddleware';

import {
  Arg,
  Mutation,
  PubSub,
  PubSubEngine,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql';
import { createQueryBuilder, Like } from 'typeorm';
import { UserQueue } from './../entity/UserQueue';
import { CreateUserQueueInput } from './../inputs/UserQueueInputs/CreateUserQueueInput';

@Resolver()
export class QueueResolver {
  @Subscription({
    topics: 'QUEUE',
  })
  public newQueue(@Root() payload): UserQueue {
    return payload;
  }

  @Subscription({
    topics: 'CHANGESTATUS ',
  })
  public nowServingQueue(@Root() payload): UserQueue {
    return payload;
  }

  @Mutation(() => UserQueue)
  @UseMiddleware(GetUserMiddleware)
  public async addQueue(@Arg('data') data: CreateUserQueueInput, @PubSub() pubSub: PubSubEngine) {
    const userqueue = UserQueue.create(data);
    const result = await UserQueue.findAndCount({
      where: { restaurantId: data.restaurantId, queueNumber: Like(`%${data.type}%`) },
    });
    console.log(result[1]);
    if (result[1] === 0) {
      userqueue.queueNumber = data.type === 'D' ? 'D1' : 'T1';
    } else {
      const queuenu = ++result[1];
      userqueue.queueNumber = data.type === 'D' ? `D${queuenu}` : `T${queuenu}`;
    }
    userqueue.status = 'Pending';
    userqueue.createdDate = new Date();
    userqueue.canceledDate = null;
    userqueue.queuedDate = new Date();
    // temp hardcoded values
    userqueue.transactionFee = 0;
    userqueue.subTotal = 0;
    userqueue.total = 0;
    const user = await UserQueue.save(userqueue);
    await pubSub.publish('QUEUE', userqueue);
    return user;
  }

  @Mutation(() => UserQueue)
  @UseMiddleware(GetUserMiddleware)
  public async serveQueueStatus(
    @Arg('id') id: string,
    @Arg('status') status: string,
    @PubSub() pubSub: PubSubEngine
  ) {
    const userqueue = await UserQueue.findOne({ where: { id } });
    userqueue.status = status;

    await pubSub.publish('CHANGESTATUS', userqueue);
    return true;
  }
}
