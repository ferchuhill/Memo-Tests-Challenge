<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Images extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
        'memo_test_id'
    ];

    public function memoTest()
    {
        return $this->belongsTo(MemoTest::class);
    }
}
