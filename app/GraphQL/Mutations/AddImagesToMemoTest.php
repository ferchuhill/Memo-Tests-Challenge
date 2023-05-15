<?php

namespace App\GraphQL\Mutations;

final class AddImagesToMemoTest
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // find the memo
        $memo = \App\Models\MemoTest::find($args['id']);
        // add the images
        foreach ($args['images'] as $image) {
            $memo->images()->create([
                'url' => $image['url'],
            ]);
        }

        return $memo;
    }
}
