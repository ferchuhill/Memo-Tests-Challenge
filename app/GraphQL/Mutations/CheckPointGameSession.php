<?php

namespace App\GraphQL\Mutations;

final class CheckPointGameSession
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        //Find the GamseSession base on user_token and memo_test_id
        $gameSession = \App\Models\GameSessions::where('user_token', $args['user_token'])
            ->where('id', $args['game_session'])
            ->first();

        //If the gameSession is not found, thorw an error
        if (!$gameSession) {
            throw new \Exception('GameSession not found');
        }

        //If the gameSession is finish, thorw an error
        if ($gameSession->state === 'Finished') {
            throw new \Exception('GameSession is finished');
        }

        //  Mark the pairs as Flipped for each id in the array
        if (isset($args['pairs'])) {
            foreach ($args['pairs'] as $pair) {
                $gameSession->pairs()->where('id', $pair)->update(['state' => 'Paired']);
            }
        }

        // Add a int to the retries
        $gameSession->retries = $gameSession->retries + 1;
        // check if all the pairs are Paired
        if ($gameSession->pairs()->where('state', 'Paired')->count() === $gameSession->pairs()->count()) {
            // if all the pairs are Paired, calculate the score and set the state to Finished
            $gameSession->score = round(($gameSession->pairs()->count()/ $gameSession->retries) * 100,3);
            $gameSession->state = 'Finished';
        }

        // check if the score is higher than the high_score in that memo test
        if ($gameSession->score > $gameSession->memoTest->high_score) {
            // if the score is higher than the high_score in that memo test, update the high_score
            $gameSession->memoTest->high_score = $gameSession->score;
            $gameSession->memoTest->user_name = $gameSession->user_name;
            $gameSession->memoTest->save();
        }

        // Save the gameSession
        $gameSession->save();

        return $gameSession;
    }
}
