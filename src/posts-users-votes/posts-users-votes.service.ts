import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from '@posts/post.entity';
import { User } from '@users/user.entity';

import { PostsUsersVotes } from './posts-users-votes.entity';

@Injectable()
export class PostsUsersVotesService {
  constructor(
    @InjectRepository(PostsUsersVotes)
    private postsUsersVotesRepository: Repository<PostsUsersVotes>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {}

  async vote(voteType: 'like' | 'dislike', userId: string, postId: string) {
    let voteEntity = await this.postsUsersVotesRepository.findOne({
      where: { user: { id: userId }, post: { id: postId } },
    });

    if (!voteEntity) {
      const userEntity = await this.userRepository.findOne({
        where: { id: userId },
      });

      const postEntity = await this.postRepository.findOne({
        where: { id: postId },
      });

      if (!postEntity || !userEntity) {
        throw new Error('something went wrong');
      }

      voteEntity = this.postsUsersVotesRepository.create();

      voteEntity.post = postEntity;
      voteEntity.user = userEntity;
    }

    /*
    TODO: replace this with more beautifil way if possible

    1) vote == 0 || !voteEntity - return { [voteType]: 1 }

    2) vote == 1 (means liked post);
      a) dislike - return { dislike: 1, like: -1 }
      b) like - return { like: -1 }

    3) vote == -1 (means disliked post);
      a) dislike - return { dislike: -1 }
      b) like - return { dislike: -1, like: 1 }
    */

    const conditionsMap = {
      like: {
        '0': 1,
        '1': 0,
        '-1': 1,
      },
      dislike: {
        '0': -1,
        '1': -1,
        '-1': 0,
      },
    };

    const { vote } = voteEntity;

    const conditionsByVoteType = conditionsMap[voteType];

    const newVote =
      conditionsByVoteType[
        (vote || 0).toString() as keyof typeof conditionsByVoteType
      ];

    voteEntity.vote = newVote;

    await PostsUsersVotes.save(voteEntity);

    if (!vote) {
      return { [voteType]: 1 };
    }

    if (vote === 1) {
      if (voteType === 'dislike') {
        return { dislike: 1, like: -1 };
      }

      return { dislike: 0, like: -1 };
    }

    if (vote === -1) {
      if (voteType === 'dislike') {
        return { dislike: -1, like: 0 };
      }

      return { dislike: -1, like: 1 };
    }

    return { dislike: 0, like: 0 };
  }
}
