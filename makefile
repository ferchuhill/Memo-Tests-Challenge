.PHONY: help build up down restart clean

help:
	@echo "Available targets:"
	@echo "  help: Display this help message."
	@echo "  up.prod: Start the application in production mode."
    @echo "  up.prod.build: Start the application in production mode and rebuild the images."
    @echo "  up.dev: Start the application in development mode."
    @echo "  up.dev.build: Start the application in development mode and rebuild the images."
    @echo "  down: Stop the application."
    @echo "  test: Run the tests."
    @echo "  storybook: Run the storybook."

up.prod:
	./vendor/bin/sail up -d

up.prod.build:
	./vendor/bin/sail up -d --build

up.dev:
	./vendor/bin/sail -f docker-compose.dev.yml up -d
	npm install --prefix front
	npm run dev --prefix front

up.dev.build:
	./vendor/bin/sail -f docker-compose.dev.yml up -d --build

down:
	./vendor/bin/sail down

test:
	./vendor/bin/sail test
	npm run test --prefix front

storybook:
	npm run storybook --prefix front

migration.seed:
	./vendor/bin/sail artisan migrate:fresh --seed
