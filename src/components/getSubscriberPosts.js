import getIslands from './getIslands';

export const getSubscriberPosts = async (islands, subscriber, state) => {
  let subscriberPosts = [];

  for (const islandName of islands) {
    let island = await getIslands(islandName);

    for (const tier of island[0].tiers) {
      if (tier.subs.includes(subscriber)) {
        for (const post of island[0].posts) {
          if (post.tiers.includes(parseInt(tier.index))) {
            subscriberPosts.push(post);
          }
        }
      }
    }
  }

  return subscriberPosts;
};
