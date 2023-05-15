<?php

namespace App\GraphQL\Mutations;

final class FinishGameSessions
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // search if the user has a game session in that memo test
        $gameSession = \App\Models\GameSessions::where('user_token', $args['user_token'])
            ->where('id', $args['game_session'])
            ->where('state', 'Started')
            ->first();

        if (!$gameSession) {
            throw new \Exception('Game session not found');
        }

        // finish the game session
        $gameSession->state = 'Finished';
        $gameSession->save();

        return $gameSession;
    }

}
