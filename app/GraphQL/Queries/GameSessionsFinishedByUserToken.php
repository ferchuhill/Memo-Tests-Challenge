<?php
namespace App\GraphQL\Queries;

use Nuwave\Lighthouse\Execution\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final class GameSessionsFinishedByUserToken
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $gameSession = \App\Models\GameSessions::where('user_token', $args['user_token'])
            ->where('state', 'Finished')
            ->get();
        dd($gameSession);

        return $gameSession;
    }
}
