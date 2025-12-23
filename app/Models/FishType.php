<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FishType extends Model
{
    protected $fillable = ['name', 'description'];

    public function ponds()
    {
        return $this->hasMany(Pond::class);
    }
}
