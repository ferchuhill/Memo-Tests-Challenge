<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GameSession>
 */
class GameSessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'memo_test_id' => $this->faker->numberBetween(1, 10),
            'user_token' => $this->faker->uuid(),
            'retries' => $this->faker->numberBetween(0, 10),
            'number_of_pairs' => $this->faker->numberBetween(1, 10),
            'score' => $this->faker->numberBetween(0, 100),
            'state' => $this->faker->randomElement(['started', 'paused', 'finished']),
            'started_at' => $this->faker->dateTime(),
            'paused_at' => $this->faker->dateTime(),
            'finished_at' => $this->faker->dateTime(),
        ];
    }
}
