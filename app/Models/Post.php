<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $guarded = []; // permite tudo

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
