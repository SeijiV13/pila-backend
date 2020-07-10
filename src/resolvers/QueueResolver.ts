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
import { createQueryBuilder } from 'typeorm';
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
    topics: 'NOWSERVING',
  })
  public nowServingQueue(@Root() payload): UserQueue {
    return payload;
  }

  @Mutation(() => UserQueue)
  @UseMiddleware(GetUserMiddleware)
  public async addQueue(@Arg('data') data: CreateUserQueueInput, @PubSub() pubSub: PubSubEngine) {
    const userqueue = UserQueue.create(data);
    const query = createQueryBuilder('UserQueue');
    query.select('MAX(UserQueue.queueNumber)', 'max');
    const test = await query.getRawOne();
    if (test) {
      userqueue.queueNumber = '1';
    } else {
      userqueue.queueNumber = '1';
    }
    await UserQueue.save(userqueue);
    userqueue.status = 'Pending';
    userqueue.createdDate = new Date();
    userqueue.canceledDate = null;
    userqueue.queuedDate = new Date();
    await pubSub.publish('QUEUE', userqueue);
    return true;
  }

  @Mutation(() => UserQueue)
  @UseMiddleware(GetUserMiddleware)
  public async serveQueueStatus(@Arg('id') id: string, @PubSub() pubSub: PubSubEngine) {
    const userqueue = await UserQueue.findOne({ where: { id } });
    userqueue.status = 'SERVING';

    await pubSub.publish('QUEUE', userqueue);
    return true;
  }
}
