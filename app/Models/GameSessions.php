<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GameSessions extends Model
{
    use HasFactory;

    protected $fillable = [
        'memo_test_id',
        'user_token',
        'retries',
        'numbe_of_pairs',
        'score',
        'state',
        'user_name'
    ];


    public function memoTest() : BelongsTo
    {
        return $this->belongsTo(MemoTest::class);
    }

    public function pairs() : HasMany
    {
        return $this->hasMany(Pairs::class);
    }
}
