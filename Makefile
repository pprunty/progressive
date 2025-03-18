# Makefile for asterisk

# Variables
NODE_ENV=production

# Default target
.PHONY: all
all: help

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

# Registry: Build
.PHONY: registry-build
registry-build:
	npm run registry:build

# Registry: Add Component
.PHONY: registry-add-component
registry-add-component:
	@if [ -z "$(NAME)" ]; then \
		echo "Error: NAME is required. Usage: make registry-add-component NAME=button [CATEGORY=new-york]"; \
		exit 1; \
	fi
	$(eval CATEGORY ?= new-york)  # Default to new-york if not specified
	npm run registry:add:component $(NAME) $(CATEGORY)

# Registry: Add Page
.PHONY: registry-add-page
registry-add-page:
	@if [ -z "$(NAME)" ]; then \
		echo "Error: NAME is required. Usage: make registry-add-page NAME=home [CATEGORY=new-york]"; \
		exit 1; \
	fi
	$(eval CATEGORY ?= new-york)  # Default to new-york if not specified
	npm run registry:add:page $(NAME) $(CATEGORY)

# Registry: Add Library
.PHONY: registry-add-lib
registry-add-lib:
	@if [ -z "$(NAME)" ]; then \
		echo "Error: NAME is required. Usage: make registry-add-lib NAME=utils [CATEGORY=new-york]"; \
		exit 1; \
	fi
	$(eval CATEGORY ?= new-york)  # Default to new-york if not specified
	npm run registry:add:lib $(NAME) $(CATEGORY)

# Registry: Add Hook
.PHONY: registry-add-hook
registry-add-hook:
	@if [ -z "$(NAME)" ]; then \
		echo "Error: NAME is required. Usage: make registry-add-hook NAME=state [CATEGORY=new-york]"; \
		exit 1; \
	fi
	$(eval CATEGORY ?= new-york)  # Default to new-york if not specified
	npm run registry:add:hook $(NAME) $(CATEGORY)

# Registry: Remove Component
.PHONY: registry-remove
registry-remove:
	@if [ -z "$(NAME)" ]; then \
		echo "Error: NAME is required. Usage: make registry-remove NAME=button"; \
		exit 1; \
	fi
	npm run registry:remove $(NAME)

# Help
.PHONY: help
help:
	@echo "┌─────────────────────────────────────────────────┐"
	@echo "│               ASTERISK MAKEFILE                 │"
	@echo "└─────────────────────────────────────────────────┘"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "General Targets:"
	@echo "  dev                Start the development server"
	@echo "  build              Build the project for production"
	@echo "  start              Start the production server"
	@echo "  lint               Lint the project"
	@echo "  clean              Remove build artifacts and node_modules"
	@echo "  install            Install dependencies"
	@echo ""
	@echo "Content Targets:"
	@echo "  icons              Generate PWA icons"
	@echo "  slugs              Generate slugs for the blog posts"
	@echo "  blog               Create a new blog"
	@echo "  post               Create a new post"
	@echo "  lighthouse         Generate Lighthouse report (optional: URL=<custom_url>)"
	@echo ""
	@echo "Registry Targets:"
	@echo "  registry-build           Build the component registry"
	@echo "  registry-add-component   Add a component to registry (NAME=component-name [CATEGORY=theme])"
	@echo "  registry-add-page        Add a page to registry (NAME=page-name [CATEGORY=theme])"
	@echo "  registry-add-lib         Add a library to registry (NAME=lib-name [CATEGORY=theme])"
	@echo "  registry-add-hook        Add a hook to registry (NAME=hook-name [CATEGORY=theme])"
	@echo "  registry-remove          Remove a component from registry (NAME=component-name)"
	@echo ""
	@echo "Examples:"
	@echo "  make registry-add-component NAME=button CATEGORY=dark-theme"
	@echo "  make registry-remove NAME=button"