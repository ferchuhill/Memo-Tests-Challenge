<?php

namespace App\GraphQL\Mutations;

final class CreateGameSession
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // find the memo
        $memo = \App\Models\MemoTest::find($args['memo_test_id']);

        // search if the user has a game session in that memo test

        $gameSession = \App\Models\GameSessions::where('user_token', $args['user_token'])
            ->where('memo_test_id', $args['memo_test_id'])
            ->where('state', 'Started')
            ->first();

        // if the user has a game session in that memo test, return the game session
        if ($gameSession) {
            return $gameSession;
        }

        // count how many images are in the memo
        $numberOfImages = $memo->images()->count();
        // create th sessionGame
        $sessionGame = $memo->gameSessions()->create([
            'user_token' => $args['user_token'],
            'user_name' => $args['user_name'],
            'retries' => 0,
            'number_of_pairs' => $numberOfImages,
            'score' => 0,
            'state' => 'Started'
        ]);

        // generete the array with all the positions
        $randomPosition = $this->uniqueRandomNumber(1, ($numberOfImages*2), ($numberOfImages*2));
        $randomPositionIndex = 0;
        // create the pairs
        $images = $memo->images()->get();
        foreach ($images as $image) {
            $sessionGame->pairs()->create([
                'image_id' => $image->id,
                'state' => 'Hidden',
                'position_a' => $randomPosition[$randomPositionIndex],
                'position_b' => $randomPosition[$randomPositionIndex+1],
            ]);
            $randomPositionIndex = $randomPositionIndex + 2;
        }
        return $sessionGame;
    }

    // generate the position for all the pairs
    private function uniqueRandomNumber($min, $max, $count) {
        $arr = array();
        while(count($arr) < $count){
             $tmp =mt_rand($min,$max);
             if(!in_array($tmp, $arr)){
                $arr[] = $tmp;
             }
        }
       return $arr;
    }
}
