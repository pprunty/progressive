# Makefile for asterisk

# Variables
NODE_ENV=production

# Default target
.PHONY: all
all: dev

# Development server
.PHONY: dev
dev:
	npm run dev

# Build the project
.PHONY: build
build: lint
	NODE_ENV=$(NODE_ENV) npm run build

# Start the production server
.PHONY: start
start:
	NODE_ENV=$(NODE_ENV) npm run start

# Lint the project
.PHONY: lint
lint:
	npm run lint:fix && npm run format

# Clean the build artifacts and node_modules
.PHONY: clean
clean:
	npm run clean

# Install dependencies
.PHONY: install
install:
	npm install

# Generate PWA icons
.PHONY: icons
icons:
	npm run generate-pwa-icons

# Generate slugs
.PHONY: slugs
slugs:
	npm run generate-slugs

# Create a new blog
.PHONY: blog
blog:
	npm run create-blog

# Create a new post
.PHONY: post
post:
	npm run create-post

# Generate Lighthouse report
.PHONY: lighthouse
lighthouse:
	$(eval URL ?= https://blog-v2-template.vercel.app/)
	$(eval DEVICE ?= mobile)  # Default to mobile if not specified
	lighthouse $(URL) --emulated-form-factor=$(DEVICE) --output=html --view --chrome-flags="--incognito" --output-path=./lighthouse_report_$(DEVICE).html

# Help
.PHONY: help
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  dev        Start the development server"
	@echo "  build      Build the project for production"
	@echo "  start      Start the production server"
	@echo "  lint       Lint the project"
	@echo "  clean      Remove build artifacts and node_modules"
	@echo "  install    Install dependencies"
	@echo "  icons      Generate PWA icons"
	@echo "  slugs      Generate slugs for the blog posts"
	@echo "  blog       Create a new blog"
	@echo "  post       Create a new post"
	@echo "  lighthouse Generate Lighthouse report (optional: URL=<custom_url>)"
