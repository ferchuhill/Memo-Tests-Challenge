<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\hasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pairs extends Model
{
    use HasFactory;

    protected $fillable = [
        'image_id',
        'game_sessions_id',
        'state',
        'position_a',
        'position_b',
    ];

    public function gameSession() : BelongsTo
    {
        return $this->belongsTo(GameSessions::class);
    }

    public function images() : BelongsTo
    {
        return $this->belongsTo(Images::class);
    }

}
