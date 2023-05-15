<?php

namespace App\GraphQL\Mutations;

final class CreateMemoTest
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $memo = new \App\Models\MemoTest();
        $memo->name = $args['name'];
        $memo->save();

        // add the images
        foreach ($args['images'] as $image) {
            $memo->images()->create([
                'url' => $image['url'],
            ]);
        }

        return $memo;
    }
}
