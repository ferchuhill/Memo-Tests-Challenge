<?php

namespace App\GraphQL\Mutations;

final class RemoveImagesFromMemoTest
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // find the memo
        $memo = \App\Models\MemoTest::find($args['id']);
        // check if the imagen exist, then delete it
        foreach ($args['images'] as $image) {
            if(isset($image['id'])) {
                $memo->images()->where('id', $image['id'])->delete();
            }else {
                $memo->images()->where('url', $image['url'])->delete();
            }
        }
        return $memo;
    }
}
