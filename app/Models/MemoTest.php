<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MemoTest extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'user_name',
        'high_score'
    ];

    public function images(): HasMany
    {
        return $this->hasMany(Images::class);
    }

    public function gameSessions(): HasMany
    {
        return $this->hasMany(GameSessions::class);
    }
}
