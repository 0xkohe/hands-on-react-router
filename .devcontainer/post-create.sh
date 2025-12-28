#!/bin/bash
set -e

echo "Installing vim..."
sudo apt-get update && sudo apt-get install -y vim

echo "Installing npm dependencies..."
npm install

echo "Installing GitHub Copilot CLI..."
npm install -g @github/copilot

echo "Installing Supabase CLI..."
npm install -g supabase

echo "Setup complete!"
