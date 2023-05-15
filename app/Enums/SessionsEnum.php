<?php

namespace App\Enums;

enum SessionsEnum:string {
    case Pending = 'pending';
    case Active = 'active';
    case Inactive = 'inactive';
    case Rejected = 'rejected';
}
